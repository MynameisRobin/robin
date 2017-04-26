import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface CashViewProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface CashViewStates {}  

class CashView extends Component<CashViewProps, CashViewStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>CashView</h1>
            </div>
    }
}

export default injectIntl(withRouter(CashView))