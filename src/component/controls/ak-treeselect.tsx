import * as React from "react";
import {Component} from "react";
import {TreeSelect} from "antd";

export interface AkTreeData {
    label: string;
    value: string;
    key: string;
    children?: AkTreeData[]
}

interface AkTreeSelectProps {
    style?: React.CSSProperties;
    value?: string | Array<any>;
    defaultValue?: string | Array<any>;
    multiple?: boolean;
    tags?: boolean;
    onSelect?: (value: any) => void;
    onChange?: (value: any, label: any) => void;
    allowClear?: boolean;
    onSearch?: (value: any) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    dropdownStyle?: React.CSSProperties;
    dropdownMatchSelectWidth?: boolean;
    combobox?: boolean;
    size?: 'large' | 'small';
    showSearch?: boolean;
    disabled?: boolean;
    treeDefaultExpandAll?: boolean;
    treeCheckable?: boolean | React.ReactNode;
    filterTreeNode?: (inputValue: string, treeNode: any) => boolean | boolean;
    treeNodeFilterProp?: string;
    treeNodeLabelProp?: string;
    treeData?: Array<AkTreeData> | Array<any>;
    treeDataSimpleMode?: boolean | Object;
    loadData?: (node: any) => void;
    showCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';
    className?: string;
    prefixCls?: string;
    notFoundContent?: React.ReactNode;
    labelInValue?: boolean;
    treeCheckStrictly?: boolean;
    getPopupContainer?: (triggerNode: React.ReactNode) => HTMLElement;
}
export class AkTreeSelect extends Component<AkTreeSelectProps, any> {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        //必须设置默认宽度；如果是多选，默认SHOW_PARENT，选中Parent时只添加Parent
        let props = Object.assign({
            treeCheckable: true,
            showCheckedStrategy: 'SHOW_PARENT',
            style: {width: "100%"}
        }, this.props);

        return <TreeSelect {...props} />;
    }
}
