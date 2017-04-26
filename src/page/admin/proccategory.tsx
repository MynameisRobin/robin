import * as React from 'react'
import { Component } from 'react'
import { withRouter } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { AkRow } from '../../component/controls/ak-row';
import { MainContent } from '../../page/components/maincontent';
import { NavLocale, ProcCategoryPageLocale } from '../../locales/localeid';
import { AkTable, AkColumnProps } from '../../component/controls/ak-table';
import { CategoryAPI } from '../../api/category';
import { AkCol } from '../../component/controls/ak-col';
import { AkNotification } from '../../component/controls/ak-notification';
import { Icon, Input } from 'antd';
import { AkIcon } from '../../component/controls/ak-icon';
import { AkButton } from '../../component/controls/ak-button';
import { AkModal } from '../../component/controls/ak-modal';
import { AkInput } from '../../component/controls/ak-input';
import { AkDropDown } from '../../component/controls/ak-dropdown';
import { AkMenu } from '../../component/controls/ak-menu';

class CategoryTable extends AkTable<CategoryInfo> { }
interface CategoryAkColumn extends AkColumnProps<CategoryInfo> { }

interface ProcCategoryPageProps extends IntlProps { }
interface ProcCategoryPageStates {
    item?: CategoryInfo
    // 新建按钮loading
    loading?: boolean
    // 新建的模态框开关
    visible?: boolean
    // 修改的模态框开关
    visibleEdit?: boolean
    totalCount?: number
    pageSize?: number
    CategoryDataList?: CategoryInfo[]
    categoryRequest?: GetCategoryRequest
    putCategoryRequest?: PutCategoryRequest
    postCategoryRequest?: PostCategoryRequest
    deleteCategoryRequest?: DeleteCategoryRequest
}
/** 流程分类页面 */
class ProcCategoryPage extends Component<ProcCategoryPageProps,
    ProcCategoryPageStates> {

    columns: CategoryAkColumn[]

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.columns = [
            {
                title: format({ id: ProcCategoryPageLocale.ColumnName }),
                key: ProcCategoryPageLocale.ColumnName,
                dataIndex: "Name"
            }, {
                key: ProcCategoryPageLocale.ColumnOperation,
                className: "ak_align_r",
                render: (text, record) => {
                    let menuChild = <AkMenu>
                        <AkMenu.Item>
                            <a onClick={() => {
                                this.state.item = {
                                    CategoryID: record.CategoryID,
                                    Localization: record.Localization,
                                    Name: record.Name
                                };
                                this.setState({ visibleEdit: true })
                            } }>
                                <AkIcon type="edit"></AkIcon>
                                <FormattedMessage id={ProcCategoryPageLocale.OperationEdit}></FormattedMessage>
                            </a>
                        </AkMenu.Item>
                        <AkMenu.Item>
                            <a onClick={this
                                .confirm
                                .bind(this, record)}>
                                <AkIcon type="delete"></AkIcon>
                                <FormattedMessage id={ProcCategoryPageLocale.OperationDelete}></FormattedMessage>
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
            totalCount: 0,
            pageSize: 20,
            categoryRequest: {},
            deleteCategoryRequest: {},
            putCategoryRequest: {},
            postCategoryRequest: {}
        }
    }
    componentDidMount() {
        this.loadData();
    }
    /**加载分类列表 */
    loadData() {
        this.setState({ loading: true });
        CategoryAPI
            .getCategory(this.state.categoryRequest)
            .then(data => {
                this.setState({ loading: false, visible: false, visibleEdit: false, CategoryDataList: data.Data, totalCount: data.TotalCount });
            });
    }
    /**新建分类API  GO TO 检查分类名称唯一性 若存在则提示“流程分类已存在！”*/
    addCategory() {
        this.setState({ loading: true })
        let itemInfo = this.state.item;
        if (itemInfo.Name == undefined) {
            AkNotification.warning({ message: '提示', description: "必填信息不能为空！" });
            this.setState({ loading: false });
            return;
        }
        this.state.postCategoryRequest = {
            Name: itemInfo.Name,
            Localization: itemInfo.Localization
        }
        CategoryAPI
            .postCategory(this.state.postCategoryRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                } else {
                    AkNotification.warning({ message: '提示', description: data.Message });
                }
                this.setState({ loading: false, visible: false })
            });
    }
    /**修改分类 */
    editCategory() {
        this.setState({ loading: true })
        let itemInfo = this.state.item;
        this.state.putCategoryRequest = {
            CategoryID: itemInfo.CategoryID,
            Name: itemInfo.Name,
            Localization: itemInfo.Localization
        }
        CategoryAPI
            .putCategory(this.state.putCategoryRequest)
            .then(data => {
                if (data.Data === "true") {
                    this.loadData();
                    AkNotification.success({ message: '成功', description: data.Message });
                } else {
                    AkNotification.warning({ message: '提示', description: data.Message });
                }
            });
    }
    /**删除分类 */
    delData(id) {
        this.setState({ loading: true })
        this.state.deleteCategoryRequest.categoryID = id;
        CategoryAPI
            .delCategory(this.state.deleteCategoryRequest)
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
    confirm(record) {
        let self = this;
        let format = self.props.intl.formatMessage;
        this.state.item = record;
        let itemInfo = this.state.item;
        AkModal.confirm({
            title: format({ id: ProcCategoryPageLocale.ModalTip }),
            content: format({ id: ProcCategoryPageLocale.ModalIsDelCategoryName }) + "  " + itemInfo.Name,
            okText: format({ id: ProcCategoryPageLocale.ButtonOk }),
            cancelText: format({ id: ProcCategoryPageLocale.ButtonCancel }),
            onOk() {
                self.delData(itemInfo.CategoryID);
            },
            onCancel() { }
        });
    }
    render() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let search = <AkRow type="flex" align="middle" justify="space-between">
            <AkCol>
                <a
                    href="javascript:;" className="ak-basebtn-text"
                    onClick={() => {
                        this.setState({ visible: true, item: {} })
                    } }>
                    <AkIcon type="plus"></AkIcon>
                    {format({ id: ProcCategoryPageLocale.SearchNew })}
                </a>
            </AkCol>
        </AkRow>

        //新建
        let modalNew = topThis.state.visible
            ? <AkModal
                maskClosable={false}
                title={format({ id: ProcCategoryPageLocale.SearchNew })}
                visible
                onCancel={() => {
                    this.setState({ visible: false, item: null })
                } }
                onOk={() => {
                    this.addCategory();
                } }>

                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: ProcCategoryPageLocale.ModalTitle })}*</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                topThis.state.item.Name = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: ProcCategoryPageLocale.ModalDescription })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            onChange={(value) => {
                                topThis.state.item.Localization = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
            </AkModal>
            : null

        //修改
        let modalEdit = topThis.state.visibleEdit
            ? <AkModal
                maskClosable={false}
                title={format({ id: ProcCategoryPageLocale.ColumnEdit })}
                visible
                onCancel={() => {
                    this.setState({ visibleEdit: false, item: null })
                } }
                onOk={() => {
                    this.editCategory();
                }
                }>
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: ProcCategoryPageLocale.ModalTitle })}*</label >
                    </AkCol>
                    < AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={topThis.state.item.Name}
                            onChange={(value) => {
                                topThis.state.item.Name = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow >
                <AkRow type="flex" align="middle" justify="space-around" className="mb20">
                    <AkCol span={4}>
                        <label htmlFor="">{format({ id: ProcCategoryPageLocale.ModalDescription })}</label>
                    </AkCol>
                    <AkCol span={20}>
                        <AkInput
                            allowClear={true}
                            defaultValue={topThis.state.item.Localization}
                            onChange={(value) => {
                                topThis.state.item.Localization = value;
                            } }></AkInput>
                    </AkCol>
                </AkRow>
            </AkModal>
            : null

        if (!topThis.state.visible) {
            modalNew = null;
        }
        if (!topThis.state.visibleEdit) {
            modalEdit = null;
        }

        return <MainContent Header={NavLocale.FlowProcDefCategory} Search={search}>
            {modalNew}
            {modalEdit}
            <CategoryTable
                rowKey="CategoryID"
                pagination={{
                    total: topThis.state.totalCount,
                    pageSize: topThis.state.pageSize,
                    onChange: (current) => {
                        topThis.state.categoryRequest = {
                            pageIndex: current + "",
                            pageSize: topThis.state.pageSize + ""
                        }
                        topThis.loadData();
                    }
                }}
                columns={topThis.columns}
                dataSource={topThis.state.CategoryDataList}
                loading={topThis.state.loading}></CategoryTable >
        </MainContent>
    }
}

class ProcCategoryPageStyle { }

export default injectIntl(withRouter(ProcCategoryPage))
