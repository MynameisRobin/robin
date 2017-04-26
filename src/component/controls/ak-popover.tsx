import * as React from "react";
import { Component } from "react";
import { Popover } from "antd";
import { AkButton } from '../controls/ak-button';

interface AkPopoverProp {
    title?: string;
    content?: string;
    placement?: string;
    trigger?: string;
}

interface AkPopoverState { }

export class AkPopover extends Component<AkPopoverProp,
    AkPopoverState> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <AkPopover {...this.props}>
            <AkButton></AkButton>
        </AkPopover>
    }
}
