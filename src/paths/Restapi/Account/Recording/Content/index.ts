import Parent from '..';
import RestClient from '../../../../..';

class Content {
  rc: RestClient;
  parent: Parent;

  constructor(parent: Parent) {
    this.parent = parent;
    this.rc = parent.rc;
  }

  path(): string {
    return `${this.parent.path()}/content`;
  }

  /**
   * Operation: Get Call Recordings Data
   * Rate Limit Group: Heavy
   * Http get /restapi/v1.0/account/{accountId}/recording/{recordingId}/content
   */
  async get(): Promise<Buffer> {
    const r = await this.rc.get<Buffer>(this.path(), undefined, {
      responseType: 'arraybuffer',
    });
    return r.data;
  }
}

export default Content;
