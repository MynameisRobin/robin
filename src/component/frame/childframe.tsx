import * as React from 'react'
import { Component } from 'react'
import Navigator from './navigator';
import { NavigatorConfig } from '../../config/child-navigatorconfig';/**导航菜单 */
import { AkmiiHeader } from './header';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { NavLocale } from '../../locales/localeid';
import { AkRow } from '../controls/ak-row';
import { AkCol } from '../controls/ak-col';
import { AkIcon } from '../controls/ak-icon';
import { AkLayout } from '../controls/ak-layout';

interface AkmiiFrameProps extends ReactRouter.RouteComponentProps<any,
    any> {
    intl?: ReactIntl.InjectedIntl
}
interface AkmiiFrameStates {
    Data?: MenuData[];
    DefaultMenu?: MenuData;
}
class AkmiiFrame extends Component<AkmiiFrameProps,
    AkmiiFrameStates> {
    constructor(props, context) {
        super(props, context);

    }
    // render() {
    renderLayout() {
        return <AkLayout>
            <AkLayout.Sider >
                <AkLayout>
                    <AkLayout.Header>
                        <FormattedMessage id={NavLocale.HeaderTitle}></FormattedMessage>
                    </AkLayout.Header>
                </AkLayout>
                <AkLayout.Content>
                    <Navigator navigatorConfig={NavigatorConfig}></Navigator>
                </AkLayout.Content>
            </AkLayout.Sider>
            {this.props.children}
        </AkLayout>
    }
    // renderRow() {
    render() {
        return <AkRow style={{ height: "100%" }}>
            <AkRow type="flex" style={{ minHeight: "1000px" }}>
                <AkCol xs={0} md={6} lg={5} style={AkmiiFrameStyle.LeftMenuRightLine}>
                    <AkRow>
                        <AkmiiHeader>
                            <AkCol offset={1}>
                                <FormattedMessage id={NavLocale.HeaderTitle}></FormattedMessage>
                            </AkCol>
                        </AkmiiHeader>
                    </AkRow>
                    <AkRow>
                        <Navigator navigatorConfig={NavigatorConfig}></Navigator>
                    </AkRow>
                </AkCol>
                <AkCol xs={24} md={18} lg={19}>
                    {this.props.children}
                </AkCol>
            </AkRow>
        </AkRow>
    }
}
class AkmiiFrameStyle {
    static LeftMenuRightLine: React.CSSProperties = {
        borderRight: "#e9e9e9 1px solid"
    }
}

export default withRouter(injectIntl(AkmiiFrame))