import * as React from "react";
import {Component} from "react";
import {Input} from "antd";
const Search = Input.Search;

export interface AkSearchProps {
    className?: string;
    placeholder?: string;
    prefixCls?: string;
    style?: React.CSSProperties;
    defaultValue?: any;
    value?: any;
    onChange?: React.FormEventHandler<any>;
    onSearch?: (value: string) => any;
    size?: 'large' | 'default' | 'small';
    disabled?: boolean;
    readOnly?: boolean;
}
interface AkSearchStates {
}
export class AkSearch extends Component < AkSearchProps,
    AkSearchStates > {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Search {...this.props}></Search>
    }
}
export default AkSearch;
