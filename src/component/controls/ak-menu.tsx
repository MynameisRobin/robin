import * as React from 'react'
import {Component} from 'react'
import {Menu} from 'antd';

export interface AkSelectParam {
    key : string;
    keyPath : Array < string >;
    item : any;
    domEvent : any;
    selectedKeys : Array < string >;
}
export interface AkClickParam {
    key : string;
    keyPath : Array < string >;
    item : any;
    domEvent : any;
}
export interface AkMenuProps {
    id?: string;
    /** 主题颜色*/
    theme?: 'light' | 'dark';
    /** 菜单类型  enum: `vertical` `horizontal` `inline`*/
    mode?: 'vertical' | 'horizontal' | 'inline';
    /** 当前选中的菜单项 key 数组*/
    selectedKeys?: Array < string >;
    /** 初始选中的菜单项 key 数组*/
    defaultSelectedKeys?: Array < string >;
    /** 当前展开的菜单项 key 数组*/
    openKeys?: Array < string >;
    /** 初始展开的菜单项 key 数组*/
    defaultOpenKeys?: Array < string >;
    onOpenChange?: (openKeys : string[]) => void;
    /**
     * 被选中时调用
     *
     * @type {(item: any, key: string, selectedKeys: Array<string>) => void}
     */
    onSelect?: (param : AkSelectParam) => void;
    /** 取消选中时调用*/
    onDeselect?: (param : AkSelectParam) => void;
    /** 点击 menuitem 调用此函数*/
    onClick?: (param : AkClickParam) => void;
    /** 根节点样式*/
    style?: React.CSSProperties;
    openAnimation?: string | Object;
    openTransitionName?: string | Object;
    className?: string;
    prefixCls?: string;
}
interface AkMenuStates {}
export class AkMenu extends Component < AkMenuProps,
AkMenuStates > {
    constructor(props, context) {
        super(props, context);

    }
    static Divider = Menu.Divider;
    static Item = Menu.Item;
    static SubMenu = Menu.SubMenu;
    static ItemGroup = Menu.ItemGroup;
    render() {
        return <Menu {...this.props}></Menu>
    }
}
class AkMenuStyle {}
