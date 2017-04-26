import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface TravelExpenseApplicationProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface TravelExpenseApplicationStates {}  

class TravelExpenseApplication extends Component<TravelExpenseApplicationProps, TravelExpenseApplicationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>TravelExpenseApplication</h1>
            </div>
    }
}

export default injectIntl(withRouter(TravelExpenseApplication))