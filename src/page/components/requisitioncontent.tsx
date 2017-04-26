import * as React from 'react'
import {Component} from 'react'
import YeeUserContent from './yeeusercontent';
import {injectIntl, FormattedMessage} from 'react-intl';
import {AkRow} from '../../component/controls/ak-row';
import {AkCol} from '../../component/controls/ak-col';
import {LogContent} from './logcontent';
import {AkButton} from '../../component/controls/ak-button';
import {ApplyContentLocale} from '../../locales/localeid';
import {ProcDraftsAPI} from '../../api/procdrafts';
import {AkNotification} from '../../component/controls/ak-notification';
import {ProcInstAPI, ApplicationStatusLocale, ApplicationStatusEnum} from '../../api/procinst';
import {hashHistory, withRouter} from 'react-router';

interface RequistionContentProps extends IntlProps,
RouterProps {
    variables?: any;
    /**
     * 保存前方法
     *
     *
     * @memberOf RequistionContentProps
     */
    beforeSave?: (callBack?: any) => boolean;
    /**
     * 提交前
     *
     *
     * @memberOf RequistionContentProps
     */
    beforeSubmit?: (callBack?: any) => boolean;
    /**
     * 取消前
     *
     *
     * @memberOf RequistionContentProps
     */
    beforeCancel?: (callBack?: any) => boolean;
}
interface RequistionContentStates {
    loading?: boolean;
    appUser?: TaskDetailInfo;
}
/**
 * 提交任务申请
 *
 * @export
 * @class RequistionContent
 * @extends {Component<RequistionContentProps, RequistionContentStates>}
 */
class RequistionContent extends Component < RequistionContentProps,
RequistionContentStates > {

    saveRequest : PostProcDraftRequest;
    startRequest : PostStartProcInstByKeyRequest;

    constructor(props, context) {
        super(props, context);
        this.saveRequest = {
            ProcDefID: this.props.location.query["id"]
        };
        this.startRequest = {
            key: this.props.location.query["key"],
            // applicationID:this.props.location.query["id"]
        }
        this.state = {}
    }
    componentDidMount() {
        this.getApplicationUser();
    }

    getApplicationUser(userID?: string) {
        ProcInstAPI
            .getApplicantByUserID({userID: userID})
            .then(data => {
                this.setState({appUser: data.Data})
            });
    }
    onSave() {
        if (this.props.beforeSave && !this.props.beforeSave()) {
            return;
        }
        this.saveRequest.FormData = JSON.stringify(this.props.variables)

        ProcDraftsAPI
            .postProcDrafts(this.saveRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({loading: false})
                    AkNotification.success({message: '提示', description: data.Message});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    onSubmit() {
        if (this.props.beforeSubmit && !this.props.beforeSubmit()) {
            return;
        }
        this.startRequest = Object.assign(this.startRequest, {
            variables: (this.props.variables),
            applicantUserID: this.state.appUser.ApplicantID
        });
        ProcInstAPI
            .postStartProcInstByKey(this.startRequest)
            .then(data => {
                if (data.Status == "0") {
                    this.setState({loading: false});
                    AkNotification.success({message: '提示', description: data.Message});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    onCancel() {
        if (this.props.beforeCancel && !this.props.beforeCancel()) {
            return;
        }
        window.close();
    }

    render() {
        return <AkRow className="wrapper-z1170">
            <AkRow>
                <AkButton icon="fly" onClick={() => this.onSubmit()}>
                    <FormattedMessage id={ApplyContentLocale.ButtonSubmit}></FormattedMessage>
                </AkButton>
                <AkButton icon="save" onClick={() => this.onSave()}>
                    <FormattedMessage id={ApplyContentLocale.ButtonSave}></FormattedMessage>
                </AkButton>
                <AkButton icon="close" onClick={() => this.onCancel()}>
                    <FormattedMessage id={ApplyContentLocale.ButtonCancel}></FormattedMessage>
                </AkButton>
            </AkRow>
            <AkRow type="flex" justify="space-between" align="middle">
                <AkCol>{} </AkCol>
                <AkCol>
                    <FormattedMessage id={ApplicationStatusLocale + ApplicationStatusEnum.Draft}></FormattedMessage>
            </AkCol>
        </AkRow>
        <AkRow>
            <YeeUserContent
                taskDetail={this.state.appUser}
                allowDelegate
                onChangeApplyUser={(userID) => {
                this.getApplicationUser(userID)
            }}></YeeUserContent>
        </AkRow>
        <AkRow>
            {this.props.children}
        </AkRow>
    </AkRow>
    }
}
class RequistionContentStyle {}

export default injectIntl(withRouter(RequistionContent));
