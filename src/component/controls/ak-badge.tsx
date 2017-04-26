import * as React from 'react'
import {Component} from 'react'
import {Badge} from 'antd';

interface AkBadgeProps {
    /** Number to show in badge */
    count : number | string;
    /** Max count to show */
    overflowCount?: number;
    /** whether to show red dot without number */
    dot?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    text?: string;
}
interface AkBadgeStates {}
export class AkBadge extends Component < AkBadgeProps,
AkBadgeStates > {
    render() {
        return <Badge {...this.props}></Badge>
    }
}
class AkBadgeStyle {}
