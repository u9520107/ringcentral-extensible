import BulkAccountCallRecordingsResource from '../../../../../definitions/BulkAccountCallRecordingsResource'
import Parent from '..'
import RestClient from '../../../../..'

class Index {
  rc: RestClient
  parent: Parent

  Index(parent: Parent) {
    this.parent = parent
    this.rc = parent.rc
  }

  string path() {
    return `${this.parent.path()}/bulk-assign`
  }

  /**
   * Operation: Update Call Recording Extension List
   * Http post /restapi/v1.0/account/{accountId}/call-recording/bulk-assign
   */
  async post(BulkAccountCallRecordingsResource bulkAccountCallRecordingsResource): Promise<string> {
    return this.rc.post(this.path(), bulkAccountCallRecordingsResource)
  }
}

export default Index
