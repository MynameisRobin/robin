import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface CashApplicationProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface CashApplicationStates {}  

class CashApplication extends Component<CashApplicationProps, CashApplicationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>CashApplication</h1>
            </div>
    }
}

export default injectIntl(withRouter(CashApplication))