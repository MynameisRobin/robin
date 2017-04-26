import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { injectIntl, FormattedMessage } from "react-intl";
import { AkRow } from "../../component/controls/ak-row";
import { MainContent } from "../../page/components/maincontent";
import { NavLocale, JobPositionsPageLocale } from "../../locales/localeid";
import { AkTable, AkColumnProps } from "../../component/controls/ak-table";
import { JobPositionsAPI } from "../../api/jobpositions";
import { AkCol } from "../../component/controls/ak-col";
import { AkButton } from "../../component/controls/ak-button";
import { AkModal } from "../../component/controls/ak-modal";
import { AkInput } from "../../component/controls/ak-input";
import { AkIcon } from '../../component/controls/ak-icon';
import { AkDropDown } from '../../component/controls/ak-dropdown';
import { AkMenu } from '../../component/controls/ak-menu';
import { render } from 'react-dom';
import AkIdentityPicker from "../../component/identity/ak-identitypicker";
import { AkIdentity } from "../../api/common/identity";
import { AkNotification } from "../../component/controls/ak-notification";
import { PathConfig } from '../../config/pathconfig';

class JobPositionsTable extends AkTable<JobPositions> { }
interface JobPositionsAkColumn extends AkColumnProps<JobPositions> { }

/***角色列表 */
interface JobPositionsPageProps extends IntlProps { }
interface JobPositionsPageStates {
    // 新建按钮loading
    loading?: boolean;
    // 新建的模态框开关
    visible?: boolean;
    // 修改的模态框开关
    visibleEdit?: boolean;
    totalCount?: number;
    pageSize?: number;
    jobPositionsDataList?: JobPositions[];
    /**获取岗位列表 */
    jobPositionsRequest?: GetJobPositionsRequest;
    /**添加 */
    postJobPositionsRequest?: PostJobPositionsRequest;
    /**编辑 */
    putJobPositionsRequest?: PutJobPositionsRequest;
    /**删除 */
    deleteJobPositionsRequest?: DeleteJobPositionsRequest;
    /**  指派人显示隐藏 */
    taskassignVisible?: boolean;
    /**选人数据信息 */
    directValue?: AkIdentity[];
    /**当前选中行信息 */
    currentJobPosition?: JobPositions;
}
/** 岗位管理页面 */
class JobPositionsPage extends Component<JobPositionsPageProps,
    JobPositionsPageStates> {
    columns: JobPositionsAkColumn[]

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.columns = [
            {
                title: format({ id: JobPositionsPageLocale.ColumnName }),
                key: JobPositionsPageLocale.ColumnName,
                dataIndex: "JobPositionName"
            }, {
                title: format({ id: JobPositionsPageLocale.ColumnAssigner }),
                key: JobPositionsPageLocale.ColumnAssigner,
                render: (txt, record) => {
                    let name = "";
                    record
                        .Users
                        .map( (entry, index) => {
                            name += entry.Name + ";";
                        });
                    return name;
                }
            }, {
                key: JobPositionsPageLocale.ColumnOperation,
                className: "ak_align_r",
                render: (text, record) => {
                    let menuChild = <AkMenu>
                        <AkMenu.Item>
                            <a
                                onClick={() => {
                                    this.setState({ visibleEdit: true, currentJobPosition: record });
                                } }>
                                <AkIcon type="edit"></AkIcon>
                                <FormattedMessage id={JobPositionsPageLocale.OperationEdit}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                        <AkMenu.Item>
                            <a
                                onClick={this
                                    .remove
                                    .bind(this, record)}>
                                <AkIcon type="delete"></AkIcon>
                                <FormattedMessage id={JobPositionsPageLocale.OperationRemove}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                    </AkMenu>
                    return <AkDropDown trigger={['click']} overlay={menuChild}>
                        <AkIcon type="ellipsis" className="ak-ellipsis"></AkIcon>
                    </AkDropDown>
                }
            }
        ];
        this.state = {
            directValue: [],
            jobPositionsRequest: {
                bindingType: 1,
                bindingTargetID: "0"
            },
            postJobPositionsRequest: {},
            putJobPositionsRequest: {},
            deleteJobPositionsRequest: {}
        }
    }
    componentDidMount() {
        this.loadData();
    }
    /**加载列表 */
    loadData() {
        this.setState({ loading: true });
        JobPositionsAPI
            .getJobPositions(this.state.jobPositionsRequest)
            .then(data => {
                if (data.Status != "0") {
                    AkNotification.warning({ message: '提示', description: data.Message });
                }
                this.setState({ loading: false, visible: false, visibleEdit: false, jobPositionsDataList: data.Data, directValue: null });
            });
    }
    /**添加*/
    addJobPosition() {
        let ids = [];
        this.setState({ loading: true });
        this
            .state
            .directValue
            .map(function (entry, index) {
                ids.push(entry.ID);
            });
        this.state.postJobPositionsRequest = {
            ID: "0",
            Name: this.state.postJobPositionsRequest.Name,
            Ext1: null,
            Ext2: null,
            Ext3: null,
            UserIDs: ids,
            BindingType: 1,
            BindingTargetID: "0"
        }
        JobPositionsAPI
            .postJobPositions(this.state.postJobPositionsRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                } else {
                    AkNotification.warning({ message: '提示', description: data.Message });
                    this.setState({ loading: false });
                }
            });
    }
    /**修改 */
    editJobPosition() {
        this.setState({ loading: true });
        let ids = [];
        this
            .state
            .directValue
            .map(function (entry, index) {
                ids.push(entry.ID);
            });
        let name = this.state.putJobPositionsRequest.Name;
        name = name
            ? name
            : this.state.currentJobPosition.JobPositionName;

        this.state.putJobPositionsRequest = {
            ID: this.state.currentJobPosition.JobPositionID,
            Name: name,
            Ext1: null,
            Ext2: null,
            Ext3: null,
            UserIDs: ids,
            BindingType: 1,
            BindingTargetID: "0"
        }

        JobPositionsAPI
            .putJobPositions(this.state.putJobPositionsRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                } else {
                    AkNotification.warning({ message: '提示', description: data.Message });
                    this.setState({ loading: false });
                }
            });
    }
    /**删除 */
    remove(record?: JobPositions) {
        let topThis = this;
        topThis.setState({ loading: true });
        topThis.state.deleteJobPositionsRequest = {
            jobPositionID: record.JobPositionID
        }

        AkModal.confirm({
            title: "删除", //GO TO
            content: "确定删除吗？",
            onOk() {
                JobPositionsAPI
                    .deleteJobPositions(topThis.state.deleteJobPositionsRequest)
                    .then(data => {
                        if (data.Status == "0") {
                            topThis.loadData();
                        } else {
                            AkNotification.warning({ message: '提示', description: data.Message });
                            topThis.setState({ loading: false });
                        }
                    });
            },
            onCancel() {
                topThis.setState({ currentJobPosition: null, loading: false });
            }
        });
    }

    /**新建Modal */
    renderAddModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;

        return topThis.state.visible
            ? <AkModal
                maskClosable={false}
                title={format({ id: JobPositionsPageLocale.ModalTitleAdd })}
                visible={topThis.state.visible}
                onCancel={() => {
                    this.setState({ visible: false, directValue: null })
                } }
                onOk={() => {
                    this.addJobPosition()
                } }>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        {format({ id: JobPositionsPageLocale.ModalRoleName })}
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                this.state.postJobPositionsRequest.Name = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        {format({ id: JobPositionsPageLocale.ModalAssigner })}
                    </AkCol>
                    <AkCol span={20}>
                        <AkIdentityPicker
                            multiple
                            defaultValue={this.state.directValue}
                            onChange={(v) => {
                                let value = v as AkIdentity[];
                                this.setState({ directValue: value });
                            } } />
                    </AkCol>
                </AkRow>
            </AkModal>
            : null;
    }

    /**编辑Modal */
    renderEditModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let jobPosition = topThis.state.currentJobPosition;
        if (!jobPosition) {
            return null;
        }

        let newIdentity = new AkIdentity;
        let identitys = [];
        jobPosition
            .Users
            .map(function (entry, index) {
                newIdentity = {
                    ID: entry.ID,
                    Name: entry.Name,
                    Type: Number(entry.Type),
                    Attr: entry.Attr
                }
                identitys.push(newIdentity);
            })

        return topThis.state.visibleEdit
            ? <AkModal
                maskClosable={false}
                title={format({ id: JobPositionsPageLocale.ButtonEdit })}
                visible={topThis.state.visibleEdit}
                onCancel={() => {
                    this.setState({ visibleEdit: false, directValue: null, currentJobPosition: null });
                } }
                onOk={() => {
                    this.editJobPosition();
                } }>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: JobPositionsPageLocale.ModalTitleEdit })}*</label >
                    </AkCol>
                    < AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={jobPosition.JobPositionName}
                            onChange={(value) => {
                                this.state.putJobPositionsRequest.Name = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow >
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: JobPositionsPageLocale.ModalAssigner })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkIdentityPicker
                            multiple
                            defaultValue={identitys}
                            onChange={(v) => {
                                let value = v as AkIdentity[];
                                this.setState({ directValue: value });
                            } } />
                    </AkCol>
                </AkRow>
            </AkModal>
            : null;
    }

    render() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let search = <AkRow type="flex" align="middle" justify="space-between">
            <AkCol>
                <a
                    href="javascript:;"
                    className="ak-basebtn-text"
                    onClick={() => {
                        this.setState({ visible: true })
                    } }>
                    <AkIcon type="plus"></AkIcon>
                    {format({ id: JobPositionsPageLocale.SearchNew })}
                </a>
            </AkCol>
            <AkCol>
                <Link to={PathConfig.OrganizationRole} className="ak-basebtn-text">
                    <AkIcon type="center"></AkIcon>
                    <FormattedMessage id={JobPositionsPageLocale.SearchRoleOrg}></FormattedMessage>
                </Link>
            </AkCol>
            <AkCol>
                 <Link to={PathConfig.LocationRole} className="ak-basebtn-text">
                    <AkIcon type="location"></AkIcon>
                    <FormattedMessage id={JobPositionsPageLocale.SearchRoleLoc}></FormattedMessage>
                </Link>
            </AkCol>
        </AkRow>

        return <MainContent WithBack Header={NavLocale.PositionSetting} Search={search}>
            {topThis.renderAddModal()}
            {topThis.renderEditModal()}
            <JobPositionsTable
                rowKey="JobPositionID"
                columns={topThis.columns}
                pagination={false}
                dataSource={topThis.state.jobPositionsDataList}
                loading={topThis.state.loading}></JobPositionsTable >
        </MainContent>
    }
}

class JobPositionsPageStyle {
    static inputStyle: React.CSSProperties = {}
}

export default injectIntl(withRouter(JobPositionsPage))
