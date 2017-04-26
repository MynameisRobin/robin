import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {injectIntl, FormattedMessage} from "react-intl";
import {AkRow} from "../../component/controls/ak-row";
import {AkCol} from "../../component/controls/ak-col";
import {MainContent} from "../components/maincontent";
import {ProcModelItemPageLocale, ProcModelPageLocale} from "../../locales/localeid";
import {ProcModelAPI} from "../../api/procmodel";
import {ResourceAPI} from "../../api/resource";
import {AkSpin} from "../../component/controls/ak-spin";
import {AkTooltip} from "../../component/controls/ak-tooltip";
import {AkIcon} from "../../component/controls/ak-icon";
import {AkButton} from "../../component/controls/ak-button";
import {AkNotification} from "../../component/controls/ak-notification";
import {AkModal} from "../../component/controls/ak-modal";
import {AkInput} from "../../component/controls/ak-input";
import {AkMessage} from "../../component/controls/ak-message";
import {AkUpload} from "../../component/controls/ak-upload";
import {PathConfig} from "../../config/pathconfig";
import {AkSelect} from "../../component/controls/ak-select";
import {AkFormComponentProps} from "../../component/controls/ak-form";
import {CategoryAPI} from "../../api/category";

interface ProcModelItemProps extends IntlProps,
RouterProps,
AkFormComponentProps,
ReactRouter.RouteComponentProps < any,
any > {
    idValidator?: (rule, value, callback, source, options) => void; //验证id是否合法
}
interface ProcModelItemStates {
    loading?: boolean;
    /**展示编辑弹框 */
    showEditModal?: boolean;
    /**展示信息框 */
    showInfoModal?: boolean;
    /**展示复制框 */
    showCopyModal?: boolean;
    /**展示流程变量 */
    showVariableModal?: boolean;
    /**展示流程页面 */
    showProcessPageModal?: boolean;
    /**信息展示框标题 */
    infoModalTitle?: string;
    /**流程信息 */
    modelInfo?: ProcessInfo;
    /**流程保存请求信息 */
    modelBasicRequest?: PostProcModelRequest;
    /**复制请求 */
    modelCopyRequest?: CopyProcModelRequest;
    /**添加资源信息 */
    resourceRequest?: PostResourceRequest;
    /**详情 */
    modelItemRequest?: GetProcModelByIDRequest;
    /**获取资源文件 */
    getResourceByIdRequest?: GetResourceByIdRequest;
    /**分类列表数据 */
    categoryList?: CategoryInfo[];
    /**资源文件 */
    resouce?: ResourceInfo;
}
/** 流程定义详细页 */
class ProcModelItem extends Component < ProcModelItemProps,
ProcModelItemStates > {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modelInfo: {},
            modelBasicRequest: {},
            modelCopyRequest: {},
            getResourceByIdRequest: {},
            resouce: {}
        }
        this.state.modelItemRequest = {
            procModelID: this.props.location.query["id"]
        }
    }
    componentDidMount() {
        this.initData();
        this.loadData();
    }
    initData() {
        CategoryAPI
            .getCategory({})
            .then(data => {
                this.setState({categoryList: data.Data})
            });
    }
    loadData() {
        this.setState({loading: true})
        ProcModelAPI
            .getProcModelByID(this.state.modelItemRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.getResouce(data.Data);
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            })
    }
    /**验证key的唯一性 */
    idValidator(rule, value, callback, source, options) {
        // if (this.oldId && value === this.oldId) {     callback(); }
        console.log(123);

        if (this.props.idValidator) {
            this
                .props
                .idValidator(rule, value, callback, source, options);
        }
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            let rand = new Date().getTime() + "";
            this.state.modelBasicRequest.Key = rand;
            this.state.modelBasicRequest.IconUrl = reader.result;
            this.setState({modelBasicRequest: this.state.modelBasicRequest})
        });
        reader.readAsDataURL(file);
        return false;
    }
    /**复制流程 */
    copyProcess(withEdit?: boolean) {
        this.state.modelCopyRequest.ProcModelID = this.props.location.query["id"];
        ProcModelAPI
            .copyProcModel(this.state.modelCopyRequest)
            .then((data) => {
                this.setState({showCopyModal: false});
                if (data.Status == "0") {
                    this.addResources(data.Data, this.state.modelCopyRequest.Name);
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    /**复制流程 */
    renderCopyModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let cancel = <AkButton
            key="cancle"
            onClick=
            {() => { topThis.setState({ showCopyModal: false }); } }>
            取消
        </AkButton>
        let savewithedit = <AkButton
            key="savewithedit"
            onClick={() => {
            topThis.copyProcess(true);
        }}
            type="primary">保存并编辑</AkButton >
        let save = <AkButton
            key="save"
            onClick={() => {
            topThis.copyProcess();
        }}
            type="primary">
            保存
        </AkButton>
        return topThis.state.showCopyModal
            ? <AkModal
                    maskClosable={false}
                    onCancel={() => {
                    topThis.setState({showCopyModal: false});
                }}
                    footer={[cancel, savewithedit, save]}
                    visible={true}
                    title={format({id: ProcModelPageLocale.ModalCopyTitle})}>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ColumnKey}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkInput
                                placeholder={format({id: ProcModelPageLocale.SearchUniqueKeyHolder})}
                                onChange={(value) => {
                                topThis.state.modelCopyRequest.Key = value;
                            }}></AkInput>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ColumnName}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkInput
                                placeholder={format({id: ProcModelPageLocale.SearchNameHolder})}
                                onChange={(value) => {
                                topThis.state.modelCopyRequest.Name = value;
                            }}></AkInput>
                        </AkCol>
                    </AkRow>
                </AkModal >
            : null;
    }
    /**发布流程 */
    deployProcess() {
        ProcModelAPI
            .deployProcModel({ProcModelID: this.state.modelInfo.ID})
            .then((data) => {
                if (data.Status == "0") {
                    AkMessage.success(data.Message);
                    this.loadData();
                } else {
                    AkMessage.error(data.Message);
                }
            });
    }
    renderInfoModal() {
        let topThis = this;
        return topThis.state.showInfoModal
            ? <AkModal
                    visible={this.state.showInfoModal}
                    maskClosable={false}
                    title={topThis.state.infoModalTitle}
                    onCancel={() => {
                    topThis.setState({showInfoModal: false});
                }}
                    onOk={() => {
                    topThis.deployProcess();
                }}>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ColumnName}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {topThis.state.modelInfo.Name}
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ColumnCategory}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {topThis.state.modelInfo.CategoryName}
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ColumnVersion}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {topThis.state.modelInfo.Version + 1}
                        </AkCol>
                    </AkRow>
                </AkModal>
            : null;
    }
    /**更新或保存新增流程定义 */
    saveBasicModel() {
        if (this.state.modelBasicRequest.ProcModelID) {
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
        } else {
            ProcModelAPI
                .postProcModel(this.state.modelBasicRequest)
                .then((data) => {
                    this.setState({showEditModal: false});
                    if (data.Status == "0") {
                        this.addResources(data.Data, this.state.modelBasicRequest.Name);
                    } else {
                        AkNotification.warning({message: '提示', description: data.Message});
                    }
                });
        }
        return;
    }
    /**添加资源 */
    addResources(id, name) {
        this.state.resourceRequest = {
            Name: name,
            Resource: null
        }
        ResourceAPI
            .postResource(this.state.resourceRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                    AkModal.confirm({
                        title: "需要打开设计器，以便完成新流程的创建吗？",
                        onOk: () => {
                            console.log(this.state.modelBasicRequest);
                            window.open(PathConfig.ProcModelDesigner + `?id=` + id + '&rid=' + data.Data);
                        }
                    });
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            })
    }
    /**编辑 */
    renderEditModal() {
        let topThis = this;
        let icon = topThis.state.modelBasicRequest.IconUrl
            ? <img
                    src={topThis.state.modelBasicRequest.IconUrl}
                    alt=""
                    style={ProcModelItemStyle.Avatar}></img>
            : <AkIcon type="plus" style={ProcModelItemStyle.AvatarUploaderTrigger}/>

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
                    topThis.setState({showEditModal: false})
                }}
                    onOk={() => {
                    topThis.saveBasicModel();
                }}>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ModalLableIcon}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkUpload
                                action=""
                                showUploadList={false}
                                beforeUpload={topThis
                                .beforeUpload
                                .bind(topThis)}
                                style={ProcModelItemStyle.AvatarUploader}>
                                {icon}
                            </AkUpload>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ModalLableName}></FormattedMessage>
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
                            <FormattedMessage id={ProcModelPageLocale.ModalLableKey}></FormattedMessage>
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
                            <FormattedMessage id={ProcModelPageLocale.ModalLableCategory}></FormattedMessage>
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
                            <FormattedMessage id={ProcModelPageLocale.ModalLableRight}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}></AkCol>
                    </AkRow>
                </AkModal>
            : null;
    }
    /**获取资源文件 */
    getResouce(item : ProcessInfo) {
        if (item.DefResourceID == "0") {
            this.setState({
                loading: false,
                showInfoModal: false,
                showEditModal: false,
                showVariableModal: false,
                showProcessPageModal: false,
                modelInfo: item
            });
            return;
        }
        this.state.getResourceByIdRequest.resourceID = item.DefResourceID;
        ResourceAPI
            .getResourceById(this.state.getResourceByIdRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({
                        loading: false,
                        showInfoModal: false,
                        showEditModal: false,
                        showVariableModal: false,
                        showProcessPageModal: false,
                        modelInfo: item,
                        resouce: data.Data
                    });
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    /**查看流程变量*/
    showVariable() {
        let resource = this.state.resouce;
        if (this.state.resouce.Name === undefined || this.state.resouce.Resource === undefined) {
            AkNotification.warning({message: '提示', description: "资源文件不存在"}); //Go To

        } else {
            let resouce = JSON.parse(this.state.resouce.Resource);
            let variables = null;
            if (resouce.hasOwnProperty("variables")) {
                this.setState({showVariableModal: true});
            } else {
                AkNotification.warning({message: '提示', description: "资源文件不存在"}); //Go To
            }
        }
    }
    /**流程变量 Modal*/
    renderVariableModal() {
        if (this.state.resouce.Name === undefined || this.state.resouce.Resource === undefined) {
            return null;
        }
        let resouce = JSON.parse(this.state.resouce.Resource);
        let variables = null;
        if (resouce.hasOwnProperty("variables")) {
            variables = resouce.variables.basic as Variable[];
        } else {
            return null;
        }
        let topThis = this;
        let format = this.props.intl.formatMessage;
        let myFooter = <AkButton
            key="submit"
            type="primary"
            size="large"
            loading={this.state.loading}
            onClick={() => topThis.setState({showVariableModal: false})}>
            {format({id: ProcModelItemPageLocale.PropsCloseModal})}
        </AkButton>

        let row = variables.map(function (entry, index) {
            return <AkRow key={index} type="flex" justify="space-around" className="mb20">
                <AkCol span={7}>
                    <AkInput disabled={true} value={entry.name} allowClear={false}></AkInput>
                </AkCol>
                <AkCol span={7}>
                    <AkInput disabled={true} value={entry.type} allowClear={false}></AkInput>
                </AkCol>
                <AkCol span={7}>
                    <AkInput disabled={true} value={entry.value} allowClear={false}></AkInput>
                </AkCol>
            </AkRow>
        });

        return topThis.state.showVariableModal
            ? <AkModal
                    visible={this.state.showVariableModal}
                    maskClosable={false}
                    title={format({id: ProcModelItemPageLocale.PropsVariable})}
                    onCancel={() => {
                    topThis.setState({showVariableModal: false});
                }}
                    footer={[myFooter]}>
                    {row}
                </AkModal>
            : null;
    }
    /**查看流程页面 */
    showProcessPage() {
        let resource = this.state.resouce;
        if (this.state.resouce.Name === undefined || this.state.resouce.Resource === undefined) {
            AkNotification.warning({message: '提示', description: "资源文件不存在"}); //Go To
        } else {
            let resouce = JSON.parse(this.state.resouce.Resource);
            if (resouce.hasOwnProperty("flowPage")) {
                this.setState({showProcessPageModal: true})
            } else {
                AkNotification.warning({message: '提示', description: "资源文件不存在"}); //Go To
                return null;
            }
        }
    }
    /**流程页面Modal */
    renderProcessPageModal() {
        let topThis = this;
        if (topThis.state.resouce.Name === undefined || this.state.resouce.Resource === undefined) {
            return null;
        }
        let resouce = JSON.parse(topThis.state.resouce.Resource);
        let flowpage = null;
        if (resouce.hasOwnProperty("flowPage")) {
            flowpage = resouce.flowPage as FlowPage;
        } else {
            return null;
        }

        let format = this.props.intl.formatMessage;
        let myFooter = <AkButton
            key="submit"
            type="primary"
            size="large"
            loading={this.state.loading}
            onClick={() => topThis.setState({showProcessPageModal: false})}>
            {format({id: ProcModelItemPageLocale.PropsCloseModal})}
        </AkButton>

        return topThis.state.showProcessPageModal
            ? <AkModal
                    visible={this.state.showProcessPageModal}
                    maskClosable={false}
                    title={format({id: ProcModelItemPageLocale.PropsPage})}
                    onCancel={() => {
                    topThis.setState({showProcessPageModal: false});
                }}
                    footer={[myFooter]}>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelItemPageLocale.PropsPageName}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {flowpage.pageName}
                        </AkCol>
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelItemPageLocale.PropsPageApply}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {flowpage.applyPage}
                        </AkCol>
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelItemPageLocale.PropsPageApproval}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            {flowpage.approvalPage}
                        </AkCol>
                    </AkRow>
                </AkModal>
            : null;
    }

    render() {
        let topThis = this;
        let format = this.props.intl.formatMessage;
        let header = <AkRow>
            <AkCol>
                <span className="top_title" onClick={() => history.back()}>
                    <AkIcon type="setting"></AkIcon>
                    <FormattedMessage id={ProcModelItemPageLocale.PropsProcModel}></FormattedMessage>
                </span>
                <span className="font16">
                    {"< "}
                    <FormattedMessage id={ProcModelItemPageLocale.PropsDetail}></FormattedMessage>
                </span>
            </AkCol>
        </AkRow>;

        let itemInfo = this.state.modelInfo;
        if (itemInfo === undefined) {
            return null
        }

        let resource : ProcessProperties = JSON.parse(this.state.resouce.Resource
            ? this.state.resouce.Resource
            : null);

        let search = <div className="top_right_icon">
            <AkTooltip title={format({id: ProcModelPageLocale.OperationSend})}>
                <AkIcon
                    type="fly"
                    onClick={() => {
                    this.setState({
                        showInfoModal: true,
                        infoModalTitle: format({id: ProcModelPageLocale.ModalDeployTitle})
                    });
                }}></AkIcon>
            </AkTooltip>
            <AkTooltip title={format({id: ProcModelPageLocale.OperationEdit})}>
                <AkIcon
                    type="edit"
                    onClick={() => {
                    this.state.modelBasicRequest = {
                        IconUrl: itemInfo.IconURL,
                        CategoryID: itemInfo.CategoryID,
                        Key: itemInfo.Key,
                        Name: itemInfo.Name,
                        ProcModelID: itemInfo.ID,
                        Description: itemInfo.Description,
                        Localization: itemInfo.Description,
                        FormUrl: itemInfo.FormURL
                    }
                    this.setState({showEditModal: true});
                }}></AkIcon>

            </AkTooltip>
            <AkTooltip title={format({id: ProcModelPageLocale.OperationCopy})}>
                <AkIcon
                    type="copy"
                    onClick={() => {
                    this.state.modelCopyRequest.ProcModelID = itemInfo.ID;
                    this.setState({showCopyModal: true})
                }}></AkIcon>

            </AkTooltip>
            <AkTooltip title={format({id: ProcModelPageLocale.OperationRight})}>
                <AkIcon
                    type="share-alt"
                    onClick={() => {
                    this.setState({
                        showInfoModal: true,
                        infoModalTitle: format({id: ProcModelPageLocale.ModalRightTitle})
                    });
                }}></AkIcon>
            </AkTooltip>
        </div>;
        return <MainContent Header={header} Search={search}>
            <AkSpin spinning={this.state.loading}>
                <AkRow justify="start" type="flex" className="row-auto">
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsKey}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.Key}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsName}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.Name}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsCategory}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.CategoryName}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsModified}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.ModifiedStr}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsModifiedBy}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.ModifiedBy}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsVariable}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>
                                <a
                                    onClick={() => {
                                    topThis.showVariable();
                                }}>
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsSee}></FormattedMessage>
                                </a>
                            </AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsPage}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>
                                <a
                                    onClick={() => {
                                    topThis.showProcessPage()
                                }}>
                                    <FormattedMessage id={ProcModelItemPageLocale.PropsSee}></FormattedMessage>
                                </a>
                            </AkCol>
                        </AkRow>
                    </AkCol>
                </AkRow>
                <div style={ProcModelItemStyle.SplicLine}></div>

            </AkSpin>
            {this.renderCopyModal()}
            {this.renderEditModal()}
            {this.renderInfoModal()}
            {this.renderVariableModal()}
            {this.renderProcessPageModal()}
        </MainContent>
    }
}

class ProcModelItemStyle {
    static SplicLine : React.CSSProperties = {
        height: "2px",
        width: '100%',
        border: "1px solid #666"
    }
    static Avatar : React.CSSProperties = {
        width: 150,
        height: 150
    }
    static AvatarUploader : React.CSSProperties = {
        display: "block",
        border: "1px dashed #d9d9d9",
        borderRadius: 6,
        cursor: "pointer"
    }
    static AvatarUploaderTrigger = {
        display: "table-cell",
        verticalAlign: "middle",
        fontSize: 28,
        color: "#999"
    }
}

export default injectIntl(withRouter(ProcModelItem))
