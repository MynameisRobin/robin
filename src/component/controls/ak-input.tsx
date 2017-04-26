import * as React from "react";
import {Component} from "react";
import {Input} from "antd";
import {AkIcon} from "./ak-icon";

export interface AkAutoSizeType {
    minRows?: number;
    maxRows?: number;
}
interface AkInputProp {
    prefixCls?: string;
    className?: string;
    type?: string;
    id?: number | string;
    value?: any;
    placeholder?: string;
    size?: 'large' | 'default' | 'small';
    disabled?: boolean;
    readOnly?: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    onPressEnter?: React.FormEventHandler < any >;
    onKeyDown?: React.FormEventHandler < any >;
    onChange?: ((value : any) => void);
    onClick?: React.FormEventHandler < any >;
    onFocus?: React.FormEventHandler < any >;
    onBlur?: React.FormEventHandler < any >;
    autosize?: boolean | AkAutoSizeType;
    autoComplete?: 'on' | 'off';
    style?: React.CSSProperties;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    allowClear?: boolean;
    defaultValue?: string;
}
interface AkInputState {
    value?: string;
}

export class AkInput extends Component < AkInputProp,
AkInputState > {
    static Group = Input.Group;
    static Search = Input.Search;

    static defaultProps : AkInputProp = {
        allowClear: true
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: ("value" in this.props)
                ? this.props.value
                : this.props.defaultValue
        };
    }

    componentWillReceiveProps(nextProps : AkInputProp) {

        if ("value" in nextProps) {
            this.setState({value: nextProps.value})
        }
    }

    renderSuffix() {
        return this.props.allowClear && this.state.value && !this.props.suffix && !this.props.disabled
            ? <AkIcon
                    type="close-circle"
                    onClick={(e) => {
                    this.triggerChange("");
                }}></AkIcon>
            : null;
    }
    onChange(e) {
        this.triggerChange(e.currentTarget.value);
    }

    triggerChange(value : string) {
        if (!("value" in this.props)) {
            this.setState({value: value});
        }
        if (this.props.onChange) {
            this
                .props
                .onChange(value);
        }
    }

    render() {
        let topThis = this;
        let {
            allowClear,
            onChange,
            value,
            ...props
        } = topThis.props;
        return <Input
            onChange={(e) => this.onChange(e)}
            suffix={props.suffix
            ? props.suffix
            : this.renderSuffix()}
            value={this.state.value}
            {...props}/>
    }
}
