import GlipCompleteTask from '../../../../../definitions/GlipCompleteTask'
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
    return `${this.parent.path()}/complete`
  }

  /**
   * Operation: Complete Task
   * Http post /restapi/v1.0/glip/tasks/{taskId}/complete
   */
  async post(GlipCompleteTask glipCompleteTask): Promise<string> {
    return this.rc.post(this.path(), glipCompleteTask)
  }
}

export default Index