import * as React from 'react'
import {Component} from 'react'
import {withRouter, Link} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {NavLocale, FormLocale, WaitingTaskPageLocale} from '../locales/localeid';
import {TaskAPI, TaskOutcomeLocale} from '../api/task';
import {AkTable, AkColumnProps} from '../component/controls/ak-table';
import {AkIcon} from '../component/controls/ak-icon';
import {AkRow} from '../component/controls/ak-row';
import {AkCol} from '../component/controls/ak-col';
import {AkSelect} from '../component/controls/ak-select';
import {AkInput} from '../component/controls/ak-input';
import {AkButton} from '../component/controls/ak-button';
import {MainContent} from './components/maincontent';
import {PathConfig} from '../config/pathconfig';
import {ApplicationStatusEnum, ApplicationStatusLocale} from '../api/procinst';
import {AkTag} from '../component/controls/ak-tag';

class TaskTable extends AkTable < TaskInfo > {}
interface TaskAkColumn extends AkColumnProps < TaskInfo > {}

interface WaitintTaskProps extends IntlProps,
ReactRouter.RouteComponentProps < void,
void > {}
interface WaitintTaskStates {
    taskData?: TaskInfo[];
    loading?: boolean;
    taskRequest?: GetTaskRequest;
}

/** 新建流程 */
class WaitintTask extends Component < WaitintTaskProps,
WaitintTaskStates > {

    columns : TaskAkColumn[];
    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.columns = [
            {
                title: format({id: WaitingTaskPageLocale.ColumnProcessID}),
                key: WaitingTaskPageLocale.ColumnProcessID,
                dataIndex: "FlowNo",
                sorter: (a, b) => a.TaskID - b.TaskID,
                render: (txt, record, index) => {
                    return <Link
                        to={{
                        pathname: PathConfig.ApproveProcess,
                        query: {
                            taskId: record.TaskID,
                            instId: record.ProcInstID
                        }
                    }}>{txt}</Link>
                }
            }, {
                title: format({id: WaitingTaskPageLocale.ColumnProcessName}),
                key: WaitingTaskPageLocale.ColumnProcessName,
                dataIndex: "Name"
            }, {
                title: format({id: WaitingTaskPageLocale.ColumnProcessCategory}),
                key: WaitingTaskPageLocale.ColumnProcessCategory,
                dataIndex: "CategoryName"
            }, {
                title: format({id: WaitingTaskPageLocale.ColumnProcessCreateBy}),
                key: WaitingTaskPageLocale.ColumnProcessCreateBy,
                dataIndex: "CreatedBy"
            }, {
                title: format({id: WaitingTaskPageLocale.ColumnProcessCreateted}),
                key: WaitingTaskPageLocale.ColumnProcessCreateted,
                dataIndex: "CreatedStr",
                sorter: (a, b) => a.CreatedStr - b.CreatedStr
            }, {
                title: format({id: WaitingTaskPageLocale.ColumnProcessDuedate}),
                key: WaitingTaskPageLocale.ColumnProcessDuedate,
                dataIndex: "DueDateStr"
            }
        ];
        this.state = {
            loading: true,
            taskData: [],
            taskRequest: {
                type: 1,
                pageIndex: 1,
                pageSize: 20
            }
        };
    }

    componentDidMount() {
        this.loadData();
    }

    /**
     * 加载全部流程数据
     */
    loadData() {
        this.setState({loading: true})
        TaskAPI
            .getTask(this.state.taskRequest)
            .then(data => {
                this.setState({loading: false, taskData: data.Data})
            });
    }

    renderSearch() {
        let format = this.props.intl.formatMessage;
        return <AkRow type="flex" justify="space-around" align="middle" className="row-w150">
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={value => {
                    this.state.taskRequest.flowNo = value
                }}
                    placeholder={format({id: WaitingTaskPageLocale.SearchInputID})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={value => {
                    this.state.taskRequest.flowName = value
                }}
                    placeholder={format({id: WaitingTaskPageLocale.SearchInputName})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={value => {
                    this.state.taskRequest.applicantID = value
                }}
                    placeholder={format({id: WaitingTaskPageLocale.SearchInputCreatedBy})}></AkInput>
            </AkCol>
            <AkCol>
                <AkButton
                    icon="search"
                    onClick={() => {
                    this.loadData()
                }}></AkButton>
            </AkCol>
        </AkRow>
    }
    render() {
        let topThis = this;
        return <MainContent
            Header={WaitingTaskPageLocale.HeaderTitle}
            Search={this.renderSearch()}>
            <TaskTable
                pagination={{
                total: this.state.taskData.length,
                pageSize:this.state.taskRequest.pageSize,
                onChange: (current) => {
                    topThis.state.taskRequest.pageIndex = current;
                    topThis
                        .loadData
                        .bind(topThis);
                }
            }}
                rowKey="TaskID"
                columns={topThis.columns}
                loading={this.state.loading}
                dataSource={this.state.taskData}></TaskTable>
        </MainContent>
    }
}
class WaitintTaskStyle {}

export default injectIntl(withRouter(WaitintTask))
