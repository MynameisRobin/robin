import * as React from 'react'
import {Component} from 'react'
import {User} from '../../util/user';
import {AkRow} from '../../component/controls/ak-row';
import {AkCol} from '../../component/controls/ak-col';
import {FormattedMessage, injectIntl} from 'react-intl';
import {DailyReimburseApplicationPageLocale, ApplyContentLocale} from '../../locales/localeid';
import {AkInput} from '../../component/controls/ak-input';
import AkIdentityPicker from '../../component/identity/ak-identitypicker';
import {AkIdentity} from '../../api/common/identity';

interface YeeUserContentProps extends IntlProps,
RouterProps {
    /**
     * 展示还是编辑
     *
     * @type {boolean}
     * @memberOf YeeUserContentProps
     */
    display?: boolean;
    /**
     *是否允许代申请(只在编辑时可用)
     *
     * @type {boolean}
     * @memberOf YeeUserContentProps
     */
    allowDelegate?: boolean;
    /**
     * 申请人信息变更
     *
     *
     * @memberOf YeeUserContentProps
     */
    onChangeApplyUser?: (userID : string) => void;
    /**
     * 申请人信息
     *
     * @type {ApplicationModel}
     * @memberOf YeeUserContentProps
     */
    taskDetail?: TaskDetailInfo;
}
interface YeeUserContentStates {}
class YeeUserContent extends Component < YeeUserContentProps,
YeeUserContentStates > {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    componentWillReceiveProps(nextProps : YeeUserContentProps) {
        this.setState({appUser: nextProps.taskDetail})
    }

    renderView() {
        const {taskDetail} = this.props;
        if (!taskDetail) {
            return null;
        }
        return <AkRow type="flex" justify="space-around" align="middle">
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelSubmitUser}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">{taskDetail.CreatedByName}
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelSubmitDate}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                {taskDetail.ApplyDateStr}
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelApplyUser}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                {taskDetail.ApplicantName}
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelEmployeeNo}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">{taskDetail.EmployeeNo}
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelJobTitle}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">{taskDetail.JobTitle}
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelLocation}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">{taskDetail.LocationName}
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelLineManager}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">{taskDetail.LineManagerName}
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelOrg}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">{taskDetail.OrgName}
            </AkCol>
        </AkRow>
    }
    renderEdit() {
        const {taskDetail} = this.props;
        if (!taskDetail) {
            return null;
        }
        return <AkRow type="flex" justify="space-around" align="middle">
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelSubmitUser}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                <AkInput value={taskDetail.ApplicantName} disabled></AkInput>
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelSubmitDate}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                <AkInput
                    value={Date
                    .now()
                    .toString()}
                    disabled></AkInput>
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelApplyUser}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                <AkIdentityPicker
                    onChange={(user) => {
                    user
                        ? this
                            .props
                            .onChangeApplyUser((user as AkIdentity).ID)
                        : null
                }}></AkIdentityPicker>
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelEmployeeNo}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                <AkInput value={taskDetail.EmployeeNo} disabled></AkInput>
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelJobTitle}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                <AkInput value={taskDetail.JobTitle} disabled></AkInput>
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelLocation}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                <AkInput value={taskDetail.LocationName} disabled></AkInput>
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelLineManager}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                <AkInput value={taskDetail.LineManagerName} disabled></AkInput>
            </AkCol>
            <AkCol span={4} className="mb10 mt10">
                <FormattedMessage id={ApplyContentLocale.LabelOrg}></FormattedMessage>
            </AkCol>
            <AkCol span={7} className="mb10 mt10">
                <AkInput value={taskDetail.OrgName} disabled></AkInput>
            </AkCol>
        </AkRow>
    }
    render() {
        return <div>
            <div className="ak-form-title">
                <span className="title-bluespan"></span>
                <span></span>
                <FormattedMessage id={ApplyContentLocale.ApplyUserTitle}></FormattedMessage>
            </div>
            {this.props.display
                ? this.renderView()
                : this.renderEdit()}
        </div>
    }
}
class YeeUserContentStyle {}
export default injectIntl(YeeUserContent)
