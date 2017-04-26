import * as React from "react";
import { Component } from "react";
import { withRouter } from "react-router";
import { injectIntl, FormattedMessage } from "react-intl";
import { MetaDataPageLocale } from '../../locales/localeid';
import { AdminMetadataAPI } from "../../api/metadata";
import { AkIcon } from '../../component/controls/ak-icon';
import { AkRow } from "../../component/controls/ak-row";
import { AkCol } from "../../component/controls/ak-col";
import { AkInput } from "../../component/controls/ak-input";
import { AkTable, AkColumnProps } from "../../component/controls/ak-table";
import { AkButton } from "../../component/controls/ak-button";
import { MainContent } from "../components/maincontent";
import { AkTree } from "../../component/controls/ak-tree";
import { AkDropDown } from "../../component/controls/ak-dropdown";
import { AkMenu } from "../../component/controls/ak-menu";
import { AkModal } from "../../component/controls/ak-modal";
import { AkNotification } from "../../component/controls/ak-notification";

class MetaDataTable extends AkTable<MetadataInfo> { }
interface MetaDataColumn extends AkColumnProps<MetadataInfo> { }
interface TreeData extends MetadataInfo {
    Children?: TreeData[]
}

interface MetaDataProps extends IntlProps,
    ReactRouter.RouteComponentProps<void,
    void> { }
interface MetaDataStates {
    /**
     * 左侧树的数据
     *
     * @type {*}
     * @memberOf MetaDataStates
     */
    treeData?: TreeData[];
    /**
     * 右侧Table的数据
     *
     * @type {*}
     * @memberOf MetaDataStates
     */
    tableData?: MetadataInfo[];
    /**
     * 展开的节点
     *
     * @type {string[]}
     * @memberOf MetaDataStates
     */
    expandedKeys?: string[];
    /**右侧文本 */
    titleStr?: string;

    MetaDataList?: MetadataInfo[];
    /**左侧一级列表 */
    searchRequest?: AdminGetMetadataCategoryRequest;
    /**编辑分类 */
    putRequest?: PutMetadataRequest;
    metaRequest?: AdminGetMetadataRequest;
    addRequest?: AddMetadataRequest;
    editRequest?: EditMetadataRequest;
    deleteRequest?: DeleteMetadataRequest;
    loading?: boolean;
    /**新建 */
    visibleNew?: boolean;
    /**编辑 */
    visibleEdit?: boolean;
    /**编辑分类 */
    visibleCategoryEdit?: boolean;
    /**参数新建 */
    visibleMeta?: boolean;
    /**添加下级 */
    visibleAdd?: boolean;
    item?: MetadataInfo;
    /**当前选择TreeNode */
    currentTreeData?: TreeData;
}
/** 参数管理 */
class MetaDataPage extends Component<MetaDataProps,
    MetaDataStates> {
    /**
    * 列名
    *
    * @type {MetaDataColumn[]}
    * @memberOf MetaDataPage
    */
    tableColumns: MetaDataColumn[];
    /**新建分类 */
    postCategoryRequest?: PostMetadataCategoryRequest;

    /**左侧子级列表 */
    postRequest?: PostMetadataRequest;

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.tableColumns = [
            {
                title: format({ id: MetaDataPageLocale.ColumnEncoded }),
                key: MetaDataPageLocale.ColumnEncoded,
                dataIndex: "Code"
            }, {
                title: format({ id: MetaDataPageLocale.ColumnAssignment }),
                key: MetaDataPageLocale.ColumnAssignment,
                dataIndex: "Name"
            }, {
                title: format({ id: MetaDataPageLocale.ColumnExt1 }),
                key: MetaDataPageLocale.ColumnExt1,
                dataIndex: "Ext"
            }, {
                title: format({ id: MetaDataPageLocale.ColumnSort }),
                key: MetaDataPageLocale.ColumnSort,
                dataIndex: "Order"
            }, {
                dataIndex: "",
                className: "ak_align_r",
                key: MetaDataPageLocale.ColumnOperation,
                render: (text, record) => {
                    let akmenu = <AkMenu>
                        <AkMenu.Item>
                            <a
                                onClick={() => {
                                    this.setState({ visibleEdit: true, item: record });
                                } }>
                                <AkIcon type="edit"></AkIcon>
                                <FormattedMessage id={MetaDataPageLocale.ColumnBtnEdit}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                        <AkMenu.Item>
                            <a
                                onClick={this
                                    .confirm
                                    .bind(this, record)}>
                                <AkIcon type="delete"></AkIcon>
                                <FormattedMessage id={MetaDataPageLocale.ColumnBtnDelete}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                    </AkMenu>
                    return <AkDropDown trigger={['click']} overlay={akmenu}>
                        <AkIcon type="ellipsis" className="ak-ellipsis"></AkIcon>
                    </AkDropDown>
                }
            }
        ]
        this.state = {
            treeData: [],
            expandedKeys: [],
            MetaDataList: [],
            putRequest: {},
            addRequest: {},
            editRequest: {},
            deleteRequest: {},
            currentTreeData: {},
            item: {},
            titleStr: " ",
            searchRequest: {
                status: 1
            },
            metaRequest: {
                status: 1,
                categoryID: "",
                parentID: ""
            }
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.loadData();
    }
    /**
     * 加载分类数据
     */
    loadData() {
        this.state.treeData = [];
        /**加载分类信息 */
        AdminMetadataAPI
            .GetMetadataCategoryList(this.state.searchRequest)
            .then(data => {
                if (data.Data) {
                    data
                        .Data.forEach((entry) => {
                            this
                                .state
                                .treeData
                                .push(Object.assign({ ID: entry.CategoryID }, entry))
                        })
                    this.setState({ loading: false, treeData: this.state.treeData, item: null, visibleMeta: false, visibleAdd: false })
                    if (this.state.currentTreeData.Children != undefined) {
                        let currentTree = this.state.currentTreeData;
                        this.loadMetaData(currentTree, currentTree.Name);
                    }
                }
            })
    }
    loadMetaData(record: TreeData, Name) {
        // this.setState({ loading: true, titleStr: Name })
        let metaGetRequest: AdminGetMetadataRequest = {
            status: 1,
            categoryID: record.CategoryID,
            parentID: record.ID
        }
        record.Children = record.Children || [];
        /**加载右侧列表 */
        AdminMetadataAPI
            .getMetadataList(metaGetRequest)
            .then(data => {
                if (data.Data) {
                    data
                        .Data
                        .map((entry) => {
                            record
                                .Children
                                .push(entry);
                        })
                }

                if (this.state.expandedKeys.indexOf(record.ID) < 0) {
                    this
                        .state
                        .expandedKeys
                        .push(record.ID);
                }
                this.setState({ titleStr: record.Name, loading: false, treeData: this.state.treeData, MetaDataList: data.Data, expandedKeys: this.state.expandedKeys })
            })
    }
    renderAddRoot() {
        return <AkIcon
            type="plus"
            className="cursor"
            onClick={() => {
                this.setState({ visibleMeta: true, item: {} })
            } }
            style={{
                fontSize: "25px",
                marginRight: "10px"
            }}></AkIcon>
    }
    confirm(item) {
        let self = this;
        let format = self.props.intl.formatMessage;
        AkModal.confirm({
            title: format({ id: MetaDataPageLocale.ModalTip }),
            content: format({ id: MetaDataPageLocale.ModalIsDelete }),
            onOk() {
                self.delData(item);
            },
            onCancel() { }
        });
    }
    confirmCategory(id) {
        let self = this;
        let format = self.props.intl.formatMessage;
        AkModal.confirm({
            title: format({ id: MetaDataPageLocale.ModalTip }),
            content: format({ id: MetaDataPageLocale.ModalIsDelete }),
            okText: format({ id: MetaDataPageLocale.ButtonOk }),
            cancelText: format({ id: MetaDataPageLocale.ButtonCancel }),
            onOk() {
                self.delCategory(id);
            },
            onCancel() { }
        });
    }
    /**删除下级 */
    delData(item) {
        this.setState({ loading: true })
        this.state.deleteRequest.CategoryID = item.CategoryID;
        this.state.deleteRequest.ID = item.ID;
        this.state.deleteRequest.Status = false;
        AdminMetadataAPI
            .putMetadataDel(this.state.deleteRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                    AkNotification.success({ message: '成功', description: data.Message });
                } else {
                    this.setState({ loading: false });
                    AkNotification.warning({ message: '提示', description: data.Message });
                }
            });
    }
    /**删除分类 */
    delCategory(CategoryID) {
        this.setState({ loading: true })
        this.state.deleteRequest.CategoryID = CategoryID;
        this.state.deleteRequest.Status = false;
        AdminMetadataAPI
            .PutMetadataCategoryDel(this.state.deleteRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                    AkNotification.success({ message: '成功', description: data.Message });
                } else {
                    this.setState({ loading: false });
                    AkNotification.warning({ message: '提示', description: data.Message });
                }
            });
    }
    /**新建参数 */
    okMeta() {
        this.setState({ loading: true })
        let itemInfo = this.state.item;
        let newRq = this.postCategoryRequest;
        newRq = {
            Code: itemInfo.Code,
            Name: itemInfo.Name,
            Description: itemInfo.Description,
            Localization: "",
            Ext: "",
            Status: true
        }
        AdminMetadataAPI
            .PostMetadataCategoryList(newRq)
            .then(data => {
                this.loadData();
                // this.setState({loading: false, visibleMeta: false})
            });
    }
    /**编辑分类 */
    editCategory() {
        this.setState({ loading: true })
        let itemInfo = this.state.item;
        let editRq = this.state.editRequest;
        editRq = {
            Code: itemInfo.Code,
            Name: itemInfo.Name,
            Ext: itemInfo.Ext,
            Order: itemInfo.Order,
            CategoryID: itemInfo.CategoryID,
            ParentID: itemInfo.ID,
            Description: itemInfo.Description,
            Mapping: "",
            Localization: "",
            Status: 1
        }
        AdminMetadataAPI
            .PutMetadataCategoryList(editRq)
            .then(data => {
                this.loadData();
                this.setState({ loading: false, visibleCategoryEdit: false, editRequest: null })
            });
    }
    /**编辑列表 */
    editMetaData() {
        this.setState({ loading: true })
        let itemInfo = this.state.item;
        let editRq = this.state.putRequest;
        editRq = {
            Code: itemInfo.Code,
            Name: itemInfo.Name,
            Ext: itemInfo.Ext,
            Order: itemInfo.Order,
            ID: itemInfo.ID,
            CategoryID: itemInfo.CategoryID,
            ParentID: itemInfo.ID || "",
            Description: itemInfo.Description,
            Mapping: "",
            Localization: "",
            Status: 1
        }
        AdminMetadataAPI
            .putMetadataList(editRq)
            .then(data => {
                this.loadData();
                this.setState({ loading: false, visibleEdit: false, item: null })
            });
    }
    /**添加下级 */
    addMetaData() {
        this.setState({ loading: true })
        let itemInfo = this.state.item;
        let addRq = this.state.addRequest;
        addRq = {
            Code: itemInfo.Code,
            Name: itemInfo.Name,
            Ext: itemInfo.Ext,
            Order: itemInfo.Order,
            Description: itemInfo.Description,
            CategoryID: itemInfo.CategoryID,
            ParentID: itemInfo.ID || "",
            Mapping: "",
            Localization: "",
            Status: 1
        }
        AdminMetadataAPI
            .postMetadataList(addRq)
            .then(data => {
                this.loadData();
                this.setState({ loading: false, visibleAdd: false, item: null, addRequest: null })
            });
    }
    /**新建列表 */
    newMetaData() {
        this.setState({ loading: true })
        let itemInfo = this.state.item;
        let addRq = this.postRequest;
        addRq = {
            Code: itemInfo.Code,
            Name: itemInfo.Name,
            Ext: itemInfo.Ext,
            Order: itemInfo.Order,
            Description: itemInfo.Description,
            CategoryID: itemInfo.CategoryID,
            ParentID: itemInfo.ID,
            Mapping: "",
            Localization: "",
            Status: 1
        }
        AdminMetadataAPI
            .postMetadataList(addRq)
            .then(data => {
                this.loadData();
                this.setState({ loading: false, visibleNew: false })
            });
    }
    /**
     * 递归处理树节点
     *
     * @param {TreeData} item
     * @param {string} categoryID
     * @returns
     *
     * @memberOf MetaDataPage
     */

    renderChildTreeNode(item: TreeData, categoryID: string) {
        item.CategoryID = categoryID;
        let menuChild = <AkMenu className="ak-tree-ul">
            <AkMenu.Item>
                <div
                    onClick={() => {
                        this.setState({ visibleAdd: true, item: item });
                    } }>
                    <AkIcon type="plus"></AkIcon>
                    <span>
                        <FormattedMessage id={MetaDataPageLocale.PropsHeaderTitleAdd}></FormattedMessage>
                    </span>
                </div>
            </AkMenu.Item>
            <AkMenu.Item>
                <div
                    onClick={() => {
                        item.ParentID
                            ? this.setState({ visibleEdit: true, item: item })
                            : this.setState({ visibleCategoryEdit: true, item: item })
                    } }>
                    <AkIcon type="edit"></AkIcon>
                    <span>
                        <FormattedMessage id={MetaDataPageLocale.PropsHeaderTitleEdit}></FormattedMessage>
                    </span>
                </div>
            </AkMenu.Item>
            <AkMenu.Item>
                <div
                    onClick={() => {
                        if (item.ParentID) {
                            this.confirm(item)
                        } else {
                            this.confirmCategory(item.CategoryID)
                        }
                    } }>
                    <AkIcon type="delete"></AkIcon>
                    <span>
                        <FormattedMessage id={MetaDataPageLocale.MetaDataRemove}></FormattedMessage>
                    </span>
                </div>
            </AkMenu.Item>
        </AkMenu>
        let childTitle = <AkRow justify="space-between" type="flex" align="middle">
            <AkCol>
                <span>{item.Name}</span>
            </AkCol>
            <AkCol>
                <AkDropDown trigger={['click']} placement="bottomRight" overlay={menuChild}>
                    <AkIcon type="ellipsis"></AkIcon>
                </AkDropDown>
            </AkCol>
        </AkRow>
        if (item.Children && item.Children.length > 0) {
            return <AkTree.TreeNode title={childTitle} key={item.ID} data={item}>
                {item
                    .Children
                    .map((entry) => {
                        return this.renderChildTreeNode(entry, categoryID);
                    })}
            </AkTree.TreeNode>
        }
        return <AkTree.TreeNode isLeaf title={childTitle} key={item.ID} data={item}></AkTree.TreeNode>;
    }
    /**
     * 渲染左侧树
     *
     * @returns
     *
     * @memberOf MetaDataPage
     */
    renderMeta() {
        let topThis = this;
        return topThis.state.treeData
            ? <AkTree
                className="ak-meta-tree"
                defaultExpandedKeys={topThis.state.expandedKeys}
                onSelect={(keys, e) => {
                    const record = e.node.props.data as TreeData;
                    if (record.Children) {
                        if (topThis.state.expandedKeys.indexOf(record.ID) < 0) {
                            topThis
                                .state
                                .expandedKeys
                                .push(record.ID);
                        } else {
                            topThis
                                .state
                                .expandedKeys
                                .splice(topThis.state.expandedKeys.indexOf(record.ID), 1);
                        }
                        topThis.setState({ titleStr: record.Name, MetaDataList: record.Children, expandedKeys: topThis.state.expandedKeys, currentTreeData: record });
                        return;
                    }
                    topThis.setState({ currentTreeData: record });
                    topThis.loadMetaData(record, record.Name);
                } }>
                {topThis
                    .state
                    .treeData
                    .map((entry: TreeData) => {
                        return topThis.renderChildTreeNode(entry, entry.ID);
                    })}
            </AkTree>
            : null;
    }
    /**
     * 渲染右侧Table
     *
     * @returns
     *
     * @memberOf MetaDataPage
     */
    renderTable() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let header = <span className="ak-header-title">{this.state.titleStr}</span>;
        let search = <AkRow
            type="flex"
            align="middle"
            justify="space-between"
            >
            <AkCol>
                <a
                    href="javascript:;" className="ak-basebtn-text"
                    onClick={() => {
                        this.state.currentTreeData.ID ?
                            this.setState({ visibleNew: true, item: this.state.currentTreeData })
                            : AkNotification.warning({
                                message: '提示',
                                description: format({
                                    id: MetaDataPageLocale.ModalDescription
                                })
                            })
                    } }
                    >
                    <AkIcon type="plus"></AkIcon>
                    {format({ id: MetaDataPageLocale.PropsHeaderRightBtn })}
                </a>
            </AkCol>
        </AkRow >
        return <MainContent Header={header} Search={search}>
            <MetaDataTable
                rowKey="ID"
                loading={this.state.loading}
                columns={this.tableColumns}
                dataSource={this.state.MetaDataList}></MetaDataTable>
        </MainContent>
    }
    /**新建参数 */
    modalMeta() {
        this.state.item = this.state.item || [];
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        return topThis.state.visibleMeta
            ? <AkModal
                maskClosable={false}
                title={format({ id: MetaDataPageLocale.PropsHeaderLeftBtn })}
                visible
                onCancel={() => {
                    this.setState({ visibleMeta: false, item: null });
                } }
                onOk={() => {
                    this.okMeta();
                } }>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.MetaLeftModalCode })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                value = value.trim();
                                this.state.item.Code = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.MetaLeftModalName })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                this.state.item.Name = value;
                            } }></AkInput>
                            
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.MetaLeftModalDescription })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            type="textarea"
                            allowClear={true}
                            onChange={(value) => {
                                this.state.item.Description = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
            </AkModal>
            : null
    }
    /**添加下级 */
    modalAdd() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        return topThis.state.visibleAdd
            ? <AkModal
                maskClosable={false}
                title={format({ id: MetaDataPageLocale.PropsHeaderTitleAdd })}
                visible
                onCancel={() => {
                    this.setState({ visibleAdd: false, item: null });
                } }
                onOk={() => {
                    topThis.addMetaData();
                } }>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnEncoded })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                value = value.trim();
                                this.state.item.Code = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnAssignment })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                value = value.trim();
                                this.state.item.Name = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnExt1 })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                value = value.trim();
                                this.state.item.Ext = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnSort })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                value = value.trim();
                                this.state.item.Order = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnDescription })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            type="textarea"
                            allowClear={true}
                            onChange={(value) => {
                                value = value.trim();
                                this.state.item.Description = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
            </AkModal>
            : null
    }
    /**新建 */
    modalNew() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        return topThis.state.visibleNew
            ? <AkModal
                maskClosable={false}
                title={format({ id: MetaDataPageLocale.PropsHeaderRightBtn })}
                visible
                onCancel={() => {
                    this.setState({ visibleNew: false, item: null });
                } }
                onOk={() => {
                    topThis.newMetaData();
                } }>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnEncoded })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                this.state.item.Code = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnAssignment })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                this.state.item.Name = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnExt1 })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                this.state.item.Ext = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnSort })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                this.state.item.Order = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnDescription })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            type="textarea"
                            allowClear={true}
                            onChange={(value) => {
                                this.state.item.Description = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
            </AkModal>
            : null
    }
    /**编辑 */
    modalEdit() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        return topThis.state.visibleEdit
            ? <AkModal
                maskClosable={false}
                title={format({ id: MetaDataPageLocale.PropsHeaderTitleEdit })}
                visible
                onCancel={() => {
                    this.setState({ visibleEdit: false, item: null })
                } }
                onOk={() => {
                    topThis.editMetaData();
                } }>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnEncoded })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={this.state.item.Code}
                            onChange={(value) => {
                                this.state.item.Code = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnAssignment })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={this.state.item.Name}
                            onChange={(value) => {
                                this.state.item.Name = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnExt1 })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={this.state.item.Ext}
                            onChange={(value) => {
                                this.state.item.Ext = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnSort })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={!this.state.item.Order
                                ? ""
                                : this.state.item.Order + ""}
                            onChange={(value) => {
                                this.state.item.Order = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnDescription })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            type="textarea"
                            allowClear={true}
                            defaultValue={this.state.item.Description}
                            onChange={(value) => {
                                this.state.item.Description = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
            </AkModal>
            : null
    }
    /**编辑分类 */
    modalEditCategory() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        return topThis.state.visibleCategoryEdit
            ? <AkModal
                maskClosable={false}
                title={format({ id: MetaDataPageLocale.PropsHeaderTitleEdit })}
                visible
                onCancel={() => {
                    this.setState({ visibleCategoryEdit: false, item: null });
                } }
                onOk={topThis
                    .editCategory
                    .bind(topThis)}>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnEncoded })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={this.state.item.Code}
                            onChange={(value) => {
                                this.state.item.Code = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnAssignment })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={this.state.item.Name}
                            onChange={(value) => {
                                this.state.item.Name = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnExt1 })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={this.state.item.Ext}
                            onChange={(value) => {
                                this.state.item.Ext = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnSort })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={!this.state.item.Order
                                ? ""
                                : this.state.item.Order + ""}
                            onChange={(value) => {
                                this.state.item.Order = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: MetaDataPageLocale.ColumnDescription })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            type="textarea"
                            allowClear={true}
                            defaultValue={this.state.item.Description}
                            onChange={(value) => {
                                this.state.item.Description = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
            </AkModal>
            : null

    }
    render() {
        return <AkRow style={{ minHeight: '1000px', overflow: 'hidden' }}>
            <AkCol
                md={6}
                xs={0}
                lg={5}
                className="ak-left-content"
                >
                <MainContent
                    WithBack
                    Header={MetaDataPageLocale.PropsHeaderTitle}
                    Search={this.renderAddRoot()}>
                    {this.renderMeta()}
                </MainContent>
            </AkCol>
            <AkCol md={18} xs={24} lg={19}>
                {this.modalNew()}
                {this.modalEdit()}
                {this.modalMeta()}
                {this.modalAdd()}
                {this.modalEditCategory()}
                {this.renderTable()}
            </AkCol>
        </AkRow>;
    }
}
class MetaDataStyle { }

export default injectIntl(withRouter(MetaDataPage))
