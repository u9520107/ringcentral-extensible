import Supervise from './Supervise';
import Parties from './Parties';
import {
  CallSession,
  ReadCallSessionStatusParameters,
} from '../../../../../definitions';
import Parent from '..';
import RestClient from '../../../../..';

class Sessions {
  rc: RestClient;
  telephonySessionId: string | null;
  parent: Parent;

  constructor(parent: Parent, telephonySessionId: string | null = null) {
    this.parent = parent;
    this.rc = parent.rc;
    this.telephonySessionId = telephonySessionId;
  }

  path(withParameter = true): string {
    if (withParameter && this.telephonySessionId !== null) {
      return `${this.parent.path()}/sessions/${this.telephonySessionId}`;
    }

    return `${this.parent.path()}/sessions`;
  }

  /**
   * Operation: Get Call Session Status
   * Rate Limit Group: Light
   * Http get /restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}
   */
  async get(
    queryParams?: ReadCallSessionStatusParameters
  ): Promise<CallSession> {
    if (this.telephonySessionId === null) {
      throw new Error('telephonySessionId must be specified.');
    }

    const r = await this.rc.get<CallSession>(this.path(), queryParams);
    return r.data;
  }

  /**
   * Operation: Drop Call Session
   * Rate Limit Group: Light
   * Http delete /restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}
   */
  async delete(): Promise<string> {
    if (this.telephonySessionId === null) {
      throw new Error('telephonySessionId must be specified.');
    }

    const r = await this.rc.delete<string>(this.path());
    return r.data;
  }

  parties(partyId: string | null = null): Parties {
    return new Parties(this, partyId);
  }

  supervise(): Supervise {
    return new Supervise(this);
  }
}

export default Sessions;
