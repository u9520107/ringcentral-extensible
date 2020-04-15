import ListMeetingRecordingsResponse from '../../../../../definitions/ListMeetingRecordingsResponse'
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
    return `${this.parent.path()}/meeting-recordings`
  }

  /**
   * Operation: Get User Meeting Recordings List
   * Http get /restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting-recordings
   */
  async get(ListUserMeetingRecordingsParameters queryParams = null): Promise<ListMeetingRecordingsResponse> {
    return this.rc.get(this.path(), queryParams)
  }
}

export default Index