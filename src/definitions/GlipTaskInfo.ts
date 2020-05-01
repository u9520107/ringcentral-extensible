import {
  CreatorInfo,
  TaskAssigneeInfo,
  GlipTaskRecurrenceInfo,
  TaskAttachment,
} from '.';

class GlipTaskInfo {
  /**
   * Internal identifier of a task
   */
  id?: string;

  /**
   * Datetime of the task creation in UTC time zone.
   */
  creationTime?: string;

  /**
   * Datetime of the last modification of the task in UTC time zone.
   */
  lastModifiedTime?: string;

  /**
   * Type of a task
   */
  type?: 'Task';

  /**
   */
  creator?: CreatorInfo;

  /**
   * Chat IDs where the task is posted or shared.
   */
  chatIds?: string[];

  /**
   * Status of task execution
   */
  status?: 'Pending' | 'InProgress' | 'Completed';

  /**
   * Name/subject of a task
   */
  subject?: string;

  /**
   */
  assignees?: TaskAssigneeInfo[];

  /**
   * Specifies how to determine task completeness
   */
  completenessCondition?: 'Simple' | 'AllAssignees' | 'Percentage';

  /**
   * Current completeness percentage of the task with the specified percentage completeness condition
   * Maximum: 100
   */
  completenessPercentage?: number;

  /**
   * Task start date
   */
  startDate?: string;

  /**
   * Task due date/time
   */
  dueDate?: string;

  /**
   * Font color of a post with the current task
   */
  color?:
    | 'Black'
    | 'Red'
    | 'Orange'
    | 'Yellow'
    | 'Green'
    | 'Blue'
    | 'Purple'
    | 'Magenta';

  /**
   * Task section to group/search by
   */
  section?: string;

  /**
   * Task details
   */
  description?: string;

  /**
   */
  recurrence?: GlipTaskRecurrenceInfo;

  /**
   */
  attachments?: TaskAttachment[];
}

export default GlipTaskInfo;
