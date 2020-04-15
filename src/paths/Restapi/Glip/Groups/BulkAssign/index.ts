import EditGroupRequest from '../../../../../definitions/EditGroupRequest'
import GlipGroupInfo from '../../../../../definitions/GlipGroupInfo'
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
   * Operation: Edit Group Members
   * Http post /restapi/v1.0/glip/groups/{groupId}/bulk-assign
   */
  async post(EditGroupRequest editGroupRequest): Promise<GlipGroupInfo> {
    return this.rc.post(this.path(), editGroupRequest)
  }
}

export default Index