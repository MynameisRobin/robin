/**任务审批 */
import * as React from 'react'
import {Component} from 'react'
import {withRouter, History} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {NavLocale, TaskApprovalPageLocale} from '../locales/localeid';
import {TaskAPI} from '../api/task';
import {ResourceAPI} from '../api/resource';
import {AkButton} from '../component/controls/ak-button';
import {AkIcon} from '../component/controls/ak-icon';
import {AkRow} from '../component/controls/ak-row';
import {AkCol} from '../component/controls/ak-col';
import {AkInput} from '../component/controls/ak-input';
import {AkModal} from '../component/controls/ak-modal';
import {AkNotification} from '../component/controls/ak-notification';
import {AkTable, AkColumnProps} from '../component/controls/ak-table';
import {MainContent} from './components/maincontent';
import {render} from 'react-dom';

class TaskTable extends AkTable < ProcessLog > {}
interface TaskAkColumn extends AkColumnProps < ProcessLog > {}

interface TaskApproveProps extends IntlProps,
ReactRouter.RouteComponentProps < void,
void > {}
interface TaskApproveStates {
    loading?: boolean;
    visibleChart?: boolean;
    signApproveShow?: boolean;
    imageChart?: string;
    itemInfo?: TaskDetailInfo;
    collapseIcon?: "up" | "down";
    showUserInfo?: "none" | "";
    /**获取审批详情*/
    getDataRequest?: GetApproveInfoRequest;
    /**任务审批 */
    putTaskHandle?: PutTaskHandleRequest;
    /**转签 */
    changeTaskAssigneeRequest?: PutChangeTaskAssigneeRequest;
    /**获取流程图 */
    getResourceByIdRequest?: GetResourceByIdRequest;
}
/** 任务审批 */
class TaskApprove extends Component < TaskApproveProps,
TaskApproveStates > {

    columns : TaskAkColumn[];

    constructor(props, context) {
        super(props, context);
        this.state = {
            collapseIcon: "up",
            showUserInfo: "",
            getDataRequest: {
                taskID: this.props.location.query["taskId"],
                procInstID: this.props.location.query["instId"]
            },
            putTaskHandle: {},
            changeTaskAssigneeRequest: {},
            getResourceByIdRequest: {}
        }
        this.columns = [
            {
                key: "AssigneeName",
                dataIndex: "AssigneeName"
            }, {
                key: "Name",
                dataIndex: "Name"
            }, {
                key: "Outcome",
                dataIndex: "Outcome"
            }, {
                key: "EndTimeStr",
                dataIndex: "EndTimeStr"
            }, {
                key: "DeleteReason",
                dataIndex: "DeleteReason"
            }
        ];
    }

    componentDidMount() {
        this.setState({loading: true})
        this.loadData();
    }

    /**
     * 加载数据
     */
    loadData() {
        TaskAPI
            .getTaskDetail(this.state.getDataRequest)
            .then(data => {
                this.setState({loading: false, itemInfo: data.Data})
            });
    }

    /**转签人 */
    inputChange(value) {
        this.state.changeTaskAssigneeRequest.AssigneeID = value;
    }
    /**查看申请人信息 */
    openOrCloseUserInfo() {
        let icon = this.state.collapseIcon;
        let showInfo = this.state.showUserInfo;
        if (icon === "up") {
            icon = "down";
            showInfo = "none";
        } else {
            icon = "up";
            showInfo = "";
        }
        this.setState({collapseIcon: icon, showUserInfo: showInfo});
    }
    /**查看流程图 */
    showChart(imgResourceId) {
        this.state.getResourceByIdRequest.resourceID = imgResourceId;
        ResourceAPI
            .getResourceById(this.state.getResourceByIdRequest)
            .then(data => {
                console.log(data);
                this.setState({visibleChart: true, imageChart: data.Data.Resource})
            })
    }
    /**关闭流程图弹窗 */
    closeChart() {
        this.setState({visibleChart: false})
    }
    /**同意 */
    agreeApprove() {
        this.state.putTaskHandle.Outcome = "Approved";
        this.postApprove();
    }
    /**拒绝 */
    refuseApprove() {
        let comment = this.state.putTaskHandle.Comment;
        this.state.putTaskHandle.Outcome = "Rejected";
        if (comment === undefined || comment === null) {
            AkNotification.warning({
                message: "提示",
                description: this
                    .props
                    .intl
                    .formatMessage({id: TaskApprovalPageLocale.PropsPlaceHolderRefusalReason})
            })
        } else {
            this.postApprove();
        }
    }
    /**处理审批 */
    postApprove() {
        this.state.putTaskHandle.TaskID=this.props.location.query["taskId"];
        TaskAPI
            .putTaskHandle(this.state.putTaskHandle)
            .then(data => {
                AkNotification.open({message: data.Status, description: data.Message})
            });
    }
    /**转签 */
    signApprove() {
        this.setState({signApproveShow: true})
    }
    /**选择转签人 */
    changeSigner(newAssigneeId) {
        this.state.changeTaskAssigneeRequest.AssigneeID=newAssigneeId;
    }

    /**确定转签 */
    okSign() {
        let assigneeID = this.state.changeTaskAssigneeRequest.AssigneeID;
        if (assigneeID === undefined || assigneeID === null) {
            AkNotification.warning({message: "提示", description: "转签人不能为空"})
        } else {
            TaskAPI
                .putChangeTaskAssignee(this.state.changeTaskAssigneeRequest)
                .then(data => {
                    this.setState({signApproveShow: false});
                    AkNotification.open({message: data.Status, description: data.Message})
                });
        }
    }
    /**取消转签 */
    cancleSign() {
        this.state.changeTaskAssigneeRequest.AssigneeID = null;
        this.setState({signApproveShow: false})
    }
    /**头部 搜素 */
    renderSearch() {
        let topThis = this;
        let itemInfo = this.state.itemInfo;
        if (itemInfo === undefined || itemInfo === null) {
            return null;
        }
        return <AkRow type="flex" justify="space-around" className="row-w150">
            <AkCol>
                <FormattedMessage id={TaskApprovalPageLocale.RightHeaderProcessID}></FormattedMessage>{":" + itemInfo.FlowNo}
            </AkCol>
            <AkCol>
                <AkButton type="primary" onClick={() => history.back()}>
                    <FormattedMessage id={TaskApprovalPageLocale.RightHeaderBtnClose}></FormattedMessage>
                </AkButton>
            </AkCol>
        </AkRow>
    }
    /**申请人信息 */
    renderProposerInfo(itemInfo) {
        let topThis = this;
        let tipIcon = <AkIcon type="tag-o"/>;
        return <div
            className="row-auto"
            onClick={topThis
            .openOrCloseUserInfo
            .bind(topThis)}>
            <AkRow
                type="flex"
                align="middle"
                justify="space-around"
                className="row-title mb15">
                <AkCol span={18} className="font16">
                    {tipIcon}
                    <FormattedMessage id={TaskApprovalPageLocale.PropsProposerInfo}></FormattedMessage>
                </AkCol>
                <AkCol span={6} className="tright">
                    <AkIcon type={topThis.state.collapseIcon}/>
                </AkCol>
            </AkRow>

            <div style={{
                display: this.state.showUserInfo
            }}>
                <AkRow align="middle" type="flex" className="mb15">
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsSubmitter}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18} className="font14">
                        {itemInfo.CreatedByName}
                    </AkCol>
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsSubmitDay}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>
                        {itemInfo.ApplyDateStr}
                    </AkCol>
                </AkRow>

                <AkRow align="middle" type="flex" className="mb15">
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsProposerName}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.ApplicantName}</AkCol>
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsProposerID}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.EmployeeNo}</AkCol>
                </AkRow>

                <AkRow align="middle" type="flex" className="mb15">
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsProposerPosition}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.JobTitle}</AkCol>
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsWorkCity}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.LocationName}</AkCol>
                </AkRow>

                <AkRow align="middle" type="flex" className="mb15">
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsReportManager}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.LineManagerName}</AkCol>
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsDepartment}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.OrgName}</AkCol>
                </AkRow>
            </div>
        </div>
    }
    /**假期申请 GO TO*/
    renderHolidayInfo(itemInfo) {
        let topThis = this;
        let tipIcon = <AkIcon type="tag-o"/>;

        let variable = itemInfo.Variables;
        //console.log("休假信息无法确认"+JSON.stringify(variable) );

        return <div className="row-auto">
            <AkRow
                type="flex"
                justify="space-around"
                align="middle"
                className="row-title mb15">
                <AkCol span={18} className="font16">
                    {tipIcon}
                    <FormattedMessage id={TaskApprovalPageLocale.PropsHolidayApplication}></FormattedMessage>
                </AkCol>
                <AkCol span={6}></AkCol>
            </AkRow>

            <AkRow align="middle" type="flex" className="mb15">
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsProjectName}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.Name}</AkCol>
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsHolidayType}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.CategoryName}</AkCol>
            </AkRow>

            <AkRow align="middle" type="flex" className="mb15">
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsStartTime}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.StartTimeStr}</AkCol>
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsEndTime}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.EndTimeStr}</AkCol>
            </AkRow>

            <AkRow align="middle" type="flex" className="mb15">
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsVacationTime}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.DURATION}</AkCol>
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsVacationReason}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.Comment}</AkCol>
            </AkRow>
        </div>
    }
    /**附件 GO TO*/
    renderEnclosure(itemInfo) {
        let topThis = this;
        let tipIcon = <AkIcon type="tag-o"/>;

        let variable = itemInfo.Variables;
        let enclosure = "无";
        //console.log("附件字段无法确认"+JSON.stringify(variable) );

        if (variable === undefined || variable === null) {
            variable = "无";
        }
        if (variable.enclosure !== undefined) {
            enclosure = variable.enclosure;
        }
        return <div className="row-auto">
            <AkRow
                type="flex"
                justify="space-around"
                align="middle"
                className="row-title mb15">
                <AkCol span={18} className="font16">
                    {tipIcon}
                    <FormattedMessage id={TaskApprovalPageLocale.PropsEnclosure}></FormattedMessage>
                </AkCol>
                <AkCol span={6}></AkCol>
            </AkRow>
            <AkRow type="flex" justify="space-around">
                <AkCol span={18}>
                    {enclosure}
                </AkCol>
                <AkCol span={6}></AkCol>
            </AkRow>
        </div>
    }
    /**审批意见 */
    renderOption() {
        let topThis = this;
        return <div>
             <AkRow
                type="flex"
                justify="space-around"
                align="middle"
                className="row-title mb15">
                <AkCol span={18} className="font16">
                    <FormattedMessage id={TaskApprovalPageLocale.PropsApprovalOption}></FormattedMessage>
                </AkCol>
                <AkCol span={6}></AkCol>
            </AkRow>
            <AkRow type="flex" justify="space-around" className="row-mtb20 row-auto">
                <AkCol span={24} className="row-mtb20">
                    <AkInput
                        type="textarea"
                        onChange={value => topThis.state.putTaskHandle.Comment = value}
                        placeholder={this
                        .props
                        .intl
                        .formatMessage({id: TaskApprovalPageLocale.PropsPlaceHolderRefusalReason})}
                        autosize={{
                        minRows: 2,
                        maxRows: 10
                    }}/>
                </AkCol>
            </AkRow>
            <AkRow type="flex" justify="center" className="row-mtb20 row-auto">
                <AkCol span={23}>
                    <div
                        style={{
                        textAlign: 'center'
                    }}>
                        <AkButton
                            type="primary"
                            onClick={topThis
                            .agreeApprove
                            .bind(topThis)}
                            style={{
                            marginRight: "10px"
                        }}>
                            <FormattedMessage id={TaskApprovalPageLocale.BtnAgreeTxt}></FormattedMessage>
                        </AkButton>
                        <AkButton
                            onClick={topThis
                            .refuseApprove
                            .bind(topThis)}>
                            <FormattedMessage id={TaskApprovalPageLocale.BtnRefuseTxt}></FormattedMessage>
                        </AkButton>
                    </div>
                </AkCol>
                <AkCol span={1}>
                    <AkButton
                        onClick={topThis
                        .signApprove
                        .bind(topThis)}>
                        <FormattedMessage id={TaskApprovalPageLocale.btnSign}></FormattedMessage>
                    </AkButton>
                </AkCol>
            </AkRow>
        </div>
    }
    /**流程日志 */
    renderProcessLog(itemInfo) {
        let topThis = this;
        let tipIcon = <AkIcon type="tag-o"/>;

        return <div className="row-auto">
            <AkRow type="flex" justify="space-around" align="middle" className="row-title">
                <AkCol span={18} className="font16">
                    {tipIcon}
                    <FormattedMessage id={TaskApprovalPageLocale.PropsProcessLog}></FormattedMessage>
                </AkCol>
                <AkCol span={6}></AkCol>
            </AkRow>

            {itemInfo
                .ProcessLogList
                .map(function (entry, index) {
                    return <div key={index}>
                        <AkRow
                            align="middle"
                            type="flex"
                            justify="space-around"
                            className="row-title"
                            style={{
                            background: "#F2F2F2"
                        }}>
                            <AkCol span={10}>
                                <FormattedMessage id={TaskApprovalPageLocale.PropsUpdateTime}></FormattedMessage>
                                {":" + entry.ProcInstModel.CreatedStr}
                            </AkCol>
                            <AkCol span={10}>
                                <FormattedMessage id={TaskApprovalPageLocale.PropsStatus}></FormattedMessage>
                                {":" + entry.ProcInstModel.Status}
                            </AkCol>
                            <AkCol span={4}>
                                <a
                                    onClick={topThis
                                    .showChart
                                    .bind(topThis, entry.ImgResourceID)}>
                                    <FormattedMessage id={TaskApprovalPageLocale.PropsProcessChart}></FormattedMessage>
                                </a>
                            </AkCol>
                        </AkRow>

                        <AkRow type="flex" align="middle" className="row-title" justify="space-around">
                            <AkCol span={24}>
                                <TaskTable
                                    rowKey="ActivityID"
                                    showHeader={false}
                                    loading={topThis.state.loading}
                                    pagination={false}
                                    columns={topThis.columns}
                                    dataSource={entry.TaskList}></TaskTable>
                            </AkCol>
                        </AkRow>
                    </div>
                })}
        </div>
    }

    render() {
        let topThis = this;
        let itemInfo = this.state.itemInfo;
        let setSignIcon = <AkIcon
            type="setting"
            onClick={topThis
            .changeSigner
            .bind(topThis)}/>;
        let okSignBtn = <AkButton
            key="submit"
            type="primary"
            size="large"
            onClick={topThis
            .okSign
            .bind(topThis)}>
            <FormattedMessage id={TaskApprovalPageLocale.BtnSignSubmit}></FormattedMessage>
        </AkButton>;
        let cancleSingBtn = <AkButton
            key="cancle"
            type="ghost"
            size="large"
            loading={this.state.loading}
            onClick={topThis
            .cancleSign
            .bind(topThis)}>
            <FormattedMessage id={TaskApprovalPageLocale.BtnSignCancel}></FormattedMessage>
        </AkButton>;
        let signFooter = [okSignBtn, cancleSingBtn]

        if (itemInfo === undefined || itemInfo === null) {
            return null;
        }

        return <MainContent
            Header={TaskApprovalPageLocale.LeftHeaderTitle}
            Search={topThis.renderSearch()}>
            {topThis.renderProposerInfo(itemInfo)}
            {topThis.renderHolidayInfo(itemInfo)}
            {topThis.renderEnclosure(itemInfo)}
            {topThis.renderOption()}
            {topThis.renderProcessLog(itemInfo)}

            <AkModal
                visible={topThis.state.visibleChart}
                footer={null}
                onCancel={topThis
                .closeChart
                .bind(topThis)}>
                <img src={topThis.state.imageChart}/>
            </AkModal>

            <AkModal
                visible={topThis.state.signApproveShow}
                footer={signFooter}
                onOk={topThis
                .okSign
                .bind(topThis)}
                onCancel={topThis
                .cancleSign
                .bind(topThis)}>
                <p>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsSignTip}></FormattedMessage>
                </p>
                <p>
                    <AkInput
                        addonAfter={setSignIcon}
                        onChange={value => {
                        this.state.changeTaskAssigneeRequest.AssigneeID = value;
                    }}></AkInput>
                </p>
            </AkModal>

        </MainContent>
    }
}
class TaskApproveStyle {}

export default injectIntl(withRouter(TaskApprove))
