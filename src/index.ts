import {RestMethod, RestResponse} from './Rest';
import {GetTokenRequest, TokenInfo} from './definitions';
import Restapi from './paths/Restapi';
import Scim from './paths/Scim';
import Rest, {RestOptions, RestRequestConfig} from './Rest';
import SdkExtension from './extensions';

type PasswordFlowOptions = {
  username: string;
  extension?: string;
  password: string;
};
type AuthCodeFlowOptions = {
  code: string;
  redirect_uri: string;
};

export default class RingCentral {
  sdkExtensions: SdkExtension[] = [];
  rest: Rest;

  constructor(restOptions?: RestOptions) {
    this.rest = new Rest(restOptions ?? {});
  }

  async installExtension(sdkExtension: SdkExtension) {
    await sdkExtension.install(this);
    this.sdkExtensions.push(sdkExtension);
  }

  get token() {
    return this.rest.token;
  }
  set token(token) {
    this.rest.token = token;
  }

  async request<T>(
    method: RestMethod,
    endpoint: string,
    content?: {},
    queryParams?: {},
    config?: RestRequestConfig
  ): Promise<RestResponse<T>> {
    return this.rest.request<T>(method, endpoint, content, queryParams, config);
  }

  async get<T>(
    endpoint: string,
    queryParams?: {},
    config?: RestRequestConfig
  ): Promise<RestResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, queryParams, config);
  }
  async delete<T>(
    endpoint: string,
    queryParams?: {},
    config?: RestRequestConfig
  ): Promise<RestResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, queryParams, config);
  }
  async post<T>(
    endpoint: string,
    content?: {},
    queryParams?: {},
    config?: RestRequestConfig
  ): Promise<RestResponse<T>> {
    return this.request<T>('POST', endpoint, content, queryParams, config);
  }
  async put<T>(
    endpoint: string,
    content: {},
    queryParams?: {},
    config?: RestRequestConfig
  ): Promise<RestResponse<T>> {
    return this.request<T>('PUT', endpoint, content, queryParams, config);
  }
  async patch<T>(
    endpoint: string,
    content: {},
    queryParams?: {},
    config?: RestRequestConfig
  ): Promise<RestResponse<T>> {
    return this.request<T>('PATCH', endpoint, content, queryParams, config);
  }

  async getToken(getTokenRequest: GetTokenRequest): Promise<TokenInfo> {
    this.token = await this.restapi(null).oauth().token().post(getTokenRequest);
    return this.token;
  }

  async authorize(
    options: PasswordFlowOptions | AuthCodeFlowOptions
  ): Promise<TokenInfo> {
    const getTokenRequest = new GetTokenRequest();
    if ('username' in options) {
      getTokenRequest.grant_type = 'password';
      getTokenRequest.username = options.username;
      getTokenRequest.extension = options.extension ?? '';
      getTokenRequest.password = options.password;
    } else if ('code' in options) {
      getTokenRequest.grant_type = 'authorization_code';
      getTokenRequest.code = options.code;
      getTokenRequest.redirect_uri = options.redirect_uri;
    } else {
      throw new Error('Unsupported authorization flow');
    }
    return this.getToken(getTokenRequest);
  }

  /**
   * Each time you call token endpoint using this flow a new client session starts.
   * It is associated with the issued token pair: access token and refresh token, returned in response to this request.
   * To continue the session you can refresh the obtained access token and refresh token as many times as you need, using Refresh Token flow or the same flow.
   * To start another client session you should call token endpoint using this flow again.
   *
   * Please consider that only 5 simultaneously active sessions per extension per application are supported.
   * Thus if you exceed the number of sessions started per extension per application, the oldest one is ended.
   *
   * https://developers.ringcentral.com/api-reference/Get-Token
   *
   * @param options PasswordLoginFlowOpts
   */
  async login(options: PasswordFlowOptions): Promise<TokenInfo> {
    return this.authorize(options);
  }

  /**
   * Each time you call token endpoint using this flow, you continue current client session, and receive a new token pair: access token and refresh token in response to this request.
   * The old token pair immediately becomes inactive.
   *
   * https://developers.ringcentral.com/api-reference/Get-Token
   *
   * @param refreshToken Refresh Token
   */
  async refresh(refreshToken?: string): Promise<TokenInfo> {
    const tokenToRefresh = refreshToken ?? this.token?.refresh_token;
    if (!tokenToRefresh) {
      throw new Error('tokenToRefresh must be specified.');
    }
    const getTokenRequest = new GetTokenRequest();
    getTokenRequest.grant_type = 'refresh_token';
    getTokenRequest.refresh_token = tokenToRefresh;
    return this.getToken(getTokenRequest);
  }

  /**
   * Each time you call token endpoint using this flow, you continue current client session, and receive a new token pair: access token and refresh token in response to this request.
   * The old token pair immediately becomes inactive.
   *
   * https://developers.ringcentral.com/api-reference/Revoke-Token
   *
   * @param tokenToRevoke AccessToken
   */
  async revoke(tokenToRevoke?: string) {
    for (const sdkExtension of this.sdkExtensions) {
      await sdkExtension.revoke();
    }
    if (!tokenToRevoke && !this.token) {
      // nothing to revoke
      return;
    }
    if (!this.rest.clientId || !this.rest.clientSecret) {
      // no clientId or clientSecret, the token is from external source, cannot revoke
      return;
    }
    tokenToRevoke =
      tokenToRevoke ?? this.token?.access_token ?? this.token?.refresh_token;
    await this.restapi(null).oauth().revoke().post({token: tokenToRevoke});
    this.token = undefined;
  }

  /**
   * This method provides you with a start of chain methods `rc.restapi() ...`,
   * so that you can construct longer ones, like this `rc.restapi().account().extension().messageStore().list()`
   *
   * @param apiVersion API version, currently the only valid value is 'v1.0'
   */
  restapi(apiVersion: string | null = 'v1.0'): Restapi {
    return new Restapi(this, apiVersion);
  }

  /**
   * This method provides you with a start of chain methods `rc.scim() ...`,
   * so that you can construct longer ones, like this `rc.scim().users(userId).delete()`
   *
   * @param version SCIM API version, currently the only valid value is 'v2'
   */
  scim(version: string | null = 'v2'): Scim {
    return new Scim(this, version);
  }
}
