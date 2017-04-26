import * as React from "react";
import {Component} from "react";
import {Button} from "antd";

export declare type ButtonType = 'primary' | 'ghost' | 'dashed';
export declare type ButtonShape = 'circle' | 'circle-outline';
export declare type ButtonSize = 'small' | 'large';

interface AkButtonProp {
    type?: ButtonType;
    htmlType?: string;
    icon?: string;
    shape?: ButtonShape;
    size?: ButtonSize;
    onClick?: React.FormEventHandler < any >;
    onMouseUp?: React.FormEventHandler < any >;
    onMouseDown?: React.FormEventHandler < any >;
    loading?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
}

interface AkButtonState {}

export class AkButton extends Component < AkButtonProp,
AkButtonState > {
    static Group : any = Button.Group;
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {
            ...props
        } = this.props;
        return <Button {...props}></Button>
    }
}
