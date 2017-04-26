import * as React from "react";
import {Component} from "react";
import {Tag} from "antd";

interface AkTagProps {
    prefixCls?: string;
    className?: string;
    color?: string;
    /** 标签是否可以关闭 */
    closable?: boolean;
    /** 关闭时的回调 */
    onClose?: Function;
    /** 动画关闭后的回调 */
    afterClose?: Function;
    style?: React.CSSProperties;
}

interface  AkTagState {
}

export class AkTag extends Component<AkTagProps, AkTagState> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Tag {...this.props}></Tag>
    }
}
