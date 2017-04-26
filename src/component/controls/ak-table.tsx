import * as React from 'react'
import {Component} from 'react'
import {Table} from 'antd';
import {AkPaginationProps} from './ak-pagination';

export interface AkTableRowSelection < T > {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: string[];
    onChange?: (selectedRowKeys : string[], selectedRows : Object[]) => any;
    getCheckboxProps?: (record : T) => Object;
    onSelect?: (record : T, selected : boolean, selectedRows : Object[]) => any;
    onSelectAll?: (selected : boolean, selectedRows : Object[], changeRows : Object[]) => any;
}
export interface AkColumnProps < T > {
    title?: React.ReactNode;
    key?: string;
    dataIndex?: string;
    render?: (text : any, record : T, index : number) => React.ReactNode;
    filters?: {
        text: string;
        value: string;
    }[];
    onFilter?: (value : any, record : T) => boolean;
    filterMultiple?: boolean;
    filterDropdown?: React.ReactNode;
    sorter?: boolean | ((a : any, b : any) => number);
    colSpan?: number;
    width?: string | number;
    className?: string;
    fixed?: boolean | ('left' | 'right');
    filteredValue?: any[];
    sortOrder?: boolean | ('ascend' | 'descend');
}

export interface AkTableProps < T > {
    prefixCls?: string;
    dropdownPrefixCls?: string;
    rowSelection?: AkTableRowSelection < T >;
    pagination?: AkPaginationProps | boolean;
    size?: 'default' | 'small';
    dataSource?: T[];
    columns?: AkColumnProps < T > [];
    rowKey?: string | ((record : T, index : number) => string);
    rowClassName?: (record : T, index : number) => string;
    expandedRowRender?: any;
    defaultExpandedRowKeys?: string[];
    expandedRowKeys?: string[];
    expandIconAsCell?: boolean;
    expandIconColumnIndex?: number;
    onChange?: (pagination : AkPaginationProps | boolean, filters : string[], sorter : Object) => any;
    loading?: boolean;
    locale?: Object;
    indentSize?: number;
    onRowClick?: (record : T, index : number) => any;
    useFixedHeader?: boolean;
    bordered?: boolean;
    showHeader?: boolean;
    footer?: (currentPageData : Object[]) => React.ReactNode;
    title?: (currentPageData : Object[]) => React.ReactNode;
    scroll?: {
        x?: boolean | number;
        y?: boolean | number;
    };
    childrenColumnName?: string;
    bodyStyle?: React.CSSProperties;
    className?: string;
    style?: React.CSSProperties;
}
interface AkTableStates {}

export class AkTable < T > extends Component < AkTableProps < T >,
AkTableStates > {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return React.createElement(Table, this.props);
    }
}
class AkTableStyle {}
