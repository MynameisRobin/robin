interface ApplyInfo extends AkBase {
    ApplicationID?: string;
    /** 流程实例ID */
    CurrentProcInstID?: string;
    HistoryProcInstIDs?: string;
    ApplicantUserID?: string;
    Status?: string;
    FlowNo?: string;
    DefKey?: string;
    FlowName?: string;
    CategoryID?: string;
    CategoryName?: string;
    CreatedByName?: string;
    Version?: string;
    Comment?: string;
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;

    // /** TenantID */ TenantID?: string; /** ApplyID */ ApplyID?: string; /**
    // 流程实例ID */ ProcInstID?: string; /** 流程定义ID */ ProcDefID?: string; /** 流程名称 */
    // ProcDefName?: string; /** 类别ID */ CategoryID?: string; /** 类别名称 */
    // CategoryName?: string; /** 执行ID */ ExecutionID?: string; /** 任务对应的ActivityID
    // */ ActivityID?: string; /** Name */ Name?: string; /** ParentApplyID */
    // ParentApplyID?: string; /** Description */ Description?: string; /** OwnerID
    // */ OwnerID?: string; /** 任务的分配对象 */ AssigneeID?: string; /** 分配人名字 */
    // AssigneeName?: string; /** 任务的代理人 */ DelegateID?: string; /** 代理人名字 */
    // DelegateName?: string; /** 优先级 */ Priority?: number; /** on update
    // CURRENT_TIMESTAMP(3) */ StartTimeStr?: string; /** ClaimTime */
    // ClaimTimeStr?: string; /** EndTime */ EndTimeStr?: string; /** Duration */
    // Duration?: string; /** DueDate */ DueDateStr?: string; /** DeleteReason */
    // DeleteReason?: string; /** Outcome */ Outcome?: string; /** Comment */
    // Comment?: string; /** ApplyURL */ ApplyURL?: string; /** 是否存储表单数据 */
    // IsSaveFormData?: boolean; /** FormDataID */ FormDataID?: string; /** Ext */
    // Ext?: string; /** Created */ CreatedStr?: string; /** on update
    // CURRENT_TIMESTAMP(3) */ ModifiedStr?: string; /** CreatedBy */ CreatedBy?:
    // string; /** ModifiedBy */ ModifiedBy?: string; /**Status */ Status?: string;
}

//注意：只有reject的才可以重新发起
const enum ApplyType {
    /**运行中 */
    Activity = 1,
    /**已完成 */
    Complete = 2,
    /**拒绝 */
    Reject = 3
}

interface GetApplyResponse extends AkResponse {
    Data?: ApplyInfo[]
}
interface GetApplyRequest extends AkRequest {
    /**流程定义Key */
    defKey?: string;
    categoryID?: string;
    flowNo?: string;
    flowName?: string;
    status?: string;
    applicantUserID?: string;
    pageIndex?: number;
    pageSize?: number;
}

interface PostApplyResponse extends AkResponse {}
interface PostApplyRequest extends AkRequest {}

interface PutApplyResponse extends AkResponse {}
interface PutApplyRequest extends AkRequest {}

interface DeleteApplyResponse extends AkResponse {}
interface DeleteApplyRequest extends AkRequest {}

interface GetAdminApplyResponse extends AkResponse {
    Data : ApplyInfo[]
}
interface GetAdminApplyRequest extends AkRequest {
    status?: ApplyType;
    assginee?: string;
    createdBy?: string;
    ApplyID?: string;
    startDate?: string;
    endDate?: string;
    pageIndex?: number;
    pageSize?: number;
}

interface GetAdminApplyItemRequest extends AkRequest {
    /** 任务ID */
    ApplyID : string;
}
interface GetAdminApplyItemResponse extends AkResponse {
    /** 任务详情 */
    Data : ApplyInfo[]
}

/** 日常报销申请*/
interface DailyReimburseApply {
    /**申请人ID */
    applyID?: string;
    /**项目名称 */
    projectName?: string;
    /**总金额 */
    totalAmount?: string;
    /**附件 */
    enclosure?: string;
    /**报销明细 */
    reimburse?: DailyReimburseItem;
}

interface DailyReimburseItem {
    /**日期 */
    day?: string;
    /**报销类型 */
    reimburseType?: string;
    /**金额（RMB） */
    amount?: string;
    /**单据张数 */
    billCount?: string;
    /**摘要 */
    abstract?: string;
}


/**申请取消 */
interface CancleApplicationRequest extends AkRequest {
    ApplicationID?: string;
}
interface CancleApplicationResponse extends AkResponse {}

/**申请撤回 */
interface RevokeApplicationRequest extends AkRequest {
    ApplicationID?: string;
}
interface RevokeApplicationResponse extends AkResponse {}


