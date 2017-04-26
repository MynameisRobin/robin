import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface PaymentViewProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface PaymentViewStates {}  

class PaymentView extends Component<PaymentViewProps, PaymentViewStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>PaymentView</h1>
            </div>
    }
}

export default injectIntl(withRouter(PaymentView))