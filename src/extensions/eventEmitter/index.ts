import {EventEmitter} from 'events';

import RingCentral from '../..';
import {RestRequestConfig, RestResponse, RestMethod} from '../../Rest';
import SdkExtension from '..';
import {GetTokenRequest} from '../../definitions';
import RestException from '../../RestException';

export enum Events {
  beforeRequest = 'beforeRequest',
  requestSuccess = 'requestSuccess',
  requestError = 'requestError',

  // enum values below are from
  // https://github.com/ringcentral/ringcentral-js/blob/master/sdk/src/platform/Platform.ts
  beforeLogin = 'beforeLogin',
  loginSuccess = 'loginSuccess',
  loginError = 'loginError',
  beforeRefresh = 'beforeRefresh',
  refreshSuccess = 'refreshSuccess',
  refreshError = 'refreshError',
  beforeLogout = 'beforeLogout',
  logoutSuccess = 'logoutSuccess',
  logoutError = 'logoutError',
  rateLimitError = 'rateLimitError',
}

export type EventEmitterOptions = {
  enabledEvents?: Events[];
};

class EventEmitterExtension extends SdkExtension {
  eventEmitter = new EventEmitter();
  enabledEvents?: Events[];

  constructor(options?: EventEmitterOptions) {
    super();
    this.enabledEvents = options?.enabledEvents;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: Events, data: any) {
    if (!this.enabledEvents || this.enabledEvents.includes(event)) {
      this.eventEmitter.emit(event, data);
    }
  }

  async install(rc: RingCentral) {
    const request = rc.request.bind(rc);
    rc.request = async <T>(
      method: RestMethod,
      endpoint: string,
      content?: {},
      queryParams?: {},
      config?: RestRequestConfig
    ): Promise<RestResponse<T>> => {
      if (!this.enabled) {
        return request<T>(method, endpoint, content, queryParams, config);
      }
      const params = {
        method,
        endpoint,
        content,
        queryParams,
        config,
      };
      this.emit(Events.beforeRequest, params);
      if (method === 'POST') {
        if (endpoint === '/restapi/oauth/token') {
          if ((content as GetTokenRequest).grant_type === 'refresh_token') {
            this.emit(Events.beforeRefresh, params);
          } else {
            this.emit(Events.beforeLogin, params);
          }
        } else if (endpoint === '/restapi/oauth/revoke') {
          this.emit(Events.beforeLogout, params);
        }
      }
      try {
        const r = await request<T>(
          method,
          endpoint,
          content,
          queryParams,
          config
        );
        this.emit(Events.requestSuccess, r);
        if (method === 'POST') {
          if (endpoint === '/restapi/oauth/token') {
            if ((content as GetTokenRequest).grant_type === 'refresh_token') {
              this.emit(Events.refreshSuccess, r);
            } else {
              this.emit(Events.loginSuccess, r);
            }
          } else if (endpoint === '/restapi/oauth/revoke') {
            this.emit(Events.logoutSuccess, r);
          }
        }
        return r;
      } catch (e) {
        this.emit(Events.requestError, e);
        if (method === 'POST') {
          if (endpoint === '/restapi/oauth/token') {
            if ((content as GetTokenRequest).grant_type === 'refresh_token') {
              this.emit(Events.refreshError, e);
            } else {
              this.emit(Events.loginError, e);
            }
          } else if (endpoint === '/restapi/oauth/revoke') {
            this.emit(Events.logoutError, e);
          }
        }
        if (e instanceof RestException && e.response.status === 429) {
          this.emit(Events.rateLimitError, e);
        }
        throw e;
      }
    };
  }
}

export default EventEmitterExtension;
