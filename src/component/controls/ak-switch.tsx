import * as React from 'react'
import {Component} from 'react'
import {Switch } from 'antd';

interface AkSwitchProps {
    prefixCls?: string;
    size?: 'small' | 'default';
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => any;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
    disabled?: boolean;
}
interface AkSwitchStates {}
export class AkSwitch extends Component < AkSwitchProps,
AkSwitchStates > {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Switch  {...this.props}></Switch >
    }
}
class AkSwitchStyle {}
