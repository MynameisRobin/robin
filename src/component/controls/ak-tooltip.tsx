import * as React from "react";
import {Component} from "react";
import {Tooltip} from "antd";
declare type AkTooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
interface AkAbstractTooltipProps {
    prefixCls?: string;
    overlayClassName?: string;
    style?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    placement?: AkTooltipPlacement;
    builtinPlacements?: Object;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    transitionName?: string;
    trigger?: 'hover' | 'focus' | 'click';
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    getTooltipContainer?: (triggerNode: Element) => HTMLElement;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    children?: React.ReactElement<any>;
}
interface AKTooltipProps extends AkAbstractTooltipProps {
    title?: React.ReactNode;
    overlay?: React.ReactNode;
}
interface AKTooltipStates { }
export class AkTooltip extends Component<AKTooltipProps,
    AKTooltipStates> {
    render() {
        return <Tooltip {...this.props}></Tooltip>
    }
}
class AKTooltipStyle { }
export default AkTooltip;
