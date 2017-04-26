import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface DailyReimbursementAuditProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface DailyReimbursementAuditStates {}  

class DailyReimbursementAudit extends Component<DailyReimbursementAuditProps, DailyReimbursementAuditStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>DailyReimbursementAudit</h1>
            </div>
    }
}

export default injectIntl(withRouter(DailyReimbursementAudit))