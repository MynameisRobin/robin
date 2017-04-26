import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

interface TravelExpenseViewProps extends IntlProps, ReactRouter.RouteComponentProps<any, any>{}
interface TravelExpenseViewStates {}  

class TravelExpenseView extends Component<TravelExpenseViewProps, TravelExpenseViewStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {
        return <div className="wrapper-z1170">
                <h1>TravelExpenseView</h1>
            </div>
    }
}

export default injectIntl(withRouter(TravelExpenseView))