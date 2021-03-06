# WebSocket Extension

WebSocket Extension adds support for WebSocket protocol.


## Install dependencies

```
yarn add isomorphic-ws http-status-codes wait-for-async hyperid
```

If you use TypeScript, you also need to

```
yarn add @types/ws
```


## Usage

```ts
import RingCentral from 'ringcentral-extensible';
import WebSocketExtension from 'ringcentral-extensible/build/src/extensions/webSocket';

const rc = new RingCentral(...);
const webSocketExtension = new WebSocketExtension(webSocketOptions);
await rc.installExtension(webSocketExtension);
```

You can setup subscriptions:

```ts
await webSocketExtension.subscribe(
    ['/restapi/v1.0/account/~/extension/~/message-store'],
    event => {
       ...
    }
);
```

You can also make Rest API calls over WebSocket if you specified `webSocketOptions.restOverWebSocket` as `true`:

```ts
const webSocketExtension = new WebSocketExtension({
  restOverWebSocket: true,
});
await rc.installExtension(webSocketExtension);

const extInfo = await rc.restapi().account().extension().get();
console.log(extInfo.id);
```


## WebSocketOptions

`WebSocketExtension` constructor requires `WebSocketOptions` as parameter:


```ts
type WebSocketOptions = {
  restOverWebSocket?: boolean;
  debugMode?: boolean;
};
```


### restOverWebSocket

`restOverWebSocket` indicates whether to make Rest API call over WebSocket protocol.

Default value is false.

Please note that, not all Rest API calls can be done over WebSocket protocol. The following are not supported at the moment:

- Binary downloading
- `form-data/multipart` POST / PUT
- Authorization, such as get token and revoke token

If `restOverWebSocket` is true and an Rest API call cannot be done over WebSocket, it will be done over HTTPS instead.


### debugMode

`debugMode` indicates whether to enable debug mode.

Default value is false.

If enabled, WebSocket incoming message and outgoing message will be printed using `console.debug`.


## Access WebSocket object

```ts
webSocketExtension.ws
```

gives you the WebSocket object.


## Session Recovery

In case of network outage and the WebSocket connection is lost, you can restore the session by:

```ts
await webSocketExtension.recover()
```

Command above will create a new WebSocket connection and make sure that subscriptions are recovered.
