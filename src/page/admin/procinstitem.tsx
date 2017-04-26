import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {injectIntl, FormattedMessage} from "react-intl";
import {AkModal} from "../../component/controls/ak-modal";
import {AkIcon} from "../../component/controls/ak-icon";
import {AkRow} from "../../component/controls/ak-row";
import {AkCol} from "../../component/controls/ak-col";
import {AkTable, AkColumnProps} from "../../component/controls/ak-table";
import {ProcessInstItemPageLocale} from "../../locales/localeid";
import {ProcInstAPI, ApplicationStatusLocale} from "../../api/procinst";
import {TaskAPI} from "../../api/task";
import {VariableAPI} from "../../api/variables";
import {MainContent} from "../components/maincontent";
import {AkTooltip} from "../../component/controls/ak-tooltip";
import {AkPopconfirm} from "../../component/controls/ak-popconfirm";
import {AkNotification} from "../../component/controls/ak-notification";
import {AkInput} from "../../component/controls/ak-input";
import AkIdentityPicker from "../../component/identity/ak-identitypicker";
import {AkIdentity} from "../../api/common/identity";

/** 流程日志Table */
class DetailTable extends AkTable < ProcInstTableItem > {}
interface DetailTableColumn extends AkColumnProps < ProcInstTableItem > {}

interface ProcInstItemProps extends IntlProps,
RouterProps,
ReactRouter.RouteComponentProps < any,
any > {}
interface ProcInstItemStates {
    loading?: boolean;
    instData?: ProcInstInfo;
    /**获取实例详情 */
    procInstItemRequest?: GetProcInstItemByIDRequest;
    /**撤销 */
    revokeRequest?: RevokeApplicationRequest;
    /**取消 */
    cancleRequest?: CancleApplicationRequest;
    /**督办 */
    warnTaskRequest?: AdminPutWarnTaskRequest;
    /**转办 */
    changeTaskAssigneeRequest?: PutChangeTaskAssigneeRequest;
    /**获取流程变量信息 */
    getVariableRequest?: GetVariablesByApplicationIDRequest;
    /**获取流程图信息 */
    getResourceByIdRequest?: GetResourceByIdRequest;
    /** 显示转办人*/
    showForwardModal?: boolean;
    /**显示流程变量 */
    showVariableModal?: boolean;
    /**显示流程图 */
    showFlowChart?: boolean;
    /**流程变量信息 */
    variables?: any; // Variable[];
    /**选人数据信息 */
    directValue?: AkIdentity;
}
/** 实例详情页 */
class ProcInstItemPage extends Component < ProcInstItemProps,
ProcInstItemStates > {
    /**流程详情TableColumn */
    DetailTableColumns?: DetailTableColumn[]
    constructor(props, context) {
        super(props, context);

        this.state = {
            procInstItemRequest: {
                applicationID: this.props.location.query["aId"],
                procInstID: this.props.location.query["instId"]
            },
            revokeRequest: {
                ApplicationID: this.props.location.query["aId"]
            },
            cancleRequest: {
                ApplicationID: this.props.location.query["aId"]
            },
            getVariableRequest: {
                applicationID: this.props.location.query["aId"]
            },
            getResourceByIdRequest: {},
            warnTaskRequest: {},
            changeTaskAssigneeRequest: {}
        }

        this.DetailTableColumns = [
            {
                title: this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstItemPageLocale.ColumnTaskName}),
                key: ProcessInstItemPageLocale.ColumnTaskName,
                dataIndex: "Name"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstItemPageLocale.ColumnTaskOperator}),
                key: ProcessInstItemPageLocale.ColumnTaskOperator,
                dataIndex: "AssigneeName"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstItemPageLocale.ColumnTaskCreateTime}),
                key: ProcessInstItemPageLocale.ColumnTaskCreateTime,
                dataIndex: "CreatedStr"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstItemPageLocale.ColumnTaskDoneTime}),
                key: ProcessInstItemPageLocale.ColumnTaskDoneTime,
                dataIndex: "EndTimeStr"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstItemPageLocale.ColumnTaskEndTime}),
                key: ProcessInstItemPageLocale.ColumnTaskEndTime,
                dataIndex: "DueDateStr"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstItemPageLocale.ColumnTaskOperate}),
                key: ProcessInstItemPageLocale.ColumnTaskOperate,
                dataIndex: "",
                render: (txt, record, index) => {
                    return <span>
                        <AkIcon
                            type="mail"
                            onClick={() => {
                            this.state.warnTaskRequest.TaskID = record.TaskID;
                            this.OperationRemind();
                        }}></AkIcon>
                        <AkIcon
                            type="export"
                            onClick={() => {
                            this.setState({
                                showForwardModal: true,
                                changeTaskAssigneeRequest: {
                                    TaskID: record.TaskID
                                }
                            });
                        }}></AkIcon>
                    </span>
                }
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstItemPageLocale.ColumnTaskResult}),
                key: ProcessInstItemPageLocale.ColumnTaskResult,
                dataIndex: "Outcome"
            }, {
                title: "",
                key: ProcessInstItemPageLocale.ColumnTaskRemark,
                dataIndex: "Comment",
                render: (txt, record) => {
                    return record.Comment
                        ? <AkTooltip placement="topLeft" title={record.Comment} trigger="click">
                                <AkIcon type="message"/>
                            </AkTooltip>
                        : null;
                }
            }
        ]
    }
    componentDidMount() {
        this.loadData();
    }
    /**  获取流程实例详情 */
    loadData() {
        this.setState({loading: true})
        ProcInstAPI
            .getProcInstItemInfoByID(this.state.procInstItemRequest)
            .then(data => {
                if (data.Status != "0") {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
                this.setState({loading: false, instData: data.Data, showForwardModal: false, showVariableModal: false, showFlowChart: false});
            });
    }
    /**撤回 */
    confirmRecall() {
        this.setState({loading: true})
        if (this.state.instData) {
            this.state.revokeRequest.ApplicationID = this.state.instData.AppModel.ApplicationID;
        } else {
            this.setState({loading: false});
            return false;
        }
        ProcInstAPI
            .putProcInstItemRevoke(this.state.revokeRequest)
            .then(data => {
                this.setState({loading: false})
                history.back();
            });
    }
    /**取消 */
    confirmCancle() {
        this.setState({loading: true})
        if (this.state.instData) {
            this.state.cancleRequest.ApplicationID = this.state.instData.AppModel.ApplicationID;
        } else {
            this.setState({loading: false});
            return false;
        }
        ProcInstAPI
            .putProcInstItemCancel(this.state.cancleRequest)
            .then(data => {
                this.setState({loading: false})
                history.back();
            });
    }
    /**督办 */
    OperationRemind() {
        this.setState({loading: true})
        TaskAPI
            .adminPutWarnTask(this.state.warnTaskRequest)
            .then(data => {
                if (data.Status == "0") {
                    AkNotification.success({message: "发送通知", description: "督办邮件已发送"});
                } else {
                    AkNotification.warning({message: "提示", description: data.Message})
                }
                this.setState({loading: false})
            });
    }
    /**转让 */
    OperationForward() {
        let newAssignee = this.state.directValue;
        if (!newAssignee) {
            AkNotification.warning({message: "提示", description: "请选择转办人"});
            return;
        }
        this.state.changeTaskAssigneeRequest = {
            TaskID: this.state.changeTaskAssigneeRequest.TaskID,
            AssigneeID: newAssignee.ID
        }
        TaskAPI
            .adminPutChangeTaskAssignee(this.state.changeTaskAssigneeRequest)
            .then(data => {
                if (data.Status == "0") {
                    AkNotification.success({message: "发送通知", description: "转办邮件已发送"});
                } else {
                    AkNotification.warning({message: "提示", description: data.Message})
                }
                this.loadData();
            });
    }
    /**获取流程变量信息 */
    getVariableInfo() {
        this.setState({loading: true})
        if (this.state.instData) {
            this.state.getVariableRequest.applicationID = this.state.instData.AppModel.ApplicationID;
        } else {
            this.setState({loading: false});
            return false;
        }
        VariableAPI
            .getVariableByApplication(this.state.getVariableRequest)
            .then(data => {
                if (data.Status == "0") {
                    let variables = data.Data;
                    if (variables.hasOwnProperty("basic")) {
                        variables = variables as Variable[];
                        this.setState({loading: false, variables: variables, showVariableModal: true})
                    } else {
                        console.log(variables);
                        AkNotification.warning({message: '提示', description: "资源文件不存在"});
                        this.setState({loading: false})
                    }
                } else {
                    this.setState({loading: false})
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    /**流程变量 Modal*/
    renderVariableModal() {
        let topThis = this;
        if (!topThis.state.variables) {
            return null;
        }
        let variables = topThis.state.variables as Variable[];

        let format = topThis.props.intl.formatMessage;

        let row = variables.map(function (entry, index) {
            return <AkRow key={index} type="flex" justify="space-around" className="mb20">
                <AkCol span={7}>
                    <AkInput disabled={true} value={entry.name} allowClear={false}></AkInput>
                </AkCol>
                <AkCol span={7}>
                    <AkInput disabled={true} value={entry.type} allowClear={false}></AkInput>
                </AkCol>
                <AkCol span={7}>
                    <AkInput disabled={true} value={entry.value} allowClear={false}></AkInput>
                </AkCol>
            </AkRow>
        });

        return topThis.state.showVariableModal
            ? <AkModal
                    visible={this.state.showVariableModal}
                    maskClosable={false}
                    title={null}
                    onCancel={() => {
                    topThis.setState({showVariableModal: false});
                }}
                    footer={[]}>
                    <AkRow type="flex" justify="space-around" className="mb20">
                        <AkCol span={7}>
                            <FormattedMessage id={ProcessInstItemPageLocale.ColumnVariableName}></FormattedMessage>
                        </AkCol>
                        <AkCol span={7}>
                            <FormattedMessage id={ProcessInstItemPageLocale.ColumnVariableCategory}></FormattedMessage>
                        </AkCol>
                        <AkCol span={7}>
                            <FormattedMessage id={ProcessInstItemPageLocale.ColumnVariableValue}></FormattedMessage>
                        </AkCol>
                    </AkRow>
                    {row}
                </AkModal>
            : null;
    }
    /**获取流程图信息 */
    getFlowChartInfo(ImgResourceID) {
        console.log(ImgResourceID);
        this.setState({showFlowChart: true});
        // this.state.getResourceByIdRequest.resourceID =ImgResourceID; ResourceAPI
        // .getResourceById(this.state.getResourceByIdRequest)     .then(data => {   if
        // (data.Status == "0") {         } else { AkNotification.warning({message:
        // '提示', description: data.Message});         }     });
    }
    /**流程图 Modal */
    renderFlowChartModal() {
        let topThis = this;
        return topThis.state.showFlowChart
            ? <AkModal
                    visible={this.state.showFlowChart}
                    maskClosable={false}
                    title={null}
                    onCancel={() => {
                    topThis.setState({showFlowChart: false});
                }}
                    footer={[]}>
                    {/*流程图*/}
                </AkModal>
            : null;
    }
    /**详细列表数据 */
    renderDetailList() {
        let topThis = this;
        let itemDetail = topThis.state.instData;

        if (!itemDetail) {
            return null;
        }
        if (itemDetail.ProcessLogList) {
            let detailData = itemDetail.ProcessLogList;
            return <div>
                {detailData
                    .map(function (entry, index) {
                        return <AkRow
                            key={index}
                            align="middle"
                            type="flex"
                            justify="space-around"
                            style={ProcInstItemStyle.contentTableStyle}>
                            <AkCol span={24}>
                                <AkRow
                                    align="middle"
                                    type="flex"
                                    justify="space-around"
                                    style={ProcInstItemStyle.aboutTableStyle}>
                                    <AkCol span={6}><AkIcon type="star"/>
                                        <FormattedMessage id={ProcessInstItemPageLocale.PropsModifyTime}></FormattedMessage>
                                        {" : " + entry.ProcInstModel.CreatedStr}
                                    </AkCol>
                                    <AkCol span={6}>
                                        <FormattedMessage id={ProcessInstItemPageLocale.PropsTaskStatus}></FormattedMessage>
                                        {" : "}
                                        <FormattedMessage id={ApplicationStatusLocale + entry.ProcInstModel.Status}></FormattedMessage>
                                    </AkCol>
                                    <AkCol span={10}></AkCol>
                                    <AkCol span={2}>
                                        <a
                                            onClick={() => {
                                            topThis.getFlowChartInfo(entry.ImgResourceID);
                                            {/*GO TO 流程图，获取资源*/
                                            }
                                        }}>
                                            <FormattedMessage id={ProcessInstItemPageLocale.PropsTaskImage}></FormattedMessage>
                                        </a>
                                    </AkCol>
                                </AkRow>
                                <AkRow style={ProcInstItemStyle.aboutTableStyle}>
                                    <AkCol lg={24}>
                                        <DetailTable
                                            rowKey="TaskID"
                                            pagination={false}
                                            columns={topThis.DetailTableColumns}
                                            dataSource={itemDetail.ProcessLogList[0].TaskList}></DetailTable>
                                    </AkCol>
                                </AkRow>
                            </AkCol>
                        </AkRow>
                    })}
            </div>
        }
        return null;
    }
    /**选择转办人 Modal*/
    renderForwardModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;

        return topThis.state.showForwardModal
            ? <AkModal
                    maskClosable={false}
                    visible={this.state.showForwardModal}
                    onCancel={() => {
                    topThis.setState({showForwardModal: false, changeTaskAssigneeRequest: {}});
                }}
                    onOk={() => {
                    topThis.OperationForward();
                }}
                    title={format({id: ProcessInstItemPageLocale.PropsChangeAssignee})}>
                    <AkRow type="flex" justify="end" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcessInstItemPageLocale.PropsChangeAssignee}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkIdentityPicker
                                multiple={false}
                                defaultValue={this.state.directValue}
                                onChange={(v) => {
                                let value = v as AkIdentity;
                                this.setState({directValue: value});
                            }}/>
                        </AkCol>
                    </AkRow>
                </AkModal >
            : null;
    }

    render() {
        let format = this.props.intl.formatMessage;
        let topThis = this;
        if (!topThis.state.instData) {
            return null;
        }
        let itemDetail = topThis.state.instData.AppModel;
        let header = <AkRow>
            <AkCol>
                <span className="top_title" onClick={() => history.back()}>
                    <AkIcon type="setting"></AkIcon>
                    <FormattedMessage id={ProcessInstItemPageLocale.HeaderTitle}></FormattedMessage>
                </span>
                <span className="font16">
                    {'<'}
                    <FormattedMessage id={ProcessInstItemPageLocale.HeaderTitleDetail}></FormattedMessage>
                </span>
            </AkCol>
        </AkRow>;

        let search = <AkRow
            className="mr30 font16 cursor"
            align="middle"
            type="flex"
            justify="space-around">
            <AkCol className="mr20">
                <AkPopconfirm
                    placement="top"
                    title={format({id: ProcessInstItemPageLocale.ModalIsRecallApply})}
                    onConfirm={topThis
                    .confirmRecall
                    .bind(topThis)}>
                    <AkIcon type="rollback"></AkIcon>
                    <span>
                        <FormattedMessage id={ProcessInstItemPageLocale.HeaderRecall}></FormattedMessage>
                    </span>
                </AkPopconfirm>
            </AkCol>
            <AkCol>
                <AkPopconfirm
                    placement="bottomRight"
                    title={format({id: ProcessInstItemPageLocale.ModalIsCancelApply})}
                    onConfirm={() => topThis.confirmCancle.bind(topThis)}>
                    <AkIcon type="close"></AkIcon>
                    <span>
                        <FormattedMessage id={ProcessInstItemPageLocale.HeaderCancel}></FormattedMessage>
                    </span>
                </AkPopconfirm>
            </AkCol>
        </AkRow>

        return <MainContent Header={header} Search={search}>
            <AkRow
                align="middle"
                type="flex"
                justify="space-around"
                className="row-auto row-font14">
                <AkCol span={2}>
                    <FormattedMessage id={ProcessInstItemPageLocale.PropsID}></FormattedMessage>
                </AkCol>
                <AkCol span={5}>
                    {itemDetail.FlowNo}</AkCol>
                <AkCol span={2}>
                    <FormattedMessage id={ProcessInstItemPageLocale.PropsName}></FormattedMessage>
                </AkCol>
                <AkCol span={4}>
                    {itemDetail.FlowName}</AkCol>
                <AkCol span={2}>
                    <FormattedMessage id={ProcessInstItemPageLocale.PropsCategory}></FormattedMessage>
                </AkCol>
                <AkCol span={4}>{itemDetail.CategoryName}</AkCol>
                <AkCol span={2}>
                    <FormattedMessage id={ProcessInstItemPageLocale.PropsStatus}></FormattedMessage>
                </AkCol>
                <AkCol span={3}>
                    {/*GO TO 不理解怎么格式化状态的*/}
                    <FormattedMessage id={ApplicationStatusLocale + itemDetail.Status}></FormattedMessage>
                </AkCol>
            </AkRow>
            <AkRow align="middle" type="flex" justify="space-around" className="row-auto">
                <AkCol span={2}>
                    <FormattedMessage id={ProcessInstItemPageLocale.PropsVersion}></FormattedMessage>
                </AkCol>
                <AkCol span={5}>{itemDetail.Version}</AkCol>
                <AkCol span={2}>
                    <FormattedMessage id={ProcessInstItemPageLocale.PropsCreated}></FormattedMessage>
                </AkCol>
                <AkCol span={4}>{itemDetail.CreatedStr}</AkCol>
                <AkCol span={2}>
                    <FormattedMessage id={ProcessInstItemPageLocale.PropsCreatedBy}></FormattedMessage>
                </AkCol>
                <AkCol span={4}>{itemDetail.CreatedByName}</AkCol>
                <AkCol span={2}>
                    <FormattedMessage id={ProcessInstItemPageLocale.PropsVariable}></FormattedMessage>
                </AkCol>
                <AkCol span={3}>
                    <a
                        onClick={() => {
                        topThis.getVariableInfo();
                    }}>
                        <FormattedMessage id={ProcessInstItemPageLocale.ColumnTaskView}></FormattedMessage>
                    </a>
                </AkCol>
            </AkRow >
            <AkRow align="middle" type="flex" justify="space-around" className="row-auto">
                <AkCol span={24}>
                    {topThis.renderDetailList()}
                </AkCol>
            </AkRow>
            {topThis.renderVariableModal()}
            {topThis.renderFlowChartModal()}
            {topThis.renderForwardModal()}
        </MainContent>
    }
}

class ProcInstItemStyle {

    static contentTableStyle : React.CSSProperties = {
        marginTop: '20px'
    }
    static aboutTableStyle : React.CSSProperties = {
        border: '1px solid #FFFFF',
        backgroundColor: '#f7f7f7',
        padding: '10px'
    }
}

export default injectIntl(withRouter(ProcInstItemPage))
