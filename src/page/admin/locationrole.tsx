import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {injectIntl, FormattedMessage} from "react-intl";
import {AkRow} from '../../component/controls/ak-row';
import {MainContent} from "../../page/components/maincontent";
import {NavLocale, LocationPageLocale} from "../../locales/localeid";
import {AkTable, AkColumnProps} from "../../component/controls/ak-table";
import {JobPositionsAPI} from "../../api/jobpositions";
import {IdentityAPI} from "../../api/common/identity";
import {AkCol} from '../../component/controls/ak-col';
import {AkButton} from "../../component/controls/ak-button";
import {AkModal} from "../../component/controls/ak-modal";
import {AkSelect} from "../../component/controls/ak-select";
import {AkIcon} from "../../component/controls/ak-icon";
import {AkDropDown} from '../../component/controls/ak-dropdown';
import {AkMenu} from '../../component/controls/ak-menu';
import {render} from 'react-dom';
import AkIdentityPicker from "../../component/identity/ak-identitypicker";
import {AkIdentity} from "../../api/common/identity";
import {AkNotification} from "../../component/controls/ak-notification";
import {AkTree} from '../../component/controls/ak-tree';

class LocationPageLocaleTable extends AkTable < JobPositions > {}
interface LocationPageLocaleAkColumn extends AkColumnProps < JobPositions > {}
interface TreeData extends UserInfo {
    Children?: TreeData[]
}

/***组织角色 */
interface LocationPageLocalePageProps extends IntlProps {}
interface LocationPageLocalePageStates {
    // 新建按钮loading
    loading?: boolean;
    // 新建的模态框开关
    visible?: boolean;
    // 修改的模态框开关
    visibleEdit?: boolean;
    LocationPageLocaleDataList?: JobPositions[];
    /**获取岗位列表 */
    LocationPageLocaleRequest?: GetJobPositionsRequest;
    /**添加 */
    postLocationPageLocaleRequest?: PostJobPositionsRequest;
    /**编辑 */
    putLocationPageLocaleRequest?: PutJobPositionsRequest;
    /**删除 */
    deleteLocationPageLocaleRequest?: DeleteJobPositionsRequest;
    /**  指派人显示隐藏 */
    taskassignVisible?: boolean;
    /**选人数据信息 */
    directValue?: AkIdentity[];
    /**当前选中行信息 */
    currentJobPosition?: JobPositions;
    /**当前选择树节点 */
    currentTreeNode?: TreeData;
    /** 左侧树的数据 */
    treeData?: TreeData[];
    /** 展开的节点 */
    expandedKeys?: string[];
    /**  角色人员列表 */
    userRole?: JobPositions[];
}
/** 岗位管理页面 */
class LocationPageLocalePage extends Component < LocationPageLocalePageProps,
LocationPageLocalePageStates > {
    columns : LocationPageLocaleAkColumn[]

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.columns = [
            {
                title: format({id: LocationPageLocale.ColumnName}),
                key: LocationPageLocale.ColumnName,
                dataIndex: "JobPositionName"
            }, {
                title: format({id: LocationPageLocale.ColumnAssigner}),
                key: LocationPageLocale.ColumnAssigner,
                render: (txt, record) => {
                    let name = "";
                    record
                        .Users
                        .map(function (entry, index) {
                            name += entry.Name + ";";
                        });
                    return name;
                }
            }, {
                key: LocationPageLocale.ColumnOperation,
                className: "ak_align_r",
                render: (text, record) => {
                    let menuChild = <AkMenu>
                        <AkMenu.Item>
                            <a
                                onClick={() => {
                                this.setState({visibleEdit: true, currentJobPosition: record});
                            }}>
                                <FormattedMessage id={LocationPageLocale.OperationEdit}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                        <AkMenu.Item>
                            <a
                                onClick={this
                                .remove
                                .bind(this, record)}>
                                <FormattedMessage id={LocationPageLocale.OperationRemove}></FormattedMessage>
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
            LocationPageLocaleRequest: {
                bindingType: 3,
                bindingTargetID: "0"
            },
            postLocationPageLocaleRequest: {},
            putLocationPageLocaleRequest: {},
            deleteLocationPageLocaleRequest: {},
            expandedKeys: [],
            userRole: []
        }
    }
    componentDidMount() {
        this.loadData();
        this.loadUserRole();
    }
    /** 加载树信息  */
    loadData() {
        this.state.treeData = [];
        IdentityAPI
            .getLocations()
            .then(data => {
                if (data.Data) {
                    data
                        .Data
                        .forEach((entry) => {
                            this
                                .state
                                .treeData
                                .push(Object.assign({
                                    ID: entry.ID
                                }, entry))
                        })
                    let exp = this.state.expandedKeys;
                    let expendKey = exp
                        ? exp
                        : [];

                    this.setState({loading: false, treeData: this.state.treeData, visible: false, visibleEdit: false, expandedKeys: expendKey})
                }
            })
    }
    /** 获取角色列表*/
    loadUserRole() {
        let format = this.props.intl.formatMessage;
        this.setState({loading: true});
        JobPositionsAPI
            .getJobPositions({bindingType: 1, bindingTargetID: "0"})
            .then(data => {
                let userRoleData = data.Data;
                userRoleData.push({
                    JobPositionID: "0",
                    JobPositionName: format({id: LocationPageLocale.ModalDefaultChoose})
                });
                if (data.Status != "0") {
                    AkNotification.warning({message: '提示', description: data.Message});
                    this.setState({loading: false, userRole: userRoleData});
                } else {

                    this.setState({loading: false, userRole: userRoleData});
                }
            });
    }
    //获取子节点信息
    loadMetaData(record : TreeData) {
        record.Children = [];

        this.setState({loading: true});
        this.state.LocationPageLocaleRequest = {
            bindingType: 3,
            bindingTargetID: record.ID
        }
        JobPositionsAPI
            .getJobPositions(this.state.LocationPageLocaleRequest)
            .then(data => {
                console.log(data);
                if (data.Status != "0") {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
                if (data.Data) {
                    data
                        .Data
                        .map((entry) => {
                            record
                                .Children
                                .push({ID: entry.JobPositionID, Name: entry.JobPositionName});
                        })
                }
                if (this.state.expandedKeys.indexOf(record.ID) < 0) {
                    this
                        .state
                        .expandedKeys
                        .push(record.ID);
                }

                this.setState({
                    loading: false,
                    treeData: this.state.treeData,
                    expandedKeys: this.state.expandedKeys,
                    LocationPageLocaleDataList: data.Data,
                    currentTreeNode: record,
                    visible: false,
                    visibleEdit: false
                })
            });
    }
    /**添加*/
    addJobPosition() {
        let ids = [];
        this.setState({loading: true});
        this
            .state
            .directValue
            .map(function (entry, index) {
                ids.push(entry.ID);
            });
        if (!this.state.currentTreeNode) {
            AkNotification.warning({message: '提示', description: "请选择父节点"});
            this.setState({loading: false, visible: false});
            return;
        }
        if (ids.length < 1) {
            AkNotification.warning({message: '提示', description: "请选择分配人"});
            this.setState({loading: false});
            return;
        }
        this.state.postLocationPageLocaleRequest = {
            ID: "0",
            Name: this.state.postLocationPageLocaleRequest.Name,
            Ext1: null,
            Ext2: null,
            Ext3: null,
            UserIDs: ids,
            BindingType: 3,
            BindingTargetID: this.state.currentTreeNode.ID
        }
        JobPositionsAPI
            .postJobPositions(this.state.postLocationPageLocaleRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadMetaData(this.state.currentTreeNode);
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                    this.setState({loading: false, visible: false});
                }
            });
    }
    /**修改 */
    editJobPosition() {
        this.setState({loading: true});
        let ids = [];
        /**如果变更分配人*/
        if (this.state.directValue.length > 0) {
            this
                .state
                .directValue
                .map(function (entry, index) {
                    ids.push(entry.ID);
                });
        } else {
            this
                .state
                .currentJobPosition
                .Users
                .map(function (entry, index) {
                    ids.push(entry.ID);
                })
        }

        let name = this.state.putLocationPageLocaleRequest.Name;
        name = name
            ? name
            : this.state.currentJobPosition.JobPositionName;
        if (ids.length < 1) {
            AkNotification.warning({message: '提示', description: "分配人不能为空"});
            this.setState({loading: false});
            return;
        }
        this.state.putLocationPageLocaleRequest = {
            ID: this.state.currentJobPosition.JobPositionID,
            Name: name,
            Ext1: null,
            Ext2: null,
            Ext3: null,
            UserIDs: ids,
            BindingType: 3,
            BindingTargetID: this.state.currentTreeNode.ID
        }

        JobPositionsAPI
            .putJobPositions(this.state.putLocationPageLocaleRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadMetaData(this.state.currentTreeNode);
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                    this.setState({loading: false, visible: false});
                }
            });
    }
    /**删除 */
    remove(record?: JobPositions) {
        let topThis = this;
        topThis.setState({loading: true});
        topThis.state.deleteLocationPageLocaleRequest = {
            jobPositionID: record.JobPositionID
        }

        AkModal.confirm({
            title: "删除", //GO TO
            content: "确定删除吗？",
            onOk() {
                JobPositionsAPI
                    .deleteJobPositions(topThis.state.deleteLocationPageLocaleRequest)
                    .then(data => {
                        if (data.Status == "0") {
                            topThis.loadMetaData(topThis.state.currentTreeNode);
                        } else {
                            AkNotification.warning({message: '提示', description: data.Message});
                            topThis.setState({loading: false});
                        }
                    });
            },
            onCancel() {
                topThis.setState({currentJobPosition: null, loading: false});
            }
        });
    }
    /**新建Modal */
    renderAddModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;

        let options = topThis.state.userRole
            ? topThis
                .state
                .userRole
                .map((entry) => {
                    return <AkSelect.Option key={entry.JobPositionID} value={entry.JobPositionID}>{entry.JobPositionName}</AkSelect.Option>
                })
            : null;

        return topThis.state.visible
            ? <AkModal
                    maskClosable={false}
                    title={format({id: LocationPageLocale.ModalTitleAdd})}
                    visible={topThis.state.visible}
                    onCancel={() => {
                    this.setState({visible: false, directValue: null})
                }}
                    onOk={() => {
                    this.addJobPosition()
                }}>
                    <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                        <AkCol span={4}>
                            {format({id: LocationPageLocale.ModalChooseRole})}
                        </AkCol>
                        <AkCol span={20}>
                            <AkSelect
                                allowClear={true}
                                className="wfull"
                                defaultValue={"0"}
                                onChange={(value) => {
                                topThis.state.postLocationPageLocaleRequest.Name = value + "";
                            }}>
                                {options}
                            </AkSelect>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                        <AkCol span={4}>
                            {format({id: LocationPageLocale.ModalAssigner})}
                        </AkCol>
                        <AkCol span={20}>
                            <AkIdentityPicker
                                multiple
                                defaultValue={this.state.directValue}
                                onChange={(v) => {
                                let value = v as AkIdentity[];
                                this.setState({directValue: value});
                            }}/>
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
            });

        let options = topThis.state.userRole
            ? topThis
                .state
                .userRole
                .map((entry) => {
                    return <AkSelect.Option key={entry.JobPositionID} value={entry.JobPositionID}>{entry.JobPositionName}</AkSelect.Option>
                })
            : null;

        return topThis.state.visibleEdit
            ? <AkModal
                    maskClosable={false}
                    title={format({id: LocationPageLocale.ButtonEdit})}
                    visible={topThis.state.visibleEdit}
                    onCancel={() => {
                    this.setState({visibleEdit: false, directValue: null, currentJobPosition: null});
                }}
                    onOk={() => {
                    this.editJobPosition();
                }}>
                    <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                        <AkCol span={4}>
                            <label htmlFor="">{format({id: LocationPageLocale.ModalTitleEdit})}*</label >
                        </AkCol>
                        < AkCol span={20}>
                            <AkSelect
                                allowClear={true}
                                className="wfull"
                                defaultValue={jobPosition.JobPositionID}
                                onChange={(value) => {
                                this.state.putLocationPageLocaleRequest.Name = value + "";
                            }}>
                                {options}
                            </AkSelect>
                        </AkCol>
                    </AkRow >
                    <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                        <AkCol span={4}>
                            <label htmlFor="">{format({id: LocationPageLocale.ModalAssigner})}</label>
                        </AkCol>
                        <AkCol span={20}>
                            <AkIdentityPicker
                                multiple
                                defaultValue={identitys}
                                onChange={(v) => {
                                let value = v as AkIdentity[];
                                this.setState({directValue: value});
                            }}/>
                        </AkCol>
                    </AkRow>
                </AkModal>
            : null;
    }
    /**  递归处理树节点 */
    renderChildTreeNode(item : TreeData) {
        let childTitle = <AkRow justify="space-between" type="flex" align="middle">
            <AkCol>
                <span>{item.Name}</span>
            </AkCol>
        </AkRow>
        if (item.Children && item.Children.length > 0) {
            return <AkTree.TreeNode title={childTitle} key={item.ID} data={item}>
                {item
                    .Children
                    .map((entry) => {
                        return this.renderChildTreeNode(entry);
                    })}
            </AkTree.TreeNode>
        }
        return <AkTree.TreeNode isLeaf title={childTitle} key={item.ID} data={item}></AkTree.TreeNode>;
    }
    /** 渲染左侧树 */
    renderLeftNavigation() {
        return this.state.treeData
            ? <AkTree
                    className="ak-meta-tree"
                    defaultExpandedKeys={this.state.expandedKeys}
                    onSelect={(keys, e) => {
                    const record = e.node.props.data as TreeData;

                    if (record.Children) {
                        if (this.state.expandedKeys.indexOf(record.ID) < 0) {
                            this
                                .state
                                .expandedKeys
                                .push(record.ID);
                        } else {
                            this
                                .state
                                .expandedKeys
                                .splice(this.state.expandedKeys.indexOf(record.ID), 1);
                        }
                        this.setState({expandedKeys: this.state.expandedKeys, currentTreeNode: record});
                    }
                    this.loadMetaData(record);
                }}>
                    {this
                        .state
                        .treeData
                        .map((entry : TreeData) => {
                            return this.renderChildTreeNode(entry);
                        })}
                </AkTree>
            : null;
    }

    render() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let currentNode = topThis.state.currentTreeNode;

        let rightHeader = <span className="ak-header-title">{currentNode
                ? currentNode.Name
                : null}</span>;

        let search = <AkRow type="flex" align="middle" justify="space-between">
            <AkCol>
                <a
                    href="javascript:;"
                    className="ak-basebtn-text"
                    onClick={() => {
                    this.setState({visible: true, directValue: null})
                }}>
                    <AkIcon type="plus"></AkIcon>
                    {format({id: LocationPageLocale.SearchNew})}
                </a>
            </AkCol>
        </AkRow>

        return <AkRow
            style={{
            minHeight: '1000px',
            overflow: 'hidden'
        }}>
            <AkCol md={6} xs={0} lg={5} className="ak-left-content">
                <MainContent WithBack Header={LocationPageLocale.SearchRoleLoc}>
                    {topThis.renderLeftNavigation()}
                </MainContent>
            </AkCol>
            <AkCol md={18} xs={24} lg={19}>
                <MainContent Header={rightHeader} Search={search}>
                    {topThis.renderAddModal()}
                    {topThis.renderEditModal()}
                    <LocationPageLocaleTable
                        rowKey="JobPositionID"
                        columns={topThis.columns}
                        pagination={false}
                        dataSource={topThis.state.LocationPageLocaleDataList}
                        loading={topThis.state.loading}></LocationPageLocaleTable >
                </MainContent>
            </AkCol>
        </AkRow>
    }
}

class LocationPageLocalePageStyle {
    static inputStyle : React.CSSProperties = {}
}

export default injectIntl(withRouter(LocationPageLocalePage))
