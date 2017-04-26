import * as React from 'react'
import {Component} from 'react'
import {withRouter, Link} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {NavLocale, DailyReimburseApplicationPageLocale} from '../locales/localeid';
import {ProcDraftsAPI} from '../api/procdrafts';
import {ProcInstAPI} from '../api/procinst';
import {AkIcon} from '../component/controls/ak-icon';
import {AkRow} from '../component/controls/ak-row';
import {AkCol} from '../component/controls/ak-col';
import {AkSelect} from '../component/controls/ak-select';
import {AkInput} from '../component/controls/ak-input';
import {AkInputNumber} from '../component/controls/ak-inputnumber';
import {AkButton} from '../component/controls/ak-button';
import {AkDatePicker} from '../component/controls/ak-datepicker';
import {AkNotification} from '../component/controls/ak-notification';
import {MainContent} from './components/maincontent';
import AkForm, {AkFormComponentProps} from "../component/controls/ak-form";
import {render} from 'react-dom';
import {PathConfig} from '../config/pathconfig';
import {Icon} from 'antd';
import RequistionContent from './components/requisitioncontent';

/**日常报销申请 */
interface DailyReimburseApplicationPageProps extends IntlProps,
ReactRouter.RouteComponentProps < any,
any > {}
interface DailyReimburseApplicationPageStates {
    loading?: boolean;
    collapseIcon?: "up" | "down";
    showUserInfo?: "none" | "";
    key?: string;
    /**保存草稿 */
    saveRequest?: PostProcDraftRequest;
    /**开启一个流程 */
    startRequest?: PostStartProcInstByKeyRequest;
    /**申请报销内容 */
    reimburseInfo?: DailyReimburseApply;
    totalAmount?: string;
}

/** 出差流程申请 */
class DailyReimburseApplicationPage extends Component < DailyReimburseApplicationPageProps,
DailyReimburseApplicationPageStates > {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            showUserInfo: "",
            collapseIcon: "up",
            key: this.props.location.query["key"],
            saveRequest: {},
            startRequest: {},
            reimburseInfo: {}
        }
    }
    /**折叠 申请人详细 */
    collapseIconChange() {
        let icon = this.state.collapseIcon;
        if (icon === "up") {
            this.setState({collapseIcon: "down", showUserInfo: "none"});
        } else {
            this.setState({collapseIcon: "up", showUserInfo: ""});
        }
    }
    /**提交 */
    postSubmit() {
        console.log(this.state.reimburseInfo);
        this.state.startRequest = {
            key: this.state.key,
            variables:(this.state.reimburseInfo),
            applicationID: "0",
            applicantUserID: this.userinfo.userId
        }
        this.state.loading = true;
        ProcInstAPI
            .postStartProcInstByKey(this.state.startRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({loading: false, reimburseInfo: this.state.reimburseInfo});
                    AkNotification.success({message: '提示', description: data.Message});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }

    /**保存 */
    postSave() {
        console.log(this.state.reimburseInfo);
        this.state.saveRequest = {
            ProcDefID: this.props.location.query["id"],
            FormData: JSON.stringify(this.state.reimburseInfo)
        }
        this.state.loading = true;
        ProcDraftsAPI
            .postProcDrafts(this.state.saveRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({loading: false, reimburseInfo: this.state.reimburseInfo})
                    AkNotification.success({message: '提示', description: data.Message});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    renderSearch() {
        let topThis = this;
        return <AkRow type="flex" align="middle" justify="space-around" className="row-w150">
            <AkCol>
                <AkButton
                    icon="fly"
                    onClick={topThis
                    .postSubmit
                    .bind(topThis)}>
                    <FormattedMessage id={DailyReimburseApplicationPageLocale.BtnSubmit}></FormattedMessage>
                </AkButton>
                <AkButton
                    icon="save"
                    onClick={topThis
                    .postSave
                    .bind(topThis)}>
                    <FormattedMessage id={DailyReimburseApplicationPageLocale.BtnSave}></FormattedMessage>
                </AkButton>
                <AkButton
                    icon="rollback"
                    onClick={() => {
                    {/*history.back()*/
                    }
                    window.close();
                }}>
                    <FormattedMessage id={DailyReimburseApplicationPageLocale.BtnCancle}></FormattedMessage>
                </AkButton>
            </AkCol>
        </AkRow>
    }
    userinfo = {
        userId: "808513122410303488",
        ProposerName: "阿斯蒂芬",
        ProposerID: "357498498",
        Job: "阿萨斯",
        WorkCity: "大法官",
        ReportManager: "德芙噶",
        Department: "流口水的"
    };

    renderDetail() {
        let topThis = this;
        let format = this.props.intl.formatMessage;

        topThis.state.reimburseInfo.reimburse = {};

        return <AkRow
            type="flex"
            align="middle"
            justify="space-around"
            style={{
            margin: "20px",
            backgroundColor: "lightgray"
        }}>
            <AkCol span={4}>
                <AkDatePicker
                    allowClear={true}
                    placeholder={format({id: DailyReimburseApplicationPageLocale.PropsDay})}
                    onChange={(value, dataStr) => {
                    topThis.state.reimburseInfo.reimburse.day = dataStr;
                }}></AkDatePicker>
            </AkCol>
            <AkCol span={4}>
                <AkSelect
                    onChange={value => {
                    topThis.state.reimburseInfo.reimburse.reimburseType = value + "";
                }}
                    allowClear={true}
                    defaultValue={format({id: DailyReimburseApplicationPageLocale.PropsDefaultSelect})}>
                    <AkSelect.Option value="1">
                        交通费-商务
                    </AkSelect.Option>
                    <AkSelect.Option value="2">
                        交通费-加班
                    </AkSelect.Option>
                    <AkSelect.Option value="3">
                        加班餐费
                    </AkSelect.Option>
                    <AkSelect.Option value="4">
                        餐费
                    </AkSelect.Option>
                    <AkSelect.Option value="5">
                        招待费
                    </AkSelect.Option>
                    <AkSelect.Option value="6">
                        办公费
                    </AkSelect.Option>
                    <AkSelect.Option value="7">
                        通讯费
                    </AkSelect.Option>
                </AkSelect>
            </AkCol>
            <AkCol span={4}>
                <AkInput
                    allowClear={true}
                    placeholder={format({id: DailyReimburseApplicationPageLocale.PropsItemAmount})}
                    onChange={(value) => {
                    topThis.state.reimburseInfo.reimburse.amount = value + "";
                }}/>
            </AkCol>
            <AkCol span={4}>
                <AkInput
                    allowClear={true}
                    placeholder={format({id: DailyReimburseApplicationPageLocale.PropsBillCount})}
                    onChange={(value) => {
                    topThis.state.reimburseInfo.reimburse.billCount = value + "";
                }}/>
            </AkCol>
            <AkCol span={4}>
                <AkInput
                    allowClear={true}
                    placeholder={format({id: DailyReimburseApplicationPageLocale.PropsAbstract})}
                    onChange={(value) => {
                    topThis.state.reimburseInfo.reimburse.abstract = value + "";
                }}/>
            </AkCol>
            <AkCol span={2}>
                <AkIcon className="dynamic-delete-button" type="delete"/>
            </AkCol>
        </AkRow>
    }


    render() {
        let topThis = this;
        return <div className="wrapper-z1170">
            {topThis.renderSearch()}
            <RequistionContent>
            </RequistionContent>
        </div>

    }
}

class DailyReimburseApplicationPageStyle {
    static RowBottomStyle : React.CSSProperties = {
        borderBottom: "1px solid Gray",
        fontWeight: "bold",
        fontSize: "15px"
    }
    static RowHeaderStyle : React.CSSProperties = {
        margin: "20px",
        fontWeight: "bold",
        fontSize: "16px"
    }
}

export default injectIntl(withRouter(DailyReimburseApplicationPage))
