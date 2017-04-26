import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface DailyReimbursementApplicationProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface DailyReimbursementApplicationStates {}  

class DailyReimbursementApplication extends Component<DailyReimbursementApplicationProps, DailyReimbursementApplicationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>DailyReimbursementApplication</h1>
            </div>
    }
}

export default injectIntl(withRouter(DailyReimbursementApplication))