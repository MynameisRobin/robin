import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface CashAuditProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface CashAuditStates {}  

class CashAudit extends Component<CashAuditProps, CashAuditStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>CashAudit</h1>
            </div>
    }
}

export default injectIntl(withRouter(CashAudit))