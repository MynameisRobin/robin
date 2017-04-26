import * as React from 'react'
import {Component} from 'react'
import {BackTop} from 'antd'

interface AkBackTopProps {
    visibilityHeight?: number;
    onClick?: React.MouseEventHandler < any >;
    target?: () => HTMLElement | Window;
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
}
interface AkBackTopStates {}
export class AkBackTop extends Component < AkBackTopProps,
AkBackTopStates > {
    render() {
        return <BackTop {...this.props}></BackTop>
    }
}
class AkBackTopStyle {}
