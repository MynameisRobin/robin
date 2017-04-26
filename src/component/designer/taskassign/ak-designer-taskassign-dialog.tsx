import * as React from "react";
import {Component} from "react";
import {AkModal} from "../../controls/ak-modal";
import {FlowcraftDesignerLocale, CommonLocale} from "../../../locales/localeid";
import AkDesignerTaskAssignMulti from "./ak-designer-taskassign-multi";
import {injectIntl} from "react-intl";

export interface AkDesignerTaskAssignDialogProp extends IntlProps {
    /** 对话框是否可见*/
    visible?: boolean;
    /** 确定按钮 loading*/
    confirmLoading?: boolean;
    /** 标题*/
    title?: React.ReactNode | string;
    /** 是否显示右上角的关闭按钮*/
    closable?: boolean;
    /** 点击确定回调*/
    onOk?: (value: TaskAssignee|TaskAssignee[]) => void; //多选时返回数组，否则是单个对象
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
    onCancel?: (e: React.MouseEvent < any >) => void;
    /** 宽度*/
    width?: string | number;
    /** 底部内容*/
    footer?: React.ReactNode;
    /** 确认按钮文字*/
    okText?: string;
    /** 取消按钮文字*/
    cancelText?: string;
    /** 点击蒙层是否允许关闭*/
    maskClosable?: boolean;
    style?: React.CSSProperties;
    wrapClassName?: string;
    maskTransitionName?: string;
    transitionName?: string;
    className?: string;

    flowContext?: ProcessProperties;
    multiple?: boolean; //是否支持多选
    defaultValue?: TaskAssignee|TaskAssignee[]; //默认值
    value?: TaskAssignee|TaskAssignee[]; //受控的value
    readonly?: boolean;
}

interface AkDesignerTaskAssignDialogState {
    value?: TaskAssignee[];
    tempValue?: TaskAssignee[];
}

class AkDesignerTaskAssignDialog extends Component<AkDesignerTaskAssignDialogProp,AkDesignerTaskAssignDialogState> {
    static defaultProps = {
        defaultValue: [],
        flowContext: {},
    }
    constructor(props, context) {
        super(props, context);
        let value = props.value ? props.value : props.defaultValue;
        if (!(value instanceof Array)) {
            value = [value];
        }
        this.state = {value: value, tempValue: value.slice(0)};
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            let value = nextProps.value;
            if (!(value instanceof Array)) {
                value = [value];
            }
            this.setState({value: value, tempValue: value.slice(0)});
        }
    }

    onOk() {
        let v = this.state.tempValue.slice(0);

        if (!("value" in this.props)) {
            this.setState({value: v});
        }

        let value;

        if (this.props.multiple) {
            value = v;
        } else {
            if (v.length > 0) {
                value = v[0];
            }
        }
        this.props.onOk && this.props.onOk(value);
    }

    onCancel(e) {
        this.setState({tempValue: this.state.value.slice(0)});
        this.props.onCancel && this.props.onCancel(e);
    }

    onValueChange(v) {
        this.setState({tempValue: v});
    }

    render() {
        const {multiple, intl, width, title, okText, flowContext, defaultValue, value, readonly, onOk, onCancel, ...others} = this.props;

        let maxSelection = multiple ? 0 : 1;
        return <AkModal width={width?width:650}
                        title={title?title:intl.formatMessage({id:FlowcraftDesignerLocale.AssignEditor})}
                        okText={okText?okText:intl.formatMessage({id:CommonLocale.Save})}
                        onOk={this.onOk.bind(this)} onCancel={this.onCancel.bind(this)} {...others}>
            <AkDesignerTaskAssignMulti flowContext={flowContext} maxSelection={maxSelection}
                                       value={this.state.tempValue}
                                       onChange={this.onValueChange.bind(this)}/>
            {/*<AkDesignerTaskAssign value={this.state.tempValue}*/}
            {/*onChange={this.onValueChange.bind(this)}></AkDesignerTaskAssign>*/}
        </AkModal>
    }
}

export default injectIntl(AkDesignerTaskAssignDialog)
