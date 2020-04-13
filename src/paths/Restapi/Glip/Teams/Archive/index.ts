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
    return `${this.parent.path()}/archive`
  }

  /**
   * Operation: Archive Team
   * Http post /restapi/v1.0/glip/teams/{chatId}/archive
   */
  async post(): Promise<string> {
    return this.rc.post(this.path())
  }
}

export default Index
