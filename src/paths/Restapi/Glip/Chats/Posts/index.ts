import {
  GlipPostsList,
  ReadGlipPostsParameters,
  GlipPostInfo,
  GlipPostPostBody,
  GlipPatchPostBody,
} from '../../../../../definitions';
import Parent from '..';
import RestClient from '../../../../..';

class Posts {
  rc: RestClient;
  postId: string | null;
  parent: Parent;

  constructor(parent: Parent, postId: string | null = null) {
    this.parent = parent;
    this.rc = parent.rc;
    this.postId = postId;
  }

  path(withParameter = true): string {
    if (withParameter && this.postId !== null) {
      return `${this.parent.path()}/posts/${this.postId}`;
    }

    return `${this.parent.path()}/posts`;
  }

  /**
   * Operation: Get Posts
   * Rate Limit Group: Medium
   * Http get /restapi/v1.0/glip/chats/{chatId}/posts
   */
  async list(queryParams?: ReadGlipPostsParameters): Promise<GlipPostsList> {
    const r = await this.rc.get<GlipPostsList>(this.path(false), queryParams);
    return r.data;
  }

  /**
   * Operation: Create Post
   * Rate Limit Group: Medium
   * Http post /restapi/v1.0/glip/chats/{chatId}/posts
   */
  async post(glipPostPostBody: GlipPostPostBody): Promise<GlipPostInfo> {
    const r = await this.rc.post<GlipPostInfo>(
      this.path(false),
      glipPostPostBody
    );
    return r.data;
  }

  /**
   * Operation: Get Post
   * Rate Limit Group: Light
   * Http get /restapi/v1.0/glip/chats/{chatId}/posts/{postId}
   */
  async get(): Promise<GlipPostInfo> {
    if (this.postId === null) {
      throw new Error('postId must be specified.');
    }

    const r = await this.rc.get<GlipPostInfo>(this.path());
    return r.data;
  }

  /**
   * Operation: Update Post
   * Rate Limit Group: Medium
   * Http patch /restapi/v1.0/glip/chats/{chatId}/posts/{postId}
   */
  async patch(glipPatchPostBody: GlipPatchPostBody): Promise<GlipPostInfo> {
    if (this.postId === null) {
      throw new Error('postId must be specified.');
    }

    const r = await this.rc.patch<GlipPostInfo>(this.path(), glipPatchPostBody);
    return r.data;
  }

  /**
   * Operation: Delete Post
   * Rate Limit Group: Medium
   * Http delete /restapi/v1.0/glip/chats/{chatId}/posts/{postId}
   */
  async delete(): Promise<string> {
    if (this.postId === null) {
      throw new Error('postId must be specified.');
    }

    const r = await this.rc.delete<string>(this.path());
    return r.data;
  }
}

export default Posts;
