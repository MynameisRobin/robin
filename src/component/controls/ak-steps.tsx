import * as React from "react";
import {Component} from "react";
import {Steps} from "antd";

export interface AkStepsProps {
    prefixCls?: string;
    iconPrefix?: string;
    current?: number;
    status?: 'wait' | 'process' | 'finish' | 'error';
    size?: 'default' | 'small';
    direction?: 'horizontal' | 'vertical';
}
interface AkStepsStates {
}
export class AkSteps extends Component < AkStepsProps,
    AkStepsStates > {
    static Step = Steps.Step;

    render() {
        return <Steps></Steps>
    }
}
