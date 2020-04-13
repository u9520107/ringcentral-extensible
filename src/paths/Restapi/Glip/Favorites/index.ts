import GlipChatsListWithoutNavigation from '../../../../definitions/GlipChatsListWithoutNavigation'
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
    return `${this.parent.path()}/favorites`
  }

  /**
   * Operation: Get Favorite Chats
   * Http get /restapi/v1.0/glip/favorites
   */
  async get(ListFavoriteChatsParameters queryParams = null): Promise<GlipChatsListWithoutNavigation> {
    return this.rc.get(this.path(), queryParams)
  }
}

export default Index
