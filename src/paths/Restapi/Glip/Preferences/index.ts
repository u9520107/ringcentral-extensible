import GlipPreferencesInfo from '../../../../definitions/GlipPreferencesInfo'
import Parent from '..'
import RestClient from '../../../..'

class Index {
  rc: RestClient
  parent: Parent

  Index(parent: Parent) {
    this.parent = parent
    this.rc = parent.rc
  }

  string path() {
    return `${this.parent.path()}/preferences`
  }

  /**
   * Operation: Get Preferences
   * Http get /restapi/v1.0/glip/preferences
   */
  async get(): Promise<GlipPreferencesInfo> {
    return this.rc.get(this.path())
  }
}

export default Index
