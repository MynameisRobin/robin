import * as React from 'react'
import {Component} from 'react'
import {withRouter, Link} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {AkmiiHeader} from '../../component/frame/header';
import {AkRow} from '../../component/controls/ak-row';
import {AkCol} from '../../component/controls/ak-col';
import {AkTable, AkColumnProps} from '../../component/controls/ak-table';
import {NavLocale, ProcessInstPageLocale} from '../../locales/localeid';
import {AkIcon} from '../../component/controls/ak-icon';
import {ProcInstAPI, ApplicationStatusEnum, ApplicationStatusLocale} from '../../api/procinst';
import {MainContent} from '../components/maincontent';
import {AkButton} from '../../component/controls/ak-button';
import {AkSelect} from '../../component/controls/ak-select';
import {AkInput} from '../../component/controls/ak-input';
import {PathConfig} from '../../config/pathconfig';
import {CategoryAPI} from '../../api/category';
import {AkTag} from '../../component/controls/ak-tag';

class ProcInstAkTable extends AkTable < AppModel > {}
interface ProcInstAkColumn extends AkColumnProps < AppModel > {}

interface ProcInstPageProps extends IntlProps {}
interface ProcInstPageStates {
    loading?: boolean;
    totalCount?: number;
    instRequest?: GetProcInstRequest;
    instDataList?: AppModel[];
    categoryList?: CategoryInfo[];
    statusList?: {
        key?: string;
        value?: string;
    }[];
}
/** 实例列表页 */
class ProcInstPage extends Component < ProcInstPageProps,
ProcInstPageStates > {

    columns : AkColumnProps < AppModel > []

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.columns = [
            {
                title: format({id: ProcessInstPageLocale.ColumnInstID}),
                key: ProcessInstPageLocale.ColumnInstID,
                dataIndex: "FlowNo",
                render: (txt, record, index) => {
                    return <Link
                        to={{
                        pathname: PathConfig.ProcInstItme,
                        query: {
                            aId: record.ApplicationID
                        }
                    }}>{txt}</Link>
                }
            }, {
                title: format({id: ProcessInstPageLocale.ColumnKey}),
                key: ProcessInstPageLocale.ColumnKey,
                dataIndex: "DefKey"
            }, {
                title: format({id: ProcessInstPageLocale.ColumnInstName}),
                key: ProcessInstPageLocale.ColumnInstName,
                dataIndex: "FlowName"
            }, {
                title: format({id: ProcessInstPageLocale.ColumnInstCategory}),
                key: ProcessInstPageLocale.ColumnInstCategory,
                dataIndex: "CategoryName"
            }, {
                title: format({id: ProcessInstPageLocale.ColumnInstVersion}),
                key: ProcessInstPageLocale.ColumnInstVersion,
                dataIndex: "Version"
            }, {
                title: format({id: ProcessInstPageLocale.ColumnInstCreated}),
                key: ProcessInstPageLocale.ColumnInstCreated,
                dataIndex: "CreatedStr"
            }, {
                title: format({id: ProcessInstPageLocale.ColumnInstCreatedBy}),
                key: ProcessInstPageLocale.ColumnInstCreatedBy,
                dataIndex: "CreatedBy"
            }, {
                title: format({id: ProcessInstPageLocale.ColumnInstStatus}),
                key: ProcessInstPageLocale.ColumnInstStatus,
                dataIndex: "Status",
                render: (text, record) => {
                    return <AkTag>{format({
                            id: ApplicationStatusLocale + text
                        })}</AkTag>
                }
            }
        ];
        this.state = {
            instRequest: {
                pageSize: 20,
                pageIndex: 1
            },
            statusList: []
        }
    }
    componentDidMount() {
        this.initData();
        this.loadData();
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
        CategoryAPI
            .getCategory({})
            .then(data => {
                this.setState({categoryList: data.Data})
            });
    }
    /**获取列表数据 */
    loadData() {
        this.setState({loading: true});
        ProcInstAPI
            .getActivityProcInst(this.state.instRequest)
            .then(data => {
                this.setState({loading: false, totalCount: data.TotalCount, instDataList: data.Data})
            });
    }
    render() {
        let search = <AkRow align="middle" justify="start" type="flex" className="row-w150">
            <AkCol>
                <AkSelect
                    value={this.state.instRequest.status}
                    onChange={(value) => {
                    this.state.instRequest.status = value as string;
                    this.setState({instRequest: this.state.instRequest})
                }}
                    placeholder={this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstPageLocale.ColumnInstStatus})}
                    allowClear={true}>
                    {this.state.statusList
                        ? this
                            .state
                            .statusList
                            .map((entry) => {
                                return <AkSelect.Option key={entry.key} value={entry.value + ""}>{entry.key}</AkSelect.Option>
                            })
                        : null}
                </AkSelect>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={(value) => {
                    this.state.instRequest.flowNo = value;
                    this.setState({instRequest: this.state.instRequest})
                }}
                    onPressEnter=
                    {() => { this.loadData(); } }
                    placeholder={this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstPageLocale.SearchFlowNo})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={(value) => {
                    this.state.instRequest.applicantUserID = value;
                    this.setState({instRequest: this.state.instRequest})
                }}
                    onPressEnter=
                    {() => { this.loadData(); } }
                    placeholder={this
                    .props
                    .intl
                    .formatMessage({id: ProcessInstPageLocale.SearchCreatedBy})}></AkInput>
            </AkCol>
            <AkCol>
                <AkButton
                    icon="search"
                    onClick={() => {
                    this.loadData()
                }}></AkButton>
            </AkCol>
        </AkRow>

        return <MainContent Header={NavLocale.FlowProcInstActivity} Search={search}>
            <AkRow>
                <AkCol>
                    <ProcInstAkTable
                        rowKey="ApplicationID"
                        pagination={{
                        total: this.state.totalCount,
                        pageSize: this.state.instRequest.pageSize,
                        onChange: (current) => {
                            this.state.instRequest.pageIndex = current;
                            this.loadData();
                        }
                    }}
                        columns={this.columns}
                        loading={this.state.loading}
                        dataSource={this.state.instDataList}></ProcInstAkTable>
                </AkCol>
            </AkRow>
        </MainContent>
    }
}
class ProcInstPageStyle {}

export default injectIntl(withRouter(ProcInstPage))
