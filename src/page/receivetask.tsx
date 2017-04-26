import * as React from 'react'
import {Component} from 'react'
import {withRouter, Link} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {NavLocale, ReciveTaskPageLocale} from '../locales/localeid';
import {TaskAPI} from '../api/task';
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

interface ReceiveTaskProps extends IntlProps,
ReactRouter.RouteComponentProps < void,
void > {}
interface ReceiveTaskStates {
    taskData?: TaskInfo[];
    loading?: boolean;
    taskRequest?: GetReceiveTaskRequest;
}

/** 领用任务 */
class ReceiveTask extends Component < ReceiveTaskProps,
ReceiveTaskStates > {

    columns : TaskAkColumn[];

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.columns = [
            {
                title: format({id: ReciveTaskPageLocale.ColumnProcessID}),
                key: ReciveTaskPageLocale.ColumnProcessID,
                dataIndex: "TaskID",
                sorter: (a, b) => a.TaskID - b.TaskID,
                render: (txt, record, index) => {
                    return <Link
                        to={{
                        pathname: PathConfig.ReceiveTaskItem,
                        query: {
                            id: record.TaskID
                        }
                    }}>{txt}</Link>
                }
            }, {
                title: format({id: ReciveTaskPageLocale.ColumnTaskName}),
                key: ReciveTaskPageLocale.ColumnTaskName,
                dataIndex: "Name"
            }, {
                title: format({id: ReciveTaskPageLocale.ColumnProcessName}),
                key: ReciveTaskPageLocale.ColumnProcessName,
                dataIndex: "ProcDefName"
            }, {
                title: format({id: ReciveTaskPageLocale.ColumnProcessCategory}),
                key: ReciveTaskPageLocale.ColumnProcessCategory,
                dataIndex: "CategoryName"
            }, {
                title: format({id: ReciveTaskPageLocale.ColumnProposer}),
                key: ReciveTaskPageLocale.ColumnProposer,
                dataIndex: "CreatedBy"
            }, {
                title: format({id: ReciveTaskPageLocale.ColumnApplyTime}),
                key: ReciveTaskPageLocale.ColumnApplyTime,
                dataIndex: "CreatedStr"
            }, {
                title: format({id: ReciveTaskPageLocale.ColumnExpireTime}),
                key: ReciveTaskPageLocale.ColumnExpireTime,
                dataIndex: "EndTimeStr"
            }
        ];
        this.state = {
            taskData: [],
            taskRequest: {
                pageIndex: "1",
                pageSize: "20"
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
            .getReceiveTaskList(this.state.taskRequest)
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
                    placeholder={format({id: ReciveTaskPageLocale.InputProcessID})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={value => {
                    this.state.taskRequest.flowName = value
                }}
                    placeholder={format({id: ReciveTaskPageLocale.InputProcessName})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={value => {
                    this.state.taskRequest.applicantUserID = value
                }}
                    placeholder={format({id: ReciveTaskPageLocale.InputProposer})}></AkInput>
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
            Header={ReciveTaskPageLocale.PropsHeaderTitle}
            Search={this.renderSearch()}>
            <TaskTable
                pagination={{
                total: this.state.taskData.length,
                pageSize: Number(this.state.taskRequest.pageSize),
                onChange: (current) => {
                    topThis.state.taskRequest.pageIndex = current + "";
                    topThis
                        .loadData
                        .bind(topThis);
                }
            }}
                rowKey="TaskID"
                loading={this.state.loading}
                columns={topThis.columns}
                dataSource={this.state.taskData}></TaskTable>
        </MainContent>
    }
}
class ReceiveTaskStyle {
    static leftHeaderStyle : React.CSSProperties = {
        fontSize: '18px',
        marginLeft: '20px'
    }
}

export default injectIntl(withRouter(ReceiveTask))
