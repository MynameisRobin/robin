import * as React from 'react'
import {Component} from 'react'
import {withRouter, Link} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {AkmiiHeader} from '../../component/frame/header';
import {AkRow} from '../../component/controls/ak-row';
import {AkCol} from '../../component/controls/ak-col';
import {AkIcon} from '../../component/controls/ak-icon';
import {PathConfig} from '../../config/pathconfig';
import {NavLocale, ProcDefPageLocale, ProcModelPageLocale} from '../../locales/localeid';
import {AkTable, AkColumnProps} from '../../component/controls/ak-table';
import {MainContent} from '../components/maincontent';
import {ProcModelAPI} from '../../api/procmodel';
import {Select} from 'antd';
import {AkInput} from '../../component/controls/ak-input';
import {AkSelect} from '../../component/controls/ak-select';
import {CategoryAPI} from '../../api/category';
import {ResourceAPI} from '../../api/resource';
import {ApplicationStatusEnum, ApplicationStatusLocale} from '../../api/procinst';
import {AkPaginationProps} from '../../component/controls/ak-pagination';
import {AkTag} from '../../component/controls/ak-tag';
import {ProcDefsAPI} from '../../api/procdefs';
import {AkModal} from '../../component/controls/ak-modal';
import {AkNotification} from '../../component/controls/ak-notification';
import {AkButton} from '../../component/controls/ak-button';
import {AkUpload} from '../../component/controls/ak-upload';

class DefTable extends AkTable < ProcessInfo > {}
interface DefAkColumn extends AkColumnProps < ProcessInfo > {}

interface ProcDefPageProps extends IntlProps {}
interface ProcDefPageStates {
    loading?: boolean;
    total?: number;
    categoryList?: CategoryInfo[];
    statusList?: {
        key?: string;
        value?: string;
    }[];
    statusIcon?: "check-circle" | "minus-circle"; //status=0未激活，1启用，2禁用
    defDataList?: ProcessInfo[];
    pageSize?: number;
    defRequest?: GetProcDefsRequest;
    enableStatusRequest?: PutEnableStatusRequest;
    disableStatusRequest?: PutDisableStatusRequest;
    showInfoModal?: boolean;
    showEditModal?: boolean;
    defItmeInfo?: ProcessInfo;
    /**流程保存请求信息 */
    modelBasicRequest?: PostProcModelRequest;
    /**添加资源信息 */
    resourceRequest?: PostResourceRequest;
}
/** 已部署流程页面 */
class ProcDefPage extends Component < ProcDefPageProps,
ProcDefPageStates > {
    columns : AkColumnProps < ProcessInfo > []

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.state = {
            categoryList: [],
            statusList: [],
            pageSize: 20,
            enableStatusRequest: {},
            disableStatusRequest: {},
            modelBasicRequest: {}
        }

        this.state.defRequest = {
            pageIndex: "1",
            pageSize: this.state.pageSize + ""
        }

        this.columns = [
            {
                title: format({id: ProcDefPageLocale.ColumnName}),
                key: ProcDefPageLocale.ColumnName,
                dataIndex: "Name",
                render: (txt, record, index) => {
                    return <Link
                        to={{
                        pathname: PathConfig.ProcDefItme,
                        query: {
                            id: record.ID
                        }
                    }}>{txt}</Link>
                }
            }, {
                title: format({id: ProcDefPageLocale.ColumnKey}),
                key: ProcDefPageLocale.ColumnKey,
                dataIndex: "Key"
            }, {
                title: format({id: ProcDefPageLocale.ColumnCategory}),
                key: ProcDefPageLocale.ColumnCategory,
                dataIndex: "CategoryName"
            }, {
                title: format({id: ProcDefPageLocale.ColumnVersion}),
                key: ProcDefPageLocale.ColumnVersion,
                dataIndex: "Version"
            }, {
                title: format({id: ProcDefPageLocale.ColumnPubTime}),
                key: ProcDefPageLocale.ColumnPubTime,
                dataIndex: "CreatedStr"
            }, {
                title: format({id: ProcDefPageLocale.ColumnPubBy}),
                key: ProcDefPageLocale.ColumnPubBy,
                dataIndex: "CreatedBy"
            }, {
                title: format({id: ProcDefPageLocale.ColumnStatus}),
                key: ProcDefPageLocale.ColumnStatus,
                dataIndex: "Status",
                render: (text, record) => {
                    switch (text) { //status=0未激活，1启用，2禁用
                        case 1:
                            this.state.statusIcon = "check-circle";
                            break;
                        case 2:
                            this.state.statusIcon = "minus-circle";
                            break;
                        default:
                            this.state.statusIcon = null;
                            break;
                    }
                    if (this.state.statusIcon !== null) {
                        return <AkIcon
                            type={this.state.statusIcon}
                            onClick={this
                            .changeStatus
                            .bind(this, record)}></AkIcon>
                    } else {
                        return null;
                    }
                }
            }
        ]
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
                this.setState({categoryList: data.Data, statusList: this.state.statusList})
            });
    }

    loadData() {
        this.setState({loading: true})
        ProcDefsAPI
            .getProcDefs(this.state.defRequest)
            .then(data => {
                if (data.Status != "0") {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
                this.setState({loading: false, defDataList: data.Data, total: data.TotalCount})
            });
    }
    /**更改状态 GO TO*/
    changeStatus(item) {
        let txt = (item.Status === 1)
            ? "禁用"
            : "启用";
        AkModal.confirm({
            title: "提示",
            content: "是否确定 " + txt + " " + item.Name + "?",
            onOk: () => {
                if (item.Status === 1) {
                    this.state.enableStatusRequest.ProcDefID = item.ID;
                    this.putDisableStatus(item.ID);
                } else {
                    this.state.disableStatusRequest.ProcDefID = item.ID;
                    this.putEnableStatus(item.ID);
                }
            }
        });
    }
    /**启用 */
    putEnableStatus(id) {
        this.setState({loading: true})
        this.state.enableStatusRequest.ProcDefID = id;
        ProcDefsAPI
            .putEnableStatus(this.state.enableStatusRequest)
            .then(data => {
                if (data.Status != "0") {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
                this.loadData();
            });
    }
    /**禁用 */
    putDisableStatus(id) {
        this.setState({loading: true})
        this.state.disableStatusRequest.ProcDefID = id;
        ProcDefsAPI
            .putDisableStatus(this.state.disableStatusRequest)
            .then(data => {
                if (data.Status != "0") {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
                this.loadData();
            });
    }

    tablePageChange(current) {
        let modelRq = this.state.defRequest;
        let id = (modelRq.categoryID == undefined)
            ? "-1"
            : modelRq.categoryID;
        let status = (modelRq.status == undefined)
            ? ""
            : modelRq.status;
        let name = (modelRq.flowName == undefined)
            ? ""
            : modelRq.flowName;
        let key = (modelRq.flowKey == undefined)
            ? ""
            : modelRq.flowKey;

        this.state.defRequest = {
            pageIndex: current + "",
            pageSize: this.state.pageSize + "",
            categoryID: id,
            status: status,
            flowName: name,
            flowKey: key
        }
        this.loadData();
    }

    /**查看详情 */
    showInfoModal(item) {
        this.setState({showInfoModal: true, showEditModal: false, defItmeInfo: item});
    }
    /**显示编辑 */
    showEditModal() {
        let item = this.state.defItmeInfo;
        this.setState({
            showInfoModal: false,
            showEditModal: true,
            modelBasicRequest: {
                Name: item.Name,
                CategoryID: item.CategoryID,
                Description: item.Description,
                Key: item.Key,
                Localization: item.Localization,
                FormUrl: item.FormURL,
                IconUrl: item.IconURL
            }
        });
    }
    /**验证key的唯一性 */
    idValidator(rule, value, callback, source, options) {
        // if (this.oldId && value === this.oldId) {     callback(); }
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            let rand = new Date().getTime() + "";
            this.state.modelBasicRequest.Key = rand;
            this.state.modelBasicRequest.IconUrl = reader.result;

            var image = new Image();
            image.onload = function () {
                var width = image.width;
                var height = image.height;
                console.log(width + '======' + height + "=====" + file.size);
            };
            image.src = reader.result;
            this.setState({modelBasicRequest: this.state.modelBasicRequest})
        });
        reader.readAsDataURL(file);
        return false;
    }
    /**更新流程定义 */
    saveBasicModel() {
        this.state.modelBasicRequest.ProcModelID = this.state.defItmeInfo.ID;
        ProcModelAPI
            .putProcModel(this.state.modelBasicRequest)
            .then((data) => {
                if (data.Status == "0") {
                    this.loadData();
                    AkNotification.success({message: '提示', description: data.Message});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }

    renderSearch() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;

        let searchButton = <AkIcon
            type="search"
            onClick={topThis
            .loadData
            .bind(topThis)}></AkIcon>;

        let optionCategory = this.state.categoryList
            ? this
                .state
                .categoryList
                .map((entry) => {
                    return <AkSelect.Option key={entry.CategoryID} value={entry.CategoryID}>{entry.Name}</AkSelect.Option>
                })
            : null;

        let optionStatus = topThis.state.statusList
            ? topThis
                .state
                .statusList
                .map((entry) => {
                    return <AkSelect.Option key={entry.key} value={entry.value + ""}>{entry.key}</AkSelect.Option>
                })
            : null;

        return <AkRow align="middle" justify="space-around" type="flex" className="row-w150">
            <AkCol>
                <AkSelect
                    className="w150"
                    allowClear
                    onChange={(value) => {
                    topThis.state.defRequest.categoryID = value as string;
                }}
                    placeholder={format({id: ProcDefPageLocale.SearchCategoryHolder})}>
                    {optionCategory}
                </AkSelect>
            </AkCol>
            <AkCol>
                <AkSelect
                    className="w150"
                    allowClear
                    onChange={(value) => {
                    topThis.state.defRequest.status = value as string;
                }}
                    placeholder={format({id: ProcDefPageLocale.SearchStatusHolder})}>
                    {optionStatus}
                </AkSelect>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear
                    onChange={(value) => {
                    topThis.state.defRequest.flowName = value as string;
                }}
                    placeholder={format({id: ProcDefPageLocale.SearchNameHolder})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear
                    onChange={(value) => {
                    topThis.state.defRequest.flowKey = value as string;
                }}
                    addonAfter={searchButton}
                    placeholder={format({id: ProcDefPageLocale.SearchKeyHolder})}></AkInput>
            </AkCol>
        </AkRow>
    }

    renderInfoModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let item = this.state.defItmeInfo;

        let editBtn = <AkButton
            key="editBtn"
            onClick={topThis
            .showEditModal
            .bind(topThis)}>{format({id: ProcDefPageLocale.PropsBtnEidt})}</AkButton>
        let footer = [editBtn];
        return item
            ? <AkModal
                    visible={topThis.state.showInfoModal}
                    maskClosable={false}
                    title={item.Name}
                    footer={footer}
                    onCancel={() => {
                    topThis.setState({showInfoModal: false});
                }}>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsProcessIcon}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <img src={item.IconURL} className="ak-detail-img"/>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsProcessName}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {item.Name}
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsProcessCategory}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {item.CategoryName}
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsModeAuthority}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {item.CategoryName}
                        </AkCol>
                    </AkRow>
                </AkModal>
            : null
    }

    /**编辑 */
    renderEditModal() {
        let topThis = this;
        let item = topThis.state.modelBasicRequest;

        let icon = item.IconUrl
            ? <img src={item.IconUrl} alt=""></img>
            : <AkIcon type="plus" className="ant-ak-upload-trigger"/>

        let options = topThis.state.categoryList
            ? topThis
                .state
                .categoryList
                .map((entry) => {
                    return <AkSelect.Option key={entry.CategoryID} value={entry.CategoryID}>{entry.Name}</AkSelect.Option>
                })
            : null

        let format = topThis.props.intl.formatMessage;

        return topThis.state.showEditModal
            ? <AkModal
                    maskClosable={false}
                    visible={this.state.showEditModal}
                    title={topThis.state.modelBasicRequest.Name}
                    onCancel={() => {
                    topThis.setState({showEditModal: false, showInfoModal: true})
                }}
                    onOk={() => {
                    topThis.saveBasicModel();
                }}>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsProcessIcon}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkUpload
                                action=""
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={topThis
                                .beforeUpload
                                .bind(topThis)}
                                className="ak-upload">
                                {icon}
                            </AkUpload>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsProcessName}></FormattedMessage>
                            <span className="ant-form-item-required"></span>
                        </AkCol>
                        <AkCol span={20}>
                            <AkInput
                                defaultValue={topThis.state.modelBasicRequest.Name}
                                onChange={(value) => {
                                topThis.state.modelBasicRequest.Name = value;
                            }}></AkInput>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsProcessKey}></FormattedMessage>
                            <span className="ant-form-item-required"></span>
                        </AkCol>
                        <AkCol span={20}>
                            <AkInput
                                defaultValue={topThis.state.modelBasicRequest.Key}
                                onChange={(value) => {
                                value.trim();
                                topThis.state.modelBasicRequest.Key = value;
                                topThis
                                    .idValidator
                                    .bind(topThis);
                                {/** let key = new Date().getTime() + ""; topThis.state.modelBasicRequest.Key = key;*/
                                }
                            }}></AkInput>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsProcessCategory}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkSelect
                                className="wfull"
                                defaultValue={topThis.state.modelBasicRequest.CategoryID}
                                onChange={(value) => {
                                topThis.state.modelBasicRequest.CategoryID = value as string;
                            }}>
                                {options}
                            </AkSelect>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefPageLocale.PropsModeAuthority}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}></AkCol>
                    </AkRow>
                </AkModal>
            : null;
    }

    render() {
        let topThis = this;
        let pagination : AkPaginationProps = {
            total: topThis.state.total,
            onChange: (current) => {
                topThis
                    .tablePageChange
                    .bind(topThis, current);
            }
        }

        return <MainContent
            Header={NavLocale.FlowProcDefAcvitity}
            Search={topThis.renderSearch()}>
            <DefTable
                rowKey="ID"
                pagination={pagination}
                columns={topThis.columns}
                loading={topThis.state.loading}
                dataSource={topThis.state.defDataList}></DefTable>
            {topThis.renderInfoModal()}
            {topThis.renderEditModal()}
        </MainContent>
    }
}
class ProcDefPageStyle {}

export default injectIntl(withRouter(ProcDefPage))
