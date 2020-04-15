import CallQueueBulkAssignResource from '../../../../../definitions/CallQueueBulkAssignResource'
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
   * Operation: Assign Multiple Call Queue Members
   * Http post /restapi/v1.0/account/{accountId}/call-queues/{groupId}/bulk-assign
   */
  async post(CallQueueBulkAssignResource callQueueBulkAssignResource): Promise<string> {
    return this.rc.post(this.path(), callQueueBulkAssignResource)
  }
}

export default Index