import RingCentral from '@rc-ex/core';
import {RestRequestConfig, RestResponse, RestMethod} from '@rc-ex/core/Rest';
import SdkExtension from '@rc-ex/core/SdkExtension';
import RestException from '@rc-ex/core/RestException';
import SDK from '@ringcentral/sdk';

class RcSdkExtension extends SdkExtension {
  sdk: SDK;

  constructor(sdk: SDK) {
    super();
    this.sdk = sdk;
  }

  async install(rc: RingCentral) {
    Object.defineProperty(rc, 'token', {
      get: async () => {
        return await this.sdk.platform().auth().data();
      },
    });
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
      const r = await this.sdk.send({
        method: method,
        url: endpoint,
        body: content,
        query: queryParams,
        headers: config?.headers,
      });
      const response: RestResponse = {
        data: await r.json(),
        status: r.status,
        statusText: r.statusText,
        headers: r.headers,
        config: {
          method: method,
          baseURL: r.url.split(endpoint)[0],
          url: endpoint,
          data: content,
          params: queryParams,
        },
      };
      if (r.ok) {
        return response;
      }
      throw new RestException(response);
    };
  }
}

export default RcSdkExtension;
