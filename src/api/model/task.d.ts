interface TaskInfo extends AkBase {
    /** TenantID */
    TenantID?: string;
    /** TaskID */
    TaskID?: string;
    /** 流程实例ID */
    ProcInstID?: string;
    /** 流程定义ID */
    ProcDefID?: string;
    /** 流程名称 */
    ProcDefName?: string;
    /** 类别ID */
    CategoryID?: string;
    /** 类别名称 */
    CategoryName?: string;
    /** 执行ID */
    ExecutionID?: string;
    /** 任务对应的ActivityID */
    ActivityID?: string;
    /** Name */
    Name?: string;
    /** ParentTaskID */
    ParentTaskID?: string;
    /** Description */
    Description?: string;
    /** OwnerID */
    OwnerID?: string;
    /** 任务的分配对象 */
    AssigneeID?: string;
    /** 分配人名字 */
    AssigneeName?: string;
    /** 任务的代理人 */
    DelegateID?: string;
    /** 代理人名字 */
    DelegateName?: string;
    /** 优先级 */
    Priority?: number;
    /** on update CURRENT_TIMESTAMP(3) */
    StartTimeStr?: string;
    /** ClaimTime */
    ClaimTimeStr?: string;
    /** EndTime */
    EndTimeStr?: string;
    /** Duration */
    Duration?: string;
    /** DueDate */
    DueDateStr?: string;
    /** DeleteReason */
    DeleteReason?: string;
    /** Outcome */
    Outcome?: string;
    /** Comment */
    Comment?: string;
    /** TaskURL */
    TaskURL?: string;
    /** 是否存储表单数据 */
    IsSaveFormData?: boolean;
    /** FormDataID */
    FormDataID?: string;
    /** Ext */
    Ext?: string;
    /** Created */
    CreatedStr?: string;
    /** on update CURRENT_TIMESTAMP(3) */
    ModifiedStr?: string;
    /** CreatedBy */
    CreatedBy?: string;
    /** ModifiedBy */
    ModifiedBy?: string;

    /**Status */
    Status?: string;
}

/**任务状态 */
const enum TaskType {
    /**处理中 */
    Activity = 1,
    /**已完成 */
    Complete = 2,
    /**拒绝 */
    Reject = 3
}

interface GetTaskResponse extends AkResponse {
    Data?: TaskInfo[]
}
interface GetTaskRequest extends AkRequest {
    type?: number;
    /**流程编号 */
    flowNo?: string;
    /**流程名称 */
    flowName?: string;
    /**申请人 */
    applicantID?: string;
    startTimeStr?:string;
    endTimeStr?:string;
    pageIndex?: number;
    pageSize?: number;
}

interface PostTaskResponse extends AkResponse {}
interface PostTaskRequest extends AkRequest {}

interface PutTaskResponse extends AkResponse {}
interface PutTaskRequest extends AkRequest {}

interface DeleteTaskResponse extends AkResponse {}
interface DeleteTaskRequest extends AkRequest {}

interface GetAdminTaskResponse extends AkResponse {
    Data : TaskInfo[]
}
interface GetAdminTaskRequest extends AkRequest {
    type?: TaskStatus;
    status?: TaskType;
    flowNo?: string;
    flowName?: string;
    startTimeStr?: string;
    endTimeStr?: string;
    /**受让人，代理人 */
    assigneeID?: string;
    /**申请人ID */
    applicantID?: string;
    pageIndex?: number;
    pageSize?: number;
}
enum TaskStatus{
    Pending=1,
    Complete=2,
    OverTime=3
}

interface GetAdminTaskItemRequest extends AkRequest {
    /** 任务ID */
    TaskID : string;
}
interface GetAdminTaskItemResponse extends AkResponse {
    /** 任务详情 */
    Data : TaskInfo
}

/**获取待办任务数量 */
interface GetWaittingTaskCountRequest extends AkRequest {}
interface GetWaittingTaskCountResponse extends AkResponse {}


/**获取待审批内容 */
interface GetApproveInfoRequest extends AkRequest {
    taskID?: string;
    /**流程定义ID */
    procInstID?: string;
}
interface GetApproveInfoResponse extends AkResponse {
    // Data?: TaskApproval
    Data?:TaskDetailInfo
}

/**任务审批 */
interface TaskDetailInfo {
    /**流程编号 */
    FlowNo?: string;
    /**状态。0:发起，1:运行中，2已结束,3:Reject 注意：只有reject的才可以重新发起 */
    AppStatus?: number;
    /**创建人ID */
    CreatedBy?: string;
    /**创建人名称 */
    CreatedByName?: string;
    /**CreateDateStr */
    ApplyDateStr?: string;
    /**申请人ID */
    ApplicantID?: string;
    /**申请人名称 */
    ApplicantName?: string;
    /**员工编号 */
    EmployeeNo?: string;
    /**职位 */
    JobTitle?: string;
    /**位置编码 */
    LocationID?: string;
    /**位置名称 */
    LocationName?: string;
    /**汇报经理ID */
    LineManagerID?: string;
    /**汇报经理名称 */
    LineManagerName?: string;
    /**部门ID */
    OrgID?: string;
    /**部门名称 */
    OrgName?: string;
    /**变量对象 */
    Variables?: any;
    /**流程日志列表 */
    ProcessLogList?: ProcessLog[];
}
/**申请人信息 */
interface ProcessLog {
    DefResourceID?:string;
    ImgResourceID?:string;
    ProcInstModel?: ProcInstInfo;
    TaskList?: TaskInfo[];
}
interface ProcInstInfo {
    /**流程实例ID */
    ProcInstID?: string;
    Name?: string;
    /**父级流程实例ID */
    ParentInstID?: string;
    /**流程定义ID */
    ProcDefID?: string;
    /**版本号 */
    Version?: string;
    /**分类ID */
    CategoryID?: string;
    /**分类名称 */
    CategoryName?: string;
    /** 流程启动时间*/
    StartTimeStr?: string;
    /**流程结束时间 */
    EndTimeStr?: string;
    /**流程运行毫秒数 */
    DURATION?: string;
    /**发起人ID */
    StartUserID?: string;
    /**流程开始ActivityID */
    StartActID?: string;
    /**流程结束ActivityID */
    EndActID?: string;
    /**0:未启动，1:运行中，2:结束，3:已删除，4:出错	 */
    Status?: string;
    /** 备注，如删除原因等*/
    Comment?: string;
    /**租户ID */
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
}


/**处理任务 同意、拒绝*/
interface PutTaskHandleRequest extends AkRequest {
    /**任务ID */
    TaskID?: string;
    /**审批结果 同意 拒绝 */
    Outcome?: "Approved"|"Rejected";
    /**评论意见 */
    Comment?: string;
    /**描述 */
    Description?: string;
    /**变量 */
    Variables?: Object;
}
interface PutTaskHandleResponse extends AkResponse {}

/**任务转办 */
interface PutChangeTaskAssigneeRequest extends AkRequest {
    /**新处理人 */
    AssigneeID?: string;
    // /**转签人 */
    // OldAssigneeID?: string;
    /**任务ID */
    TaskID?: string;
}
interface PutChangeTaskAssigneeResponse extends AkResponse {}


 /****管理员操作 督办及转办********** */
/**任务督办 */
interface AdminPutWarnTaskRequest extends AkRequest {
    /**任务ID */
    TaskID?: string;
}
interface AdminPutWarnTaskResponse extends AkResponse {}

/**批量任务转办 */
interface AdminPutChangeTaskAssigneeListRequest extends AkRequest {
    /**新处理人 */
    AssigneeID?: string;
    // /**转签人 */
    // OldAssigneeID?: string;
    /**任务ID */
    TaskIDs?: string[];
}
interface AdminPutChangeTaskAssigneeListResponse extends AkResponse {}

/**单个任务转办 */
interface AdminPutChangeTaskAssigneeRequest extends AkRequest {
    /**新处理人 */
    AssigneeID?: string;
    // /**转签人 */
    // OldAssigneeID?: string;
    /**任务ID */
    TaskID?: string;
}
interface AdminPutChangeTaskAssigneeResponse extends AkResponse {}

/**批量任务督办 */
interface AdminPutWarnTaskListRequest extends AkRequest {
    /**任务ID */
    TaskIDs?: string[];
}
interface AdminPutWarnTaskListResponse extends AkResponse {}

 /****管理员操作 督办及转办********** */


/**申请人信息 */
interface ProposerInfo {
    /**部门 */
    Department?: string;
    /**职位 */
    Job?: string;
    /** 员工编号*/
    ProposerID?: string;
    /** 申请人*/
    ProposerName?: string;
    /** 汇报经理*/
    ReportManager?: string;
    /**提交日期 */
    SubmitDay?: string;
    /** 提交人*/
    Submitter?: string;
    /** 工作城市*/
    WorkCity?: string;
}

/**出差申请 获取申请人信息*/
interface GetProposerInfoRequest extends AkRequest {
    /**申请人ID */
    userId?: string
}
interface GetProposerInfoResponse extends AkRequest {
    //Data?: ProposerInfo
    Data?:null
}

/**出差申请 出差申请单 获取项目名称 */
interface ProjectModel {
    GroupData?: ProjectModel[];
    GroupID?: string;
    GroupName?: string;
}
/**项目模块 */
interface ProjectModule {
    ID?: string;
    Name?: string;
}
interface GetProjectListRequest extends AkRequest {}
interface GetProjectListResponse extends AkRequest {
    Data?: ProjectModel[]
}

/**出差申请 出差申请单 商务类型 */
interface BusinessType {
    BusinessID?: string;
    BusinessName?: string;
}
interface GetBusinessTypeListRequest extends AkRequest {}
interface GetBusinessTypeListResponse extends AkRequest {
    Data?: BusinessType[]
}

/**出差申请 提交 Or 保存 */
interface PostBusinessApplicationRequest extends AkRequest {
    /**操作类型 提交 Or 保存 */
    ControlType?: string;
    /**申请人ID */
    ProposerID?: string;
    /**项目ID */
    ProjectID?: string;
    /**商务类型 */
    BusinessType?: string;
    /**出差天数 */
    BusinessDays?: string;
    /**出差开始日期 */
    StartTime?: string;
    /**出差结束日期 */
    EndTime?: string;
    /**出差理由 */
    Reason?: string;
}
interface PostBusinessApplicationResponse extends AkResponse {}

/**领用任务*/
interface GetReceiveTaskRequest extends AkRequest {
    /**流程编号 */
    flowNo?: string;
    /**流程名称 */
    flowName?: string;
    /**申请人 */
    applicantUserID?: string;
    pageIndex?: string;
    pageSize?: string;
}
interface GetReceiveTaskResponse extends AkResponse {
    Data?: TaskInfo[];
}
