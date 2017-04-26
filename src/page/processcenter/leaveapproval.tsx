import * as React from 'react'
import {Component} from 'react'
import ApprovalContent from '../components/approvalcontent';
import { FormattedMessage } from 'react-intl';

interface LeaveApprovalProps {}
interface LeaveApprovalStates {
    variables?:any;
}
export class LeaveApproval extends Component < LeaveApprovalProps,
LeaveApprovalStates > {
    constructor(props, context) {
        super(props, context);
        this.state={
            variables:{}
        }
    }

    render() {
        return <ApprovalContent onLoaded={(variables)=>{
            this.setState({variables:variables})
            }}>
            <FormattedMessage id={"项目"}></FormattedMessage>
            {this.state.variables.projectName}
            <FormattedMessage id={"金额"}></FormattedMessage>
            {this.state.variables.totalAmount}
        </ApprovalContent>
    }
}
class LeaveApprovalStyle {}
