import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {injectIntl, FormattedMessage} from "react-intl";
import {ProcDefItemPageLocale} from "../../locales/localeid";
import {AkIcon} from "../../component/controls/ak-icon";
import {AkRow} from "../../component/controls/ak-row";
import {AkCol} from "../../component/controls/ak-col";
import {AkSelect} from "../../component/controls/ak-select";
import {AkSwitch} from "../../component/controls/ak-switch";
import {MainContent} from "../components/maincontent";
import {ProcDefsAPI} from "../../api/procdefs";
import {CategoryAPI} from "../../api/category";
import {ResourceAPI} from "../../api/resource";
import {AkForm, AkFormComponentProps} from "../../component/controls/ak-form";
import {AkNotification} from "../../component/controls/ak-notification";
import {AkSpin} from "../../component/controls/ak-spin";
import {AkModal} from "../../component/controls/ak-modal";

const Option = AkSelect.Option;

interface ProcDefItemProps extends IntlProps,
RouterProps,
AkFormComponentProps {}
interface ProcDefItemStates {
    prodefID?: string
    detailInfo?: ProcessInfo;
    versionList?: string[];
    loading?: boolean;
    /**获取已部署流程详情 */
    detailRequest?: GetProcDefByIDRequest;
    /**根据key获取所有版本号 */
    versionRequest?: GetProcdefVersionRequest;
    /**根据key和version获取特定版本流程定义 */
    getProcDefByIdAndVsRequest?: GetProcdefByIdAndVersionRequest;
    /**根据key获取最新版本流程定义 */
    getProcDefByKeyRequest?: GetProcdefBykeyRequest;
    /**启用 */
    enableStatusRequest?: PutEnableStatusRequest;
    /**禁用 */
    disableStatusRequest?: PutDisableStatusRequest;
    /**编辑流程分类 */
    editCategoryRequest?: PutEditCategoryRequest;
    /**更改流程状态 */
    switchStatus?: boolean;
    /**流程分类 */
    categoryList?: CategoryInfo[];
    /**显示编辑流程分类 */
    showCategoryModal?: boolean;
    /**获取资源文件 */
    getResource?: GetResourceByIdRequest;
}
/** 已部署流程详情 */
class ProcDefItemPage extends Component < ProcDefItemProps,
ProcDefItemStates > {

    constructor(props, context) {
        super(props, context);
        this.state = {
            prodefID: this.props.location.query["id"],
            detailRequest: {},
            versionRequest: {},
            getProcDefByIdAndVsRequest: {},
            getProcDefByKeyRequest: {},
            enableStatusRequest: {},
            disableStatusRequest: {},
            editCategoryRequest: {},
            getResource: {},
            detailInfo: {}
        }
    }

    componentDidMount() {
        this.loadData();
        this.initCategory();
    }

    /**加载详细数据*/
    loadData() {
        this.setState({loading: true})
        this.state.detailRequest.procDefID = this.state.prodefID;
        /** 获取已部署流程详情 */
        ProcDefsAPI
            .getProcDefsById(this.state.detailRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.initVersion(data.Data.Key);
                    this.getImgResource(data.Data);
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                    this.setState({loading: false});
                }
            });
    }

    /**获取流程图 */
    getImgResource(myDetailInfo?: ProcessInfo) {
        this.state.getResource.resourceID = myDetailInfo.ImgResourceID;
        ResourceAPI
            .getResourceById(this.state.getResource)
            .then(data => {
                if (data.Status == "0") {
                    myDetailInfo.ImgBlob = data.Data.Resource;
                    this.setState({detailInfo: myDetailInfo, showCategoryModal: false});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            })
    }
    /**根据key获取最新版本流程定义 */
    loadDataByKey() {
        ProcDefsAPI
            .getProcDefsByKey(this.state.getProcDefByKeyRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.initVersion(data.Data.Key);
                    this.setState({detailInfo: data.Data});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                    this.setState({loading: false});
                }
            });
    }
    /**获取版本 */
    initVersion(key) {
        this.setState({loading: true});
        this.state.versionRequest.key = key;
        ProcDefsAPI
            .getAllVersionByKey(this.state.versionRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({loading: false, versionList: data.Data});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                    this.setState({loading: false});
                }
            })
    }
    /**获取流程分类 */
    initCategory() {
        CategoryAPI
            .getCategory({})
            .then(data => {
                this.setState({categoryList: data.Data})
            });
    }
    /**根据Key 和 version 获取特定详情信息 */
    getModelByIdAndVersion() {
        this.setState({loading: true});
        ProcDefsAPI
            .getProcDefsByKeyAndVersion(this.state.getProcDefByIdAndVsRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({loading: false, detailInfo: data.Data});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                    this.setState({loading: false});
                }
            })
    }
    /**编辑流程分类 */
    editClass() {
        this.setState({showCategoryModal: true})
    }
    /**更改状态 */
    changeStatus(item) {
        if (item.Status === 1) {
            this.state.enableStatusRequest.ProcDefID = item.ID;
            this.putDisableStatus(item.ID);
        } else {
            this.state.disableStatusRequest.ProcDefID = item.ID;
            this.putEnableStatus(item.ID);
        }
    }
    /**启用 */
    putEnableStatus(id) {
        this.setState({loading: true})
        this.state.enableStatusRequest.ProcDefID = id;
        ProcDefsAPI
            .putEnableStatus(this.state.enableStatusRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    /**禁用 */
    putDisableStatus(id) {
        this.setState({loading: true})
        this.state.disableStatusRequest.ProcDefID = id;
        ProcDefsAPI
            .putDisableStatus(this.state.disableStatusRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    /**保存分类修改 */
    saveEditCategroy() {
        ProcDefsAPI
            .putEditCategory(this.state.editCategoryRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.loadData();
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    /**流程流程分类 */
    renderCategoryModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;
        let options = topThis.state.categoryList
            ? topThis
                .state
                .categoryList
                .map((entry) => {
                    return <AkSelect.Option key={entry.CategoryID} value={entry.CategoryID}>{entry.Name}</AkSelect.Option>
                })
            : null

        return topThis.state.showCategoryModal
            ? <AkModal
                    maskClosable={false}
                    visible={this.state.showCategoryModal}
                    onCancel={() => {
                    topThis.setState({showCategoryModal: false});
                }}
                    onOk={() => {
                    topThis.saveEditCategroy();
                }}
                    title={format({id: ProcDefItemPageLocale.PropsEditCategory})}>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcDefItemPageLocale.PropsCategory}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkSelect
                                className="wfull"
                                defaultValue={topThis.state.detailInfo.CategoryID}
                                onChange={(value) => {
                                this.state.editCategoryRequest = {
                                    key: this.state.detailInfo.Key,
                                    categoryID: value as string
                                }
                            }}>
                                {options}
                            </AkSelect>
                        </AkCol>
                    </AkRow>
                </AkModal >
            : null;
    }

    render() {
        let topThis = this;
        const format = topThis.props.intl.formatMessage;
        let itemInfo = this.state.detailInfo;

        if (itemInfo === undefined) {
            return null
        }

        let header = <AkRow>
            <AkCol>
                <span className="top_title" onClick={() => history.back()}>
                    <AkIcon type="setting"></AkIcon>
                    <FormattedMessage id={ProcDefItemPageLocale.HeaderTitle}></FormattedMessage>
                </span>
                <span className="font16">
                    {"< " + itemInfo.Name}
                </span>
            </AkCol>
        </AkRow>;

        let search = null;
        let versionList = this.state.versionList;
        if (versionList != undefined && versionList.length > 0) {
            let options = versionList.map((entry, index) => {
                return <AkSelect.Option key={index} value={entry + ""}>{entry}</AkSelect.Option>
            })

            search = <AkRow
                className="mr30 font12 cursor"
                align="middle"
                type="flex"
                justify="space-around">
                <AkCol className="mr10">
                    <FormattedMessage id={ProcDefItemPageLocale.PropsChoseVersion}></FormattedMessage>
                </AkCol>
                <AkCol>
                    <AkSelect
                        style={{
                        width: "80px"
                    }}
                        onChange={(value) => {
                        topThis.state.getProcDefByIdAndVsRequest = {
                            key: itemInfo.Key,
                            version: value as string
                        }
                        topThis.getModelByIdAndVersion();
                    }}>
                        {options}
                    </AkSelect>
                </AkCol>
            </AkRow>
        }

        return <MainContent Header={header} Search={search}>
            <AkSpin spinning={this.state.loading}>
                <AkRow justify="start" type="flex" className="row-auto">
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsName}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.Name}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsKey}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.Key}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsCategory}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.CategoryName + "  "}
                                <a
                                    className="row-item"
                                    onClick={topThis
                                    .editClass
                                    .bind(topThis)}>
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsEdit}></FormattedMessage>
                                </a>
                            </AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsVersion}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.Version}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsPublishTime}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.DeployTimeStr}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsPublisher}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>{itemInfo.CreatedBy}</AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsStatus}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>
                                <AkSwitch
                                    defaultChecked={itemInfo.Status == 0
                                    ? false
                                    : true}
                                    onChange={topThis
                                    .changeStatus
                                    .bind(topThis, itemInfo)}></AkSwitch>
                            </AkCol>
                        </AkRow>
                    </AkCol>
                    <AkCol lg={8}>
                        <AkRow justify="start" align="middle" type="flex">
                            <AkCol lg={8}>
                                <strong className="row-item">
                                    <FormattedMessage id={ProcDefItemPageLocale.PropsAuthority}></FormattedMessage>
                                </strong>
                            </AkCol>
                            <AkCol lg={16}>
                                <AkIcon type="setting"></AkIcon>
                            </AkCol>
                        </AkRow>
                    </AkCol>
                </AkRow>
                <div style={ProcDefItemStyle.SplicLine}></div>
            </AkSpin>
            {topThis.renderCategoryModal()}
        </MainContent>
    }
}
class ProcDefItemStyle {
    static SplicLine : React.CSSProperties = {
        height: "2px",
        width: '100%',
        border: "1px solid #666"
    }
}

export default injectIntl(withRouter(AkForm.create()(ProcDefItemPage)))
