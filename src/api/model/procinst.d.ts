/**
 * 流程实例
 */
interface ProcInstInfo extends AkBase {
    AppModel?: AppModel;
    ProcessLogList?: ProcInstDetailData[];
}

interface AppModel extends AkBase {
    ApplicationID?: string;
    /**当前流程ID */
    CurrentProcInstID?: string;
    /**历史实例Id */
    HistoryProcInstIDs?: string;
    /**代申请人 */
    ApplicantUserID?: string;
    /**流程状态 */
    Status?: number;
    /**流程编号 */
    FlowNo?: string;
    /**流程Key */
    DefKey?: string;
    /**流程名称 */
    FlowName?: string;
    /**流程ID */
    CategoryID?: string;
    /**流程分类 */
    CategoryName?: string;
    /**发起人 */
    CreatedByName?: string;
    /**流程版本 */
    Version?: string;
    /**备注 */
    Comment?: string;
    /**租户ID */
    TenantID?: string;
    /**开始时间 */
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string
}

interface ProcInstDetailData {
    /**流程定义内容JSON/XML的ResourceID */
    DefResourceID?: string;
    /**流程定义图片ResourceID，缓存展示使用 */
    ImgResourceID?: string;
    ProcInstModel?: ProcInstModel;
    TaskList?: TaskInfo[];
}

interface ProcInstModel {
    /**定义ID */
    ProcInstID?: string;
    Name?: string;
    /**父级流程实例ID */
    ParentInstID?: string;
    /**流程定义ID */
    ProcDefID?: string;
    /**流程最新版本号 */
    Version?: string;
    /**分类ID */
    CategoryID?: string;
    /**分类名称 */
    CategoryName?: string;
    /**流程启动时间 */
    StartTimeStr?: string;
    /**流程结束时间 */
    EndTimeStr?: string;
    /**流程运行毫秒数 */
    DURATION?: string;
    /**启动流程用户 */
    StartUserID?: string;
    /**流程开始ActivityID */
    StartActID?: string;
    /**流程结束ActivityID */
    EndActID?: string;
    /**0:未启动，1:运行中，2:结束，3:已删除，4:出错 */
    Status?: string;
    /**备注，如删除原因等 */
    Comment?: string;
    /**租户ID */
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
}

interface ProcInstTableItem {
    /**任务ID */
    TaskID?: string;
    /** 代理人*/
    DelegateName?: string;
    /** 完成时间*/
    EndTimeStr?: string;
    /**创建时间 */
    CreatedStr?: string;
    /**到期时间 */
    DueDateStr?: string;
    /**经办人 */
    ProcDefName?: string;
    /**备注 */
    Comment?: string;
    /** 结果*/
    Outcome?: string;
    /**任务名称 */
    Name?: string;
}

const enum ProcInstEnum {
    /** 活动 */
    Nomal = 1,
    /** 已结束 */
    Complete = 2,
    /** 修复*/
    Repair = 4
}

interface GetActiveProcInstResponse extends AkResponse {
    Data?: AppModel[]
}
interface GetActiveProcInstRequest extends AkRequest {
    pageIndex?: number;
    pageSize?: number;
    defKey?: string;
    flowName?: string;
    applicantUserID?: string;
    categoryID?: string;
    status?: string;
    flowNo?: string;
}

interface GetProcInstResponse extends AkResponse {}
interface GetProcInstRequest extends AkRequest {
    pageIndex?: number;
    pageSize?: number;
    defKey?: string;
    flowName?: string;
    applicantUserID?: string;
    categoryID?: string;
    status?: string;
    flowNo?: string;
}

interface PostProcInstResponse extends AkResponse {}
interface PostProcInstRequest extends AkRequest {}

interface PutProcInstResponse extends AkResponse {}
interface PutProcInstRequest extends AkRequest {}

interface DeleteProcInstResponse extends AkResponse {}
interface DeleteProcInstRequest extends AkRequest {}

/***获取流程实例详情 */
interface GetProcInstItemByIDResponse extends AkResponse {
    Data?: ProcInstInfo
}
interface GetProcInstItemByIDRequest extends AkRequest {
    /** applicationID 和 procInstID 必须填一个*/
    applicationID?: string;
    procInstID?: string;
}
interface GetApplicantRequest extends AkRequest {
    userID?: string;
}
interface GetApplicantResponse extends AkResponse {
    Data?: TaskDetailInfo
}

/**开启一个流程实例 By Key*/
interface PostStartProcInstByKeyResponse extends AkResponse {}
interface PostStartProcInstByKeyRequest extends AkRequest {
    key?: string;
    variables?: {};
    applicationID?: string;
    applicantUserID?: string;
}

/**开启一个流程实例  By ID*/
interface PostStartProcInstByIdResponse extends AkResponse {}
interface PostStartProcInstByIdRequest extends AkRequest {
    procdefID?: string;
    variables?: {};
    applicationID?: string;
    applicantUserID?: string;
    /**流程草稿ID 如果有的话 */
    procDraftID?: string;
}
