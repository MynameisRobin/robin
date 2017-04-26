import * as React from 'react'
import {Component} from 'react'
import {injectIntl, FormattedMessage} from 'react-intl';
import {AkAffix} from '../controls/ak-affix';
import {AkMenu} from '../controls/ak-menu';
import {AkIcon} from '../controls/ak-icon';
import AkStencilItem, {AkStencilItemProps} from './stencil/stencil';
import {StencilItemType} from './util/common';
import {FlowcraftDesignerLocale} from '../../locales/localeid';

interface AkDesignerStencilProps extends IntlProps,
DesignerBaseProps {}
interface AkDesignerStencilStates {}
export class AkDesignerStencil extends Component < AkDesignerStencilProps,
AkDesignerStencilStates > {
    StencilList?: AkStencilItemProps[];
    constructor(props, context) {
        super(props, context);
        this.StencilList = [
            {
                Type: StencilItemType.StartEvent,
                Icon: "start",
                Title: <FormattedMessage id={FlowcraftDesignerLocale.MenuStartEvent}></FormattedMessage>
            }, {
                IsDivider: true
            }, {
                Type: StencilItemType.WaitTaskActivity,
                Icon: "wait-task",
                Title: <FormattedMessage id={FlowcraftDesignerLocale.MenuWaitTask}></FormattedMessage>
            }, {
                Type: StencilItemType.ReceiveTaskActivity,
                Icon: "receive-task",
                Title: <FormattedMessage id={FlowcraftDesignerLocale.MenuReceiveTask}></FormattedMessage>
            }, {
                Type: StencilItemType.MailTaskActivity,
                Icon: "mail",
                Title: <FormattedMessage id={FlowcraftDesignerLocale.MenuMailTask}></FormattedMessage>
            }, {
                Type: StencilItemType.VariableActivity,
                Icon: "line",
                Title: <FormattedMessage id={FlowcraftDesignerLocale.MenuSetVariable}></FormattedMessage>
            }, {
                IsDivider: true
            }, {
                Type: StencilItemType.InclusiveGateway,
                Icon: "gatewayor",
                Title: <FormattedMessage id={FlowcraftDesignerLocale.MenuInclusiveGateway}></FormattedMessage>
            }, {
                IsDivider: true
            }, {
                Type: StencilItemType.StopEvent,
                Icon: "stop",
                Title: <FormattedMessage id={FlowcraftDesignerLocale.MenuStopNoneEvent}></FormattedMessage>
            }, {
                Type: StencilItemType.StopRejectEvent,
                Icon: "stopreject",
                Title: <FormattedMessage id={FlowcraftDesignerLocale.MenuStopRejectEvent}></FormattedMessage>
            }
        ];
    }

    render() {
        return <div
            style={{
            position: 'absolute',
            top: 10,
            left: 40
        }}>
            <AkAffix offsetTop={10} style={AkDesignerStencilStyle.StaticTop}>
                <AkMenu
                    style={{
                    width: 150,
                    border: "solid 1px #DDD"
                }}
                    selectedKeys={[]}>
                    {this
                        .StencilList
                        .map((entry, index) => {
                            if (entry.IsDivider) {
                                return <AkMenu.Divider key={index}></AkMenu.Divider>
                            }
                            return <AkMenu.Item key={index}>
                                <AkStencilItem
                                    {...this.props}
                                    Type={entry.Type}
                                    Icon={entry.Icon}
                                    Title={entry.Title}></AkStencilItem>
                            </AkMenu.Item>
                        })}
                </AkMenu>
            </AkAffix>
        </div>;
    }
}
class AkDesignerStencilStyle {
    static StaticTop : React.CSSProperties = {
        position: 'absolute'
    }
}

export default injectIntl(AkDesignerStencil);
