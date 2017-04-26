import * as React from 'react'
import {Component} from 'react'
import {Select} from 'antd';

export declare type AkSelectValue = string | any[] | {
    key: string;
    label: React.ReactNode;
} | Array < {
    key: string;
    label: React.ReactNode;
} >;
export interface AkSelectProps {
    prefixCls?: string;
    className?: string;
    value?: AkSelectValue;
    defaultValue?: AkSelectValue;
    size?: 'default' | 'large' | 'small';
    combobox?: boolean;
    notFoundContent?: React.ReactNode | null;
    showSearch?: boolean;
    transitionName?: string;
    choiceTransitionName?: string;
    multiple?: boolean;
    allowClear?: boolean;
    filterOption?: boolean | ((inputValue : string, option : Object) => any);
    tags?: boolean;
    onSelect?: (value : AkSelectValue, option : Object) => any;
    onDeselect?: (value : AkSelectValue) => any;
    onSearch?: (value : string) => any;
    placeholder?: string;
    dropdownMatchSelectWidth?: boolean;
    optionFilterProp?: string;
    optionLabelProp?: string;
    disabled?: boolean;
    defaultActiveFirstOption?: boolean;
    labelInValue?: boolean;
    getPopupContainer?: (triggerNode : React.ReactNode) => React.ReactNode | HTMLElement;
    style?: React.CSSProperties;
    dropdownStyle?: React.CSSProperties;
    dropdownMenuStyle?: React.CSSProperties;
    onChange?: (value : AkSelectValue) => void;
}
interface AkSelectStates {}
export class AkSelect extends Component < AkSelectProps,
AkSelectStates > {
    static Option = Select.Option;
    static OptGroup = Select.OptGroup;
    render() {
        return <Select {...this.props}></Select>
    }
}
class AkSelectStyle {}
