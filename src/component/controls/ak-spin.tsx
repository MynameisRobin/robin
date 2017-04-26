import * as React from 'react'
import {Component} from 'react'
import {Spin} from 'antd';

interface AkSpinProps {
    prefixCls?: string;
    className?: string;
    spinning?: boolean;
    size?: 'small' | 'default' | 'large';
    tip?: string;
    delay?: number;
}
interface AkSpinStates {}
export class AkSpin extends Component < AkSpinProps,
AkSpinStates > {
    render() {
        return <Spin {...this.props}></Spin>
    }
}
class AkSpinStyle {}
