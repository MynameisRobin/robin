import * as React from 'react'
import {Component} from 'react'
import {FormattedMessage} from 'react-intl';
import {ApplyContentLocale} from '../../locales/localeid';
import {AkRow} from '../../component/controls/ak-row';
import {AkCol} from '../../component/controls/ak-col';
import {AkTable, AkColumnProps} from '../../component/controls/ak-table';
import { AkButton } from '../../component/controls/ak-button';

class TaskTable extends AkTable < TaskInfo > {}
interface TaskAkColumn extends AkColumnProps < TaskInfo > {}

interface LogContentProps extends IntlProps {
    taskDetail?: TaskDetailInfo;
}
interface LogContentStates {}
export class LogContent extends Component < LogContentProps,
LogContentStates > {

    columns : TaskAkColumn[];
    constructor(props, context) {
        super(props, context);
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
                key: "StartTimeStr",
                dataIndex: "StartTimeStr"
            }, {
                key: "Comment",
                dataIndex: "Comment"
            }
        ];
    }

    renderTaskTable(item:ProcessLog) {
        const {ProcInstModel,TaskList}=item;
        const title = <AkRow justify="space-around" type="flex" align="middle">
            <AkCol>
                <FormattedMessage id={"提交时间"}></FormattedMessage>
                {ProcInstModel.StartTimeStr}
                <FormattedMessage id={"状态"}></FormattedMessage>
                {ProcInstModel.Status}
            </AkCol>
            <AkCol>
                <AkButton onClick={()=>{}}>
                    <FormattedMessage id={"流程图"}></FormattedMessage>
                </AkButton>
            </AkCol>
        </AkRow>;
        return <TaskTable
            pagination={false}
            rowKey="TaskID"
            showHeader={false}
            dataSource={TaskList}
            columns={this.columns}
            title={() => {
            return title
        }}></TaskTable>
    }
    render() {
        return <AkRow>
            <AkRow className="ak-form-title">
                <span className="title-bluespan"></span>
                <span></span>
                <FormattedMessage id={ApplyContentLocale.LogTitle}></FormattedMessage>
            </AkRow>
            <AkRow>
                {this.props.taskDetail && this.props.taskDetail.ProcessLogList
                    ? this
                        .props
                        .taskDetail
                        .ProcessLogList
                        .map((entry) => {
                            return this.renderTaskTable(entry);
                        })
                    : null}
            </AkRow>
        </AkRow>
    }
}
class LogContentStyle {}
