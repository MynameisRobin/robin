import * as React from 'react'
import {Component} from 'react'
import {Row} from 'antd';

interface AkRowProps {
    className?: string;
    gutter?: number;
    type?: 'flex';
    align?: 'top' | 'middle' | 'bottom';
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    style?: React.CSSProperties;
    prefixCls?: string;
}
interface AkRowStates {}
export class AkRow extends Component < AkRowProps,
AkRowStates > {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Row {...this.props}></Row>
    }
}
class AkRowStyle {}
