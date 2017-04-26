import * as React from 'react'
import {Component} from 'react'
import {Dropdown} from 'antd'

interface AkDropDownProps {
    trigger?: ('click' | 'hover')[];
    overlay : React.ReactNode;
    style?: React.CSSProperties;
    onVisibleChange?: (visible?: boolean) => void;
    visible?: boolean;
    align?: Object;
    getPopupContainer?: () => HTMLElement;
    prefixCls?: string;
    placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
}
interface AkDropDownStates {}
export class AkDropDown extends Component < AkDropDownProps,
AkDropDownStates > {
    static Button=Dropdown.Button;
    render() {
        return <Dropdown {...this.props}></Dropdown>
    }
}
class AkDropDownStyle {}
