import {Request} from '../util/request';
/** 任务 */
export class TaskAPI {
    /** 获取任务列表(我的) */
    static async getTask(data : GetTaskRequest) {
        let url : string = "/api/tasks";
        return await new Request < GetTaskRequest,
        GetTaskResponse > ().get(url, data);
    }
    /** 管理任务 */
    static async getAdminTask(data : GetAdminTaskRequest) {
        let url : string = "/api/admin/tasks";
        return await new Request < GetAdminTaskRequest,
        GetAdminTaskResponse > ().get(url, data);
    }
    /** 任务详情 */
    static async getTaskItem(data : GetAdminTaskItemRequest) {
        let url : string = "/api/admin/tasks/id";
        return await new Request < GetAdminTaskItemRequest,
        GetAdminTaskItemResponse > ().get(url, data);
    }
    /** 处理任务 */
    static async putTask(data : PutTaskRequest) {
        let url : string = "/api/admin/tasks/handle";
        return await new Request < PutTaskRequest,
        PutTaskResponse > ().put(url, data)
    }
    static async postTask(data : PostTaskRequest) {
        let url : string = "";
        return await new Request < PostTaskRequest,
        PostTaskResponse > ().post(url, data);
    }
    static async delTask(data : DeleteTaskRequest) {
        let url : string = "";
        return await new Request < DeleteTaskRequest,
        DeleteTaskResponse > ().del(url, data);
    }

    /**获取待办任务数量 */
    static async getWaittingTaskCount(data : GetWaittingTaskCountRequest) {
        let url : string = "/api/tasks/pending/count";
        return await new Request < GetWaittingTaskCountRequest,
        GetWaittingTaskCountResponse > ().get(url, data);
    }

    /**获取任务审批详情 */
    static async getTaskDetail(data : GetApproveInfoRequest) {
        let url : string = "/api/tasks/detail";
        return await new Request < GetApproveInfoRequest,
        GetApproveInfoResponse > ().get(url, data);
    }

    /**审批结果 */
    static async putTaskHandle(data : PutTaskHandleRequest) {
        let url : string = "/api/tasks/handle";
        return await new Request < PutTaskHandleRequest,
        PutTaskHandleResponse > ().put(url, data);
    }

    /**任务转签 */
    static async putChangeTaskAssignee(data : PutChangeTaskAssigneeRequest) {
        let url : string = "/api/tasks/handle";
        return await new Request < PutChangeTaskAssigneeRequest,
        PutChangeTaskAssigneeResponse > ().put(url, data);
    }


    /****管理员操作 督办及转办********** */

     /**任务督办 */
    static async adminPutWarnTask(data : AdminPutWarnTaskRequest) {
        let url : string = "/api/admin/tasks/warn";
        return await new Request < AdminPutWarnTaskRequest,
        AdminPutWarnTaskResponse > ().put(url, data);
    }
   /**单个任务转签 */
    static async adminPutChangeTaskAssignee(data : AdminPutChangeTaskAssigneeRequest) {
        let url : string = "/api/admin/tasks/change";
        return await new Request < AdminPutChangeTaskAssigneeRequest,
        AdminPutChangeTaskAssigneeResponse > ().put(url, data);
    }

      /**批量任务转签 */
    static async adminPutChangeTaskAssigneeList(data : AdminPutChangeTaskAssigneeListRequest) {
        let url : string = "/api/admin/tasks/change/batch";
        return await new Request < AdminPutChangeTaskAssigneeListRequest,
        AdminPutChangeTaskAssigneeListResponse > ().put(url, data);
    }
     /**批量任务督办 */
    static async adminPutWarnTaskList(data : AdminPutWarnTaskListRequest) {
        let url : string = "/api/admin/tasks/warn/batch";
        return await new Request < AdminPutWarnTaskListRequest,
        AdminPutWarnTaskListResponse > ().put(url, data);
    }
    /******管理员操作 督办及转办 Over */



    /**出差申请-获取申请人信息 */
    static async getProposerInfo(data : GetProposerInfoRequest) {
        let url : string = "/api/userinfo/item";
        return await new Request < GetProposerInfoRequest,
        GetProposerInfoResponse > ().get(url, data);
    }
    /**出差申请-获取项目名称 */
    static async getProjectList(data : GetProjectListRequest) {
        let url : string = "/api/project/list";
        return await new Request < GetProjectListRequest,
        GetProjectListResponse > ().get(url, data);
    }
    /**出差申请-获取商务类型 */
    static async getBusinessTypeList(data : GetBusinessTypeListRequest) {
        let url : string = "/api/business/list";
        return await new Request < GetBusinessTypeListRequest,
        GetBusinessTypeListResponse > ().get(url, data);
    }
    /**出差申请-提交 Or 保存 */
    static async postBusinessApplication(data : PostBusinessApplicationRequest) {
        let url : string = "/api/business/application/contorl";
        return await new Request < PostBusinessApplicationRequest,
        PostBusinessApplicationResponse > ().get(url, data);
    }

    /**获取领用任务列表 */
    static async getReceiveTaskList(data : GetReceiveTaskRequest) {
        let url : string = "/api/tasks/candidate";
        return await new Request < GetReceiveTaskRequest,
        GetReceiveTaskResponse > ().get(url, data);
    }
}
export const TaskOutcomeLocale = "model.task.outcome.";

export enum TaskOutcomeEnum {
    /**完成 */
    Completed = 0,
    /**同意 */
    Approved = 1,
    /**拒绝 */
    Rejected = 2,
    /**撤销 */
    Revoked = 3,
    /**取消 */
    Canceled = 4
}
