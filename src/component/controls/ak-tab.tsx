import * as React from "react";
import {Component} from "react";
import {Tabs} from "antd";

export declare type TabsType = 'line' | 'card' | 'editable-card';
export declare type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface AkTabProp {
    activeKey?: string;
    defaultActiveKey?: string;
    hideAdd?: boolean;
    onChange?: (activeKey: string) => void;
    onTabClick?: Function;
    tabBarExtraContent?: React.ReactNode | null;
    type?: TabsType;
    tabPosition?: TabsPosition;
    onEdit?: (targetKey: string, action: any) => void;
    size?: 'default' | 'small';
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    animated?: boolean;
}

interface  AkTabState {
}

export class AkTab extends Component<AkTabProp, AkTabState> {
    static defaultProps: AkTabProp = {
        hideAdd: false,
        type: 'line',
        tabPosition: 'top',
        size: 'default',
        animated: true
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Tabs {...this.props}></Tabs>
    }
}
