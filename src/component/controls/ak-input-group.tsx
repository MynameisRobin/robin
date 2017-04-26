/**
 * Created by franklu on 12/31/16.
 */
import * as React from "react";
import {Component} from "react";
import {Input} from "antd";

interface AkInputGroupProp {
    className?: string;
    size?: 'large' | 'small' | 'default';
    children?: any;
    prefixCls?: string;
    style?: React.CSSProperties;
}

interface AkInputGroupState {
}

export class AkInputGroup extends Component<AkInputGroupProp, AkInputGroupState> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Input.Group {...this.props} />
    }
}
