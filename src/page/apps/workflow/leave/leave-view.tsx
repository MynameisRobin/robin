import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface LeaveViewProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface LeaveViewStates {}  

class LeaveView extends Component<LeaveViewProps, LeaveViewStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>LeaveView</h1>
            </div>
    }
}

export default injectIntl(withRouter(LeaveView))