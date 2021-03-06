# Rate Limit Extension

Rate limit extension handles rate limit automatically by delaying and retrying API calls.

This extension is based on the [Retry Extension](../retry).


## Install dependencies

Please check the [Retry Extension](../retry) dependencies.


## Usage

```ts
import RingCentral from 'ringcentral-extensible';
import RateLimitExtension from 'ringcentral-extensible/build/src/extensions/rateLimit';

const rc = new RingCentral(...);
const rateLimitExtension = new RateLimitExtension(rateLimitOptions);
await rc.installExtension(rateLimitExtension);
```


## RateLimitOptions

`RetryExtension` constructor accepts optional `RateLimitOptions` as parameter:

```ts
type RateLimitOptions = {
  maxRetries?: number;
  rateLimitWindow?: number;
};
```

### maxRetries

`maxRetries` defines maximum times of retries before aborting.

Default value is 3.


### rateLimitWindow

`rateLimitWindow` defines the rate limit window. This parameter will only take effect when there is no `x-rate-limit-window` HTTP header available.

Default value is 60 (seconds).

Its value is used to determine the [retryInterval](https://github.com/ringcentral/ringcentral-extensible/tree/master/src/extensions/retry#retryinterval).
