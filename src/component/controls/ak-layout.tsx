import * as React from 'react'
import {Component} from 'react'
import {Layout} from 'antd'

export interface AkLayoutProps {
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
}
interface AkLayoutStates {}
export class AkLayout extends Component < AkLayoutProps,
AkLayoutStates > {
    constructor(props, context) {
        super(props, context);
    }
    static Header = Layout.Header;
    static Footer = Layout.Footer;
    static Content = Layout.Content;
    static Sider : any = Layout.Sider;
    render() {
        return <Layout {...this.props}></Layout>
    }
}
class AkLayoutStyle {}
