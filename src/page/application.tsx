import * as React from 'react'
import {Component} from 'react'
import {withRouter} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {NavLocale, FormLocale, ApplicationPageLocale} from '../locales/localeid';
import {ApplyAPI} from '../api/apply';
import {AkTable, AkColumnProps} from '../component/controls/ak-table';
import {AkIcon} from '../component/controls/ak-icon';
import {AkRow} from '../component/controls/ak-row';
import {AkCol} from '../component/controls/ak-col';
import {AkSelect} from '../component/controls/ak-select';
import {AkInput} from '../component/controls/ak-input';
import {AkButton} from '../component/controls/ak-button';
import {AkModal} from '../component/controls/ak-modal';
// import { AkPopover } from '../component/controls/ak-popover';
import {Popover, Tooltip, Badge} from "antd";
import {MainContent} from './components/maincontent';
import {AkTag} from '../component/controls/ak-tag';
import {ApplicationStatusEnum, ApplicationStatusLocale} from '../api/procinst';

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];
class TaskTable extends AkTable < TaskInfo > {}
interface TaskAkColumn extends AkColumnProps < TaskInfo > {}

interface ApplicationProps extends IntlProps,
ReactRouter.RouteComponentProps < void,
void > {}
interface ApplicationStates {
    visible?: boolean;
    totalCount?: number;
    loading?: boolean;
    search?: boolean;
    applyData?: ApplyInfo[];
    applyRequest?: GetApplyRequest
    statusList?: {
        key?: string;
        value?: string;
    }[];
}

/** 我的申请 */
class Application extends Component < ApplicationProps,
ApplicationStates > {
    columns : TaskAkColumn[];
    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.state = {
            statusList: [],
            applyData: [],
            applyRequest: {
                pageIndex: 1,
                pageSize: 20
            },
            visible: false
        };
//         this.columns = [
//             {
//                 title: format({id: ApplicationPageLocale.ColumnProcessID}),
//                 key: ApplicationPageLocale.ColumnProcessID,
//                 dataIndex: "FlowNo",
//                 sorter: (a, b) => a.TaskID - b.TaskID
//             }, {
//                 title: format({id: ApplicationPageLocale.ColumnProcessName}),
//                 key: ApplicationPageLocale.ColumnProcessName,
//                 dataIndex: "FlowName"
//             }, {
//                 title: format({id: ApplicationPageLocale.ColumnProcessCategory}),
//                 key: ApplicationPageLocale.ColumnProcessCategory,
//                 dataIndex: "CategoryName"
//             }, {
//                 title: format({id: ApplicationPageLocale.ColumnProcessCreated}),
//                 key: ApplicationPageLocale.ColumnProcessCreated,
//                 dataIndex: "CreatedStr",
//                 sorter: (a, b) => a.CreatedStr - b.CreatedStr
//             }, {
//                 title: format({id: ApplicationPageLocale.ColumnProcessStatus}),
//                 key: ApplicationPageLocale.ColumnProcessStatus,
//                 dataIndex: "Status",
//                 render: (text, record) => {
//                     let tag = format({
//                         id: ApplicationStatusLocale + text
//                     });
//                     switch (text - 0) {
//                         case 1:
//                             let aLint = <a
//                                 onClick={this
//                                 .confirm
//                                 .bind(this)}>
//                                 {format({id: ApplicationPageLocale.StatusRecall})
// }
//                             </a>

//                             return <AkTag>
//                                 <Popover
//                                     content={format({id: ApplicationPageLocale.StatusCancel})}
//                                     title={aLint}
//                                     trigger="click">{tag}</Popover >
//                             </AkTag>
//                         case 3:
//                             return <AkTag>
//                                 <Tooltip
//                                     placement="right"
//                                     title={format({id: ApplicationPageLocale.StatusTip})}>
//                                     {tag}
//                                 </Tooltip>
//                             </AkTag>
//                         default:
//                             return <AkTag>{tag}</AkTag>
//                     }
//                 }
//             }
//         ];
    }

    componentDidMount() {
        this.loadData();
        this.initData();
    }

    /**
     * 加载全部流程数据
     */
    loadData() {
        // this.setState({loading: true});
        // ApplyAPI
        //     .getApply(this.state.applyRequest)
        //     .then(data => {
        //         console.log(data);
        //         this.setState({loading: false, totalCount: data.TotalCount, applyData: data.Data})
        //     });
        this.columns = [
            {
                title: "123123",
                key: "1",
                dataIndex: "123123"
            },
             {
                title: "123123",
                key: "1",
                dataIndex: "123123"
            }, {
                title: "123123",
                key: "1",
                dataIndex: "123123"
            }
        ];
    }
    initData() {
        for (var prop in ApplicationStatusEnum) {
            if (isNaN(parseInt(prop))) {
                this
                    .state
                    .statusList
                    .push({key: prop, value: ApplicationStatusEnum[prop]})
            }
        }
    }
    confirm() {
        let format = this.props.intl.formatMessage;
        AkModal.confirm({
            title: format({id: ApplicationPageLocale.ModalTitle}),
            content: format({id: ApplicationPageLocale.ModalContent}),
            okText: format({id: ApplicationPageLocale.ModalOkText}),
            cancelText: format({id: ApplicationPageLocale.ModalCancelText})
        });
    }
    renderSearch() {
        let format = this.props.intl.formatMessage;
        let option = this
            .state
            .statusList
            .map((entry) => {
                return <AkSelect.Option key={entry.key} value={entry.value + ""}>{entry.key}</AkSelect.Option>
            });

        return <AkRow type="flex" align="middle" justify="space-around" className="row-w150">
            <AkCol>
                <AkSelect
                    allowClear
                    onChange={(value) => {
                    this.state.applyRequest.status = value as string;
                }}
                    placeholder={format({id: ApplicationPageLocale.SearchSelectStatus})}>
                    {option}
                </AkSelect>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    value={this.state.applyRequest.flowNo}
                    onChange={(value) => {
                    this.state.applyRequest.flowNo = value;
                    this.setState({applyRequest: this.state.applyRequest})
                }}
                    placeholder={format({id: ApplicationPageLocale.SearchInputProcessID})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    value={this.state.applyRequest.flowName}
                    onChange={(value) => {
                    this.state.applyRequest.flowName = value;
                    this.setState({applyRequest: this.state.applyRequest})
                }}
                    placeholder={format({id: ApplicationPageLocale.SearchInputProcessName})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={(value) => {
                    this.state.applyRequest.applicantUserID = value;
                    this.setState({applyRequest: this.state.applyRequest})
                }}
                    placeholder={format({id: ApplicationPageLocale.SearchInputCreateBy})}></AkInput>
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
            Header={ApplicationPageLocale.HeaderTitle}
            Search={topThis.renderSearch()}>
            <TaskTable
                rowKey="FlowNo"
                loading={this.state.loading}
                pagination={{
                total: this.state.totalCount,
                pageSize: this.state.applyRequest.pageSize,
                onChange: (current) => {
                    this.state.applyRequest.pageIndex = current;
                    topThis.loadData();
                }
            }}
                columns={this.columns}
                dataSource={dataSource}></TaskTable>
        </MainContent>
    }
}
class ApplicationStyle {}

export default injectIntl(withRouter(Application))
