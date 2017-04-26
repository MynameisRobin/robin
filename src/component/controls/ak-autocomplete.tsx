/**
 * Created by franklu on 12/30/16.
 */
import * as React from "react";
import {Component} from "react";
import {AutoComplete} from "antd";
import {AkInputGroup} from "./ak-input-group";
import {AkButton} from "./ak-button";
import {AkIcon} from "./ak-icon";

export interface AkSelectedValue {
    key: string;
    label: React.ReactNode;
}
export interface AkDataSourceItemObject {
    value: string;
    text: string;
}
export declare type AkDataSourceItemType = string | AkDataSourceItemObject;
interface AkAutoCompleteProp {
    size?: 'large' | 'small' | 'default';
    className?: string;
    notFoundContent?: Element;
    dataSource: AkDataSourceItemType[];
    prefixCls?: string;
    transitionName?: string;
    optionLabelProp?: string;
    choiceTransitionName?: string;
    showSearch?: boolean;
    defaultValue?: string | Array<any> | AkSelectedValue | Array<AkSelectedValue>;
    value?: string | Array<any> | AkSelectedValue | Array<AkSelectedValue>;
    allowClear?: boolean;
    onChange?: (value: string | Array<any> | AkSelectedValue | Array<AkSelectedValue>) => void;
    disabled?: boolean;
    delay?: number; //输入搜索延迟
    style?: React.CSSProperties;
    onSelect?: (any) => void;
    placeholder?: string;
    requireFilter?: boolean; //是否需要根据输入内容过滤搜索结果(dataSource)
    filterOption?: (value: string, obj: any) => boolean; //filter搜索结果(dataSource)的fn;
    addonAfter?: React.ReactNode;
    iconType?: string; //如果需要在右侧显示icon 对应的名称
    iconClick?: (value) => void; //icon点击事件，参数为当前的输入值
    children?:any;
}

interface  AkAutoCompleteState {
}

export class AkAutoComplete extends Component<AkAutoCompleteProp, AkAutoCompleteState> {

    static defaultProps: AkAutoCompleteProp = {
        delay: 500,
        dataSource: [],
        placeholder: 'please input',
        requireFilter: false
    }

    inputTimeout = null;
    requireSearch = true;
    value = null;

    constructor(props, context) {
        super(props, context);
    }

    onChange(value) {
        this.value = value;
        if (this.props.onChange) {
            if (this.requireSearch) {
                if (this.props.delay > 0) {
                    if (this.inputTimeout) {
                        window.clearTimeout(this.inputTimeout);
                    }
                    this.inputTimeout = setTimeout(() => {
                        this.props.onChange(value);
                    }, this.props.delay);
                } else {
                    this.props.onChange(value);
                }
            } else {
                this.requireSearch = true;
            }
        }
    }

    onSelect(value) {
        this.requireSearch = false;
        if (this.props.onSelect) {
            this.props.onSelect(value);
        }
    }

    filterOption() {
        return true;

    }


    render() {
        let that = this;
        let {onChange, delay, onSelect, ...others} =  this.props;
        others = Object.assign(others, {onSelect: that.onSelect.bind(that)});
        if (!this.props.requireFilter && !this.props.filterOption) {
            //不需要filter内容，设置filterOption永远返回true
            others = Object.assign(others, {filterOption: () => true});
        }
        return this.props.iconType ?
            <div className="ant-search-input-wrapper" style={this.props.style}>
                <AkInputGroup className="ant-search-input">
                    <AutoComplete onChange={this.onChange.bind(this)}  {...others}></AutoComplete>
                    <div className="ant-input-group-wrap">
                        <AkButton {...this.props.iconClick ? {onClick: () => this.props.iconClick(this.value)} : null}
                            className="ant-search-btn">
                            <AkIcon type={this.props.iconType}/>
                        </AkButton>
                    </div>
                </AkInputGroup>
            </div> :
            <AutoComplete onChange={this.onChange.bind(this)}  {...others}></AutoComplete>
    }
}
