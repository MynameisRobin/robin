import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface LeaveAuditProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface LeaveAuditStates {}  

class LeaveAudit extends Component<LeaveAuditProps, LeaveAuditStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>LeaveAudit</h1>
            </div>
    }
}

export default injectIntl(withRouter(LeaveAudit))