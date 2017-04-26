import * as React from 'react'
import {Component} from 'react'
import {AkInput} from '../../controls/ak-input';
import {AkSelect} from '../../controls/ak-select';
import {AkSwitch} from '../../controls/ak-switch';
import {AkRow} from '../../controls/ak-row';
import {AkCol} from '../../controls/ak-col';
import {AkInputNumber} from '../../controls/ak-inputnumber';
import {AkUser} from '../../../api/common/identity';
import {AkDatePicker} from '../../controls/ak-datepicker';
import {AkButton} from '../../controls/ak-button';
import AkDesignerConditionDialog from "../ak-designer-condition";
import AkDesignerExpr from "../expr/ak-designer-expr";
import AkDesignerTaskAssignDialog from "../taskassign/ak-designer-taskassign-dialog";
import {FormattedMessage} from 'react-intl';
import {FlowcraftDesignerLocale} from '../../../locales/localeid';

interface AkStencilPropItemProps extends DesignerBaseProps {
    /**属性 */
    Item : StencilProp;
}
interface AkStencilPropItemStates {
    /**
     * 条件框显示隐藏
     *
     * @type {boolean}
     * @memberOf AkStencilPropItemStates
     */
    conditionDialogVisible?: boolean;
    /**
     * 指派人显示隐藏
     *
     * @type {boolean}
     * @memberOf AkStencilPropItemStates
     */
    taskassignVisible?: boolean;
}
export class AkStencilPropItem extends Component < AkStencilPropItemProps,
AkStencilPropItemStates > {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    renderProp() {
        const {Item, MainData} = this.props;
        switch (Item.valueType) {
            case "input":
                return <AkInput
                    disabled={Item.readonly}
                    defaultValue={Item.value}
                    onChange={(value) => {
                    Item.onChange
                        ? this
                            .props
                            .Item
                            .onChange(value)
                        : null;
                }}></AkInput>
            case "text":
                return <AkInput
                    disabled={Item.readonly}
                    defaultValue={Item.value}
                    type="textarea"
                    onChange={(value) => {
                    Item.onChange
                        ? this
                            .props
                            .Item
                            .onChange(value)
                        : null;
                }}></AkInput>
            case "boolean":
                return <AkSwitch
                    disabled={Item.readonly}
                    checked={Item.value}
                    onChange={(value) => {
                    Item.onChange
                        ? this
                            .props
                            .Item
                            .onChange(value)
                        : null;
                }}></AkSwitch>
            case "select":
                return <AkSelect
                    disabled={Item.readonly}
                    defaultValue={Item.value}
                    onChange={(value) => {
                    Item.onChange
                        ? this
                            .props
                            .Item
                            .onChange(value)
                        : null;
                }}></AkSelect>
            case "number":
                return <AkInputNumber
                    disabled={Item.readonly}
                    defaultValue={Item.value}
                    onChange={(value) => {
                    Item.onChange
                        ? this
                            .props
                            .Item
                            .onChange(value)
                        : null;
                }}></AkInputNumber>
            case "datetime":
                return <AkDatePicker
                    disabled={Item.readonly}
                    defaultValue={Item.value}
                    onChange={(value, value1) => {
                    Item.onChange
                        ? this
                            .props
                            .Item
                            .onChange(value)
                        : null;
                }}></AkDatePicker>
            case "userpicker":
                return <div>
                    <AkButton onClick={() => this.setState({taskassignVisible: true})}>
                        <FormattedMessage id={FlowcraftDesignerLocale.AssignEditor}></FormattedMessage>
                    </AkButton>
                    <AkDesignerTaskAssignDialog
                        flowContext={MainData}
                        defaultValue={Item.value}
                        onOk={(value) => {
                        Item.onChange
                            ? this
                                .props
                                .Item
                                .onChange(value)
                            : null;
                        this.setState({taskassignVisible: false});
                    }}
                        onCancel={() => {
                        this.setState({taskassignVisible: false})
                    }}
                        visible={this.state.taskassignVisible}></AkDesignerTaskAssignDialog>
                </div>;
            case "userpickermulti":
                return <div>
                    <AkButton onClick={() => this.setState({taskassignVisible: true})}>
                        <FormattedMessage id={FlowcraftDesignerLocale.AssignEditor}></FormattedMessage>
                    </AkButton>
                    <AkDesignerTaskAssignDialog
                        flowContext={MainData}
                        defaultValue={Item.value}
                        multiple={true}
                        onOk={(value) => {
                        Item.onChange
                            ? this
                                .props
                                .Item
                                .onChange(value)
                            : null;
                        this.setState({taskassignVisible: false});
                    }}
                        onCancel={() => {
                        this.setState({taskassignVisible: false})
                    }}
                        visible={this.state.taskassignVisible}></AkDesignerTaskAssignDialog>
                </div>;
            case "condition":
                return <div>
                    <AkButton onClick={() => this.setState({conditionDialogVisible: true})}>Conditions Setting</AkButton>
                    <AkDesignerConditionDialog
                        flowContext={MainData}
                        defaultValue={Item.value}
                        onOk={(value) => {
                        Item.onChange
                            ? this
                                .props
                                .Item
                                .onChange(value)
                            : null;
                        this.setState({conditionDialogVisible: false})
                    }}
                        onCancel={() => {
                        this.setState({conditionDialogVisible: false})
                    }}
                        visible={this.state.conditionDialogVisible}></AkDesignerConditionDialog>
                </div>;
            case "expr":
                return <AkDesignerExpr
                    flowContext={MainData}
                    singleLine={true}
                    multilines={1}
                    defaultValue={Item.value}
                    onChange={(value) => {
                    Item.onChange
                        ? this
                            .props
                            .Item
                            .onChange(value)
                        : null;
                }}></AkDesignerExpr>
            case "exprtext":
                return <AkDesignerExpr
                    flowContext={MainData}
                    singleLine={false}
                    multilines={4}
                    defaultValue={Item.value}
                    onChange={(value) => {
                    Item.onChange
                        ? this
                            .props
                            .Item
                            .onChange(value)
                        : null;
                }}></AkDesignerExpr>
            default:
                return null;
        }
    }
    render() {
        let isRequire = this.props.Item.isRequire
            ? <span className="ant-form-item-required"></span>
            : null;
        return <AkRow type="flex" justify="start" align="middle" className="mb10">
            <AkCol span={6}>{this.props.Item.label}{isRequire}</AkCol>
            <AkCol span={18}>
                {this.renderProp()}
            </AkCol>
        </AkRow>;
    }
}
class AkStencilPropItemStyle {}
