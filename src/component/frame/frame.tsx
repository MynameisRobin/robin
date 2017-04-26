import * as React from 'react'
import {Component} from 'react'
import Navigator from './navigator';
import {NavigatorConfig} from '../../config/navigatorconfig';/**导航菜单 */
import {AkmiiHeader} from './header';
import {injectIntl, FormattedMessage} from 'react-intl';
import {withRouter} from 'react-router';
import {NavLocale} from '../../locales/localeid';
import {AkRow} from '../controls/ak-row';
import {AkCol} from '../controls/ak-col';
import {AkIcon} from '../controls/ak-icon';
import {AkLayout} from '../controls/ak-layout';

interface AkmiiFrameProps extends ReactRouter.RouteComponentProps < any,
any >,
IntlProps {}
interface AkmiiFrameStates {
    Data?: MenuData[];
    DefaultMenu?: MenuData;
}
class AkmiiFrame extends Component < AkmiiFrameProps,
AkmiiFrameStates > {
    constructor(props, context) {
        super(props, context);
    }
    // render() {
    renderLayout() {
        return <AkLayout>
            <AkLayout.Sider>
                <AkLayout>
                    <AkLayout.Header>
                        <AkIcon type="setting"></AkIcon>
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
    renderMenu() {
        return <AkCol xs={0} md={6} lg={5} style={AkmiiFrameStyle.LeftMenuRightLine}>
            <AkRow>
                <AkmiiHeader>
                    <AkCol offset={1}>
                        <AkIcon type="setting"></AkIcon>
                        <FormattedMessage id={NavLocale.HeaderTitle}></FormattedMessage>
                    </AkCol>
                </AkmiiHeader>
            </AkRow>
            <AkRow>
                <Navigator navigatorConfig={NavigatorConfig}></Navigator>
            </AkRow>
        </AkCol>
    }
    render() {
        return <AkRow style={{
            height: "100%"
        }}>
            <AkRow type="flex" style={{
                minHeight: '1000px'
            }}>
                {this.renderMenu()}
                <AkCol xs={24} md={18} lg={19}>
                    {this.props.children}
                </AkCol>
            </AkRow>
        </AkRow>
    }
}
class AkmiiFrameStyle {
    static LeftMenuRightLine : React.CSSProperties = {
        borderRight: "#e9e9e9 1px solid"
    }
    static AkFooter : React.CSSProperties = {
        width: "100%",
        height: "60px",
        fontSize: "12px",
        color: "#000",
        textAlign: "center",
        backgroundColor: " #f5f5f5",
        marginBottom: "-3px"
    }
}

export default withRouter(injectIntl(AkmiiFrame))
