import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface PaymentApplicationProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface PaymentApplicationStates {}  

class PaymentApplication extends Component<PaymentApplicationProps, PaymentApplicationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>PaymentApplication</h1>
            </div>
    }
}

export default injectIntl(withRouter(PaymentApplication))