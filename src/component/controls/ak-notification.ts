import {notification} from 'antd';
export interface ArgsProps {
    message : React.ReactNode | string;
    description : React.ReactNode | string;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number;
    icon?: React.ReactNode;
}
export interface ConfigProps {
    top?: number;
    duration?: number;
}
export class AkNotification {
    static info(args : ArgsProps) : void {
        return notification.info(args);
    };
    static success(args : ArgsProps) : void {
        return notification.success(args);
    };
    static error(args : ArgsProps) : void {
        return notification.error(args);
    };
    static warn(args : ArgsProps) : void {
        return notification.warn(args);
    };
    static warning(args : ArgsProps) : void {
        return notification.warning(args);
    };
    static open(args : ArgsProps) : void {
        return notification.open(args)
    };
    static close(key : string) : void {
        return notification.close(key);
    };
    static config(options : ConfigProps) : void {
        return notification.config(options)
    };
    static destroy() : void {
        notification.destroy();
    };
}
