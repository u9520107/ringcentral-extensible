import RingCentral from '@rc-ex/core';
import {
  RestRequestConfig,
  RestResponse,
  RestMethod,
} from '@rc-ex/core/lib/Rest';
import SdkExtension from '@rc-ex/core/lib/SdkExtension';
import WS, {OPEN} from 'isomorphic-ws';

import {request} from './rest';
import {
  WsToken,
  ConnectionDetails,
  WebSocketOptions,
  WsgEvent,
  Wsc,
} from './types';
import Subscription from './subscription';
import {ConnectionException} from './exceptions';
import Utils from './utils';
import {EventEmitter} from 'events';

export enum Events {
  autoRecoverSuccess = 'autoRecoverSuccess',
  autoRecoverError = 'autoRecoverError',
}

class WebSocketExtension extends SdkExtension {
  eventEmitter = new EventEmitter();

  restOverWebsocket: boolean;
  debugMode: boolean;
  autoRecover: boolean;
  rc!: RingCentral;
  wsToken!: WsToken;
  ws!: WS;
  connectionDetails!: ConnectionDetails;
  wsc!: Wsc;
  subscriptions: Subscription[] = [];

  // for auto recover
  intervalHandle?: NodeJS.Timeout;

  request = request; // request method was moved to another file to keep this file short

  constructor(options?: WebSocketOptions) {
    super();
    this.restOverWebsocket = options?.restOverWebSocket ?? false;
    this.debugMode = options?.debugMode ?? false;
    this.autoRecover = options?.autoRecover ?? true;
  }

  get enabled() {
    return super.enabled;
  }
  set enabled(value: boolean) {
    super.enabled = value;
    for (const subscription of this.subscriptions ?? []) {
      subscription.enabled = value;
    }
  }

  async install(rc: RingCentral) {
    this.rc = rc;
    const request = rc.request.bind(rc);
    rc.request = async <T>(
      method: RestMethod,
      endpoint: string,
      content?: {},
      queryParams?: {},
      config?: RestRequestConfig
    ): Promise<RestResponse<T>> => {
      if (!this.enabled || !this.restOverWebsocket) {
        return request<T>(method, endpoint, content, queryParams, config);
      }
      if (
        // the following cannot be done with WebSocket
        config?.headers?.['Content-Type'].includes('multipart/form-data') ||
        config?.responseType === 'arraybuffer' ||
        endpoint.startsWith('/restapi/oauth/') // token, revoke, wstoken
      ) {
        return request<T>(method, endpoint, content, queryParams, config);
      }
      return this.request<T>(method, endpoint, content, queryParams, config);
    };
    await this.connect();

    // start of auto recover
    if (this.autoRecover) {
      let interval = 10000;
      const check = async () => {
        if (this.ws.readyState !== OPEN) {
          clearInterval(this.intervalHandle!);
          try {
            await this.recover();
            interval = 10000;
            if (this.debugMode) {
              console.debug('Auto recover success');
            }
            this.eventEmitter.emit(Events.autoRecoverSuccess, this.ws);
          } catch (e) {
            interval += 10000;
            if (interval > 60000) {
              interval = 60000; // max interval 60 seconds
            }
            if (this.debugMode) {
              console.debug('Auto recover error:', e);
            }
            this.eventEmitter.emit(Events.autoRecoverError, e);
          }
          this.intervalHandle = setInterval(check, interval);
        }
      };
      this.intervalHandle = setInterval(check, interval);
    }
    // end of auto recover
  }

  async recover() {
    if (this.wsc.token === undefined) {
      throw new Error('No existing session to recover');
    }
    await this.connect(true);
  }

  async reconnect() {
    await this.connect(false);
  }

  private async connect(recoverSession = false) {
    const r = await this.rc.post('/restapi/oauth/wstoken');
    this.wsToken = r.data as WsToken;
    let wsUri = `${this.wsToken.uri}?access_token=${this.wsToken.ws_access_token}`;
    if (recoverSession) {
      wsUri = `${wsUri}&wsc=${this.wsc.token}`;
    }
    this.ws = new WS(wsUri);

    // debug mode to print all WebSocket traffic
    if (this.debugMode) {
      Utils.debugWebSocket(this.ws);
    }

    // get initial ConnectionDetails data
    const [meta, body, event] = await Utils.waitForWebSocketMessage(
      this.ws,
      meta => meta.type === 'ConnectionDetails' || meta.type === 'Error'
    );
    if (meta.type === 'Error') {
      throw new ConnectionException(event);
    }
    this.connectionDetails = body;
    if (recoverSession && this.connectionDetails.recoveryState === 'Failed') {
      recoverSession = false;
    }

    // listen for new wsc data
    this.ws.addEventListener('message', (event: WsgEvent) => {
      const [meta] = Utils.splitWsgData(event.data);
      if (meta.wsc && this.wsc.sequence < meta.wsc.sequence) {
        this.wsc = meta.wsc;
      }
    });

    // recover all subscriptions, if there are any
    for (const subscription of this.subscriptions.filter(sub => sub.enabled)) {
      // because we have a new ws object
      subscription.setupWsEventListener();
      if (!recoverSession) {
        // create new subscription if don't recover existing one
        await subscription.subscribe();
      }
    }
  }

  async revoke() {
    for (const subscription of this.subscriptions) {
      await subscription.revoke();
    }
    this.subscriptions = [];
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
    this.ws.close();
  }

  async subscribe(eventFilters: string[], callback: (event: {}) => void) {
    const subscription = new Subscription(this, eventFilters, callback);
    await subscription.subscribe();
    this.subscriptions.push(subscription);
    return subscription;
  }
}

export default WebSocketExtension;
