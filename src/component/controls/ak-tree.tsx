import * as React from "react";
import {Component} from "react";
import {Tree} from "antd";

export interface AkTreeData {
    label: string;
    value: string;
    key: string;
    children?: AkTreeData[]
}

export interface AkTreeNodeProps {
    className?:string;
    disabled?: boolean;
    disableCheckbox?: boolean;
    title?: string | React.ReactNode;
    key?: string;
    isLeaf?: boolean;
    data?:any;
}
class AkTreeNode extends React.Component<AkTreeNodeProps, {}> {
    static isTreeNode=1;
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Tree.TreeNode {...this.props}></Tree.TreeNode>;
    }
}
export interface AkTreeNodeEvent {
    event: 'check' | 'select';
    node: AkTreeNode;
    checked?: boolean;
    checkedNodes?: Array<AkTreeNode>;
    selected?: boolean;
    selectedNodes?: Array<AkTreeNode>;
}
export interface AkTreeNodeMouseEvent {
    node: AkTreeNode;
    event: React.MouseEventHandler<any>;
}
export interface AkTreeProps {
    showLine?: boolean;
    className?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否自动展开父节点 */
    autoExpandParent?: boolean;
    /** checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
    checkStrictly?: boolean;
    /** 是否支持选中 */
    checkable?: boolean;
    /** 默认展开所有树节点 */
    defaultExpandAll?: boolean;
    /** 默认展开指定的树节点 */
    defaultExpandedKeys?: Array<string>;
    /** （受控）展开指定的树节点 */
    expandedKeys?: Array<string>;
    /** （受控）选中复选框的树节点 */
    checkedKeys?: Array<string> | {
        checked: Array<string>;
        halfChecked: Array<string>;
    };
    /** 默认选中复选框的树节点 */
    defaultCheckedKeys?: Array<string>;
    /** （受控）设置选中的树节点 */
    selectedKeys?: Array<string>;
    /** 默认选中的树节点 */
    defaultSelectedKeys?: Array<string>;
    /** 展开/收起节点时触发 */
    onExpand?: (expandedKeys: Array<string>, info: {
        node: AkTreeNode;
        expanded: boolean;
    }) => void | PromiseLike<any>;
    /** 点击复选框触发 */
    onCheck?: (checkedKeys: Array<string>, e: AkTreeNodeEvent) => void;
    /** 点击树节点触发 */
    onSelect?: (selectedKeys: Array<string>, e: AkTreeNodeEvent) => void;
    /** filter some AntTreeNodes as you need. it should return true */
    filterAntTreeNode?: (node: AkTreeNode) => boolean;
    /** 异步加载数据 */
    loadData?: (node: AkTreeNode) => PromiseLike<any>;
    /** 响应右键点击 */
    onRightClick?: (options: AkTreeNodeMouseEvent) => void;
    /** 设置节点可拖拽（IE>8）*/
    draggable?: boolean;
    /** 开始拖拽时调用 */
    onDragStart?: (options: AkTreeNodeMouseEvent) => void;
    /** dragenter 触发时调用 */
    onDragEnter?: (options: AkTreeNodeMouseEvent) => void;
    /** dragover 触发时调用 */
    onDragOver?: (options: AkTreeNodeMouseEvent) => void;
    /** dragleave 触发时调用 */
    onDragLeave?: (options: AkTreeNodeMouseEvent) => void;
    /** drop 触发时调用 */
    onDrop?: (options: AkTreeNodeMouseEvent) => void;
    style?: React.CSSProperties;
    prefixCls?: string;
    filterTreeNode?: (node: AkTreeNode) => boolean;
}
export class AkTree extends Component<AkTreeProps, any> {

    static TreeNode = AkTreeNode;

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Tree {...this.props}></Tree>;
    }
}
