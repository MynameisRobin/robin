import * as React from "react";
import {Component} from "react";
import {Tabs} from "antd";
const TabPane = Tabs.TabPane;

export declare type TabsType = 'line' | 'card' | 'editable-card';
export declare type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface AkTabPaneProp {
    /** 选项卡头显示文字 */
    tab?: React.ReactNode | string;
    key?:string;
    style?: React.CSSProperties;
}

interface  AkTabPaneState {
}


export class AkTabPane extends Component<AkTabPaneProp, AkTabPaneState> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <TabPane {...this.props}></TabPane>;

    }
}
