import * as React from 'react'
import {Component} from 'react'
import {Modal} from 'antd'

export interface AkModalProps {
    /** 对话框是否可见*/
    visible?: boolean;
    /** 确定按钮 loading*/
    confirmLoading?: boolean;
    /** 标题*/
    title?: React.ReactNode | string;
    /** 是否显示右上角的关闭按钮*/
    closable?: boolean;
    /** 点击确定回调*/
    onOk?: () => void;
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
    onCancel?: (e : React.MouseEvent < any >) => void;
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
}
interface AkModalStates {}
export class AkModal extends Component < AkModalProps,
AkModalStates > {
    static info: any=Modal.info;
    static success: any=Modal.success;
    static error: any=Modal.error;
    static warn: any=Modal.warn;
    static warning: any=Modal.warning;
    static confirm: any=Modal.confirm;
    render() {
        return <Modal {...this.props}></Modal>
    }
}
class AkModalStyle {}
