import * as React from 'react'
import {Component} from 'react'
import {Col} from 'antd';
interface AkColSize {
    span?: number;
    order?: number;
    offset?: number;
    push?: number;
    pull?: number;
}
interface AkColProps {
    className?: string;
    span?: number;
    order?: number;
    offset?: number;
    push?: number;
    pull?: number;
    xs?: number | AkColSize;
    sm?: number | AkColSize;
    md?: number | AkColSize;
    lg?: number | AkColSize;
    prefixCls?: string;
    style?: React.CSSProperties;
}
interface AkColStates {}
export class AkCol extends Component < AkColProps,
AkColStates > {
    render() {
        return <Col {...this.props}></Col>
    }
}
class AkColStyle {}
