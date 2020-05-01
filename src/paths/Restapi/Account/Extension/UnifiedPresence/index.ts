import {UpdateUnifiedPresence} from '../../../../../definitions';
import Parent from '..';
import RestClient from '../../../../..';

class UnifiedPresence {
  rc: RestClient;
  parent: Parent;

  constructor(parent: Parent) {
    this.parent = parent;
    this.rc = parent.rc;
  }

  path(): string {
    return `${this.parent.path()}/unified-presence`;
  }

  /**
   * Operation: Get Unified Presence
   * Rate Limit Group: Medium
   * Http get /restapi/v1.0/account/{accountId}/extension/{extensionId}/unified-presence
   */
  async get(): Promise<UnifiedPresence> {
    const r = await this.rc.get(this.path());
    return r.data;
  }

  /**
   * Operation: Update Unified Presence
   * Rate Limit Group: Medium
   * Http patch /restapi/v1.0/account/{accountId}/extension/{extensionId}/unified-presence
   */
  async patch(
    updateUnifiedPresence: UpdateUnifiedPresence
  ): Promise<UnifiedPresence> {
    const r = await this.rc.patch(this.path(), updateUnifiedPresence);
    return r.data;
  }
}

export default UnifiedPresence;
