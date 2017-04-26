import * as React from 'react';
import {Popconfirm} from 'antd';

export declare type AkTooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export interface AkAbstractTooltipProps {
    prefixCls?: string;
    overlayClassName?: string;
    style?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    placement?: AkTooltipPlacement;
    builtinPlacements?: Object;
    visible?: boolean;
    onVisibleChange?: (visible : boolean) => void;
    transitionName?: string;
    trigger?: 'hover' | 'focus' | 'click';
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    getTooltipContainer?: (triggerNode : Element) => HTMLElement;
    getPopupContainer?: (triggerNode : Element) => HTMLElement;
    children?: React.ReactElement < any >;
}
interface AkPopconfirmProps extends AkAbstractTooltipProps {
    title : React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
}
interface AkPopconfirmContext {
    antLocale?: {
        Popconfirm?: any;
    };
}
export class AkPopconfirm extends React.Component < AkPopconfirmProps,
any > {
    render() {
        return <Popconfirm {...this.props}></Popconfirm>
    }
}
