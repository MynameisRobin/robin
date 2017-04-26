/**领用任务详情 */
import * as React from 'react'
import { Component } from 'react'
import { withRouter, History } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { NavLocale, TaskApprovalPageLocale } from '../locales/localeid';
import { TaskAPI } from '../api/task';
import { AkButton } from '../component/controls/ak-button';
import { AkIcon } from '../component/controls/ak-icon';
import { AkRow } from '../component/controls/ak-row';
import { AkCol } from '../component/controls/ak-col';
import { AkInput } from '../component/controls/ak-input';
import { AkModal } from '../component/controls/ak-modal';
import { AkNotification } from '../component/controls/ak-notification';
import { AkTable, AkColumnProps } from '../component/controls/ak-table';
import { MainContent } from './components/maincontent';

class TaskTable extends AkTable<ProcessLog> { }
interface TaskAkColumn extends AkColumnProps<ProcessLog> { }

interface ReceiveTaskItemProps extends IntlProps,
    ReactRouter.RouteComponentProps<void,
    void> { }
interface ReceiveTaskItemStates {
    loading?: boolean;
    visibleChart?: boolean;
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
/** 领用任务详情 */
class ReceiveTaskItem extends Component<ReceiveTaskItemProps,
    ReceiveTaskItemStates> {

    columns: TaskAkColumn[];

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
                key: "Approver",
                dataIndex: "Approver"
            }, {
                key: "Node",
                dataIndex: "Node"
            }, {
                key: "Status",
                dataIndex: "Status"
            }, {
                key: "CreateTime",
                dataIndex: "CreateTime"
            }, {
                key: "Remark",
                dataIndex: "Remark"
            }
        ];
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.loadData();
    }

    /**
     * 加载数据
     */
    loadData() {
        TaskAPI
            .getTaskDetail(this.state.getDataRequest)
            .then(data => {
                console.log(data);

                this.setState({ loading: false, itemInfo: data.Data })
            });
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
        this.setState({ collapseIcon: icon, showUserInfo: showInfo });
    }
    /**查看流程图 */
    showChart(imgSrc) {
        this.setState({ visibleChart: true, imageChart: imgSrc })
    }
    /**关闭流程图弹窗 */
    closeChart() {
        this.setState({ visibleChart: false })
    }
    /**领用任务 */
    postReceive() {
        this.state.putTaskHandle.TaskID=this.props.location.query["taskId"];
        TaskAPI
            .putTaskHandle(this.state.putTaskHandle)
            .then(data => {
                AkNotification.open({ message: data.Status, description: data.Message })
            });
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
        let tipIcon = <AkIcon type="tag-o" />;
        return <div
            className="row-auto"
            onClick={topThis
                .openOrCloseUserInfo
                .bind(topThis)}>
            <AkRow
                type="flex"
                align="middle"
                className="row-title mb15"
                >
                <AkCol span={18} className="font16">
                    {tipIcon}
                    <FormattedMessage id={TaskApprovalPageLocale.PropsProposerInfo}></FormattedMessage>
                </AkCol>
                <AkCol span={6} className="tright">
                    <AkIcon
                        type={topThis.state.collapseIcon}
                        />
                </AkCol>
            </AkRow>
            <div
                style={{
                    display: this.state.showUserInfo
                }}>
                <AkRow
                    align="middle"
                    type="flex"
                    className="mb15"
                    >
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsSubmitter}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18} className="font14">
                        {itemInfo.ProposerInfo.Submitter}
                    </AkCol>
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsSubmitDay}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>
                        {itemInfo.ProposerInfo.SubmitDay}
                    </AkCol>
                </AkRow>

                <AkRow
                    align="middle"
                    type="flex"
                    className="mb15"
                    >
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsProposerName}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18} >{itemInfo.ProposerInfo.ProposerName}</AkCol>
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsProposerID}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.ProposerInfo.ProposerID}</AkCol>
                </AkRow>

                <AkRow
                    align="middle"
                    type="flex"
                    className="mb15"
                    >
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsProposerPosition}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18} >{itemInfo.ProposerInfo.Job}</AkCol>
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsWorkCity}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.ProposerInfo.WorkCity}</AkCol>
                </AkRow>

                <AkRow
                    align="middle"
                    type="flex"
                    className="mb15"
                    >
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsReportManager}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18} >{itemInfo.ProposerInfo.ReportManager}</AkCol>
                    <AkCol lg={2} md={4} sm={4} xs={6}>
                        <FormattedMessage id={TaskApprovalPageLocale.PropsDepartment}></FormattedMessage>
                    </AkCol>
                    <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.ProposerInfo.Department}</AkCol>
                </AkRow>
            </div>
        </div>
    }
    /**假期申请 */
    renderHolidayInfo(itemInfo) {
        let topThis = this;
        let tipIcon = <AkIcon type="tag-o" />;
        return <div className="row-auto">
            <AkRow
                type="flex"
                justify="space-around"
                align="middle"
                className="row-title mb15"
                >
                <AkCol span={18} className="font16">
                    {tipIcon}
                    <FormattedMessage id={TaskApprovalPageLocale.PropsHolidayApplication}></FormattedMessage>
                </AkCol>
                <AkCol span={6}></AkCol>
            </AkRow>

            <AkRow
                align="middle"
                type="flex"
                className="mb15"
                >
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsProjectName}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18} >{itemInfo.HolidayApplication.ProjectName}</AkCol>
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsHolidayType}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.HolidayApplication.VacationType}</AkCol>
            </AkRow>

            <AkRow
                align="middle"
                type="flex"
                className="mb15"
                >
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsStartTime}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18} >{itemInfo.HolidayApplication.StartTime}</AkCol>
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsEndTime}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.HolidayApplication.EndTime}</AkCol>
            </AkRow>

            <AkRow
                align="middle"
                type="flex"
                className="mb15"
                >
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsVacationTime}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18} >{itemInfo.HolidayApplication.VacationTime}</AkCol>
                <AkCol lg={2} md={4} sm={4} xs={6}>
                    <FormattedMessage id={TaskApprovalPageLocale.PropsVacationReason}></FormattedMessage>
                </AkCol>
                <AkCol lg={10} md={8} sm={8} xs={18}>{itemInfo.HolidayApplication.VacationReason}</AkCol>
            </AkRow>
        </div >
    }
    /**附件 */
    renderEnclosure(itemInfo) {
        let topThis = this;
        let tipIcon = <AkIcon type="tag-o" />;

        let enclosure = itemInfo.HolidayApplication.Enclosure;
        if (enclosure === undefined || enclosure === null) {
            enclosure = "Null";
        }
        return <div className="row-auto">
            <AkRow
                type="flex"
                justify="space-around"
                align="middle"
                className="row-title mb15"
                >
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
    /**流程日志 */
    renderProcessLog(itemInfo) {
        let topThis = this;
        let tipIcon = <AkIcon type="tag-o" />;
        return <div className="row-auto">
            <AkRow
                type="flex"
                justify="space-around"
                align="middle"
                className="row-title"
                >
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
        if (itemInfo === undefined || itemInfo === null) {
            return null;
        }

        return <MainContent Header={TaskApprovalPageLocale.LeftHeaderTitle} Search={topThis.renderSearch()}>
            {topThis.renderProposerInfo(itemInfo)}
            {topThis.renderHolidayInfo(itemInfo)}
            {topThis.renderEnclosure(itemInfo)}
            <AkRow type="flex" justify="space-around">
                <AkCol span={2}>
                    <AkButton
                        key="receive"
                        type="primary"
                        size="large"
                        onClick={topThis
                            .postReceive
                            .bind(topThis)}>
                        <FormattedMessage id={TaskApprovalPageLocale.BtnReceiveTask}></FormattedMessage>
                    </AkButton>
                </AkCol>
            </AkRow>
            {topThis.renderProcessLog(itemInfo)}
            <AkModal
                visible={topThis.state.visibleChart}
                footer={null}
                onCancel={topThis
                    .closeChart
                    .bind(topThis)}>
                <img src={topThis.state.imageChart} />
            </AkModal>
        </MainContent>
    }
}
class ReceiveTaskItemStyle { }

export default injectIntl(withRouter(ReceiveTaskItem))
