import * as React from 'react'
import {Component} from 'react'
import {Upload} from 'antd';
declare type AkUploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';
export interface AkFile {
    uid: number;
    size: number;
    name: string;
    lastModifiedDate?: Date;
    type:string;
    url?: string;
    status?: AkUploadFileStatus;
    percent?: number;
    thumbUrl?: string;
    originFileObj?: AkFile;
}
interface AkHttpRequestHeader {
    [key : string] : string;
}
interface AkUploadChangeParam {
    file : AkFile;
    fileList : Array < AkFile >;
    event?: {
        percent: number;
    };
}
export interface AkUploadProps extends IntlProps {
    type?: 'drag' | 'select';
    name?: string;
    defaultFileList?: Array < AkFile >;
    fileList?: Array < AkFile >;
    action : string;
    data?: Object | ((file : AkFile) => any);
    headers?: AkHttpRequestHeader;
    showUploadList?: boolean;
    multiple?: boolean;
    accept?: string;
    beforeUpload?: (file:AkFile) => boolean | PromiseLike < any >;
    onChange?: (info) => void;
    listType?: 'text' | 'picture' | 'picture-card';
    className?: string;
    onPreview?: (file : AkFile) => void;
    onRemove?: (file : AkFile) => void;
    supportServerRender?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    prefixCls?: string;
}
interface AkUploadStates {}
export class AkUpload extends Component < AkUploadProps,
AkUploadStates > {
    static Dragger=Upload.Dragger;
    render() {
        return <Upload {...this.props}></Upload>
    }
}
class AkUploadStyle {}
