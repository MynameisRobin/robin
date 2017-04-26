import * as React from 'react'
import {Component} from 'react'
import {Icon} from 'antd';

interface AkIconProps {
    type : string;
    className?: string;
    title?: string;
    onClick?: React.MouseEventHandler < any >;
    spin?: boolean;
    style?: React.CSSProperties;
}
interface AkIconStates {}
export class AkIcon extends Component < AkIconProps,
AkIconStates > {
    render() {
        return <Icon {...this.props}></Icon>
    }
}
class AkIconStyle {}
