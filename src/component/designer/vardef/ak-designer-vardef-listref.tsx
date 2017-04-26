/**
 * 流程变量定义
 */
import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";
import AkDesignerVardefListrefForm from "./ak-designer-vardef-listref-form";
import {AkList} from "../../controls/ak-list";
import {AkButton, AkRow, AkCol} from "../../controls";
import {AkPopconfirm} from "../../controls/ak-popconfirm";
import {AkModal} from "../../controls/ak-modal";
import {FlowcraftDesignerLocale} from "../../../locales/localeid";
import AkDesignerVardefTable from "./ak-designer-vardef-table";

export interface AkDesignerVardefListrefProp extends IntlProps {
    defaultValue?: ListRef[]; //默认值
    value?: ListRef[]; //受控的value
    readonly?: boolean; //
    onChange?: (value : ListRef[]) => any;
    metadataCategories?: MetadataCategoryInfo[];//metadata categories
}

interface AkDesignerVardefListrefState {
    value?: ListRef[];
    listCheckedKeys?: string[]; //listrefs选中的项
    listModalStatus?: "submit"; //list modal的状态
    listModalVisible?: boolean; //list modal的显示
    listModalTitle?: string; //list modal的title
    listModalDefaultValue?: Object; //list modal的默认值
    checkedListItem?: ListRef; //当前选中的list
}

class AkDesignerVardefListref extends Component < AkDesignerVardefListrefProp,
AkDesignerVardefListrefState > {

    static defaultProps : AkDesignerVardefListrefProp = {
        defaultValue: [],
        readonly: false
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: ("value" in props)
                ? props.value
                : props.defaultValue,
            listCheckedKeys: []
        };
    }

    listFormSubmitted(err, values) {
        if (err) {
            this.setState({listModalStatus: undefined});
        } else {
            let value = this.state.value;
            values.fields = [];
            const idx = value.findIndex(v => {
                return v.id === values.oldId
            });
            if (idx > -1) {
                value[idx].id = values.id;
                value[idx].name = values.name;
            } else {
                value.push(values);
            }

            if ("value" in this.props) {
                this.setState({listModalStatus: undefined, listModalVisible: false});
            } else {
                this.setState({listModalStatus: undefined, listModalVisible: false, value: value});
            }

            if (this.props.onChange) {
                this
                    .props
                    .onChange(value);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in this.props && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    submitListForm() {
        this.setState({listModalStatus: "submit"});
    }

    validateId(rule, value, callback, source, options) {
        if (this.state.value.findIndex(v => {
            return v.id === value
        }) > -1) {
            callback(this.props.intl.formatMessage({id: FlowcraftDesignerLocale.VariableListDuplicated}));
        } else {
            callback();
        }
    }

    showAddListModal() {
        this.setState({
            listModalTitle: this
                .props
                .intl
                .formatMessage({id: FlowcraftDesignerLocale.VariableListAdd}),
            listModalVisible: true,
            listModalDefaultValue: {
                id: "",
                name: ""
            }
        });
    }

    showEditListModal() {
        const keys = this.state.listCheckedKeys;
        const item = this
            .state
            .value
            .find(v => {
                return v.id === keys[0]
            });
        this.setState({
            listModalTitle: this
                .props
                .intl
                .formatMessage({id: FlowcraftDesignerLocale.VariableListEdit}),
            listModalVisible: true,
            listModalDefaultValue: {
                id: item.id,
                name: item.name
            }
        });
    }

    renderFooter(props, state) {
        return <div>
            <AkButton
                onClick={this
                .showAddListModal
                .bind(this)}
                type="ghost"
                size="small"
                style={{
                margin: 5
            }}>Add</AkButton>
            <AkButton
                onClick={this
                .showEditListModal
                .bind(this)}
                disabled={state.checkedKeys.length === 0}
                type="ghost"
                size="small"
                style={{
                margin: 5
            }}>Edit</AkButton>
            <AkPopconfirm
                title="Are you sure?"
                onConfirm={this
                .deleteConfirmed
                .bind(this)}>
                <AkButton
                    disabled={state.checkedKeys.length === 0}
                    type="ghost"
                    size="small"
                    style={{
                    margin: 5
                }}>Remove</AkButton>
            </AkPopconfirm>
        </div>
    }

    /**
     * 删除list定义
     */
    deleteConfirmed() {
        const {value, checkedListItem} = this.state;
        if (checkedListItem) {
            value.splice(value.indexOf(checkedListItem), 1);
        }

        if ("value" in this.props) {
            this.setState({checkedListItem: undefined, listCheckedKeys: []});
        } else {
            this.setState({value: value, checkedListItem: undefined, listCheckedKeys: []});
        }

        if (this.props.onChange) {
            this
                .props
                .onChange(value);
        }
    }

    /**
     * list定义的变量集变更事件
     * @param value
     */
    variableTableChanged(value) {
        const {checkedListItem} = this.state;
        if (checkedListItem) {
            checkedListItem.fields = value;
        }

        this.setState({checkedListItem: checkedListItem});

        if (this.props.onChange) {
            this
                .props
                .onChange(this.state.value);
        }
    }

    listCheckChanged(keys) {
        let checkedListItem;
        if (keys.length > 0) {
            checkedListItem = this
                .state
                .value
                .find(v => {
                    return v.id === keys[0]
                });
        }
        this.setState({checkedListItem: checkedListItem, listCheckedKeys: keys});
    }

    listFormClose() {
        this.setState({listModalStatus: undefined, listModalVisible: false});
    }

    getVariableTable(item : ListRef) {
        if (item) {
            return <AkDesignerVardefTable
                metadataCategories={this.props.metadataCategories}
                listrefs={this.state.value}
                value={item.fields}
                onChange={this
                .variableTableChanged
                .bind(this)}></AkDesignerVardefTable>;
        } else {
            return <AkRow
                style={{
                height: "100%"
            }}
                type="flex"
                justify="center"
                align="middle">
                <AkCol>{this
                        .props
                        .intl
                        .formatMessage({id: FlowcraftDesignerLocale.VariableListEmpty})}</AkCol>
            </AkRow>;
        }
    }

    render() {

        const {
            value,
            listCheckedKeys,
            checkedListItem,
            listModalTitle,
            listModalVisible,
            listModalDefaultValue,
            listModalStatus
        } = this.state;

        return <div>
            <AkRow gutter={6}>
                <AkCol span={6}>
                    <AkList
                        showHeader={true}
                        style={{
                        width: "100%"
                    }}
                        render={item => item.title + ":" + item.key}
                        maxSelection={1}
                        dataSource={value.map(v => {
                        return {key: v.id, title: v.name}
                    })}
                        footer={this
                        .renderFooter
                        .bind(this)}
                        checkedKeys={listCheckedKeys}
                        onChange={this
                        .listCheckChanged
                        .bind(this)}></AkList>
                </AkCol>
                <AkCol span={18}>
                    {this.getVariableTable(checkedListItem)}
                </AkCol>
            </AkRow>
            <AkModal
                width={300}
                title={listModalTitle}
                visible={listModalVisible}
                onOk={this
                .submitListForm
                .bind(this)}
                onCancel={this
                .listFormClose
                .bind(this)}>
                <AkDesignerVardefListrefForm
                    defaultValue={listModalDefaultValue}
                    onSubmit={this
                    .listFormSubmitted
                    .bind(this)}
                    status={listModalStatus}
                    idValidator={this
                    .validateId
                    .bind(this)}></AkDesignerVardefListrefForm>
            </AkModal>
        </div>;
    }
}

export default injectIntl(AkDesignerVardefListref);
