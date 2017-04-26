import * as React from 'react'
import {Component} from 'react'
import {withRouter} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';

interface ProcDesignerPageProps {}
interface ProcDesignerPageStates {}
/** 流程设计器页面 */
class ProcDesignerPage extends Component < ProcDesignerPageProps,
ProcDesignerPageStates > {
    render() {
        return <div ></div>
    }
}
class ProcDesignerPageStyle {}

export default injectIntl(withRouter(ProcDesignerPage))
