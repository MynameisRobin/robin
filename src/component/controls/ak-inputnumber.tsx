import * as React from 'react'
import {Component} from 'react'
import {InputNumber} from 'antd'

interface AkInputNumberProps {
    prefixCls?: string;
    min?: number;
    max?: number;
    value?: number;
    step?: number | string;
    defaultValue?: number;
    onChange?: (value : number) => void;
    disabled?: boolean;
    size?: 'large' | 'small' | 'default';
    placeholder?: string;
    style?: React.CSSProperties;
    className?: string;
}
interface AkInputNumberStates {}
export class AkInputNumber extends Component < AkInputNumberProps,
AkInputNumberStates > {
    render() {
        return <InputNumber {...this.props}></InputNumber>
    }
}
class AkInputNumberStyle {}
