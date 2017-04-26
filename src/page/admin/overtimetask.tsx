import * as React from 'react'
import {Component} from 'react'
import {withRouter} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {NavLocale, FormLocale, OverTimeTaskPageLocale} from '../../locales/localeid';
import {AkmiiHeader} from '../../component/frame/'
import {TaskAPI} from '../../api/task';
import {AkTable, AkColumnProps} from '../../component/controls/ak-table';
import {AkIcon} from '../../component/controls/ak-icon';
import {AkRow} from '../../component/controls/ak-row';
import {AkCol} from '../../component/controls/ak-col';
import {AkInput} from '../../component/controls/ak-input';
import {MainContent} from '../components/maincontent';

class TaskTable extends AkTable < TaskInfo > {}
interface TaskAkColumn extends AkColumnProps < TaskInfo > {}

interface OverTimeTaskProps extends IntlProps,
ReactRouter.RouteComponentProps < void,
void > {}
interface OverTimeTaskStates {
    taskData?: TaskInfo[];
    loading?: boolean
}
/** 超时任务 */
class OverTimeTask extends Component < OverTimeTaskProps,
OverTimeTaskStates > {
    columns : TaskAkColumn[];
    /**
     * 获取数据的请求
     */
    taskRequest : GetAdminTaskRequest;

    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: this
                    .props
                    .intl
                    .formatMessage({id: OverTimeTaskPageLocale.ColumnTaskName}),
                key: OverTimeTaskPageLocale.ColumnTaskName,
                dataIndex: "Name"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: OverTimeTaskPageLocale.ColumnTaskAssignee}),
                key: OverTimeTaskPageLocale.ColumnTaskAssignee,
                dataIndex: "AssigneeID"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: OverTimeTaskPageLocale.ColumnTaskProc}),
                key: OverTimeTaskPageLocale.ColumnTaskProc,
                dataIndex: "ProcessName"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: OverTimeTaskPageLocale.ColumnProcCategory}),
                key: OverTimeTaskPageLocale.ColumnProcCategory,
                dataIndex: "ProcessCategory"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: OverTimeTaskPageLocale.ColumnProcVersion}),
                key: OverTimeTaskPageLocale.ColumnProcVersion,
                dataIndex: "ProcessVersion"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: OverTimeTaskPageLocale.ColumnCreated}),
                key: OverTimeTaskPageLocale.ColumnCreated,
                dataIndex: "CreatedStr"
            }, {
                title: this
                    .props
                    .intl
                    .formatMessage({id: OverTimeTaskPageLocale.ColumnDueDate}),
                key: OverTimeTaskPageLocale.ColumnDueDate,
                dataIndex: "DueDateStr"
            }
        ];
        this.taskRequest = {
            pageIndex:1,
            pageSize: 20
        }
        this.state = {
            taskData: []
        };
    }

    componentDidMount() {
        this.loadData();
    }
    /**
     * 加载数据
     */
    loadData() {
        this.setState({loading: true})
        TaskAPI
            .getAdminTask(this.taskRequest)
            .then(data => {
                this.setState({loading: false, taskData: data.Data})
            })
    }

    render() {
        let searchButton = <AkIcon type="search" onClick={() => {
            this.loadData();
        }}></AkIcon>;
        let search = <AkInput
            onChange=
            { (val) => { this.taskRequest.flowNo = val.currentTarget.value; } }
            onPressEnter=
            { () => { this.loadData(); } }
            addonAfter={searchButton}
            placeholder={this
            .props
            .intl
            .formatMessage({id: FormLocale.InputSearch})}></AkInput>
        return <MainContent Header={NavLocale.FlowOverTimeTask} Search={search}>
            <TaskTable
                rowKey="TaskID"
                loading={this.state.loading}
                pagination={false}
                columns={this.columns}
                dataSource={this.state.taskData}></TaskTable>
        </MainContent>
    }
}
class OverTimeTaskStyle {}

export default injectIntl(withRouter(OverTimeTask))
