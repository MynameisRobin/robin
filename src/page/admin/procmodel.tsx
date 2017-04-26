import * as React from "react";
import {Component} from "react";
import {Link} from "react-router";
import {injectIntl, FormattedMessage} from "react-intl";
import {MainContent} from "../components/maincontent";
import {NavLocale, ProcModelPageLocale, FlowRulesPageLocale} from "../../locales/localeid";
import {AkTable, AkColumnProps} from "../../component/controls/ak-table";
import {ProcModelAPI} from "../../api/procmodel";
import {PathConfig} from "../../config/pathconfig";
import {AkRow} from "../../component/controls/ak-row";
import {AkCol} from "../../component/controls/ak-col";
import {AkSelect} from "../../component/controls/ak-select";
import {AkInput} from "../../component/controls/ak-input";
import {AkButton} from "../../component/controls/ak-button";
import {CategoryAPI} from "../../api/category";
import {ResourceAPI} from "../../api/resource";
import {FlowRulesAPI} from "../../api/flowrules";
import {AkIcon} from "../../component/controls/ak-icon";
import {AkModal} from "../../component/controls/ak-modal";
import {AkUpload} from "../../component/controls/ak-upload";
import {AkMessage} from "../../component/controls/ak-message";
import {AkTooltip} from "../../component/controls/ak-tooltip";
import {AkNotification} from "../../component/controls/ak-notification";
import {AkForm, AkFormComponentProps} from "../../component/controls/ak-form";
import {AkRadio} from "../../component/controls/ak-radio";

class ModelAkTable extends AkTable < ProcessInfo > {}
interface ModelAkColumn extends AkColumnProps < ProcessInfo > {}

interface ProcModelPageProps extends IntlProps,
RouterProps,
AkFormComponentProps {
    idValidator?: (rule, value, callback, source, options) => void; //验证id是否合法
}

interface ProcModelPageStates {
    /**查询加载状态 */
    loading?: boolean;
    /**总记录数 */
    totalCount?: number;
    /**流程数据 */
    modelDataList?: ProcessInfo[];
    /**分类列表数据 */
    categoryList?: CategoryInfo[];
    /**展示编辑弹框 */
    showEditModal?: boolean;
    /**展示信息框 */
    showInfoModal?: boolean;
    /**展示复制框 */
    showCopyModal?: boolean;
    /**信息展示框标题 */
    infoModalTitle?: string;
    /**流程信息 */
    modelInfo?: ProcessInfo;
    /**
     * 预览图片
     *
     * @type {*}
     * @memberOf ProcModelPageStates
     */
    tempImg?: string;
    /**
     * Radio
     *
     * @type {number}
     * @memberOf ProcModelPageStates
     */
    tempRadio?: number;
    /**复制请求 */
    modelCopyRequest?: CopyProcModelRequest;
    /**流程查询请求信息 */
    modelRequest?: GetProcModelRequest;
    /**添加资源信息 */
    resourceRequest?: PostResourceRequest;
    /**流程保存请求信息 */
    modelBasicRequest?: PostProcModelRequest;
    /**流程定义规则 */
    showFlowRulesDialog?: boolean;
    /**添加流程定义规则 */
    postFlowRulesRequest?: PostFlowRulesRequest;
}
/** 流程定义 */
class ProcModelPage extends Component < ProcModelPageProps,
ProcModelPageStates > {
    columns : ModelAkColumn[]
    oldId : string;

    constructor(props, context) {
        super(props, context);
        let format = this.props.intl.formatMessage;
        this.state = {
            modelRequest: {
                pageSize: "20",
                pageIndex: "1"
            },
            modelBasicRequest: {},
            resourceRequest: {},
            modelCopyRequest: {},
            tempRadio: 0,
            postFlowRulesRequest: {}
        }

        this.columns = [
            {
                title: format({id: ProcModelPageLocale.ColumnName}),
                key: ProcModelPageLocale.ColumnName,
                dataIndex: "Name",
                render: (name, record) => {
                    return <Link
                        to={{
                        pathname: PathConfig.ProcModelItem,
                        query: {
                            id: record.ID
                        }
                    }}>{name}</Link>
                }
            }, {
                title: format({id: ProcModelPageLocale.ColumnKey}),
                key: ProcModelPageLocale.ColumnKey,
                dataIndex: "Key"
            }, {
                title: format({id: ProcModelPageLocale.ColumnCategory}),
                key: ProcModelPageLocale.ColumnCategory,
                dataIndex: "CategoryName"
            }, {
                title: format({id: ProcModelPageLocale.ColumnModified}),
                key: ProcModelPageLocale.ColumnModified,
                dataIndex: "ModifiedStr"
            }, {
                title: format({id: ProcModelPageLocale.ColumnModifiedBy}),
                key: ProcModelPageLocale.ColumnModifiedBy,
                dataIndex: "ModifiedBy"
            }, {
                className: "ak_align_r",
                key: ProcModelPageLocale.ColumnOperation,
                render: (text, record) => {
                    return <div>
                        <AkTooltip title={format({id: ProcModelPageLocale.OperationSend})}>
                            <AkIcon
                                type="fly"
                                onClick={() => {
                                this.state.modelInfo = record;
                                this.setState({
                                    showInfoModal: true,
                                    infoModalTitle: format({id: ProcModelPageLocale.ModalDeployTitle})
                                });
                            }}></AkIcon>
                        </AkTooltip>
                        <AkTooltip title={format({id: ProcModelPageLocale.OperationDesigner})}>
                            <AkIcon
                                type="edit"
                                onClick={() => {
                                window.openWithHash(PathConfig.ProcModelDesigner + `?id=` + record.ID + '&rid=' + record.DefResourceID);
                            }}></AkIcon>

                        </AkTooltip>
                        <AkTooltip title={format({id: ProcModelPageLocale.OperationCopy})}>
                            <AkIcon
                                type="copy"
                                onClick={() => {
                                this.state.modelInfo = record;
                                this.state.modelCopyRequest.ProcModelID = record.ID;
                                this.setState({showCopyModal: true})
                            }}></AkIcon>

                        </AkTooltip>
                        {/*<AKTooltip title={format({id: ProcModelPageLocale.OperationRight})}>
                            <AkIcon
                                type="share-alt"
                                onClick={() => {
                                this.state.modelInfo = record;
                                this.setState({
                                    showInfoModal: true,
                                    infoModalTitle: format({id: ProcModelPageLocale.ModalRightTitle})
                                });
                            }}></AkIcon>
                        </AKTooltip>*/}
                        <AkTooltip title={format({id: ProcModelPageLocale.OperationEdit})}>
                            <AkIcon
                                type="setting"
                                onClick={() => {
                                this.state.modelBasicRequest = {
                                    IconUrl: record.IconURL,
                                    CategoryID: record.CategoryID,
                                    Key: record.Key,
                                    Name: record.Name,
                                    ProcModelID: record.ID,
                                    Description: record.Description,
                                    Localization: record.Description,
                                    FormUrl: record.FormURL
                                }
                                this.setState({showEditModal: true});
                            }}></AkIcon>
                        </AkTooltip>
                    </div>;
                }
            }
        ]
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
        this.setState({loading: true});
        ProcModelAPI
            .getProcModel(this.state.modelRequest)
            .then(data => {
                this.setState({
                    loading: false,
                    showInfoModal: false,
                    showEditModal: false,
                    totalCount: data.TotalCount,
                    modelDataList: data.Data,
                    showFlowRulesDialog: false
                })
            });
    }
    /**验证Key 唯一性 */
    idValidator(rule, value, callback, source, options) {
        if (this.oldId && value === this.oldId) {
            callback();
        }

        if (this.props.idValidator) {
            this
                .props
                .idValidator(rule, value, callback, source, options);
        }
    }

    beforeUpload(file) {
        let topThis = this;
        const reader = new FileReader();
        if (file.size / 1024 > 50) {
            return false;
        }
        reader.addEventListener('load', () => {
            let rand = new Date().getTime() + "";
            var image = new Image();
            image.onload = function () {
                var width = image.width;
                var height = image.height;
                console.log(width);

                if (width > 150 || height > 150) {
                    return false;
                }

                topThis.state.modelBasicRequest.Key = rand;
                topThis.state.modelBasicRequest.IconUrl = reader.result;
                topThis.setState({tempImg: reader.result});
            };
            image.src = reader.result;
        });
        reader.readAsDataURL(file);

        return false;
    }
    /**复制流程 */
    copyProcess(withEdit?: boolean) {
        ProcModelAPI
            .copyProcModel(this.state.modelCopyRequest)
            .then((data) => {
                if (data.Status == "0") {
                    this.addResources(data.Data, this.state.modelCopyRequest.Name);
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
                this.setState({showCopyModal: false, modelCopyRequest: {}});
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
                    visible={true}
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
                            {topThis.state.modelInfo.Version}
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ColumnProcessID}></FormattedMessage>
                        </AkCol>
                        <AkCol span={18}>
                            {topThis.state.modelInfo.ID}
                        </AkCol>
                        <AkCol span={2}>
                            <a
                                onClick={() => {
                                topThis.setState({showInfoModal: false, showFlowRulesDialog: true});
                            }}>
                                <FormattedMessage id={ProcModelPageLocale.OperationEdit}></FormattedMessage>
                            </a>
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
                    if (data.Status == "0") {
                        this.addResources(data.Data, this.state.modelBasicRequest.Name);
                    } else {
                        AkNotification.warning({message: '提示', description: data.Message});
                    }
                    this.setState({showEditModal: false, modelBasicRequest: {}});
                });
        }
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
                            window.openWithHash(PathConfig.ProcModelDesigner + `?id=` + id + '&rid=' + data.Data);
                        },
                        onCancel: () => {
                            this.setState({modelCopyRequest: {}});
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
        const {getFieldDecorator} = topThis.props.form;
        let format = topThis.props.intl.formatMessage;
        let formatTitle = topThis.state.modelBasicRequest.Name;
        if (formatTitle === undefined) {
            formatTitle = "新建流程定义"; // GO TO 标题国际化
        }

        let icon = this.state.tempImg
            ? <img src={this.state.tempImg} alt=""></img>
            : <AkIcon type="plus" style={{
                fontSize: 50,
                lineHeight:'100px'
            }}/>

        let options = topThis.state.categoryList
            ? topThis
                .state
                .categoryList
                .map((entry) => {
                    return <AkSelect.Option key={entry.CategoryID} value={entry.CategoryID}>{entry.Name}</AkSelect.Option>
                })
            : null

        return topThis.state.showEditModal
            ? <AkModal
                    maskClosable={false}
                    visible={this.state.showEditModal}
                    title={formatTitle}
                    onCancel={() => {
                    topThis.setState({showEditModal: false, modelBasicRequest: {}, tempImg: null})
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
                                accept="image/png,image/jpeg,image/jpg"
                                action=""
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={topThis
                                .beforeUpload
                                .bind(topThis)}
                                className="ant-ak-upload">
                                {icon}
                            </AkUpload>
                            <FormattedMessage id={ProcModelPageLocale.PropsPlaceholderImgDescribe}></FormattedMessage>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ModalLableName}></FormattedMessage>
                            <span className="ant-form-item-required"></span>
                        </AkCol>
                        <AkCol span={20}>
                            <AkInput
                                placeholder={format({id: ProcModelPageLocale.PropsPlaceholderName})}
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
                                placeholder={format({id: ProcModelPageLocale.PropsPlaceholderKey})}
                                defaultValue={topThis.state.modelBasicRequest.Key}
                                onBlur={() => {/**鼠标离开时验证标识唯一性 */
                                console.log(topThis.state.modelBasicRequest.Key);
                            }}
                                onChange={(value) => {
                                value = value.replace(/\s/g, '');
                                topThis.state.modelBasicRequest.Key = value;
                            }}></AkInput>
                            <FormattedMessage id={ProcModelPageLocale.ModelLableKeyDes}></FormattedMessage>
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ModalLableCategory}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkSelect
                                className="wfull"
                                placeholder={format({id: ProcModelPageLocale.PropsPlaceholderCategory})}
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
                        <AkCol span={20}>
                            <AkRadio.Group
                                value={this.state.tempRadio}
                                onChange={(e) => {
                                this.setState({
                                    tempRadio: (e.target as any).value
                                })
                            }}>
                                <AkRadio value={0}>A</AkRadio>
                                <AkRadio value={1}>B</AkRadio>
                            </AkRadio.Group>
                            {this.state.tempRadio == 1
                                ? <AkInput placeholder={format({id: ProcModelPageLocale.PropsPlaceholderRight})}></AkInput>
                                : null}
                        </AkCol>
                    </AkRow>
                    <AkRow type="flex" justify="start" align="middle" className="mb20">
                        <AkCol span={4}>
                            <FormattedMessage id={ProcModelPageLocale.ModalLableDescribe}></FormattedMessage>
                        </AkCol>
                        <AkCol span={20}>
                            <AkInput
                                defaultValue={topThis.state.modelBasicRequest.Description}
                                onChange={(value) => {
                                topThis.state.modelBasicRequest.Description = value;
                            }}></AkInput>
                        </AkCol>
                    </AkRow>
                </AkModal>
            : null;
    }

    renderSearch() {
        let topThis = this;
        let format = this.props.intl.formatMessage;
        return <AkRow type="flex" align="middle" justify="space-around" className="row-w150">
            <AkCol>
                <AkSelect
                    defaultValue={topThis.state.modelRequest.categoryID}
                    onChange={(value) => {
                    topThis.state.modelRequest.categoryID = value as string;
                }}
                    placeholder={format({id: ProcModelPageLocale.SearchCategoryHolder})}
                    allowClear={true}>
                    {topThis.state.categoryList
                        ? topThis
                            .state
                            .categoryList
                            .map((entry) => {
                                return <AkSelect.Option key={entry.CategoryID} value={entry.CategoryID}>{entry.Name}</AkSelect.Option>
                            })
                        : null}
                </AkSelect>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    defaultValue={topThis.state.modelRequest.name}
                    onChange={(value) => {
                    topThis.state.modelRequest.name = value;
                }}
                    placeholder={format({id: ProcModelPageLocale.SearchNameHolder})}></AkInput>
            </AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    defaultValue={topThis.state.modelRequest.key}
                    onChange={(value) => {
                    topThis.state.modelRequest.key = value;
                }}
                    placeholder={format({id: ProcModelPageLocale.SearchKeyHolder})}></AkInput>
            </AkCol>
            <AkCol>
                <AkButton
                    icon="search"
                    onClick={() => {
                    topThis.loadData()
                }}></AkButton>
            </AkCol>
            <AkCol>
                <a
                    href="javascript:;"
                    className="ak-basebtn-text"
                    onClick={() => {
                    topThis.state.modelBasicRequest = {}
                    topThis.setState({showEditModal: true});
                }}>
                    <AkIcon type="plus"></AkIcon>
                    {format({id: ProcModelPageLocale.SearchNew})}
                </a>
            </AkCol>
        </AkRow>
    }
    tablePageChange(current) {
        let modelRq = this.state.modelRequest;
        let id = (modelRq.categoryID == undefined)
            ? "-1"
            : modelRq.categoryID;
        let name = (modelRq.name == undefined)
            ? ""
            : modelRq.name;
        let key = (modelRq.key == undefined)
            ? ""
            : modelRq.key;
        this.state.modelRequest = {
            pageIndex: current + "",
            pageSize: this.state.modelRequest.pageSize,
            categoryID: id,
            name: name,
            key: key
        }
        this.loadData();
    }
    /**流程定义规则 */
    renderFlowRulesModal() {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;

        return topThis.state.showFlowRulesDialog
            ? <AkModal
                    style={{
                    width: "1500px"
                }}
                    maskClosable={false}
                    visible={topThis.state.showFlowRulesDialog}
                    title={format({id: FlowRulesPageLocale.PropsDialogTitle})}
                    onCancel={() => {
                    topThis.setState({showFlowRulesDialog: false})
                }}
                    onOk={() => {
                    topThis.saveRules();
                }}>
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
                            <AkRow type="flex" justify="space-around" align="middle">
                                <AkCol span={4}>
                                    <AkInput value={"固定字符"} disabled></AkInput>
                                </AkCol>
                                <AkCol span={2}>
                                    内容:</AkCol>
                                <AkCol span={15}>
                                    <AkInput
                                        allowClear={true}
                                        placeholder={"最多20位中文、英文、数字"}
                                        onChange={(value => {
                                        this.state.postFlowRulesRequest.prefix = value;
                                    })}></AkInput>
                                </AkCol>
                                <AkCol span={3}>
                                    <AkIcon type="arrow-down"></AkIcon>
                                    <AkIcon type="arrow-up"></AkIcon>
                                </AkCol>
                            </AkRow>
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
    /**添加流程定义规则 */
    saveRules() {
        this.state.postFlowRulesRequest.autoIncrement = "1";
        this.state.postFlowRulesRequest.defKey = this.state.modelInfo.Key;
        FlowRulesAPI
            .postFlowRules(this.state.postFlowRulesRequest)
            .then(data => {
                if (data.Status == "0") {
                    AkNotification.success({message: '提示', description: data.Message});
                    this.setState({showInfoModal: true, showFlowRulesDialog: false});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    render() {
        let topThis = this;
        return <MainContent Header={NavLocale.FLowProcModel} Search={topThis.renderSearch()}>
            {topThis.renderEditModal()}
            {topThis.renderInfoModal()}
            {topThis.renderCopyModal()}
            {topThis.renderFlowRulesModal()}
            <ModelAkTable
                rowKey="ID"
                pagination={{
                total: topThis.state.totalCount,
                pageSize: Number(topThis.state.modelRequest.pageSize),
                onChange: (current) => {
                    topThis.tablePageChange(current);
                }
            }}
                columns={topThis.columns}
                loading={topThis.state.loading}
                dataSource={topThis.state.modelDataList}></ModelAkTable>
        </MainContent>
    }
}
class ProcModelPageStyle {}

// export default injectIntl(withRouter(ProcModelPage))
export default injectIntl(AkForm.create()(ProcModelPage));
