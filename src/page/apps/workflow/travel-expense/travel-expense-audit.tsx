import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface TravelExpenseAuditProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface TravelExpenseAuditStates {}  

class TravelExpenseAudit extends Component<TravelExpenseAuditProps, TravelExpenseAuditStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>TravelExpenseAudit</h1>
            </div>
    }
}

export default injectIntl(withRouter(TravelExpenseAudit))