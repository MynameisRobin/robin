import * as React from 'react'
import {Component} from 'react'
import {withRouter, Link} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {NavLocale, FinishTaskPageLocale} from '../locales/localeid';
import {TaskAPI, TaskOutcomeLocale} from '../api/task';
import {AkTable, AkColumnProps} from '../component/controls/ak-table';
import {AkIcon} from '../component/controls/ak-icon';
import {AkRow} from '../component/controls/ak-row';
import {AkCol} from '../component/controls/ak-col';
import {AkSelect} from '../component/controls/ak-select';
import {AkInput} from '../component/controls/ak-input';
import {AkButton} from '../component/controls/ak-button';
import {MainContent} from './components/maincontent';
import {AkTag} from '../component/controls/ak-tag';
import {PathConfig} from '../config/pathconfig';
import {ApplicationStatusEnum, ApplicationStatusLocale} from '../api/procinst';

class TaskTable extends AkTable < TaskInfo > {}
interface TaskAkColumn extends AkColumnProps < TaskInfo > {}

interface FinishTaskProps extends IntlProps,
ReactRouter.RouteComponentProps < void,
void > {}
interface FinishTaskStates {
    totalCount?: number;
    taskData?: TaskInfo[];
    loading?: boolean;
    search?: boolean;
    taskRequest?: GetTaskRequest;
}

/** 已办任务列表 */
class FinishTask extends Component < FinishTaskProps,
FinishTaskStates > {
    columns : TaskAkColumn[];
    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.columns = [
            {
                title: format({id: FinishTaskPageLocale.ColumnProcessID}),
                key: FinishTaskPageLocale.ColumnProcessID,
                dataIndex: "FlowNo",
                render: (txt, record, index) => {
                    return <Link
                        to={{
                        pathname: PathConfig.FinishTaskItem,
                        query: {
                            taskId: record.TaskID,
                            instId: record.ProcInstID
                        }
                    }}>{txt}</Link>
                }
            }, {
                title: format({id: FinishTaskPageLocale.ColumnTaskName}),
                key: FinishTaskPageLocale.ColumnTaskName,
                dataIndex: "Name"
            }, {
                title: format({id: FinishTaskPageLocale.ColumnProcessName}),
                key: FinishTaskPageLocale.ColumnProcessName,
                dataIndex: "ProcDefName"
            }, {
                title: format({id: FinishTaskPageLocale.ColumnProcessCategory}),
                key: FinishTaskPageLocale.ColumnProcessCategory,
                dataIndex: "CategoryName"
            }, {
                title: format({id: FinishTaskPageLocale.ColumnProcessCreateBy}),
                key: FinishTaskPageLocale.ColumnProcessCreateBy,
                dataIndex: "CreatedBy"
            }, {
                title: format({id: FinishTaskPageLocale.ColumnProcessCreated}),
                key: FinishTaskPageLocale.ColumnProcessCreated,
                dataIndex: "CreatedStr"
            }, {
                title: format({id: FinishTaskPageLocale.ColumnTaskOutcome}),
                key: FinishTaskPageLocale.ColumnTaskOutcome,
                dataIndex: "Outcome",
                render: (text, record) => {
                    return text;
                }
            }
        ];
        this.state = {
            taskData: [],
            taskRequest: {
                type: 2,
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
                this.setState({loading: false, totalCount: data.TotalCount, taskData: data.Data})
            });
    }

    render() {
        let format = this.props.intl.formatMessage;
        let search = <AkRow type="flex" align="middle" justify="space-around" className="row-w150">
            <AkCol>
                <AkInput
                    allowClear={true}
                    value={this.state.taskRequest.flowNo}
                    onChange={(value) => {
                    this.state.taskRequest.flowNo = value;
                    this.setState({taskRequest: this.state.taskRequest})
                }}
                    placeholder={format({id: FinishTaskPageLocale.SearchInputProcessID})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    value={this.state.taskRequest.flowName}
                    onChange={(value) => {
                    this.state.taskRequest.flowName = value;
                    this.setState({taskRequest: this.state.taskRequest})
                }}
                    placeholder={format({id: FinishTaskPageLocale.SearchInputProcessName})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    value={this.state.taskRequest.applicantID}
                    onChange={(value) => {
                    this.state.taskRequest.applicantID = value;
                    this.setState({taskRequest: this.state.taskRequest})
                }}
                    placeholder={format({id: FinishTaskPageLocale.SearchInputCreateBy})}></AkInput>
            </AkCol>
            <AkCol>
                <AkButton
                    icon="search"
                    onClick={() => {
                    this.loadData()
                }}></AkButton>
            </AkCol>
        </AkRow>

        return <MainContent Header={FinishTaskPageLocale.HeaderTitle} Search={search}>
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
                columns={this.columns}
                loading={this.state.loading}
                dataSource={this.state.taskData}></TaskTable>
        </MainContent>
    }
}
class FinishTaskStyle {}

export default injectIntl(withRouter(FinishTask))
