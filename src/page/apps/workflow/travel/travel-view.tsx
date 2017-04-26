import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface TravelApplicationProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface TravelApplicationStates {}  

class TravelApplication extends Component<TravelApplicationProps, TravelApplicationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>TravelApplication</h1>
            </div>
    }
}

export default injectIntl(withRouter(TravelApplication))