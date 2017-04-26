import * as React from 'react'
import {Component} from 'react'
import {injectIntl} from 'react-intl';
import {AkAffix} from '../../controls/ak-affix';
import {AkCard} from '../../controls/ak-card';
import {AkIcon} from '../../controls/ak-icon';
import {StencilFactory} from './stencil-factory';
import AkStencilDrag from './drag';
import { StencilItemType, StencilBaseView } from '../util/common';

export interface AkStencilItemProps extends IntlProps,
DesignerBaseProps {
    /**是不是分隔符 */
    IsDivider?: boolean;
    /**模板类型 */
    Type?: StencilItemType;
    /**图标 */
    Icon?: string | React.ReactNode,
    /**标题文字 */
    Title?: string | React.ReactNode;
}
interface AkStencilItemStates {
    /**当前被选中Cell */
    SelectCell?: joint.dia.Cell;
    /**鼠标位置 */
    MousePosition?: joint.dia.Point;
}
export class AkStencilItem extends Component < AkStencilItemProps,
AkStencilItemStates > {

    Item?: joint.dia.Cell;

    constructor(props, context) {
        super(props, context);
        this.state = {}
        StencilBaseView.format=this.props.intl.formatMessage;
        this.Item = StencilFactory.getStencil(this.props.Type, {format: this.props.intl.formatMessage});
    }
    renderDrag() {
        if (this.state.SelectCell) {
            return <AkStencilDrag
                SourceCell={this.state.SelectCell}
                MainGraph={this.props.MainGraph}
                MainPaper={this.props.MainPaper}
                EventPosition={this.state.MousePosition}
                OnMouseUp={() => {
                this.setState({SelectCell: null})
            }}></AkStencilDrag>
        } else {
            return null;
        }
    }
    render() {
        let icon = this.props.Icon;
        if (typeof this.props.Icon === "string") {
            icon = <AkIcon type={this.props.Icon}></AkIcon>
        }
        return <div
            onMouseDown={(evt) => {
            this.setState({
                MousePosition: {
                    x: evt.clientX,
                    y: evt.clientY
                },
                SelectCell: this.Item
            })
        }}
            onMouseUp={(evt) => {
            this.setState({SelectCell: null})
        }}>
            {this.renderDrag()}
            {icon}
            {this.props.Title}
        </div>;
    }
}
class AkStencilItemStyle {}
export default injectIntl(AkStencilItem);
