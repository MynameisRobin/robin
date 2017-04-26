import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { AkmiiHeader } from '../../component/frame/header';
import { AkRow } from '../../component/controls/ak-row';
import { AkCol } from '../../component/controls/ak-col';
import { AkIcon } from '../../component/controls/ak-icon';
import { PathConfig } from '../../config/pathconfig';
import { FlowRulesPageLocale } from '../../locales/localeid';
import { AkTable, AkColumnProps } from '../../component/controls/ak-table';
import { MainContent } from '../components/maincontent';
import { FlowRulesAPI } from '../../api/flowrules';
import { Select } from 'antd';
import { AkInput } from '../../component/controls/ak-input';
import { AkSelect } from '../../component/controls/ak-select';
import { ApplicationStatusLocale } from '../../api/procinst';
import { AkPaginationProps } from '../../component/controls/ak-pagination';
import { AkTag } from '../../component/controls/ak-tag';
import { ProcDefsAPI } from '../../api/procdefs';
import { AkModal } from '../../component/controls/ak-modal';
import { AkNotification } from '../../component/controls/ak-notification';
import { AkButton } from '../../component/controls/ak-button';
import { AkUpload } from '../../component/controls/ak-upload';
import { render } from 'react-dom';
import { AkDropDown } from '../../component/controls/ak-dropdown';
import { AkMenu } from '../../component/controls/ak-menu';

class RulesTable extends AkTable<FlowRules> { }
interface RulesColumn extends AkColumnProps<FlowRules> { }

interface FlowRulesProps extends IntlProps { }
interface FlowRulesStates {
    loading?: boolean;
    total?: number;
    rulesDataList?: FlowRules[];
    /**获取所有规则 */
    getRulesRequest?: GetAllFlowRulesRequest;
    /**删除规则 */
    deleteRulesRequest?: DeleteFlowRulesRequest;
    /**根据key查询*/
    getFlowRulesByKeyRequest?: GetFlowRulesByKeyRequest;
    /**更新规则 */
    putFlowRulesRequest?: PutFlowRulesRequest;
    /**添加规则 */
    postFlowRulesRequest?: PostFlowRulesRequest;
    /**显示弹窗 */
    showDialog?: boolean;
}

/** 流程编号管理 */
class FlowRulesPage extends Component<FlowRulesProps,
    FlowRulesStates> {
    columns: AkColumnProps<FlowRules>[];

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.state = {
            rulesDataList: [],
            getRulesRequest: {},
            postFlowRulesRequest: {}
        }

        this.columns = [
            {
                title: format({ id: FlowRulesPageLocale.ColumnName }),
                key: FlowRulesPageLocale.ColumnName,
                dataIndex: "DefKey"
            }, {
                title: format({ id: FlowRulesPageLocale.ColumnRules }),
                key: FlowRulesPageLocale.ColumnRules,
                dataIndex: "Prefix"
            }, {
                key: FlowRulesPageLocale.ColumnControl,
                className: "ak_align_r",
                dataIndex: "",
                render: (txt, record) => {
                    let menuChild = <AkMenu>
                        <AkMenu.Item>
                            <a onClick={() => {
                                this.saveRules()
                            } }>
                                {format({ id: FlowRulesPageLocale.ColumnBtnEdit })}
                            </a>
                        </AkMenu.Item>
                        <AkMenu.Item>
                            <a onClick={() => {
                                this.deleteRules(record.DefKey)
                            } }>
                                {format({ id: FlowRulesPageLocale.ColumnBtnDelete })}
                            </a>
                        </AkMenu.Item>
                    </AkMenu>
                    return <AkDropDown trigger={['click']} overlay={menuChild}>
                        <AkIcon type="ellipsis" className="ak-ellipsis"></AkIcon>
                    </AkDropDown>
                }
            }
        ]
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({ loading: true })
        FlowRulesAPI
            .getAllFlowRules(this.state.getRulesRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({ loading: false, rulesDataList: data.Data, total: data.TotalCount, showDialog: false })
                } else {
                    AkNotification.warning({ message: '提示', description: data.Message });
                }
            });
    }

    saveRules() {
        FlowRulesAPI
            .postFlowRules(this.state.postFlowRulesRequest)
            .then(data => {
                if (data.Status == "0") {
                    AkNotification.success({ message: '提示', description: data.Message });
                    this.loadData();
                } else {
                    AkNotification.warning({ message: '提示', description: data.Message });
                }
            });
    }
    deleteRules(key) {
        FlowRulesAPI
            .delFlowRules(this.state.getRulesRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                } else {
                    AkNotification.warning({ message: '提示', description: data.Message });
                }
            });
    }

    /**规则类型 */
    renderSelect() {
        let format = this.props.intl.formatMessage;
        let rulesType = [
            {
                text: format({ id: FlowRulesPageLocale.RulesTypeDefault }),
                value: "0"
            }, {
                text: format({ id: FlowRulesPageLocale.RulesTypeFixedCharacter }),
                value: "1"
            }, {
                text: format({ id: FlowRulesPageLocale.RulesTypeDynamicDigital }),
                value: "2"
            }, {
                text: format({ id: FlowRulesPageLocale.RulesTypeConnector }),
                value: "3"
            }
        ];

        let option = rulesType.map(function (entry, index) {
            return <AkSelect.Option key={index} value={entry.value}>{entry.text}</AkSelect.Option>
        });

        return <AkRow>
            <AkCol>
                <AkIcon type="arrow-down"></AkIcon>
                <AkIcon type="arrow-up"></AkIcon>
                <AkIcon type="delete"></AkIcon>
            </AkCol>
        </AkRow>
    }

    renderAddOrEditModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;

        return topThis.state.showDialog
            ? <AkModal
                style={{
                    width: "80%"
                }}
                maskClosable={false}
                visible={topThis.state.showDialog}
                title={format({ id: FlowRulesPageLocale.PropsDialogTitle })}
                onCancel={() => {
                    topThis.setState({ showDialog: false })
                } }
                onOk={() => {
                    topThis.saveRules();
                } }>
                <AkRow type="flex" justify="start" align="middle" className="mb20">
                    <AkCol span={4}>
                        <FormattedMessage id={FlowRulesPageLocale.PropsDialogNumberPreview}></FormattedMessage >
                    </AkCol>
                    < AkCol span={18}>
                        <label></label>
                    </AkCol>
                    <AkCol span={2}>
                        <FormattedMessage id={FlowRulesPageLocale.PropsDialogControl}></FormattedMessage >
                    </AkCol>
                    <AkCol span={24}>
                        <AkRow type="flex" justify="space-around" align="middle">
                            <AkCol span={4}>
                                <AkInput value={"自增数字"} disabled></AkInput>
                            </AkCol>
                            <AkCol span={2}>
                                位数:</AkCol>
                            <AkCol span={6}>
                                <AkInput
                                    allowClear={true}
                                    placeholder={"请输入1到20的数字"}
                                    onChange={(value => {
                                        this.state.postFlowRulesRequest.customLength = value;
                                    })}></AkInput>
                            </AkCol>
                            <AkCol span={3}>
                                起始于：
                                </AkCol>
                            <AkCol span={6}>
                                <AkInput
                                    allowClear={true}
                                    placeholder={"请输入不大于位数的数字"}
                                    onChange={(value => {
                                        this.state.postFlowRulesRequest.startIndex = value;
                                    })}></AkInput>
                            </AkCol >
                            <AkCol span={3}>
                                <AkIcon type="arrow-down"></AkIcon>
                                <AkIcon type="arrow-up"></AkIcon>
                            </AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol span={24}>
                    </AkCol>
                    <AkCol>
                        {/*<a onClick={() => topThis.addRules()}>
                                <FormattedMessage id={FlowRulesPageLocale.BtnDialogAdd}></FormattedMessage>
                            </a>*/}
                    </AkCol>
                </AkRow>
            </AkModal >
            : null;
    }

    render() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let search = <AkButton
            icon="add"
            onClick={() => {
                topThis.setState({ showDialog: true });
            } }>{format({ id: FlowRulesPageLocale.PropsAddNew })}</AkButton>;
        let pagination: AkPaginationProps = {
            total: topThis.state.total,
            pageSize: Number(topThis.state.getRulesRequest.pageSize),
            onChange: (current) => {
                topThis.state.getRulesRequest.pageIndex = current + "";
            }
        }
        return <MainContent Header={FlowRulesPageLocale.PropsHeaderTitle} Search={search}>
            <RulesTable
                rowKey="DefKey"
                pagination={pagination}
                columns={topThis.columns}
                loading={topThis.state.loading}
                dataSource={topThis.state.rulesDataList}></RulesTable>
            {topThis.renderAddOrEditModal()}
        </MainContent>
    }
}
class FlowRulesStyle { }

export default injectIntl(withRouter(FlowRulesPage))
