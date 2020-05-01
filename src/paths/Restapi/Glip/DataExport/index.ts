import Datasets from './Datasets';
import {
  DataExportTask,
  CreateDataExportTaskRequest,
  DataExportTaskList,
  ListDataExportTasksParameters,
} from '../../../../definitions';
import Parent from '..';
import RestClient from '../../../..';

class DataExport {
  rc: RestClient;
  taskId: string | null;
  parent: Parent;

  constructor(parent: Parent, taskId: string | null = null) {
    this.parent = parent;
    this.rc = parent.rc;
    this.taskId = taskId;
  }

  path(withParameter = true): string {
    if (withParameter && this.taskId !== null) {
      return `${this.parent.path()}/data-export/${this.taskId}`;
    }

    return `${this.parent.path()}/data-export`;
  }

  /**
   * Operation: Create Data Export Task
   * Rate Limit Group: Heavy
   * Http post /restapi/v1.0/glip/data-export
   */
  async post(
    createDataExportTaskRequest: CreateDataExportTaskRequest
  ): Promise<DataExportTask> {
    const r = await this.rc.post(this.path(false), createDataExportTaskRequest);
    return r.data;
  }

  /**
   * Operation: Get Data Export Task List
   * Rate Limit Group: Medium
   * Http get /restapi/v1.0/glip/data-export
   */
  async list(
    queryParams?: ListDataExportTasksParameters
  ): Promise<DataExportTaskList> {
    const r = await this.rc.get(this.path(false), queryParams);
    return r.data;
  }

  /**
   * Operation: Get Data Export Task
   * Rate Limit Group: Medium
   * Http get /restapi/v1.0/glip/data-export/{taskId}
   */
  async get(): Promise<DataExportTask> {
    if (this.taskId === null) {
      throw new Error('taskId must be specified.');
    }

    const r = await this.rc.get(this.path());
    return r.data;
  }

  datasets(datasetId: string | null = null): Datasets {
    return new Datasets(this, datasetId);
  }
}

export default DataExport;
