import * as React from "react";
import {Component} from "react";
import {FlowcraftDesignerLocale} from "../../../locales/localeid";
import AkDesignerTaskAssignSingle from "./ak-designer-taskassign-single";
import {injectIntl} from "react-intl";
import {AkRow} from "../../controls/ak-row";
import {AkCol} from "../../controls/ak-col";
import {AkButton} from "../../controls/ak-button";
import {AkIcon} from "../../controls/ak-icon";
import imageToDataUri = joint.util.imageToDataUri;

export interface AkDesignerTaskAssignMultiProp extends IntlProps {
    defaultValue?: TaskAssignee[]; //默认值
    value?: TaskAssignee[]; //受控的value
    childshapes?: ProcessShape[]; //流程中节点的定义
    variables?: Variables; //流程中变量的定义
    onChange?: (value: TaskAssignee[]) => void;
    maxSelection?: number; //限制的最大选择数量
    flowContext?: ProcessProperties;
}

interface AkDesignerTaskAssignMultiState {
    value?: TaskAssignee[];
    valueToAdd?: TaskAssignee;
}

class AkDesignerTaskAssignMulti extends Component<AkDesignerTaskAssignMultiProp,AkDesignerTaskAssignMultiState> {
    static defaultProps: AkDesignerTaskAssignMultiProp = {
        defaultValue: [],
    }

    constructor(props, context) {
        super(props, context);
        this.state = {value: props.value ? props.value : props.defaultValue};
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    assignmentChange(value: TaskAssignee) {
        this.setState({valueToAdd: value});
    }

    onChange(value: TaskAssignee[]) {
        if (!("value" in this.props)) {
            this.setState({value: value});
        }

        this.props.onChange && this.props.onChange(value);
    }

    addAssignee() {
        let {value, valueToAdd} = this.state;
        let {maxSelection} = this.props;

        let matched = value.findIndex(v => {
            return v.method === valueToAdd.method && v.value === valueToAdd.value && v.position === valueToAdd.position;
        })

        if (matched === -1) {
            if (maxSelection && maxSelection > 0) {
                if (value.length === maxSelection) {
                    value.splice(value.length - 1, 1);
                }
            }
            value.push(valueToAdd);
        }

        this.onChange(value);
    }

    removeAssignee(index) {
        let {value} = this.state;
        value.splice(index, 1);
        this.onChange(value);
    }

    render() {
        const {flowContext, intl} = this.props;
        const {value} =this.state;

        return <div className="ak-assignment-multi"><AkRow gutter={6}><AkCol span={13}>
            <AkDesignerTaskAssignSingle flowContext={flowContext}
                                        onChange={this.assignmentChange.bind(this)}></AkDesignerTaskAssignSingle>
            <AkButton type="primary" disabled={!this.state.valueToAdd}
                      onClick={this.addAssignee.bind(this)}>{intl.formatMessage({id: FlowcraftDesignerLocale.AssignAdd})}</AkButton>
        </AkCol><AkCol span={11}>
            <AkRow><label
                className="ak-assignment-multi-title">{intl.formatMessage({id: FlowcraftDesignerLocale.AssignSelected})}</label></AkRow>
            <div className="ak-assignment-multi-list">
                {value.length > 0 ? value.map((v, i) => {
                return <AkRow key={i} gutter={6}>
                    <AkCol span={22}>
                        <div dangerouslySetInnerHTML={{__html:v.title}}></div>
                    </AkCol>
                    <AkCol span={2}><AkIcon type="delete" onClick={()=>this.removeAssignee(i)}/></AkCol>
                </AkRow>
                    }) :<label
                        className="ak-no-content">{intl.formatMessage({id: FlowcraftDesignerLocale.AssigneeEmpty})}</label>}
            </div>
        </AkCol></AkRow></div>
    }
}

export default injectIntl(AkDesignerTaskAssignMulti)
