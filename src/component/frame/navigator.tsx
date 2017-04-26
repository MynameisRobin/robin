import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { AkMenu } from '../controls/ak-menu';
import { AkIcon } from '../controls/ak-icon';
import { AkBadge } from '../controls/ak-badge';
// import {NavigatorConfig} from '../../config/navigatorconfig';

interface AkmiiNavigatorProps extends ReactRouter.RouteComponentProps<any,
    any>,
    IntlProps {
    router?: ReactRouter.InjectedRouter,
    navigatorConfig?: MenuData[]
}
interface AkmiiNavigatorStates { }
class AkmiiNavigator extends Component<AkmiiNavigatorProps,
    AkmiiNavigatorStates> {

    openKeys: string[];
    constructor(props, context) {
        super(props, context);
        this.openKeys = [];
    }

    renderSubMenu(menu: MenuData) {
        if (menu.NotShow) {
            return;
        }
        if (menu.Children) {
            return <AkMenu.SubMenu
                key={menu.Key}
                title={this
                    .props
                    .intl
                    .formatMessage({ id: menu.Title })}>
                {menu
                    .Children
                    .map((item) => {
                        return this.renderSubMenu(item)
                    })
                }
            </AkMenu.SubMenu>
        }

        return <AkMenu.Item key={menu.Key} className="menu_li">
            <Link to={menu.Path}>
                <AkIcon type={menu.Icon} className="menu_icon"></AkIcon>
                <span className="menu_title">
                    <FormattedMessage id={menu.Title}></FormattedMessage>
                </span>
                <AkBadge count={menu.Badge} overflowCount={99} />
            </Link>
        </AkMenu.Item>
    }
    /** 寻找当前选中节点 */
    findSelected(path: string, menuData: MenuData[]): MenuData {
        for (let i = 0; i < menuData.length; i++) {
            if (menuData[i].Path === path) {
                return menuData[i];
            }
            if (menuData[i].Children) {
                let menu = this.findSelected(path, menuData[i].Children);
                if (menu) {
                    this
                        .openKeys
                        .push(menuData[i].Key);
                }
                return menu;
            }
        }
        return {};
    }
    render() {
        let menuConfig = this.props.navigatorConfig;
        let selectMenu = this.findSelected(this.props.location.pathname, menuConfig);
        return <AkMenu
            mode="inline"
            defaultOpenKeys={this.openKeys}
            defaultSelectedKeys={[selectMenu.Key]}>
            {menuConfig.map((item) => {
                return this.renderSubMenu(item)
            })}
        </AkMenu>
    }
}
class AkmiiNavigatorStyle { }

export default injectIntl(withRouter(AkmiiNavigator));
