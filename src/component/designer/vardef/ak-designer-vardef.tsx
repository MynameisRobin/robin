/**
 * 流程变量定义
 */
import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";
import {AkTab} from "../../controls/ak-tab";
import {AkTabPane} from "../../controls/ak-tab-pane";
import {FlowcraftDesignerLocale} from "../../../locales/localeid";
import AkDesignerVardefTable from "./ak-designer-vardef-table";
import AkDesignerVardefListref from "./ak-designer-vardef-listref";
import {MetadataAPI} from "../../../api/common/metadata";

export interface AkDesignerVardefProp extends IntlProps {
    //defaultValue?: Variables; //默认值
    value?: Variables; //受控的value
    readonly?: boolean; //
    onChange?: (value: Variables) => any;
}

export interface AkDesignerVardefState {
    basic?: Variable[];
    listref?: ListRef[];
    metadataCategories?: MetadataCategoryInfo[];//metadata categories
}

class AkDesignerVardef extends Component<AkDesignerVardefProp,AkDesignerVardefState> {

    static defaultProps: AkDesignerVardefProp = {
        readonly: false
    }

    constructor(props, context) {
        super(props, context);

        let basic = [];
        let listref = [];
        if ("value" in props) {
            basic = props.value && props.value.basic ? props.value.basic : [];
            listref = props.value && props.value.listref ? props.value.listref : [];
        }

        this.state = {
            basic: basic,
            listref: listref,
            metadataCategories: []
        };
    }

    componentWillMount() {
        MetadataAPI.getCategorys().then(c => {
            this.setState({metadataCategories: c.Data});
        });
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({
                basic: nextProps.value && nextProps.value.basic ? nextProps.value.basic : [],
                listref: nextProps.value && nextProps.value.listref ? nextProps.value.listref : [],
            });
        }
    }

    getBasicTab() {
        const {formatMessage} = this.props.intl;

        return <AkTabPane tab={formatMessage({id:FlowcraftDesignerLocale.BasicVariable})} key="variables">
            <AkDesignerVardefTable metadataCategories={this.state.metadataCategories} listrefs={this.state.listref}
                                   value={this.state.basic}
                                   onChange={this.basicChange.bind(this)}></AkDesignerVardefTable>
        </AkTabPane>
    }

    getListTab() {
        const {formatMessage} = this.props.intl;

        return <AkTabPane tab={formatMessage({id:FlowcraftDesignerLocale.VariableListDef})} key="listdefs">
            <AkDesignerVardefListref metadataCategories={this.state.metadataCategories} value={this.state.listref}
                                     onChange={this.listChange.bind(this)}></AkDesignerVardefListref>
        </AkTabPane>
    }

    basicChange(value) {
        this.onChange({basic: value});
    }

    listChange(value) {
        this.onChange({listref: value});
    }

    onChange(changed) {
        if (!("value" in this.props)) {
            this.setState(changed);
        }

        let obj = {basic: this.state.basic, listref: this.state.listref};
        obj = Object.assign(obj, changed);
        if (this.props.onChange) {
            this.props.onChange(obj);
        }
    }

    render() {
        return <AkTab>
            {this.getBasicTab()}
            {this.getListTab()}
        </AkTab>;
    }
}

export default injectIntl<typeof AkDesignerVardef>(AkDesignerVardef);
