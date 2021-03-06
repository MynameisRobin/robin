import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface TravelAuditProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface TravelAuditStates {}  

class TravelAudit extends Component<TravelAuditProps, TravelAuditStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>TravelAudit</h1>
            </div>
    }
}

export default injectIntl(withRouter(TravelAudit))