import * as React from "react";
import {Component} from "react";
import {AkTree, AkTreeNodeEvent} from "./ak-tree";

export interface AkTreeData {
    label: string;
    value: string;
    key: string;
    children?: AkTreeData[]
}

export interface AkTreeDataDescriber {
    id?: string|((record) => string);
    pId?: string|((record) => string);
    rootPId?: any;
}

export interface AkTreeSimpleProp {
    treeData?: AkTreeData[] | any[]; //层级的数数据 或者 简单树对象，层级关系通过parent进行维护，默认参数id, label, pId, value，不然需要额外说明
    simpleTreeDescriber?: boolean | AkTreeDataDescriber; //简单数对象的说明，用于获取id, label, pId, rootPId等值， 如果treeData符合标准字段，传true
    onCheck?: (checkedKeys: string[]) => any; //oncheck回调函数，第一个参数是所有checkedkeys，第二个是根据strategy过滤后的对象
    checkedStrategy?: 'ALL' | 'PARENT' | 'CHILD'; //check parent节点时checkkeys获取逻辑，包括父子节点，仅父节点，仅子节点
    /** 是否支持多选 */
    multiple?: boolean;
    disableCheck?: boolean;
    /** 默认展开所有树节点 */
    defaultExpandAll?: boolean;
    /** 是否支持选中 */
    checkable?: boolean;
    /** 允许的最大check数量 */
    maxChecking?: number;
    /** 默认展开指定的树节点 */
    defaultExpandedKeys?: Array<string>;
    /** （受控）展开指定的树节点 */
    expandedKeys?: Array<string>;
    /** （受控）选中复选框的树节点 */
    checkedKeys?: Array<string>;
    /** 默认选中复选框的树节点 */
    defaultCheckedKeys?: Array<string>;
    /** （受控）设置选中的树节点 */
    selectedKeys?: Array<string>;
    /** 默认选中的树节点 */
    defaultSelectedKeys?: Array<string>;
    /** 点击树节点触发 */
    onSelect?: (selectedKeys: Array<string>, e: AkTreeNodeEvent) => void;
    style?: React.CSSProperties;
}

interface AkTreeSimpleState {
    treeData?: AkTreeData[];
    treeDataDict?: Object;
    checkedKeys?: string[];//记录tree checked所有keys
    disableCheck?: boolean; //是否禁用checkbox
    expandedKeys?: string[];
}

/**
 * 将简单（平级）的data转换成层级的treedata
 * @param treeData
 * @param format
 * @returns {Array}
 */
function processSimpleTreeData(treeData, format) {

    function unflatten2(array, p?) {
        let parent = p;
        if (p === undefined) {
            parent = {};
            parent[format.id] = format.rootPId;
        }

        let children = [];
        for (let i = 0; i < array.length; i++) {
            array[i] = Object.assign({}, array[i]); // copy, can not corrupts original data
            if (array[i][format.pId] === parent[format.id]) {
                array[i].key = array[i][format.id];
                children.push(array[i]);
                array.splice(i--, 1);
            }
        }
        if (children.length) {
            parent.children = children;
            children.forEach(function (child) {
                return unflatten2(array, child);
            });
        }
        if (parent[format.id] === format.rootPId) {
            return children;
        }
    }

    return unflatten2(treeData);
}

export class AkTreeSimple extends Component<AkTreeSimpleProp, AkTreeSimpleState> {

    static defaultProps: AkTreeSimpleProp = {
        treeData: [],
        defaultCheckedKeys: [],
        checkedStrategy: 'ALL',
        multiple: false,
        maxChecking: 200,
    }

    static defaultTreeDataDescriber: AkTreeDataDescriber = {
        id: "key",
        pId: "pId",
        rootPId: "0",
    }

    constructor(props, context) {
        super(props, context);

        let treeData = this.parseTreeData(props.treeData);
        let checkedKeys = this.props.checkedKeys || this.props.defaultCheckedKeys;
        this.state = {
            treeData: treeData,
            treeDataDict: this.parseTreeData2Value(treeData),
            checkedKeys: checkedKeys,
            disableCheck: ("disableCheck" in props) ? props.disableCheck : this.props.maxChecking > 0 && checkedKeys.length >= this.props.maxChecking,
        }
    }

    componentWillReceiveProps(nextProps: AkTreeSimpleProp) {
        let state;

        if ("checkedKeys" in nextProps && nextProps.checkedKeys != this.props.checkedKeys) {
            state = Object.assign({}, state, {checkedKeys: nextProps.checkedKeys});
        }

        if ("disableCheck" in nextProps && nextProps.disableCheck != this.props.disableCheck) {
            state = Object.assign({}, state, {disableCheck: nextProps.disableCheck});
        }

        if ("treeData" in nextProps && nextProps.treeData != this.props.treeData) {
            let treeData = this.parseTreeData(nextProps.treeData.slice(0));
            let dict = this.parseTreeData2Value(treeData);
            if (this.props.defaultExpandAll) {
                state = Object.assign({}, state, {expandedKeys: Object.keys(dict)});
            }
            state = Object.assign({}, state, {treeData: treeData, treeDataDict: dict});
        }

        if (state) {
            this.setState(state);
        }
    }

    parseTreeData(treeData) {
        let data;
        if (this.props.simpleTreeDescriber) {
            data = processSimpleTreeData(treeData, Object.assign({}, AkTreeSimple.defaultTreeDataDescriber, this.props.simpleTreeDescriber));
        } else {
            data = treeData;
        }
        return data;
    }

    parseTreeData2Value(treeData: AkTreeData[]) {
        let value = {}

        function tree2Value(children: AkTreeData[], value) {
            children.forEach(d => {
                value[d.key] = d;
                if (d.children) {
                    tree2Value(d.children, value);
                }
            });
        }

        tree2Value(treeData, value);
        return value;
    }

    getTreeNodes() {
        let that = this;

        function loop(data: AkTreeData[]) {
            return data.map((item) => {
                if (item.children) {
                    return (
                        <AkTree.TreeNode key={item.key} title={item.label}
                                         disableCheckbox={that.state.disableCheck && (that.state.checkedKeys.indexOf(item.key) === -1)}>
                            {loop(item.children)}
                        </AkTree.TreeNode>
                    );
                }
                return <AkTree.TreeNode key={item.key} title={item.label}
                                        disableCheckbox={that.state.disableCheck && (that.state.checkedKeys.indexOf(item.key) === -1)}/>;
            });
        }

        return loop(this.state.treeData);
    }

    changeCheckedKeys(checkedKeys: Array<string>) {

        let state = {};

        if (!("checkedKeys" in this.props)) {
            Object.assign(state, {checkedKeys: checkedKeys});
        }

        if (!("disableCheck" in this.props)) {
            Object.assign(state, {disableCheck: this.props.maxChecking > 0 && checkedKeys.length >= this.props.maxChecking});
        }

        this.setState(state);

        if (this.props.onCheck) {
            this.props.onCheck(checkedKeys);
        }
    }

    /**
     * 根据点击策略，修正checkedKeys
     * @param checkedKeys
     * @param e
     */
    onCheck(checkedKeys: Array<string>, e: AkTreeNodeEvent) {
        function removeChildren(parent: AkTreeData, dict: Object) {
            if (parent.children) {
                parent.children.forEach(k => {
                    if (dict.hasOwnProperty(k.key)) {
                        delete dict[k.key];
                    }
                    if (k.children) {
                        removeChildren(k, dict);
                    }
                });
            }
        }

        function removeParent(parent: AkTreeData, dict: Object) {
            if (parent.children) {
                let del = false;
                parent.children.forEach(c => {
                    if (dict.hasOwnProperty(c.key)) {
                        del = true;
                    }
                    if (c.children) {
                        removeParent(c, dict);
                    }
                });
                delete dict[parent.key];
            }
        }

        let checkedDict = {};
        checkedKeys.forEach(k => {
            checkedDict[k] = this.state.treeDataDict[k];
        });

        switch (this.props.checkedStrategy) {
            case "PARENT":
                //移除所有的children
                checkedKeys.forEach(k => {
                    let obj = checkedDict[k];
                    if (obj) {
                        removeChildren(obj, checkedDict);
                    }
                });
                break;
            case "CHILD":
                //移除有children被选中的parent
                checkedKeys.forEach(k => {
                    let obj = checkedDict[k];
                    if (obj) {
                        removeParent(obj, checkedDict);
                    }
                });
                break;
            default:
        }

        let keys = Object.keys(checkedDict);

        if (this.props.maxChecking > 0 && keys.length > this.props.maxChecking) {
            //超过允许的最大选择数
            keys.splice(this.props.maxChecking, keys.length);
        }

        this.changeCheckedKeys(keys);
    }

    render() {
        const {treeData, simpleTreeDescriber, onCheck, checkedStrategy, checkedKeys, ...others} = this.props;

        return this.state.treeData.length > 0 ?
            <AkTree defaultExpandAll={this.props.defaultExpandAll} checkedKeys={this.state.checkedKeys}
                    onCheck={this.onCheck.bind(this)} {...others}>{this.getTreeNodes()}</AkTree>:<span></span>;
    }
}
