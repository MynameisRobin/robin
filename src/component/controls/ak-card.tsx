import * as React from 'react'
import {Component} from 'react'
import {Card} from 'antd'

interface AkCardProps {
    prefixCls?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    bodyStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    loading?: boolean;
    children?: any;
    id?: string;
    className?: string;
}
interface AkCardStates {}
export class AkCard extends Component < AkCardProps,
AkCardStates > {
    render() {
        return <Card {...this.props}></Card>
    }
}
class AkCardStyle {}
