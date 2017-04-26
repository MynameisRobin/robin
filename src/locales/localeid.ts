export class CommonLocale {
    static All : string = "common.All";
    static Clear = "common.clear";
    static Close = "common.close";

    static Save = "common.save";
    static Cancel = "common.cancel";
    static Edit = "common.edit";
    static Delete = "common.delete";
    static New : string = "common.New";

    static Id = "common.id";
    static Name = "common.name";

    static FormValidatePleaseInput = "common.form.pleaseinput";
    static FormValidateDuplicated = "common.form.duplicated";
    static FormValidateDefaultValue = "common.form.defaultvalue";
    static Metadata = "common.metadata";
}

export class IdentityLocale {
    static User : string = "identity.user";
    static Organization : string = "identity.organization";
    static Location : string = "identity.location";
    static Group : string = "identity.group";
    static Position : string = "identity.position";
    static PositionPlaceholder = "identity.position.placeholder";
    static OrganizationPlaceholder = "identity.org.placeholder";
    static LocationPlaceholder = "identity.loc.placeholder";
    static GroupPlaceholder = "identity.group.placeholder";
}

/** 导航菜单 */
export class NavLocale {

    /**
     * Header标题
     */
    static HeaderTitle : string = "header.title";
    /**
     * 超时任务
     */
    static FlowOverTimeTask : string = "nav.flow.overtimetask";
    /**
     * 活动任务
     */
    static FlowActivityTask : string = "nav.flow.task.activity";
    /**
     * 活动实例
     */
    static FlowProcInstActivity : string = "nav.flow.procinst.activity";
    /**
     * 已部署流程
     */
    static FlowProcDefAcvitity : string = "nav.flow.procdef.activity";
    /**
     * 流程定义库
     */
    static FLowProcModel : string = "nav.flow.procmodel";
    /**
     * 流程定义分类
     */
    static FlowProcDefCategory : string = "nav.flow.procdefcategory";
    /**
     * 流程管理
     */
    static FlowSetting : string = "nav.flow.root";
    /**
     * 角色管理
     */
    static PositionSetting : string = "nav.positions.root";
    /**
     * 项目管理
     */
    static ProjectSetting : string = "nav.project.root";
    /**
     * 参数管理
     */
    static ParamSetting : string = "nav.param.root";

    /**流程中心 */
    static ProcessCenter : string = "nav.process.center";
    /**新建申请 */
    static NewProcess : string = "nav.new.process";
    /**待办任务 */
    static WaitingTask : string = "nav.waitting.task";
    /**已办任务 */
    static FinishTask : string = "nav.finish.task";
    /**我的申请 */
    static Application : string = "nav.application";
    /**领用任务 */
    static ReceiveTask : string = "nav.receive.task";
    /**流程规则管理 */
    static FlowRules : string = "nav.flow.rules";
}
/** 表单 */
export class FormLocale {
    /**搜索 */
    static InputSearch : string = "form.input.search";

    static PickerAdd : string = "form.picker.add";
}
/** 流程实例 */
export class ProcessInstPageLocale {
    /**列名 标识 */
    static ColumnKey : string = "page.process.activity.instkey";
    /**列名 流程ID */
    static ColumnInstID : string = "page.process.activity.instid";
    /**
     * 列名 流程名称
     */
    static ColumnInstName : string = "page.process.activity.instname";
    /**
     * 列名 流程分类
     */
    static ColumnInstCategory : string = "page.process.activity.instcategory";
    /**
     * 列名 流程版本
     */
    static ColumnInstVersion : string = "page.process.activity.instversion";
    /**
     * 列名 流程发起时间
     */
    static ColumnInstCreated : string = "page.process.activity.instcreated";
    /**
     * 列名 流程发起人
     */
    static ColumnInstCreatedBy : string = "page.process.activity.instcreatedby";
    /** 列名 流程状态 */
    static ColumnInstStatus : string = "page.process.activity.inststatus";
    /**流程编号 */
    static SearchFlowNo : string = "page.process.activity.search.flowno";
    /**发起人 */
    static SearchCreatedBy : string = "page.process.activity.search.createdby";
}
/** 超时任务 */
export class OverTimeTaskPageLocale {
    /**
     * 列名 任务名称
     */
    static ColumnTaskName : string = "page.task.overtime.taskname";
    /**
     * 列名 经办人
     */
    static ColumnTaskAssignee : string = "page.task.overtime.assignee";
    /**
     * 列名 流程名称
     */
    static ColumnTaskProc : string = "page.task.overtime.procname";
    /**
     * 列名 流程分类
     */
    static ColumnProcCategory : string = "page.task.overtime.proccategory";
    /**
     * 列名 流程版本
     */
    static ColumnProcVersion : string = "page.task.overtime.procversion";
    /**
     * 列名 创建时间
     */
    static ColumnCreated : string = "page.task.overtime.created";
    /**
     * 列名 到期日
     */
    static ColumnDueDate : string = "page.task.overtime.duedate";
}
/** 流程定义库页面 */
export class ProcModelPageLocale {
    /**  流程名称 */
    static ColumnName : string = "page.process.model.name";
    /** 流程标识 */
    static ColumnKey : string = "page.process.model.key";
    /** 流程分类 */
    static ColumnCategory : string = "page.process.model.category";
    /** 最近更新时间 */
    static ColumnModified : string = "page.process.model.modified";
    /** 更新人 */
    static ColumnModifiedBy : string = "page.process.model.modifiedby";
    /**操作 */
    static ColumnOperation : string = "page.process.model.column.operation";
    /**版本 */
    static ColumnVersion : string = "page.process.model.column.version";
    /**流程编号 */
    static ColumnProcessID : string = "page.process.model.column.process.id";
    /**新建 */
    static SearchNew = "page.process.model.search.new";
    /**流程分类 */
    static SearchCategoryHolder = "page.process.model.search.categoryholder";
    /**请输入流程名称 */
    static SearchNameHolder = "page.process.model.search.nameholder";
    /**请输入流程标识 */
    static SearchKeyHolder = "page.process.model.search.keyholder";
    /**请输入流程唯一标识 */
    static SearchUniqueKeyHolder = "page.process.model.search.unique.keyholder";
    /**发布 */
    static OperationSend = "page.process.model.operation.send";
    /**编辑 */
    static OperationEdit = "page.process.model.operation.edit";
    /**复制 */
    static OperationCopy = "page.process.model.operation.copy";
    /**权限 */
    static OperationRight = "page.process.model.operation.right";
    /**流程设计器 */
    static OperationDesigner = "page.process.model.operation.designer";
    /**新建流程定义 */
    static OperationCreateProcModel = "page.process.model.operation.create";

    static ModalNewTitle = "page.process.model.modal.newtitle";
    static ModalLableIcon = "page.process.model.modal.lableicon";
    static ModalLableName = "page.process.model.modal.lablename";
    /**流程标识 */
    static ModalLableKey = "page.process.model.modal.lablekey";
    /**标识说明 */
    static ModelLableKeyDes = "page.process.model.modal.lablekeydesc";
    static ModalLableCategory = "page.process.model.modal.lablecategory";
    static ModalLableRight = "page.process.model.modal.lableright";
    static ModalDeployTitle = "page.process.model.modal.deploytitle";
    static ModalCopyTitle = "page.process.model.modal.copytitle";
    static ModalRightTitle = "page.process.model.modal.righttitle";
    /** "上传20x20大小的jpg,png格式图片" */
    static PropsPlaceholderImgDescribe = "page.process.model.modal.palceholder.imgdescribe";
    /**"请输入名称" */
    static PropsPlaceholderName = "page.process.model.modal.palceholder.name";
    /** "请输入唯一的流程标识" */
    static PropsPlaceholderKey = "page.process.model.modal.palceholder.key";
    /**请选择分类，不选则默认未分类 */
    static PropsPlaceholderCategory = "page.process.model.modal.palceholder.category";
    /**请选择人员、部门、或组；默认允许所有人提交该类申请 */
    static PropsPlaceholderRight = "page.process.model.modal.palceholder.right";
    /**流程描述 */
    static ModalLableDescribe = "page.process.model.modal.labledescribe";
}
/** 流程分类页面 */
export class ProcCategoryPageLocale {
    /** 分类名称 */
    static ColumnName : string = "page.process.category.name";
    /** 操作 */
    static ColumnOperation : string = "page.process.category.operation"
    /**修改 */
    static ColumnEdit = "page.process.category.edit";
    /**删除 */
    static ColumnRemove = "page.process.category.remove";
    /**新建分类 */
    static SearchNew = "page.process.category.search.new";
    /**保存 */
    static ButtonSave = "page.process.category.save";
    /**取消 */
    static ButtonCancel = "page.process.category.cancel";
    /**确定 */
    static ButtonOk = "page.process.category.ok";
    /**提示 */
    static ModalTip = "page.process.category.modal.tip";
    /**是否确定删除分类名称 */
    static ModalIsDelCategoryName = "page.process.category.modal.isdelcategoryname";
    /**标题 */
    static ModalTitle = "page.process.category.modal.title";
    /**描述 */
    static ModalDescription = "page.process.category.modal.description";
    /**所有者 */
    static ModalOwner = "page.process.category.modal.owner";
    /**描述 */
    static ColumnDescription = "page.process.category.column.description";
    /**修改 */
    static OperationEdit = "page.process.category.operation.edit";
    /**删除 */
    static OperationDelete = "page.process.category.operation.delete";
    /**新建分类 */
    static OperationNew = "page.process.category.operation.new";
    /**新建流程分类 */
    static ModalNewTitle = "page.process.category.modal.newtitle";
}
/** 已部署流程 */
export class ProcDefPageLocale {
    /** 流程名称 */
    static ColumnName : string = "page.process.def.column.name";
    /**流程标识 */
    static ColumnKey : string = "page.process.def.column.key";
    /** 流程分类 */
    static ColumnCategory : string = "page.process.def.column.category";
    /**最新版本 */
    static ColumnVersion : string = "page.process.def.column.version";
    /**流程发布时间 */
    static ColumnPubTime : string = "page.process.def.column.pubtime";
    /**流程发布人 */
    static ColumnPubBy : string = "page.process.def.column.pubby";
    /** 状态 */
    static ColumnStatus : string = "page.process.def.column.status";
    /** 设置 */
    static ColumnSet : string = "page.process.def.column.set";
    /** 浏览分类 */
    static SearchCategoryHolder : string = "page.process.def.search.categoryholder";
    /** 流程状态 */
    static SearchStatusHolder : string = "page.process.def.search.statusholder";
    /** 流程名称 */
    static SearchNameHolder : string = "page.process.def.search.nameholder";
    /**流程标识 */
    static SearchKeyHolder : string = "page.process.def.search.keyholder";

    /***名称 */
    static PropsProcessName : string = "page.process.def.process.name";
    /**图标 */
    static PropsProcessIcon : string = "page.process.def.process.icon";
    /**流程分类 */
    static PropsProcessCategory : string = "page.process.def.process.category";
    /**流程标识 */
    static PropsProcessKey : string = "page.process.def.process.key";
    /**权限 */
    static PropsModeAuthority : string = "page.process.def.process.authority";
    /**编辑 */
    static PropsBtnEidt : string = "page.process.def.process.btn.edit";
    /**保存 */
    static PropsBtnSave : string = "page.process.def.process.btn.save";
    /**取消 */
    static PropsBtnCancle : string = "page.process.def.process.btn.cancel";
}
/** 流程定义详细页 */
export class ProcModelItemPageLocale {
    /**流程定义 */
    static PropsProcModel : string = "page.proc.modelitem.procmodel";
    /**详情 */
    static PropsDetail : string = "page.proc.modelitem.detail";
    /** 流程标识 */
    static PropsKey : string = "page.proc.modelitem.key";
    /**流程名称 */
    static PropsName : string = "page.proc.modelitem.name";
    /** 流程分类 */
    static PropsCategory : string = "page.proc.modelitem.category";
    /**最近更新 */
    static PropsModified : string = "page.proc.modelitem.modified";
    /**更新人 */
    static PropsModifiedBy : string = "page.proc.modelitem.modifiedby";
    /** 流程变量 */
    static PropsVariable : string = "page.proc.modelitem.variable";
    /**流程页面 */
    static PropsPage : string = "page.proc.modelitem.page";
    /**查看 */
    static PropsSee : string = "page.proc.modelitem.see";
    /**关闭 */
    static PropsCloseModal : string = "page.proc.modelitem.close.modal";
    /**页面名称 */
    static PropsPageName : string = "page.proc.modelitem.page.name";
    /**页面申请 */
    static PropsPageApply : string = "page.proc.modelitem.page.apply";
    /**审批页面 */
    static PropsPageApproval : string = "page.proc.modelitem.page.approval";
}
/**活动任务 */
export class ActivityTaskPageLocale {
    /**任务编号 */
    static ColumnTaskID = "page.task.activity.column.taskid";
    /**任务名称 */
    static ColumnTaskName = "page.task.activity.column.taskname";
    /**经办人 */
    static ColumnAssigneeName = "page.task.activity.column.assigneename";
    /**所属流程 */
    static ColumnProcName = "page.task.activity.column.procname";
    /**创建时间 */
    static ColumnCreated = "page.task.activity.column.created";
    /**发起人 */
    static ColumnCreatedBy = "page.task.activity.column.createdby";
    /**到期日 */
    static ColumnDueDate = "page.task.activity.column.duedate";
    /**操作 */
    static ColumnOperation = "page.task.activity.column.operation";
    /**批量操作 */
    static BatchOperation = "page.task.activity.batch.operation";
    /**高级搜索 */
    static SearchAdvance = "page.task.activity.search.advance";

    /**输入流程编号 */
    static SearchTaskIDHolder = "page.task.activity.search.taskidholder";
    /**经办人 */
    static SearchAssignee = "page.task.activity.search.assignee";
    /**请输入经办人 */
    static SearchAssigneeHolder = "page.task.activity.search.assgneeholder";
    /**发起人 */
    static SearchCreatedBy = "page.task.activity.search.createdby";
    /**请输入发起人 */
    static SearchCreatedByHolder = "page.task.activity.search.createdbyholder";
    /**创建时间 */
    static SearchCreated = "page.task.activity.search.created";
    /**开始日期 */
    static SearchStartDateHolder = "page.task.activity.search.startdateholder";
    /**结束日期 */
    static SearchEndDateHolder = "page.task.activity.search.enddateholder";
    /**督办 */
    static OperationRemind = "page.task.activity.operation.remind";
    /**转办 */
    static OperationForward = "page.task.activity.operation.forward";
    /**关闭 */
    static OperationClose = "page.task.activity.operation.close";
    /**选择转办人 */
    static PropsChangeAssignee = "page.task.activity.props.charge.assignee";
}

/** 已部署流程详细页 */
export class ProcDefItemPageLocale {
    /** 已部署流程 */
    static HeaderTitle : string = "page.proc.defitem.activity";
    /** 流程名称 */
    static PropsName : string = "page.proc.defitem.name";
    /** 流程标识 */
    static PropsKey : string = "page.proc.defitem.key";
    /** 流程权限 */
    static PropsAuthority : string = "page.proc.defitem.authority";
    /** 流程分类 */
    static PropsCategory : string = "page.proc.defitem.category";
    /** 编辑 */
    static PropsEdit : string = "page.proc.defitem.btn.edit";
    /**流程版本 */
    static PropsVersion : string = "page.proc.defitem.version";
    /**状态 */
    static PropsStatus : string = "page.proc.defitem.status";

    /**选择版本 */
    static PropsChoseVersion : string = "page.proc.defitem.choseversion";
    /**发布时间 */
    static PropsPublishTime : string = "page.proc.defitem.publish.time";
    /**发布人 */
    static PropsPublisher : string = "page.proc.defitem.publisher";
    /**编辑流程分类 */
    static PropsEditCategory : string = "page.proc.defitem.edit.category";
}

/** 流程实例详情 */
export class ProcessInstItemPageLocale {
    /**流程实例 标题*/
    static HeaderTitle : string = "page.procinst.activity.item.title";
    /**流程实例详情*/
    static HeaderTitleDetail : string = "page.procinst.activity.item.title.detail";
    /**流程编号 */
    static PropsID : string = "page.procinst.activity.item.id";
    /**撤回 */
    static HeaderRecall : string = "page.procinst.item.task.recall";
    /**取消 */
    static HeaderCancel : string = "page.procinst.item.task.cancel";
    /**确定撤回申请 */
    static ModalIsRecallApply : string = "page.procinst.item.task.modal.isrecallapply";
    /**确定取消申请 */
    static ModalIsCancelApply : string = "page.procinst.item.task.modal.iscancelapply";
    /**
     * 流程名称
     */
    static PropsName : string = "page.procinst.activity.item.name";
    /**
     * 流程分类
     */
    static PropsCategory : string = "page.procinst.activity.item.category";
    /**
     * 流程实例状态
     */
    static PropsStatus : string = "page.procinst.activity.item.status";
    /**
     *  流程版本
     */
    static PropsVersion : string = "page.procinst.activity.item.version";
    /**
     * 流程发起时间
     */
    static PropsCreated : string = "page.procinst.activity.item.created";
    /**
     * 流程发起人
     */
    static PropsCreatedBy : string = "page.procinst.activity.item.createdby";
    /**流程提交时间 */
    static PropsModifyTime : string = "page.procinst.activity.item.modifytime";
    /**任务状态 */
    static PropsTaskStatus : string = "page.procinst.item.task.status";
    /**流程图 */
    static PropsTaskImage : string = "page.procinst.item.task.image";
    /**任务名称 */
    static ColumnTaskName : string = "page.procinst.item.task.column.name";
    /**经办人 */
    static ColumnTaskOperator : string = "page.procinst.item.task.column.operator";
    /**代理人 */
    static ColumnTaskAgent : string = "page.procinst.item.task.column.agent";
    /**创建时间 */
    static ColumnTaskCreateTime : string = "page.procinst.item.task.column.createtime";
    /**完成时间 */
    static ColumnTaskDoneTime : string = "page.procinst.item.task.column.donetime";
    /**到期时间 */
    static ColumnTaskEndTime : string = "page.procinst.item.task.column.endtime";
    /**操作 */
    static ColumnTaskOperate : string = "page.procinst.item.task.column.operate";
    /**结果 */
    static ColumnTaskResult : string = "page.procinst.item.task.column.result";
    /**备注 */
    static ColumnTaskRemark : string = "page.procinst.item.task.column.remark";
    /**查看 */
    static ColumnTaskView : string = "page.procinst.item.task.column.view";
    /**流程变量 */
    static PropsVariable : string = "page.procinst.item.variable.title";
    /**变量名称 */
    static ColumnVariableName : string = "page.procinst.item.variable.column.name";
    /**变量类型 */
    static ColumnVariableCategory : string = "page.procinst.item.variable.column.category";
    /**变量值 */
    static ColumnVariableValue : string = "page.procinst.item.variable.column.value";
    /**流程日志 */
    static PropsLog : string = "page.procinst.item.log";
    /**发送通知 */
    static InfoSend : string = "page.procinst.item.infosend";
    /**选择转办人 */
    static PropsChangeAssignee = "page.procinst.item.charge.assignee";
}

/** 新建申请 */
export class NewProcessPageLocale {
    /** 全部流程 */
    static HeaderTitle : string = "page.newprocess.header.title";
    /** 选择流程分类 */
    static ChoseCategory : string = "page.newprocess.chose.category";
    /** 输入流程名称 */
    static InputProcessName : string = "page.newprocess.intput.name";
}

/** 待办任务 */
export class WaitingTaskPageLocale {
    /**头部标题 */
    static HeaderTitle : string = "page.waiting.task.header.title";
    /**输入流程编号 */
    static SearchInputID = "page.waiting.task.search.input.placeholder.id";
    /**输入流程名称 */
    static SearchInputName = "page.waiting.task.search.input.placeholder.name";
    /**输入申请人 */
    static SearchInputCreatedBy = "page.waiting.task.search.input.placeholder.createdby";

    /**流程编号 */
    static ColumnProcessID = "page.waiting.task.column.process.id";
    /**任务名称 */
    static ColumnProcessName = "page.waiting.task.column.process.name";
    /**流程类型 */
    static ColumnProcessCategory = "page.waiting.task.column.process.category";
    /**申请人 */
    static ColumnProcessCreateBy = "page.waiting.task.column.process.createdby";
    /**申请时间 */
    static ColumnProcessCreateted = "page.waiting.task.column.process.created";
    /**申请时间 */
    static ColumnProcessDuedate = "page.waiting.task.column.process.duedate";
    /**任务结果 */
    static ColumnProcessStatus = "page.waiting.task.column.process.status";
}

/**任务审批-请假申请 */
export class TaskApprovalPageLocale {
    /**请假申请 */
    static LeftHeaderTitle = "page.task.approval.leave.application";
    /**流程编号 */
    static RightHeaderProcessID = "page.task.approval.process.id";
    /**关闭 */
    static RightHeaderBtnClose = "page.task.approval.button.close";
    /**申请人信息 */
    static PropsProposerInfo = "page.task.approval.proposer.info";
    /**提交人 */
    static PropsSubmitter = "page.task.approval.submitter";
    /**提交日期 */
    static PropsSubmitDay = "page.task.approval.submit.day";
    /**申请人 */
    static PropsProposerName = "page.task.approval.proposer.name";
    /**员工编号 */
    static PropsProposerID = "page.task.approval.proposer.id";
    /**职位 */
    static PropsProposerPosition = "page.task.approval.proposer.positions";
    /**工作城市 */
    static PropsWorkCity = "page.task.approval.work.city";
    /**汇报经理 */
    static PropsReportManager = "page.task.approval.report.manager";
    /**部门 */
    static PropsDepartment = "page.task.approval.department";
    /**假期申请 */
    static PropsHolidayApplication = "page.task.approval.holiday.application";
    /**项目名称 */
    static PropsProjectName = "page.task.approval.project.name";
    /**假期类型 */
    static PropsHolidayType = "page.task.approval.holiday.type";
    /**开始时间 */
    static PropsStartTime = "page.task.approval.start.time";
    /**结束时间 */
    static PropsEndTime = "page.task.approval.end.time";
    /**休假时长 */
    static PropsVacationTime = "page.task.approval.vacation.time";
    /**休假原因 */
    static PropsVacationReason = "page.task.approval.vacation.reason";
    /** 附件*/
    static PropsEnclosure = "page.task.approval.enclosure";
    /**空 */
    static PropsEmptyContent = "page.task.approval.empty.content";
    /**审批意见 */
    static PropsApprovalOption = "page.task.approval.approval.option";
    /**拒绝请填写审批意见 */
    static PropsPlaceHolderRefusalReason = "page.task.approval.placeholder.refusal.reason";
    /**同意 */
    static BtnAgreeTxt = "page.task.approval.button.agree.txt";
    /**拒绝 */
    static BtnRefuseTxt = "page.task.approval.button.refuse.txt";
    /**转签 */
    static btnSign = "page.task.approval.sign";
    /**输入人员名称或点击选择按钮 */
    static PropsSignTip = "page.task.approval.sign.tip";
    /**转签 提交转签btn */
    static BtnSignSubmit = "page.task.approval.sign.submit";
    /**转签 取消转签btn */
    static BtnSignCancel = "page.task.approval.sign.cancle";
    /**流程日志 */
    static PropsProcessLog = "page.task.approval.process.log";
    /**提交时间 */
    static PropsUpdateTime = "page.task.approval.submit.time";
    /**状态 */
    static PropsStatus = "page.task.approval.status";
    /**流程图 */
    static PropsProcessChart = "page.task.approval.process.chart";
    /**领用 btn */
    static BtnReceiveTask = "page.receive.task.receive.btn";
}

/** 已办任务 */
export class FinishTaskPageLocale {
    /**头部标题 */
    static HeaderTitle : string = "page.finish.task.header.title";
    /**输入流程编号 */
    static SearchInputProcessID = "page.finish.task.search.input.processid";
    /**输入流程名称 */
    static SearchInputProcessName = "page.finish.task.search.input.processname";
    /**输入申请人 */
    static SearchInputCreateBy = "page.finish.task.search.input.createby";
    /**流程编号 */
    static ColumnProcessID = "page.finish.task.column.process.id";
    /**任务名称 */
    static ColumnTaskName = "page.finish.task.column.task.name";
    /**流程名称 */
    static ColumnProcessName = "page.finish.task.column.process.name";
    /**流程类型 */
    static ColumnProcessCategory = "page.finish.task.column.process.category";
    /**申请人 */
    static ColumnProcessCreateBy = "page.finish.task.column.process.createdby";
    /**申请时间 */
    static ColumnProcessCreated = "page.finish.task.column.process.created";
    /**任务结果 */
    static ColumnTaskOutcome = "page.finish.task.column.task.outcome";
    /**流程状态 */
    static ColumnProcessStatus = "page.finish.task.column.process.status";
    /**流程状态运行中 */
    static ColumnProcessStatusActivity = "page.finish.task.column.process.status.activity";
    /**流程状态已完成 */
    static ColumnProcessStatusComplete = "page.finish.task.column.process.status.complete";
    /**流程状态拒绝 */
    static ColumnProcessStatusReject = "page.finish.task.column.process.status.reject";
}

/** 我的申请 */
export class ApplicationPageLocale {
    /**头部标题 */
    static HeaderTitle : string = "page.apply.header.title";
    /**选择状态 */
    static SearchSelectStatus : string = "page.apply.select.status";
    /**输入流程编号 */
    static SearchInputProcessID = "page.apply.search.input.processid";
    /**输入流程名称 */
    static SearchInputProcessName = "page.apply.search.input.processname";
    /**输入申请人*/
    static SearchInputCreateBy = "page.apply.search.input.createby";
    /**流程编号 */
    static ColumnProcessID = "page.apply.column.process.id";
    /**任务名称 */
    static ColumnTaskName = "page.apply.column.task.name";
    /**流程名称 */
    static ColumnProcessName = "page.apply.column.process.name";
    /**流程类型 */
    static ColumnProcessCategory = "page.apply.column.process.category";
    /**申请人 */
    static ColumnProcessCreateBy = "page.apply.column.process.createdby";
    /**申请时间 */
    static ColumnProcessCreated = "page.apply.column.process.created";
    /**任务结果 */
    static ColumnTaskOutcome = "page.apply.column.task.outcome";
    /**流程状态 */
    static ColumnProcessStatus = "page.apply.column.process.status";
    /**流程状态运行中 */
    static ColumnProcessStatusActivity = "page.apply.column.process.status.activity";
    /**流程状态已完成 */
    static ColumnProcessStatusComplete = "page.apply.column.process.status.complete";
    /**流程状态拒绝 */
    static ColumnProcessStatusReject = "page.apply.column.process.status.reject";
    /**状态拒绝提示 */
    static StatusTip = "page.apply.column.process.status.tip";
    /**撤回 */
    static StatusRecall = "page.apply.column.process.status.recall";
    /**取消 */
    static StatusCancel = "page.apply.column.process.status.cancel";
    /**模态框标题 */
    static ModalTitle = "page.apply.column.modal.title";
    /**模态框内容 */
    static ModalContent = "page.apply.column.modal.content";
    /**模态框确认按钮文字 */
    static ModalOkText = "page.apply.column.modal.oktext";
    /**模态框取消按钮文字 */
    static ModalCancelText = "page.apply.column.modal.canceltext";

}

/**流程设计器 */
export class FlowcraftDesignerLocale {
    static Variable = "flowcraft.variable";
    /**流程页面 */
    static FlowPage = "flowcraft.flowpage";
    static BasicVariable = "flowcraft.basicvariable";
    static NewVariable = "flowcraft.newvariable";
    static Operation = "flowcraft.operation";
    static Save = "common.save";
    static Cancel = "common.cancel";
    static Edit = "common.edit";
    static Delete = "common.delete";

    static VariableListDuplicated = "flowcraft.variable.list.duplicated";
    static VariableList = "flowcraft.variable.list";
    static VariableListDef = "flowcraft.variable.listdef";
    static VariableId = "flowcraft.variable.id";
    static VariableName = "flowcraft.variable.name";
    static VariableType = "flowcraft.variable.type";
    static VariableDefaultRef = "flowcraft.variable.defaultref";
    static VariableListRefId = "common.id";
    static VariableListRefName = "common.name";
    static VariableListAdd = "flowcraft.variable.list.add";
    static VariableListEdit = "flowcraft.variable.list.edit";
    static VariableListEmpty = "flowcraft.variable.list.empty";
    static VariableListTooltip = "flowcraft.variable.list.tooltip";
    static VariableMetadataTooltip = "flowcraft.variable.metadata.tooltip";
    static VariableListPlaceholder = "flowcraft.variable.list.placeholder";
    static VariableCategoryPlaceholder = "flowcraft.variable.category.placeholder";
    static VariableCategoryEmpty = "flowcraft.variable.category.empty";
    static VariableTypeString = "flowcraft.variable.type.string";
    static VariableTypeNumber = "flowcraft.variable.type.number";
    static VariableTypeBoolean = "flowcraft.variable.type.boolean";
    static VariableTypeDate = "flowcraft.variable.type.date";
    static VariableTypeMetadata = "flowcraft.variable.type.metadata";
    static VariableTypeList = "flowcraft.variable.type.list";

    static ExprEditor = "flowcraft.expr.editor";

    static ExprCategoryVariable = "flowcraft.expr.cat.variable";
    static ExprCategoryTask = "flowcraft.expr.cat.task";
    static ExprCategoryContext = "flowcraft.expr.cat.context";
    static ExprCategoryCurrentTask = "flowcraft.expr.cat.task.current";
    static ExprCategoryFunction = "flowcraft.expr.cat.function";

    static ExprItemApplicationID = "flowcraft.expr.app.id";
    static ExprItemApplicationNo = "flowcraft.expr.app.no";
    static ExprItemApplicationURL = "flowcraft.expr.app.url";
    static ExprItemProcessName = "flowcraft.expr.process.name";
    static ExprItemApplicant = "flowcraft.expr.app.applicant";
    static ExprItemCreatedBy = "flowcraft.expr.app.createdby";
    static ExprItemCreated = "flowcraft.expr.app.created";
    static ExprItemSiteURL = "flowcraft.expr.context.siteurl";

    static ExprItemTaskID = "flowcraft.expr.task.id";
    static ExprItemTaskURL = "flowcraft.expr.task.url";
    static ExprItemTaskName = "flowcraft.expr.task.name";
    static ExprItemTaskAssignee = "flowcraft.expr.task.assignee";
    static ExprItemTaskDueDate = "flowcraft.expr.task.duedate";
    static ExprItemTaskOutcome = "flowcraft.expr.task.outcome";

    static ExprOperatorAnd = "flowcraft.expr.op.and";
    static ExprOperatorOr = "flowcraft.expr.op.or";

    static ExprOperatorGeneral = "flowcraft.expr.op.general";
    static ExprOperatorString = "flowcraft.expr.op.string";
    static ExprOperatorNumber = "flowcraft.expr.op.number";
    static ExprOperatorBoolean = "flowcraft.expr.op.boolean";
    static ExprOperatorDatetime = "flowcraft.expr.op.datetime";
    static ExprOperatorNotContains = "flowcraft.expr.op.nocontains";
    static ExprOperatorIsNull = "flowcraft.expr.op.isnull";
    static ExprOperatorIsNotNull = "flowcraft.expr.op.isnotnull";
    static ExprOperatorEqual = "flowcraft.expr.op.equal";
    static ExprOperatorNotEqual = "flowcraft.expr.op.noequal";
    static ExprOperatorContains = "flowcraft.expr.op.contains";
    static ExprOperatorBelongs = "flowcraft.expr.op.belongs";
    static ExprOperatorStartWith = "flowcraft.expr.op.startwith";
    static ExprOperatorEndWith = "flowcraft.expr.op.endwith";
    static ExprOperatorGreater = "flowcraft.expr.op.ge";
    static ExprOperatorLesser = "flowcraft.expr.op.le";
    static ExprOperatorGreaterEq = "flowcraft.expr.op.geq";
    static ExprOperatorLesserEq = "flowcraft.expr.op.leq";
    static ExprUserId = "flowcraft.expr.user.id";
    static ExprUserEmail = "flowcraft.expr.user.email";
    static ExprUserName = "flowcraft.expr.user.name";
    static ExprUserLogin = "flowcraft.expr.user.lgoin";
    static ExprUserManager = "flowcraft.expr.user.manager";
    static ExprUserOrganization = "flowcraft.expr.user.organization";
    static ExprUserLocation = "flowcraft.expr.user.location";

    static ConditionEditor = "flowcraft.con.editor";
    static ConditionExprRequired = "flowcraft.con.expr.required";
    static ConditionOpRequired = "flowcraft.con.op.required";
    static ConditionAdd = "flowcraft.con.add";

    static AssigneeEmpty = "flowcraft.assign.empty";
    static AssignEditor = "flowcraft.assign.editor";
    static AssignAdd = "flowcraft.assign.add";
    static AssignSelected = "flowcraft.assign.selected";
    static AssignDirect = "flowcraft.assign.method.direct";
    static AssignExpression = "flowcraft.assign.method.expression";
    static AssignPosition = "flowcraft.assign.method.positions";
    static AssignPositionLoc = "flowcraft.assign.method.roleloc";
    static AssignPositionLocExpr = "flowcraft.assign.method.rolelocexpr";
    static AssignPositionOrg = "flowcraft.assign.method.roleorg";
    static AssignPositionOrgExpr = "flowcraft.assign.method.roleorgexpr";
    /** 开始  */
    static MenuStartEvent = "flowcraft.menu.startevent";
    /** 指派任务  */
    static MenuWaitTask = "flowcraft.menu.waittask";
    /** 领用任务  */
    static MenuReceiveTask = "flowcraft.menu.receivetask";
    /** 邮件任务  */
    static MenuMailTask = "flowcraft.menu.mailtask";
    /** 设置变量  */
    static MenuSetVariable = "flowcraft.menu.setvariable";
    /** 包含分支  */
    static MenuInclusiveGateway = "flowcraft.menu.inclusivegateway";
    /** 结束  */
    static MenuStopNoneEvent = "flowcraft.menu.stopnoneevent";
    /** 结束(拒绝)  */
    static MenuStopRejectEvent = "flowcraft.menu.stoprejectevent";
    /** 属性设置 */
    static PropSettingTitle = "flowcraft.prop.title";
    /**
     * 名称
     */
    static PropLableName = "flowcraft.prop.lable.name";
    /**
     * 描述
     */
    static PropLableDesc = "flowcraft.prop.lable.desc";
    /**
     * 表达式
     */
    static PropLableExpr = "flowcraft.prop.lable.expr";
    /**
     * 页面
     */
    static PropLablePage = "flowcraft.prop.lable.page";
    static PropLableAssign = "flowcraft.prop.lable.assign";
    static PropLableDurdate = "flowcraft.prop.lable.durdate";
    static PropLableDurday = "flowcraft.prop.lable.durday";
    static PropLableMailSubject = "flowcraft.prop.lable.mailsubject";
    static PropLableMailTo = "flowcraft.prop.lable.mailto";
    static PropLableMailCC = "flowcraft.prop.lable.mailcc";
    static PropLableMailBody = "flowcraft.prop.lable.mailbody";
    static PropLableVariable = "flowcraft.prop.lable.variable";

    static StencilTaskWaitting = "flowcraft.stencil.task.waitting";
    static StencilTaskReceive = "flowcraft.stencil.task.receive";
    static StencilTaskMail = "flowcraft.stencil.task.mail";
    static StencilTaskVariable = "flowcraft.stencil.task.variable";
}

/**新建流程-出差申请 */
export class BusinessApplicationPageLocale {
    /**出差申请流程 */
    static PropsHeaderTitle = "page.task.business.application.Process";
    /**提交 */
    static BtnSubmit = "page.task.business.application.button.submit";
    /**保存 */
    static BtnSave = "page.task.business.application.button.save";
    /**取消 */
    static BtnCancel = "page.task.business.application.button.cancle";
    /**申请人信息 */
    static PropsProposerInfo = "page.task.business.application.proposer.info";
    /**提交人 */
    static PropsSubmitter = "page.task.business.application.submitter";
    /**提交日期 */
    static PropsSubmitDay = "page.task.business.application.submit.day";
    /**申请人 */
    static PropsProposerName = "page.task.business.application.proposer.name";
    /**员工编号 */
    static PropsProposerID = "page.task.business.application.proposer.id";
    /**职位 */
    static PropsProposerPosition = "page.task.business.application.proposer.positions";
    /**工作城市 */
    static PropsWorkCity = "page.task.business.application.work.city";
    /**汇报经理 */
    static PropsReportManager = "page.task.business.application.report.manager";
    /**部门 */
    static PropsDepartment = "page.task.business.application.department";
    /**出差申请单 */
    static PropsBusinessApplicationForm = "page.task.business.application.form";
    /**项目名称 */
    static PropsProjectName = "page.task.business.application.project.name";
    /**商务类型 */
    static PropsBusinessType = "page.task.business.application.business.type";
    /**差旅类别 */
    static PropsTravelCategory = "page.task.business.application.travel.category";
    /**出差天数 */
    static PropsTravelDays = "page.task.business.application.travel.days";
    /**天 */
    static PropsDays = "page.task.business.application.days";
    /**出差开始日期 */
    static PropsTravelStartTime = "page.task.business.application.travel.start.time";
    /**出差结束日期 */
    static PropsTravelEndTime = "page.task.business.application.travel.end.time";
    /**出差理由 */
    static PropsTravelReason = "page.task.business.application.travel.reason";
    /**出发日期 */
    static PropsStartOffTime = "page.task.business.application.start.off.time";
    /**出发城市 */
    static PropsStartOffCity = "page.task.business.application.start.off.city";
    /**到达城市 */
    static PropsArrivalCity = "page.task.business.application.arrival.city";
    /**航班/火车班次 */
    static PropsFlightOrTrainClasses = "page.task.business.application.filght.train.classes";
    /**是否有行政预定 */
    static PropsIsReserve = "page.task.business.application.isreserve";
    /**备注信息 */
    static PropsRemarkMsg = "page.task.business.application.remark.msg";
    /**添加出差明细 */
    static PropsAddTravelDetail = "page.task.business.application.add.travel.detail";
    /**国家 */
    static PropsCountry = "page.task.business.application.country";
    /**城市 */
    static PropsCity = "page.task.business.application.city";
    /**入住日期 */
    static PropsArrivalDate = "page.task.business.application.arrival.date";
    /**退房日期 */
    static PropsLeaveDate = "page.task.business.application.leave.date";
    /**房间费用 */
    static PropsRoomCharge = "page.task.business.application.room.charge";
    /**添加住宿明细 */
    static PropsAddStayDetail = "page.task.business.application.add.stay.detail";
    /**住宿费用 */
    static PropsStayCosts = "page.task.business.application.stay.costs";
    /**交通费用 */
    static PropsTrafficCosts = "page.task.business.application.traffic.costs";
    /**出差补贴 */
    static PropsTrafficSubsidy = "page.task.business.application.traffic.subsidy";
    /**通讯费用 */
    static PropsCommunicationCosts = "page.task.business.application.communication.costs";
    /**其他 */
    static PropsOther = "page.task.business.application.other";
    /**总预算 */
    static PropsGeneralBudget = "page.task.business.application.general.budget";
    /**附件 */
    static PropsEnclosure = "page.task.business.application.enclosure";
    /**添加附件 */
    static PropsAddEnclosure = "page.task.business.application.add.enclosure";

}

/**领用任务 */
export class ReciveTaskPageLocale {
    /**领用任务标题 */
    static PropsHeaderTitle = "page.receive.task.left.title";
    /**输入流程编号 */
    static InputProcessID = "page.receive.task.input.process.id";
    /**输入流程名称 */
    static InputProcessName = "page.receive.task.input.process.name";
    /**输入申请人 */
    static InputProposer = "page.receive.task.input.proposer";
    /**列 流程编号 */
    static ColumnProcessID = "page.receive.task.column.process.id";
    /**列 任务名称 */
    static ColumnTaskName = "page.receive.task.column.task.name";
    /**列 流程名称 */
    static ColumnProcessName = "page.receive.task.column.process.name";
    /**列 流程分类 */
    static ColumnProcessCategory = "page.receive.task.column.process.category";
    /**列 申请人 */
    static ColumnProposer = "page.receive.task.column.proposer";
    /**列 创建时间 */
    static ColumnApplyTime = "page.receive.task.column.apply.time";
    /**列 到期时间 */
    static ColumnExpireTime = "page.receive.task.column.expire.time";
}

/**参数管理 */
export class MetaDataPageLocale {
    /**参数列表 */
    static PropsHeaderTitle = "page.metadata.left.title";
    /**新建 */
    static PropsHeaderLeftBtn = "page.metadata.left.title.new";
    /**新建 */
    static PropsHeaderRightBtn = "page.metadata.right.button.new";
    /**编辑 */
    static PropsHeaderTitleEdit = "page.metadata.right.button.edit";
    /**删除 */
    static MetaDataRemove = "page.metadata.left.remove";
    /**确定 */
    static ButtonOk = "page.metadata.modal.ok";
    /**提示 */
    static ModalTip = "page.metadata.modal.tip";
    /**是否确定删除 */
    static ModalIsDelete = "page.metadata.modal.isdelete";
    /**标题 */
    static ModalTitle = "page.metadata.modal.title";
    /**备注信息 */
    static ModalDescription = "page.metadata.modal.description";
    /**参数编码 */
    static MetaLeftModalCode = "page.metadata.left.modal.code";
    /**参数名称 */
    static MetaLeftModalName = "page.metadata.left.modal.name";
    /**参数描述 */
    static MetaLeftModalDescription = "page.metadata.left.modal.description";
    /**添加下级 */
    static PropsHeaderTitleAdd = "page.metadata.right.button.add";
    /**保存 */
    static ButtonSave = "page.metadata.right.button.save";
    /**取消 */
    static ButtonCancel = "page.metadata.right.button.cancel";
    /**列 编码 */
    static ColumnEncoded = "page.metadata.column.encode";
    /**列 赋值 */
    static ColumnAssignment = "page.metadata.column.assignment";
    /**列 方式 */
    static ColumnMode = "page.metadata.column.assignment";
    /**列 扩展字段1 */
    static ColumnExt1 = "page.metadata.column.ext1";
    /**列 扩展字段2 */
    static ColumnExt2 = "page.metadata.column.ext2";
    /**列 排序 */
    static ColumnSort = "page.metadata.column.sort";
    /**描述 */
    static ColumnDescription = "page.metadata.column.description";
    /**行操作 编辑 */
    static ColumnBtnEdit = "page.metadata.column.button.edit";
    /**行操作 删除 */
    static ColumnBtnDelete = "page.metadata.column.button.delete";
    /**操作 */
    static ColumnOperation = "page.metadata.column.operation";
}

/**角色列表 */
export class JobPositionsPageLocale {
    /**新建 */
    static SearchNew = "page.job.positions.search.new";
    /**组织角色 */
    static SearchRoleOrg = "page.job.positions.search.roleorg";
    /**地点角色 */
    static SearchRoleLoc = "page.job.positions.search.roleloc";
    /**模态框标题 添加角色*/
    static ModalTitleAdd = "page.job.positions.modal.title.add";
    /**模态框标题 编辑*/
    static ModalTitleEdit = "page.job.positions.modal.title.edit";
    /**模态框内容 角色名称*/
    static ModalRoleName = "page.job.positions.modal.content.rolesname";
    /**模态框内容 分配人*/
    static ModalAssigner = "page.job.positions.modal.content.assigner";
    /**模态框备注*/
    static ModalDescription = "page.job.positions.modal.description";
    /**按钮保存*/
    static ButtonSave = "page.job.positions.modal.button.save";
    /**按钮编辑*/
    static ButtonEdit = "page.job.positions.modal.button.edit";
    /**按钮取消*/
    static ButtonCancel = "page.job.positions.modal.button.cancel";
    /**角色名称 */
    static ColumnName = "page.job.positions.column.name";
    /**分配人 */
    static ColumnAssigner = "page.job.positions.column.assigner";
    /**操作 */
    static ColumnOperation = "page.job.positions.column.operation";
    /**编辑 */
    static OperationEdit = "page.job.positions.column.operation.edit";
    /**删除 */
    static OperationRemove = "page.job.positions.column.operation.remove";
}

/**组织角色 */
export class OrganizationPageLocale {
    /**新建 */
    static SearchNew = "page.org.positions.search.new";
    /**组织角色 */
    static SearchRoleOrg = "page.org.positions.search.roleorg";
    /**模态框标题 添加人员*/
    static ModalTitleAdd = "page.org.positions.modal.title.add";
    /**模态框 选择角色*/
    static ModalChooseRole = "page.org.positions.modal.choose.role";
    /**模态框 默认值请选择角色角色*/
    static ModalDefaultChoose = "page.org.positions.modal.default.choose";
    /**模态框标题 编辑*/
    static ModalTitleEdit = "page.org.positions.modal.title.edit";
    /**模态框内容 分配人*/
    static ModalAssigner = "page.org.positions.modal.content.assigner";
    /**模态框备注*/
    static ModalDescription = "page.org.positions.modal.description";
    /**按钮保存*/
    static ButtonSave = "page.org.positions.modal.button.save";
    /**按钮编辑*/
    static ButtonEdit = "page.org.positions.modal.button.edit";
    /**按钮取消*/
    static ButtonCancel = "page.org.positions.modal.button.cancel";
    /**角色名称 */
    static ColumnName = "page.org.positions.column.name";
    /**分配人 */
    static ColumnAssigner = "page.org.positions.column.assigner";
    /**操作 */
    static ColumnOperation = "page.org.positions.column.operation";
    /**编辑 */
    static OperationEdit = "page.org.positions.column.operation.edit";
    /**删除 */
    static OperationRemove = "page.org.positions.column.operation.remove";
}

/**地点角色 */
export class LocationPageLocale {
    /**新建 */
    static SearchNew = "page.location.positions.search.new";
    /**地点角色 */
    static SearchRoleLoc = "page.location.positions.search.roleloc";
    /**模态框 选择角色*/
    static ModalChooseRole = "page.location.positions.modal.choose.role";
     /**模态框 默认值请选择角色角色*/
    static ModalDefaultChoose = "page.location.positions.modal.default.choose";
    /**模态框标题 添加*/
    static ModalTitleAdd = "page.location.positions.modal.title.add";
    /**模态框标题 编辑*/
    static ModalTitleEdit = "page.location.positions.modal.title.edit";
    /**模态框内容 角色名称*/
    static ModalRoleName = "page.location.positions.modal.content.rolesname";
    /**模态框内容 分配人*/
    static ModalAssigner = "page.location.positions.modal.content.assigner";
    /**模态框备注*/
    static ModalDescription = "page.location.positions.modal.description";
    /**按钮保存*/
    static ButtonSave = "page.location.positions.modal.button.save";
    /**按钮编辑*/
    static ButtonEdit = "page.location.positions.modal.button.edit";
    /**按钮取消*/
    static ButtonCancel = "page.location.positions.modal.button.cancel";
    /**角色名称 */
    static ColumnName = "page.location.positions.column.name";
    /**分配人 */
    static ColumnAssigner = "page.location.positions.column.assigner";
    /**操作 */
    static ColumnOperation = "page.location.positions.column.operation";
    /**编辑 */
    static OperationEdit = "page.location.positions.column.operation.edit";
    /**删除 */
    static OperationRemove = "page.location.positions.column.operation.remove";
}

/** 流程规则管理 */
export class FlowRulesPageLocale {
    /**流程编号管理 */
    static PropsHeaderTitle = "page.flow.rules.header.title";
    /**新建*/
    static PropsAddNew = "page.flow.rules.header.addnew";
    /**行 流程 */
    static ColumnName = "page.flow.rules.column.name";
    /**行 编号规则 */
    static ColumnRules = "page.flow.rules.column.rules";
    /**行 操作 */
    static ColumnControl = "page.flow.rules.column.contorl";
    /**行操作 编辑 */
    static ColumnBtnEdit = "page.flow.rules.column.button.edit";
    /**行操作 删除 */
    static ColumnBtnDelete = "page.flow.rules.column.button.delete";
    /**弹窗 流程编号 */
    static PropsDialogTitle = "page.flow.rules.dialog.title";
    /**弹窗 编号预览 */
    static PropsDialogNumberPreview = "page.flow.rules.dialog.number.preview";
    /**弹窗 操作 */
    static PropsDialogControl = "page.flow.rules.dialog.contorl";
    /**弹窗 位数 */
    static PropsDialogDigit = "page.flow.rules.dialog.digit";
    /**弹窗 起始于 */
    static PropsDialogStartAt = "page.flow.rules.dialog.start.at";
    /**弹窗 添加 */
    static BtnDialogAdd = "page.flow.rules.dialog.btn.add";
    /**规则类型 请选择 */
    static RulesTypeDefault = "page.flow.rules.rulestype.default";
    /**规则类型 固定字符 */
    static RulesTypeFixedCharacter = "page.flow.rules.rulestype.fixed.character";
    /**规则类型 动态数字 */
    static RulesTypeDynamicDigital = "page.flow.rules.rulestype.dynamic.digital";
    /**规则类型 连接符 */
    static RulesTypeConnector = "page.flow.rules.rulestype.connector";
}

/**日常报销申请 */
export class DailyReimburseApplicationPageLocale {
    /**日常报销申请 */
    static PropsTitle = "page.daily.reimburse.application.title";
    /**提交 */
    static BtnSubmit = "page.daily.reimburse.application.btn.submit";
    /**保存 */
    static BtnSave = "page.daily.reimburse.application.btn.save";
    /**取消 */
    static BtnCancle = "page.daily.reimburse.application.btn.cancle";
    /**申请人信息 */
    static PropsProposerInfo = "page.daily.reimburse.application.proposer.info";
    /**提交人 */
    static PropsSubmitter = "page.daily.reimburse.application.submitter";
    /**提交日期 */
    static PropsSubmitDay = "page.daily.reimburse.application.submit.day";
    /**申请人 */
    static PropsProposerName = "page.daily.reimburse.application.proposer.name";
    /**员工编号 */
    static PropsProposerID = "page.daily.reimburse.application.proposer.id";
    /**职位 */
    static PropsProposerPosition = "page.daily.reimburse.application.proposer.positions";
    /**工作城市 */
    static PropsWorkCity = "page.daily.reimburse.application.work.city";
    /**汇报经理 */
    static PropsReportManager = "page.daily.reimburse.application.report.manager";
    /**部门 */
    static PropsDepartment = "page.daily.reimburse.application.department";
    /**项目名称 */
    static PropsProjectName = "page.daily.reimburse.application.project.name";
    /**请选择 */
    static PropsDefaultSelect = "page.daily.reimburse.application.default.select";
    /**总金额 */
    static PropsAmount = "page.daily.reimburse.application.amount";
    /**日期 */
    static PropsDay = "page.daily.reimburse.application.day";
    /** *无效的日期格式，参考格式 YYYY-MM-DD */
    static PropsValidDay = "page.daily.reimburse.application.valid.day";
    /**请选择报销类型 */
    static PropsSelectReimburse = "page.daily.reimburse.application.select.reimburse";
    /**金额(人民币)*/
    static PropsItemAmount = "page.daily.reimburse.application.item.amount";
    /** *此字段必填 */
    static PropsTipItemAmount = "page.daily.reimburse.application.tip.item.amount";
    /** *请输入一个有2位小数的有效数字。 */
    static PropsValidItemAmount = "page.daily.reimburse.application.valid.item.amount";
    /**单据张数 */
    static PropsBillCount = "page.daily.reimburse.application.bill.count";
    /**不是一个有效的整数 */
    static PropsValidBillCount = "page.daily.reimburse.application.valid.bill.count";
    /**摘要 */
    static PropsAbstract = "page.daily.reimburse.application.abstract";
    /**添加报销明细 */
    static BtnAddItemDetail = "page.daily.reimburse.application.additem.detail";
    /**附件 */
    static PropsEnclosure = "page.daily.reimburse.application.enclosure";
    /**添加附件 */
    static PropsAddEnclosure = "page.daily.reimburse.application.add.enclosure";
}
/**
 * 申请单
 *
 * @export
 * @class ApplyContentLocale
 */
export class ApplyContentLocale {
    /**
     * 申请人信息
     * @memberOf YeeUserContentLocale
     */
    static ApplyUserTitle = "requistion.user.title";
    /**
     * 提交人
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelSubmitUser = "requistion.user.label.submituser";
    /**
     * 提交时间
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelSubmitDate = "requistion.user.label.submitdate";
    /**
     * 申请人
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelApplyUser = "requistion.user.label.applyuser";
    /**
     * 员工编号
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelEmployeeNo = "requistion.user.label.employeeno";
    /**
     * 职位
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelJobTitle = "requistion.user.label.jobtitle";
    /**
     * 工作城市
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelLocation = "requistion.user.label.location";
    /**
     * 汇报经理
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelLineManager = "requistion.user.label.linemanager";
    /**
     * 部门
     *
     * @static
     *
     * @memberOf YeeUserContentLocale
     */
    static LabelOrg = "requistion.user.label.org";

    static LogTitle="requistion.log.title";

    static ButtonSubmit = "requistion.button.submit";
    static ButtonSave = "requistion.button.save";
    static ButtonCancel = "requistion.button.cancel";
    static ButtonApprove = "requistion.button.approve";
    static ButtonReject = "requistion.button.reject";
    static ButtonForward = "requistion.button.forward";
}
