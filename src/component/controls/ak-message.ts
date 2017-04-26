import {message} from 'antd';

export declare type AkConfigOnClose = () => void;
export interface AkConfigOptions {
    top?: number;
    duration?: number;
    prefixCls?: string;
}
export class AkMessage {
    static info(content : React.ReactNode, duration?: number | undefined, onClose?: AkConfigOnClose | undefined) : () => void {
        return message.info(content, duration, onClose);
    };
    static success(content : React.ReactNode, duration?: number | undefined, onClose?: AkConfigOnClose | undefined) : () => void {
        return message.success(content, duration, onClose);
    };
    static error(content : React.ReactNode, duration?: number | undefined, onClose?: AkConfigOnClose | undefined) : () => void {
        return message.error(content, duration, onClose);
    };
    static warn(content : React.ReactNode, duration?: number | undefined, onClose?: AkConfigOnClose | undefined) : () => void {
        return message.warn(content, duration, onClose);
    };
    static warning(content : React.ReactNode, duration?: number | undefined, onClose?: AkConfigOnClose | undefined) : () => void {
        return message.warning(content, duration, onClose);
    };
    static loading(content : React.ReactNode, duration?: number | undefined, onClose?: AkConfigOnClose | undefined) : () => void {
        return message.loading(content, duration, onClose);
    };
    static config(options : AkConfigOptions) : void {
        message.config(options);
    };
    static destroy() : void {
        message.destroy();
    };
}
