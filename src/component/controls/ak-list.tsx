import * as React from "react";
import * as classNames from "classnames";
import {AkListItem} from "./ak-list-item";
import {AkSearch} from "./ak-search";
import {AkCheckbox} from "./ak-checkbox";

function noop() {
}

export interface ListItem {
    key: string;
    title?: string;
    description?: string;
    disabled?: boolean;
}


export interface AkListProps {
    showHeader?: boolean;
    maxSelection?: number; //允许选择的最大条数，受控下无用
    prefixCls?: string;
    dataSource?: ListItem[]; //列表数据参数
    filter?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
    titleText?: string;
    style?: React.CSSProperties;
    handleFilter?: (e: any) => void;
    handleSelect?: (selectedItem: any, checked: boolean) => void;
    handleSelectAll?: (dataSource: any[], checkAll: boolean) => void;
    handleClear?: () => void;
    onChange?: (checkedKeys: string[]) => void;
    render?: (item: any) => any;
    header?: (props: any) => any;
    body?: (props: any) => any;
    footer?: (props: AkListProps, states: AkListState) => void;
    defaultCheckedKeys?: string[]; //初始化选中的keys，受控下无用
    checkedKeys?: string[]; //（受控）选中的keys
    notFoundContent?: React.ReactNode | string;
    filterOption?: (filterText: any, item: any) => boolean;
    lazy?: boolean | {};
}

interface AkListState {
    checkedKeys?: string[];
}

export interface AkListContext {
    antLocale?: {
        Transfer?: any,
    };
}

export class AkList extends React.Component<AkListProps, any> {
    static defaultProps = {
        prefixCls: "ant-transfer-list",
        dataSource: [],
        defaultCheckedKeys: [],
        titleText: '',
        showSearch: false,
        render: (item) => item.title,
        lazy: {},
        maxSelection: 0,
    };

    static contextTypes = {
        antLocale: React.PropTypes.object,
    };

    context: AkListContext;

    constructor(props) {
        super(props);

        this.state = {checkedKeys: ("checkedKeys" in props) ? props.checkedKeys : props.defaultCheckedKeys};
    }

    componentWillReceiveProps(nextProps) {
        if (("checkedKeys" in nextProps) && nextProps.checkedKeys !== this.props.checkedKeys) {
            this.setState({checkedKeys: nextProps.checkedKeys});
        }
    }

    getCheckStatus(filteredDataSource) {
        const {checkedKeys} = this.state;
        if (checkedKeys.length === 0) {
            return 'none';
        } else if (filteredDataSource.every(item => checkedKeys.indexOf(item.key) >= 0)) {
            return 'all';
        }
        return 'part';
    }

    handleSelect = (selectedItem) => {
        const {checkedKeys} = this.state;
        const index = checkedKeys.indexOf(selectedItem.key);
        //const result = checkedKeys.some((key) => key === selectedItem.key);

        if (index > -1) {
            checkedKeys.splice(index, 1);
        } else {
            if (this.props.maxSelection > 0 && checkedKeys.length === this.props.maxSelection) {
                checkedKeys.splice(0, 1);
            }
            checkedKeys.push(selectedItem.key);
        }

        if (!("checkedKeys" in this.props)) {
            this.setState({checkedKeys: checkedKeys});
        }

        if (this.props.handleSelect) {
            this.props.handleSelect(selectedItem, index === -1);
        }

        if (this.props.onChange) {
            this.props.onChange(checkedKeys);
        }
    }

    handleSelectAll(filteredDataSource, checkAll) {
        const checkedKeys = checkAll ? [] : filteredDataSource.map(item => item.key);

        if (!("checkedKeys" in this.props)) {
            if (this.props.maxSelection > 0 && checkedKeys.length > 0) {
                checkedKeys.splice(this.props.maxSelection, checkedKeys.length);
            }

            this.setState({checkedKeys: checkedKeys});
        }

        if (this.props.handleSelectAll) {
            this.props.handleSelectAll(filteredDataSource, checkAll);
        }

        if (this.props.onChange) {
            this.props.onChange(checkedKeys);
        }
    }

    handleFilter = (e) => {
        this.props.handleFilter(e);
    }

    handleClear = () => {
        this.props.handleClear();
    }

    render() {

        const {
            showHeader,
            prefixCls, dataSource, titleText, filter, lazy, filterOption,
            body = noop, footer = noop, showSearch, render, style, header = noop
        } = this.props;

        const {checkedKeys} = this.state;

        let {searchPlaceholder, notFoundContent} = this.props;

        // Custom Layout
        const footerDom = footer(Object.assign({}, this.props), Object.assign({}, this.state));
        const bodyDom = body(Object.assign({}, this.props));
        const headerDom = header(Object.assign({}, this.props));

        const listCls = classNames(prefixCls, {
            [`${prefixCls}-with-footer`]: !!footerDom,
        });

        const filteredDataSource: ListItem[] = [];

        const showItems = dataSource.map((item) => {
            if (!item.disabled) {
                filteredDataSource.push(item);
            }
            const checked = checkedKeys.indexOf(item.key) >= 0;
            return (
                <AkListItem
                    key={item.key}
                    item={item}
                    lazy={lazy}
                    render={render}
                    filter={filter}
                    filterOption={filterOption}
                    checked={checked}
                    prefixCls={prefixCls}
                    onClick={this.handleSelect}
                />
            );
        });

        let unit = '';
        const antLocale = this.context.antLocale;
        if (antLocale && antLocale.Transfer) {
            const transferLocale = antLocale.Transfer;
            unit = dataSource.length > 1 ? transferLocale.itemsUnit : transferLocale.itemUnit;
            searchPlaceholder = searchPlaceholder || transferLocale.searchPlaceholder;
            notFoundContent = notFoundContent || transferLocale.notFoundContent;
        }

        const search = showSearch ? (
                <div className={`${prefixCls}-body-search-wrapper`}>
                    <AkSearch
                        prefixCls={`${prefixCls}-search`}
                        onChange={this.handleFilter}
                        placeholder={searchPlaceholder || 'Search'}
                        value={filter}
                    />
                </div>
            ) : null;

        const listBody = bodyDom || (
                <div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
                    {search}
                    <ul className={`${prefixCls}-content`}>
                        {showItems}
                    </ul>
                    <div className={`${prefixCls}-body-not-found`}>
                        {notFoundContent || 'Not Found'}
                    </div>
                </div>
            );
        const listFooter = footerDom ? (
                <div className={`${prefixCls}-footer`}>
                    {footerDom}
                </div>
            ) : null;
        const checkStatus = this.getCheckStatus(filteredDataSource);
        const checkedAll = checkStatus === 'all';
        const checkAllCheckbox = (
            <AkCheckbox
                ref="checkbox"
                checked={checkedAll}
                indeterminate={checkStatus === 'part'}
                onChange={() => this.handleSelectAll(filteredDataSource, checkedAll)}
            />
        );
        const listHeader = headerDom || (<div className={`${prefixCls}-header`}>
                {checkAllCheckbox}
                <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + dataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              {titleText}
            </span>
          </span>
            </div>);

        return (
            <div className={listCls} style={showHeader?style:Object.assign({},style,{paddingTop:0})}>
                {showHeader ? listHeader : undefined}
                {listBody}
                {listFooter}
            </div>
        );
    }
}
