import * as React from 'react'
import {Component} from 'react'
import {AkRow} from '../../component/controls/ak-row';
import {LogContent} from './logcontent';
import {ApplyContentLocale} from '../../locales/localeid';
import YeeUserContent from './yeeusercontent'
import {AkInput} from '../../component/controls/ak-input';
import {AkButton} from '../../component/controls/ak-button';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TaskAPI} from '../../api/task';
import {ProcInstAPI, ApplicationStatusLocale, ApplicationStatusEnum} from '../../api/procinst';
import {withRouter} from 'react-router';
import {AkCol} from '../../component/controls/ak-col';
import {AkNotification} from '../../component/controls/ak-notification';

interface ApprovalContentProps extends IntlProps,
RouterProps {
    /**
     * 加载完成回调操作
     *
     *
     * @memberOf ApprovalContentProps
     */
    onLoaded: (variables : any) => void;
    /**
     * 审批通过前操作
     *
     *
     * @memberOf ApprovalContentProps
     */
    beforeApproval?: () => boolean;
    /**
     * 拒绝前操作
     *
     *
     * @memberOf ApprovalContentProps
     */
    beforeReject?: () => boolean;
    /**
     * 转签前操作
     *
     *
     * @memberOf ApprovalContentProps
     */
    beforeForward?: () => boolean;
    /**
     * 是否允许转签
     *
     * @type {boolean}
     * @memberOf ApprovalContentProps
     */
    allowForward?: boolean;
}
interface ApprovalContentStates {
    /**
     * 加载中
     *
     * @type {boolean}
     * @memberOf ApprovalContentStates
     */
    loading?: boolean;
    /**
     * 任务详情
     *
     * @type {TaskDetailInfo}
     * @memberOf ApprovalContentStates
     */
    taskDetail?: TaskDetailInfo;
    /**
     * 展示流程图
     *
     * @type {boolean}
     * @memberOf ApprovalContentStates
     */
    showFlowChart?:boolean;
}
/**
 * 审批流程任务信息
 *
 * @export
 * @class ApprovalContent
 * @extends {Component<ApprovalContentProps, ApprovalContentStates>}
 */
class ApprovalContent extends Component < ApprovalContentProps,
ApprovalContentStates > {
    taskRequest?: GetApproveInfoRequest;
    handleRequest?: PutTaskHandleRequest;
    constructor(props, context) {
        super(props, context);
        this.taskRequest = {
            taskID: this.props.location.query["taskId"],
            procInstID: this.props.location.query["instId"]
        }
        this.handleRequest = {
            TaskID: this.props.location.query["taskId"]
        }
        this.state = {
            taskDetail: {}
        }
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        TaskAPI
            .getTaskDetail(this.taskRequest)
            .then(data => {
                this
                    .props
                    .onLoaded(data.Data.Variables)
                this.setState({taskDetail: data.Data})
            });
    }
    onApprove() {
        if (this.props.beforeApproval && !this.props.beforeApproval()) {
            return;
        }
        this.handleRequest.Outcome = "Approved";
        TaskAPI
            .putTaskHandle(this.handleRequest)
            .then(data => {
                AkNotification.open({message: data.Status, description: data.Message})
            });
    }
    onReject() {
        if (this.props.beforeReject && !this.props.beforeReject()) {
            return;
        }
        this.handleRequest.Outcome = "Rejected";
        TaskAPI
            .putTaskHandle(this.handleRequest)
            .then(data => {
                AkNotification.open({message: data.Status, description: data.Message})
            });
    }
    onForward() {
        if (this.props.beforeReject && !this.props.beforeReject()) {
            return;
        }

    }
    renderApproveButton() {
        const forward = this.props.allowForward
            ? <AkButton
                    onClick={() => {
                    this.onForward()
                }}>
                    <FormattedMessage id={ApplyContentLocale.ButtonForward}></FormattedMessage>
                </AkButton>
            : null;
        return this.state.taskDetail && this.state.taskDetail.AppStatus != ApplicationStatusEnum.Complete
            ? <AkRow type="flex" justify="space-around" align="middle">
                    <AkInput
                        type="textarea"
                        onChange={(text) => {
                        this.handleRequest.Comment = text;
                    }}></AkInput>
                    <AkButton
                        type="primary"
                        onClick={() => {
                        this.onApprove();
                    }}>
                        <FormattedMessage id={ApplyContentLocale.ButtonApprove}></FormattedMessage>
                    </AkButton>
                    <AkButton
                        onClick={() => {
                        this.onReject();
                    }}>
                        <FormattedMessage id={ApplyContentLocale.ButtonReject}></FormattedMessage>
                    </AkButton>
                    {forward}
                </AkRow>
            : null;
    }
    renderFlowChart(){

    }
    render() {

        return <AkRow className="wrapper-z1170">
            <AkRow type="flex" justify="space-between" align="middle">
                <AkCol>{this.state.taskDetail.FlowNo}</AkCol>
                <AkCol>
                    {this.state.taskDetail.AppStatus
                        ? <FormattedMessage
                                id={ApplicationStatusLocale + this.state.taskDetail.AppStatus}></FormattedMessage>
                        : null}
                </AkCol>
            </AkRow>
            <AkRow>
                <YeeUserContent display taskDetail={this.state.taskDetail}></YeeUserContent>
            </AkRow>
            <AkRow>{this.props.children}</AkRow>
            {this.renderApproveButton()}
            <AkRow>
                <LogContent taskDetail={this.state.taskDetail}></LogContent>
            </AkRow>
        </AkRow>
    }
}
class ApprovalContentStyle {}
export default injectIntl(withRouter(ApprovalContent))
