import {RestRequestConfig} from '../../../../../../Rest';
import {PublicMeetingInvitationResponse} from '../../../../../../definitions';
import Parent from '..';
import RingCentral from '../../../../../..';

class Index {
  rc: RingCentral;
  parent: Parent;

  constructor(parent: Parent) {
    this.parent = parent;
    this.rc = parent.rc;
  }

  path(): string {
    return `${this.parent.path()}/invitation`;
  }

  /**
   * Operation: Get Meeting Invitation
   * Rate Limit Group: Light
   * Http get /restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}/invitation
   */
  async get(
    config?: RestRequestConfig
  ): Promise<PublicMeetingInvitationResponse> {
    const r = await this.rc.get<PublicMeetingInvitationResponse>(
      this.path(),
      undefined,
      config
    );
    return r.data;
  }
}

export default Index;
