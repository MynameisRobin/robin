import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";
import {AkTable, AkColumnProps} from "../../controls/ak-table";
import {FlowcraftDesignerLocale} from "../../../locales/localeid";
import {AkMessage} from "../../controls/ak-message";
import {AkButton} from "../../controls/ak-button";
import AkDesignerVardefEditCell from "./ak-designer-vardef-editcell";

export interface AkDesignerVardefTableProp extends IntlProps {
    defaultValue?: Variable[]; //默认值
    value?: Variable[]; //受控的value
    readonly?: boolean; //
    onChange?: (value: Variable[]) => any;
    listrefs?: ListRef[]; //list refs
    metadataCategories?: MetadataCategoryInfo[];//metadata categories
}

export interface AkDesignerVardefTableState {
    value?: Variable[];
}

class VariableTable extends AkTable < Variable > {
}

let uuid = 0;

class AkDesignerVardefTable extends Component<AkDesignerVardefTableProp,AkDesignerVardefTableState> {

    static defaultProps: AkDesignerVardefTableProp = {
        defaultValue: [],
        readonly: false,
        listrefs: [],
    }

    formatMessage = this.props.intl.formatMessage;

    columns: AkColumnProps < Variable > [] = this.props.readonly ? [
            {
                title: this.formatMessage({id: FlowcraftDesignerLocale.VariableId}),
                key: "id",
                dataIndex: "id",
                width: 120,
            }, {
                title: this.formatMessage({id: FlowcraftDesignerLocale.VariableName}),
                key: "name",
                dataIndex: "name",
                width: 120,
            }, {
                title: this.formatMessage({id: FlowcraftDesignerLocale.VariableType}),
                key: "type",
                dataIndex: "type",
                width: 100,
            }, {
                title: this.formatMessage({id: FlowcraftDesignerLocale.VariableDefaultRef}),
                key: "value",
                dataIndex: "value"
            }
        ] : [
            {
                title: this.formatMessage({id: FlowcraftDesignerLocale.VariableId}),
                key: "id",
                dataIndex: "id",
                width: 120,
                render: (text, record, index) => this.renderColumn("id", record, index)
            }, {
                title: this.formatMessage({id: FlowcraftDesignerLocale.VariableName}),
                key: "name",
                dataIndex: "name",
                width: 120,
                render: (text, record, index) => this.renderColumn("name", record, index)
            }, {
                title: this.formatMessage({id: FlowcraftDesignerLocale.VariableType}),
                key: "type",
                dataIndex: "type",
                width: 100,
                render: (text, record, index) => this.renderColumn("type", record, index)
            }, {
                title: this.formatMessage({id: FlowcraftDesignerLocale.VariableDefaultRef}),
                key: "value",
                dataIndex: "value",
                render: (text, record, index) => this.renderColumn("value", record, index)
            }, {
                title: this.formatMessage({id: FlowcraftDesignerLocale.Operation}),
                width: 110,
                render: (text, record, index) => {
                    return record["editable"] ?
                        <span><a style={{marginRight:10}}
                                 onClick={()=>this.editComplete(record, "save")}>{this.formatMessage({id: FlowcraftDesignerLocale.Save})}</a><a
                            onClick={()=>this.editComplete(record, "cancel")}>{this.formatMessage({id: FlowcraftDesignerLocale.Cancel})}</a></span>:
                        <span><a style={{marginRight:10}}
                                 onClick={()=>this.editRecord(record)}>{this.formatMessage({id: FlowcraftDesignerLocale.Edit})}</a> <a
                            onClick={()=>this.deleteRecord(index)}>{this.formatMessage({id: FlowcraftDesignerLocale.Delete})}</a></span>
                }
            }
        ];

    // editSave(record) {
    //     if (this.state.value.findIndex((r)=>{
    //             return r !== record && r.id === record.id;
    //         }) > -1) {
    //         //如果当前列表中包含了该值，则修改不成功
    //         AkMessage.error("变量Id重复:" + record.id);
    //         return;
    //     }
    //
    //     this.editComplete(record, "save");
    // }

    editComplete(record, status) {
        record["editable"] = false;
        record["status"] = status;
        this.onChange(this.state.value, () => {
            delete record["status"]
        });
    }

    editRecord(record) {
        record["editable"] = true;
        this.onChange(this.state.value);
    }

    deleteRecord(index) {
        this.state.value.splice(index, 1);
        this.onChange(this.state.value);
    }

    cellUpdated(index, field, value) {
        if (field === "id") {

            let record = this.state.value[index];
            //如果当前列表中包含了该值，则修改不成功
            if (this.state.value.findIndex((record, i) => {
                    return i !== index && record.id === value
                }) > -1) {
                AkMessage.error("变量Id重复:" + record.id);
                return false;
            }
        }

        if (field === "type") {
            let record = this.state.value[index];
            if (record.type !== value) {
                record.value = undefined;
            }
        }

        this.state.value[index][field] = value;
        this.onChange(this.state.value);
        return true;
    }

    renderColumn(key: string, record, index) {
        return <AkDesignerVardefEditCell metadataCategories={this.props.metadataCategories}
                                         listrefs={this.props.listrefs} status={record["status"]} index={index}
                                         value={record[key]}
                                         type={record["type"]}
                                         field={key} editable={record["editable"]}
                                         onChange={this.cellUpdated.bind(this)}/>
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    onChange(value?, todo?) {
        let v = value || this.state.value;

        if (!("value" in this.props)) {
            this.setState({value: v}, todo);
        }

        if (this.props.onChange) {
            this.props.onChange(v);
        }
    }

    constructor(props, context) {
        super(props, context);

        const {intl} = this.props;

        this.state = {
            value: ("value" in props) ? props.value : props.defaultValue
        };
    }

    addUUID(value) {
        value.forEach(v => {
            v.idx = uuid++;
        });
    }

    addVariableClick() {
        let basic = this.state.value;
        let i = basic.length + 1;
        while (basic.findIndex(value => value.id === "field_" + i) > -1) {
            i++;
        }

        let record = {idx: uuid++, id: "field_" + i, name: "field" + i, type: "text"};
        record["editable"] = true;
        basic.push(record);
        //basic = [...basic, record];
        this.onChange(basic);
    }

    render() {
        const {formatMessage} = this.props.intl;
        return <div>
            {this.props.readonly ? undefined :<AkButton onClick={this.addVariableClick.bind(this)}
                                                        style={{marginBottom:10}}>{formatMessage({id: FlowcraftDesignerLocale.NewVariable})}</AkButton>}
            <VariableTable pagination={false} size="small" columns={this.columns} rowKey="idx"
                           dataSource={this.state.value}></VariableTable>
        </div>
    }
}

export default injectIntl(AkDesignerVardefTable);
