import BulkAssign from './BulkAssign';
import Webhooks from './Webhooks';
import Events from './Events';
import Posts from './Posts';
import {
  GlipGroupList,
  ListGlipGroupsParameters,
  GlipGroupInfo,
  GlipCreateGroup,
} from '../../../../definitions';
import Parent from '..';
import RestClient from '../../../..';

class Groups {
  rc: RestClient;
  groupId: string | null;
  parent: Parent;

  constructor(parent: Parent, groupId: string | null = null) {
    this.parent = parent;
    this.rc = parent.rc;
    this.groupId = groupId;
  }

  path(withParameter = true): string {
    if (withParameter && this.groupId !== null) {
      return `${this.parent.path()}/groups/${this.groupId}`;
    }

    return `${this.parent.path()}/groups`;
  }

  /**
   * Operation: Get User Groups
   * Rate Limit Group: Medium
   * Http get /restapi/v1.0/glip/groups
   */
  async list(queryParams?: ListGlipGroupsParameters): Promise<GlipGroupList> {
    const r = await this.rc.get<GlipGroupList>(this.path(false), queryParams);
    return r.data;
  }

  /**
   * Operation: Create Group
   * Rate Limit Group: Medium
   * Http post /restapi/v1.0/glip/groups
   */
  async post(glipCreateGroup: GlipCreateGroup): Promise<GlipGroupInfo> {
    const r = await this.rc.post<GlipGroupInfo>(
      this.path(false),
      glipCreateGroup
    );
    return r.data;
  }

  /**
   * Operation: Get Group
   * Rate Limit Group: Light
   * Http get /restapi/v1.0/glip/groups/{groupId}
   */
  async get(): Promise<GlipGroupInfo> {
    if (this.groupId === null) {
      throw new Error('groupId must be specified.');
    }

    const r = await this.rc.get<GlipGroupInfo>(this.path());
    return r.data;
  }

  posts(postId: string | null = null): Posts {
    return new Posts(this, postId);
  }

  events(): Events {
    return new Events(this);
  }

  webhooks(): Webhooks {
    return new Webhooks(this);
  }

  bulkAssign(): BulkAssign {
    return new BulkAssign(this);
  }
}

export default Groups;
