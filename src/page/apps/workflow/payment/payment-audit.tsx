import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface PaymentAuditProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface PaymentAuditStates {}  

class PaymentAudit extends Component<PaymentAuditProps, PaymentAuditStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>PaymentAudit</h1>
            </div>
    }
}

export default injectIntl(withRouter(PaymentAudit))