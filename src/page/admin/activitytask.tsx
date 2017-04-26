import * as React from 'react'
import {Component} from 'react'
import {MainContent} from '../components/maincontent';
import {AkTable, AkColumnProps} from '../../component/controls/ak-table';
import {withRouter, Link} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {ActivityTaskPageLocale, NavLocale, CommonLocale} from '../../locales/localeid';
import {TaskAPI} from '../../api/task';
import {AkRow} from '../../component/controls/ak-row';
import {AkCol} from '../../component/controls/ak-col';
import {AkInput} from '../../component/controls/ak-input';
import {AkIcon} from '../../component/controls/ak-icon';
import {AkButton} from '../../component/controls/ak-button';
import {AkDatePicker} from '../../component/controls/ak-datepicker';
import {PathConfig} from '../../config/pathconfig';
import * as moment from 'moment';
import {AkTooltip} from '../../component/controls/ak-tooltip';
import {AkNotification} from '../../component/controls/ak-notification';
import {AkModal} from '../../component/controls/ak-modal';
import {render} from 'react-dom';
import AkIdentityPicker from "../../component/identity/ak-identitypicker";
import {AkIdentity} from "../../api/common/identity";

class TaskTable extends AkTable < TaskInfo > {}
interface TaskAkColumn extends AkColumnProps < TaskInfo > {}

interface ActivityTaskPageProps extends IntlProps {}
interface ActivityTaskPageStates {
    loading?: boolean;
    taskData?: TaskInfo[];
    taskRequest?: GetAdminTaskRequest;
    /**转办 */
    changeTaskAssigneeRequest?: AdminPutChangeTaskAssigneeRequest;
    /**督办 */
    warnTaskRequest?: AdminPutWarnTaskRequest;
    /**批量转办 */
    changeTaskAssigneeListRequest?: AdminPutChangeTaskAssigneeListRequest;
    /**批量督办 */
    warnTaskListRequest?: AdminPutWarnTaskListRequest;
    /**普通搜索 */
    normalSearch?: boolean;
    /**高级搜索 */
    advSearch?: boolean;
    /**批量操作 */
    batchOperation?: boolean;
    /**显示转办人 */
    showForwardModal?: boolean;
    /**表 总行数 */
    totalCount?: number;
    /**批量选择的对象 */
    selected?: TaskInfo[];
    /**选人数据信息 */
    directValue?: AkIdentity;
}
/** 流程任务页面 */
class ActivityTaskPage extends Component < ActivityTaskPageProps,
ActivityTaskPageStates > {
    columns : TaskAkColumn[];
    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.state = {
            taskRequest: {
                type: 1,
                pageSize: 20
            },
            changeTaskAssigneeRequest: {},
            warnTaskRequest: {},
            changeTaskAssigneeListRequest: {},
            warnTaskListRequest: {},
            normalSearch: true
        }
        this.columns = [
            {
                title: format({id: ActivityTaskPageLocale.ColumnTaskID}),
                key: ActivityTaskPageLocale.ColumnTaskID,
                dataIndex: "TaskID"
            }, {
                title: format({id: ActivityTaskPageLocale.ColumnTaskName}),
                key: ActivityTaskPageLocale.ColumnTaskName,
                dataIndex: "Name"
            }, {
                title: format({id: ActivityTaskPageLocale.ColumnAssigneeName}),
                key: ActivityTaskPageLocale.ColumnAssigneeName,
                dataIndex: "AssigneeName"
            }, {
                title: format({id: ActivityTaskPageLocale.ColumnProcName}),
                key: ActivityTaskPageLocale.ColumnProcName,
                dataIndex: "ProcDefName",
                render: (txt, record) => {
                    return <Link
                        to={{
                        pathname: PathConfig.ProcInstItme,
                        query: {
                            instId: record.ProcInstID
                        }
                    }}>{txt}</Link>
                }
            }, {
                title: format({id: ActivityTaskPageLocale.ColumnCreatedBy}),
                key: ActivityTaskPageLocale.ColumnCreatedBy,
                dataIndex: "CreatedBy"
            }, {
                title: format({id: ActivityTaskPageLocale.ColumnCreated}),
                key: ActivityTaskPageLocale.ColumnCreated,
                dataIndex: "CreatedStr"
            }, {
                title: format({id: ActivityTaskPageLocale.ColumnDueDate}),
                key: ActivityTaskPageLocale.ColumnDueDate,
                dataIndex: "DueDateStr"
            }, {
                key: ActivityTaskPageLocale.ColumnOperation,
                className: "ak_align_r",
                render: (text, record) => {
                    return <div>
                        <AkTooltip
                            placement="bottom"
                            title={format({id: ActivityTaskPageLocale.OperationRemind})}>
                            <AkIcon
                                type="mail"
                                onClick={() => {
                                this.state.warnTaskRequest.TaskID = record.TaskID;
                                this.OperationRemind();
                            }}></AkIcon>
                        </AkTooltip>
                        <AkTooltip
                            placement="bottom"
                            title={format({id: ActivityTaskPageLocale.OperationForward})}>
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
                        </AkTooltip>
                    </div>;
                }
            }
        ];
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {},
        onSelect: (record, selected, selectedRows) => {
            this.state.selected = selectedRows;
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            this.state.selected = selectedRows;
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
        })
    };

    componentDidMount() {
        this.loadData();
    }
    loadData() {
        this.setState({loading: true})
        TaskAPI
            .getAdminTask(this.state.taskRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({loading: false, taskData: data.Data, totalCount: data.TotalCount, directValue: null})
                } else {
                    this.setState({loading: false});
                    AkNotification.success({message: "提示", description: data.Message});
                }
            });
    }
    /**督办 */
    OperationRemind() {
        TaskAPI
            .adminPutWarnTask(this.state.warnTaskRequest)
            .then(data => {
                if (data.Status == "0") {
                    AkNotification.success({message: "发送通知", description: "督办邮件已发送"});
                } else {
                    AkNotification.warning({message: "提示", description: data.Message})
                }
                this.loadData();
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

    /**批量督办 */
    OperationRemindList() {
        let selectRows = this.state.selected;
        if (selectRows && selectRows.length > 0) {
            let taskIds = this.getSelectTaskIDs(selectRows);
            this.state.warnTaskListRequest.TaskIDs = taskIds;
            TaskAPI
                .adminPutWarnTaskList(this.state.warnTaskListRequest)
                .then(data => {
                    if (data.Status == "0") {
                        AkNotification.success({message: "发送通知", description: "督办邮件已发送"});
                    } else {
                        AkNotification.warning({message: "提示", description: data.Message})
                    }
                    this.loadData();
                });
        } else {
            AkNotification.warning({message: "提示", description: "督办对象为空"});
        }
    }
    /**批量转办 */
    OperationForwardList() {
        let selectRows = this.state.selected;
        if (selectRows && selectRows.length > 0) {
            let taskIds = this.getSelectTaskIDs(selectRows);
            let newAssignee = this.state.directValue;
            if (!newAssignee) {
                AkNotification.warning({message: "提示", description: "请选择转办人"});
                return;
            }
            this.state.changeTaskAssigneeListRequest = {
                TaskIDs: taskIds,
                AssigneeID: newAssignee.ID
            }
            TaskAPI
                .adminPutChangeTaskAssigneeList(this.state.changeTaskAssigneeListRequest)
                .then(data => {
                    if (data.Status == "0") {
                        AkNotification.success({message: "发送通知", description: "转办邮件已发送"});
                        this.loadData();
                    } else {
                        AkNotification.warning({message: "提示", description: data.Message})
                    }
                });
        } else {
            AkNotification.warning({message: "提示", description: "转办对象为空"});
        }
    }
    /** 批量转办时判断是否显示转办人Modal */
    showForwardModal() {
        let selectRows = this.state.selected;
        if (selectRows && selectRows.length > 0) {
            this.setState({showForwardModal: true});
        } else {
            AkNotification.warning({message: "提示", description: "转办对象为空"});
        }
    }
    /**获取批量处理的任务编号 */
    getSelectTaskIDs(arry : TaskInfo[]) {
        let taskIds = [];
        arry.map(function (entry) {
            taskIds.push(entry.TaskID);
        })
        return taskIds;
    }
    /**顶部普通搜索 Row*/
    renderSearch() {
        let searchButton = <AkIcon className="cursor" type="search" onClick={() => this.loadData()}></AkIcon>
        return this.state.normalSearch
            ? <AkRow type="flex" justify="space-around" align="middle" className="row-w150">
                    <AkCol className="mr10">
                        <a
                            onClick={() => {
                            this.setState({
                                batchOperation: !this.state.batchOperation,
                                normalSearch: false
                            })
                        }}>
                            <FormattedMessage id={ActivityTaskPageLocale.BatchOperation} tagName = "div"></FormattedMessage>
                        </a>
                    </AkCol>
                    <AkCol className="mr10">
                        <AkInput
                            addonAfter={searchButton}
                            placeholder={this
                            .props
                            .intl
                            .formatMessage({id: ActivityTaskPageLocale.SearchTaskIDHolder})}
                            onPressEnter={() => this.loadData()}
                            allowClear={true}
                            onChange={(value) => {
                            this.state.taskRequest.flowNo = value;
                            this.setState({taskRequest: this.state.taskRequest})
                        }}
                            value={this.state.taskRequest.flowNo}></AkInput>
                    </AkCol>
                    <AkCol>
                        <a
                            onClick={() => {
                            this.setState({
                                advSearch: !this.state.advSearch,
                                normalSearch: false
                            })
                        }}>
                            <FormattedMessage id={ActivityTaskPageLocale.SearchAdvance}></FormattedMessage>
                        </a>
                    </AkCol>
                </AkRow>
            : null
    }
    /**高级搜索 Row */
    renderAdvSearch() {
        let format = this.props.intl.formatMessage;
        return this.state.advSearch
            ? <AkRow
                    type="flex"
                    justify="end"
                    align="middle"
                    className="row-w150 row-advsearch">
                    <AkCol>
                        <FormattedMessage id={ActivityTaskPageLocale.SearchAssignee}></FormattedMessage>
                    </AkCol>
                    <AkCol>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                            this.state.taskRequest.assigneeID = value;
                        }}
                            placeholder={format({id: ActivityTaskPageLocale.SearchAssigneeHolder})}></AkInput>
                    </AkCol>
                    <AkCol>
                        <FormattedMessage id={ActivityTaskPageLocale.SearchCreatedBy}></FormattedMessage>
                    </AkCol>
                    <AkCol>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                            this.state.taskRequest.applicantID = value;
                        }}
                            placeholder={format({id: ActivityTaskPageLocale.SearchCreatedByHolder})}></AkInput>
                    </AkCol>

                    <AkCol>
                        <FormattedMessage id={ActivityTaskPageLocale.SearchCreated}></FormattedMessage>
                    </AkCol>
                    <AkCol>
                        <AkDatePicker.RangePicker
                            value={this.state.taskRequest.startTimeStr
                            ? [
                                moment(this.state.taskRequest.startTimeStr),
                                moment(this.state.taskRequest.endTimeStr)
                            ]
                            : null}
                            onChange={(dates, datestr) => {
                            this.state.taskRequest.startTimeStr = datestr[0];
                            this.state.taskRequest.endTimeStr = datestr[1];
                            this.setState({taskRequest: this.state.taskRequest});
                        }}></AkDatePicker.RangePicker>
                    </AkCol>
                    <AkCol>
                        <AkButton icon="search" onClick={() => this.loadData()}></AkButton>
                    </AkCol>
                    <AkCol>
                        <a
                            onClick={() => {
                            this.setState({taskRequest: {}})
                        }}>
                            <FormattedMessage id={CommonLocale.Clear}></FormattedMessage>
                        </a>
                    </AkCol>
                    <AkCol>
                        <AkButton
                            onClick={() => {
                            this.setState({advSearch: false, normalSearch: true})
                        }}>
                            <FormattedMessage id={CommonLocale.Close}></FormattedMessage>
                        </AkButton>
                    </AkCol>
                </AkRow>
            : null;
    }
    /**批量操作 Row*/
    renderBatchOperation() {
        let format = this.props.intl.formatMessage;
        return this.state.batchOperation
            ? <AkRow
                    type="flex"
                    justify="start"
                    align="middle"
                    className="row-w150 row-advsearch cursor font14">
                    <AkCol>
                        <span
                            onClick={this
                            .OperationRemindList
                            .bind(this)}>
                            <FormattedMessage id={ActivityTaskPageLocale.OperationRemind}></FormattedMessage>
                            <AkIcon
                                type="mail"
                                style={{
                                fontSize: "14px"
                            }}></AkIcon>
                        </span>
                    </AkCol>
                    <AkCol>
                        <span onClick={() => this.showForwardModal()}>
                            <FormattedMessage id={ActivityTaskPageLocale.OperationForward}></FormattedMessage>
                            <AkIcon
                                type="export"
                                style={{
                                fontSize: "14px"
                            }}></AkIcon>
                        </span>
                    </AkCol>
                    <AkCol>
                        <AkButton
                            onClick={() => {
                            this.setState({
                                batchOperation: !this.state.batchOperation,
                                normalSearch: true
                            })
                        }}>
                            <FormattedMessage id={ActivityTaskPageLocale.OperationClose}></FormattedMessage>
                        </AkButton>
                    </AkCol>
                </AkRow>
            : null;
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
                    topThis.setState({showForwardModal: false,changeTaskAssigneeRequest: {}});
                }}
                    onOk={() => {
                    if (!topThis.state.batchOperation) {
                        topThis.OperationForward();
                    } else {
                        topThis.OperationForwardList();
                    }
                    topThis.setState({showForwardModal: false});
                }}
                    title={format({id: ActivityTaskPageLocale.PropsChangeAssignee})}>
                    <AkRow type="flex" justify="end" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ActivityTaskPageLocale.PropsChangeAssignee}></FormattedMessage>
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
        let search = null;
        if (this.state.advSearch) {
            search = this.renderAdvSearch();
        } else if (this.state.batchOperation) {
            search = this.renderBatchOperation();
        } else {
            search = this.renderSearch();
        }

        return <MainContent Header={NavLocale.FlowActivityTask} Search={search}>
            {this.renderForwardModal()}
            <TaskTable
                pagination={{
                total: this.state.totalCount,
                pageSize: this.state.taskRequest.pageSize,
                onChange: (current) => {
                    this.state.taskRequest.pageIndex = current;
                    this.loadData();
                }
            }}
                rowKey="TaskID"
                rowSelection={this.state.batchOperation
                ? this.rowSelection
                : null}
                loading={this.state.loading}
                columns={this.columns}
                dataSource={this.state.taskData}></TaskTable>
        </MainContent>
    }
}
class ActivityTaskPageStyle {}

export default injectIntl(withRouter(ActivityTaskPage))
