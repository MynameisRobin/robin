import * as React from "react";
import {Component} from "react";
import {AkInputNumber} from "../../controls/ak-inputnumber";
import {AkInput} from "../../controls/ak-input";
import {AkSelect} from "../../controls/ak-select";
import {AkDatePicker} from "../../controls/ak-datepicker";
import {injectIntl} from "react-intl";
import {CommonLocale, FlowcraftDesignerLocale} from "../../../locales/localeid";
import {AkRadio, AkRadioGroup} from "../../controls/ak-radio";
import moment = require("moment");

interface AkDesignerVardefEditCellProp extends IntlProps {
    index?: number;
    type?: string;
    value?: string;
    field?: string;
    editable?: boolean;
    status?: "save"|"cancel";
    onChange?: (index, field, value) => boolean;
    listrefs?: ListRef[]; //list refs
    metadataCategories?: MetadataCategoryInfo[];//metadata categories
}

interface AkDesignerVardefEditCellState {
    index?: number;
    value?: string;
    field?: string;
    type?: string;
    editable?: boolean;
}

class AkDesignerVardefEditCell extends Component<AkDesignerVardefEditCellProp,AkDesignerVardefEditCellState> {

    static defaultProps: AkDesignerVardefEditCellProp = {
        editable: false,
        listrefs: [],
        metadataCategories: [],
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: props.index,
            value: props.value,
            field: props.field,
            type: props.type,
            editable: props.editable,
        }
        this.cacheValue = props.value;
    }

    cacheValue;

    componentWillReceiveProps(nextProps: AkDesignerVardefEditCellProp) {

        if ("type" in nextProps && nextProps.type !== this.props.type) {
            this.setState({type: nextProps.type});
        }

        if ("index" in nextProps && nextProps.index !== this.props.index) {
            this.setState({index: nextProps.index});
        }

        if ("editable" in nextProps && nextProps.editable !== this.props.editable) {
            this.setState({editable: nextProps.editable});
            if (nextProps.editable) {
                this.cacheValue = nextProps.value;
            }
        }

        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }

        if (nextProps.status && nextProps.status !== this.props.status) {
            const {index, field, value} = this.state;

            if (nextProps.status === 'save') {
                if (!this.props.onChange(index, field, value)) {
                    this.setState({value: this.cacheValue});
                    this.props.onChange(index, field, this.cacheValue);
                }
            } else if (nextProps.status === 'cancel') {
                this.setState({value: this.cacheValue});
                this.props.onChange(index, field, this.cacheValue);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable || nextState.value !== this.state.value || nextProps.type !== this.state.type || (
                this.state.field === "value" && this.state.type === "list"
            )
    }

    handleChange(value) {
        const {type, field, index} = this.state;
        // console.log(type,field, index, value);

        // if (this.state.type === "datetime") {
        //     if (value) {
        //         value = value.toJSON();
        //     }
        // } else
        if (value) {
            if (this.state.field === "id") {
                //id字段不允许包含空格
                value = value.replace(/\s/g, '');
            } else {
                value = value.trim();
            }
        }
        this.props.onChange(this.state.index, this.state.field, value);
        //this.setState({value: value}); //under control
        // if (this.state.field === "type") {
        //     this.props.onChange(this.state.index, this.state.field, value);
        // }
    }

    /**
     * 获取value的显示，默认是一个input用于输入默认值。对于list类型，用于选择关联的列表类型
     * @param value 值
     * @param field 当前字段（无用，必须是value字段）
     * @param editable 是否可编辑
     * @param type 变量的类型
     * @returns {any}
     */
    getValueDisplay(value, field, editable, type) {
        const {formatMessage} = this.props.intl;
        let result;
        switch (type) {
            case "number":
                result = editable ?
                    <AkInputNumber placeholder={formatMessage({id:CommonLocale.FormValidateDefaultValue})}
                                   style={{width:"100%"}} defaultValue={value}
                                   onChange={v => this.handleChange(v)}></AkInputNumber>:
                    <span>{value}</span>;
                break;
            case "list":
                var options = this.props.listrefs.map(l => {
                    return <AkSelect.Option key={l.id} value={l.id}>{l.name}</AkSelect.Option>;
                });

                result =<AkSelect
                    placeholder={formatMessage({id:FlowcraftDesignerLocale.VariableListPlaceholder})}
                    notFoundContent={formatMessage({id:FlowcraftDesignerLocale.VariableListEmpty})}
                    style={{width:"100%"}} disabled={!editable}
                    value={value}
                    onChange={v=>this.handleChange(v)}>
                    {options}
                </AkSelect>
                break;
            case "date":
                result =<AkDatePicker placeholder={formatMessage({id:CommonLocale.FormValidateDefaultValue})}
                                      disabled={!editable} value={value} onChange={(v,d)=>{this.handleChange(d)}}/>
                break;
            case "metadata":
                var options = this.props.metadataCategories.map(c => {
                    return <AkSelect.Option key={c.CategoryID} value={c.CategoryID}>{c.Name}</AkSelect.Option>;
                });
                result =<AkSelect
                    placeholder={formatMessage({id:FlowcraftDesignerLocale.VariableCategoryPlaceholder})}
                    notFoundContent={formatMessage({id:FlowcraftDesignerLocale.VariableCategoryEmpty})}
                    style={{width:"100%"}} disabled={!editable}
                    value={value}
                    onChange={v=>this.handleChange(v)}>
                    {options}
                </AkSelect>
                break;
            case "boolean":
                var bool = value ? value : "0";
                result =
                    <AkRadioGroup disabled={!editable} value={bool} onChange={v=>this.handleChange(v.target["value"])}>
                        <AkRadio.Button value="1">Yes</AkRadio.Button>
                        <AkRadio.Button value="0">No</AkRadio.Button>
                    </AkRadioGroup>
                break;
            default:
                result = editable ?<AkInput
                        placeholder={formatMessage({id:CommonLocale.FormValidateDefaultValue})}
                        defaultValue={value}
                        onChange={v => this.handleChange(v)}
                    />:<span>{value}</span>;
        }
        return result;
    }


    render() {
        const {value, field, editable, type} = this.state;
        const {formatMessage} = this.props.intl;

        let result;
        switch (field) {
            case "type":
                result =<AkSelect style={{width:"100%"}} disabled={!editable} defaultValue={value}
                                  onChange={v=>this.handleChange(v)}>
                    <AkSelect.Option
                        value="text">{formatMessage({id: FlowcraftDesignerLocale.VariableTypeString})}</AkSelect.Option>
                    <AkSelect.Option
                        value="number">{formatMessage({id: FlowcraftDesignerLocale.VariableTypeNumber})}</AkSelect.Option>
                    <AkSelect.Option
                        value="boolean">{formatMessage({id: FlowcraftDesignerLocale.VariableTypeBoolean})}</AkSelect.Option>
                    <AkSelect.Option
                        value="date">{formatMessage({id: FlowcraftDesignerLocale.VariableTypeDate})}</AkSelect.Option>
                    <AkSelect.Option
                        value="metadata">{formatMessage({id: FlowcraftDesignerLocale.VariableTypeMetadata})}</AkSelect.Option>
                    <AkSelect.Option
                        value="list">{formatMessage({id: FlowcraftDesignerLocale.VariableTypeList})}</AkSelect.Option>
                </AkSelect>;
                break;
            case "value":
                result = this.getValueDisplay(value, field, editable, type);
                break;
            default:
                result = editable ?
                    <AkInput
                        defaultValue={value}
                        onChange={v => this.handleChange(v)}
                    />
                    : <span>{value}</span>;
        }
        return result;
    }
}

export default injectIntl(AkDesignerVardefEditCell);
