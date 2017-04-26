import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface DailyReimbursementViewProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface DailyReimbursementViewStates {}  

class DailyReimbursementView extends Component<DailyReimbursementViewProps, DailyReimbursementViewStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>DailyReimbursementView</h1>
            </div>
    }
}

export default injectIntl(withRouter(DailyReimbursementView))