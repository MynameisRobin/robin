import * as React from "react";
import {Checkbox} from "antd";
import Component = React.Component;
export interface AkCheckboxProps {
    prefixCls?: string;
    /** 指定当前是否选中 */
    checked?: boolean;
    /** 初始是否选中 */
    defaultChecked?: boolean;
    /** indeterminate 状态，只负责样式控制 */
    indeterminate?: boolean;
    /** 变化时回调函数 */
    onChange?: React.FormEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onMouseLeave?: React.MouseEventHandler<any>;
    style?: React.CSSProperties;
    disabled?: boolean;
    className?: string;
}
export  class AkCheckbox extends Component < AkCheckboxProps,
    any > {
    static Group = Checkbox.Group;

    render() {
        return <Checkbox {...this.props}></Checkbox>
    }
}

export default AkCheckbox;
