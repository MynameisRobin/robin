///<reference path="../../../node_modules/@types/react-intl/index.d.ts"/>
import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";
import {AkForm, AkFormComponentProps} from "../controls/ak-form";
import {AkButton} from "../controls/ak-button";
import {AkIcon} from "../controls/ak-icon";
import {AkSelect} from "../controls/ak-select";
import AkDesignerExpr from "./expr/ak-designer-expr";
import {AkRow} from "../controls/ak-row";
import {AkCol} from "../controls/ak-col";
import {AkTooltip} from "../controls/ak-tooltip";
import {CommonLocale, FlowcraftDesignerLocale} from "../../locales/localeid";
import {AkModal} from "../controls/ak-modal";

export interface AkDesignerConditionProp extends IntlProps,AkFormComponentProps {
    defaultValue?: AkProcessCondition[]; //默认值
    value?: AkProcessCondition[]; //受控的value
    readonly?: boolean; //
    flowContext?: ProcessProperties;
}

export interface AkDesignerConditionState {
    //value?: AkProcessCondition[];
}

let uuid = 0;
class AkDesignerCondition extends Component<AkDesignerConditionProp,AkDesignerConditionState> {
    static defaultProps: AkDesignerConditionProp = {
        defaultValue: []
    }

    constructor(props, context) {
        super(props, context);

        //props.form.getFieldDecorator('conditions', {initialValue: props.value ? props.value : props.defaultValue});

        //this.state = {value: this.parseValue(props.value ? props.value : props.defaultValue)};
    }

    /**
     * 为输入的condition增加唯一key
     * @param value
     */
    parseValue(value) {
        return value.map(v => {
            if (!("key" in v)) {
                v.key = uuid++;
            }
            return v;
        });
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.props.form.setFieldsValue({conditions: this.parseValue(nextProps.value)});
        }
    }

    onLeftExprChange(value: string, condition: AkProcessCondition) {
        condition.left = value;
        //this.setState({value: this.state.value});
    }

    onRightExprChange(value: string, condition: AkProcessCondition) {
        condition.right = value;
        //this.setState({value: this.state.value});
    }

    onPreChange(value, condition: AkProcessCondition) {
        condition.pre = value;
        //this.setState({value: this.state.value});
    }

    onOpChange(value, condition: AkProcessCondition) {
        condition.op = value;
        //this.setState({value:this.state.value});
    }

    addCondition() {
        const {form} = this.props;
        const conditions = form.getFieldValue('conditions');
        const nextConditions = conditions.concat({key: uuid++, pre: 'and', left: '', op: '', right: ''});
        form.setFieldsValue({conditions: nextConditions});
    }

    removeCondition(key) {
        const {form} = this.props;
        const conditions = form.getFieldValue('conditions');
        form.setFieldsValue({conditions: conditions.filter(k => k.key !== key)});
    }

    saveCondition() {
        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {formatMessage} = this.props.intl;
        const {readonly, flowContext} = this.props;

        getFieldDecorator('conditions', {initialValue: this.parseValue(this.props.value ? this.props.value : this.props.defaultValue)});
        const conditions = getFieldValue('conditions');

        const formItems = conditions.map((v, index) => {
            return <AkRow key={index} gutter={6}>
                <AkCol span={3}>
                    <AkForm.Item>
                        {getFieldDecorator(v.key + '.pre', {initialValue: v.pre})(
                            index === 0 ? <span/> :
                                <AkSelect disabled={readonly} onChange={value=>this.onPreChange(value, v)}>
                                    <AkSelect.Option
                                        value="and">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorAnd})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="or">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorOr})}</AkSelect.Option>
                                </AkSelect>
                        )}
                    </AkForm.Item>
                </AkCol>
                <AkCol span={8}>
                    <AkForm.Item>
                        {getFieldDecorator(v.key + '.left', {
                            initialValue: v.left,
                            rules: [{
                                required: true,
                                message: formatMessage({id: FlowcraftDesignerLocale.ConditionExprRequired})
                            }]
                        })(
                            <AkDesignerExpr flowContext={flowContext} readonly={readonly} multilines={1}
                                            onChange={value=>this.onLeftExprChange(value, v)}/>
                        )}
                    </AkForm.Item>
                </AkCol>

                <AkCol span={4}>
                    <AkForm.Item>
                        {getFieldDecorator(v.key + '.op', {
                            initialValue: v.op,
                            rules: [{
                                required: true,
                                message: formatMessage({id: FlowcraftDesignerLocale.ConditionOpRequired})
                            }]
                        })(
                            <AkSelect disabled={readonly} onChange={value=>this.onOpChange(value, v)}>
                                <AkSelect.OptGroup
                                    label={formatMessage({id:FlowcraftDesignerLocale.ExprOperatorGeneral})}>
                                    <AkSelect.Option
                                        value="isNull">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorIsNull})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="isNotNull">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorIsNotNull})}</AkSelect.Option>
                                </AkSelect.OptGroup>
                                <AkSelect.OptGroup
                                    label={formatMessage({id:FlowcraftDesignerLocale.ExprOperatorString})}>
                                    <AkSelect.Option
                                        value="s.=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorEqual})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="s.!=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorNotEqual})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="startWith">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorStartWith})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="endWith">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorEndWith})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="contains">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorContains})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="notContains">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorNotContains})}</AkSelect.Option>
                                </AkSelect.OptGroup>
                                <AkSelect.OptGroup
                                    label={formatMessage({id:FlowcraftDesignerLocale.ExprOperatorNumber})}>
                                    <AkSelect.Option
                                        value="n.=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorEqual})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="n.!=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorNotEqual})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="n.>">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorGreater})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="n.>=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorGreaterEq})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="n.<">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorLesser})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="n.<=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorLesserEq})}</AkSelect.Option>
                                </AkSelect.OptGroup>
                                <AkSelect.OptGroup
                                    label={formatMessage({id:FlowcraftDesignerLocale.ExprOperatorDatetime})}>
                                    <AkSelect.Option
                                        value="dt.=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorEqual})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="dt.!=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorNotEqual})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="dt.>">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorGreater})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="dt.>=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorGreaterEq})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="dt.<">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorLesser})}</AkSelect.Option>
                                    <AkSelect.Option
                                        value="dt.<=">{formatMessage({id: FlowcraftDesignerLocale.ExprOperatorLesserEq})}</AkSelect.Option>
                                </AkSelect.OptGroup>
                            </AkSelect>
                        )}
                    </AkForm.Item>
                </AkCol>

                <AkCol span={8}>
                    <AkForm.Item>
                        {getFieldDecorator(v.key + '.right', {initialValue: v.right})(
                            <AkDesignerExpr flowContext={flowContext} readonly={readonly} multilines={1}
                                            onChange={value=>this.onRightExprChange(value, v)}/>
                        )}
                    </AkForm.Item>
                </AkCol>

                <AkCol span={1}>
                    <AkTooltip placement="topRight" arrowPointAtCenter title={formatMessage({id:CommonLocale.Delete})}>
                        <AkIcon className="ak-input-icon" type="delete" onClick={()=>this.removeCondition(v.key)}/>
                    </AkTooltip>
                </AkCol>
            </AkRow>
        });

        return <AkForm>
            {formItems}
            {readonly ? undefined :
                <AkButton type="dashed" onClick={this.addCondition.bind(this)}>
                    {formatMessage({id: FlowcraftDesignerLocale.ConditionAdd})}
                </AkButton>}
        </AkForm>
    }
}

export interface AkDesignerConditionDialogProp extends IntlProps {
    /** 对话框是否可见*/
    visible?: boolean;
    /** 确定按钮 loading*/
    confirmLoading?: boolean;
    /** 标题*/
    title?: React.ReactNode | string;
    /** 是否显示右上角的关闭按钮*/
    closable?: boolean;
    /** 点击确定回调*/
    onOk?: (value: AkProcessCondition[]) => void;
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
    onCancel?: (e: React.MouseEvent < any >) => void;
    /** 宽度*/
    width?: string | number;
    /** 底部内容*/
    footer?: React.ReactNode;
    /** 确认按钮文字*/
    okText?: string;
    /** 取消按钮文字*/
    cancelText?: string;
    /** 点击蒙层是否允许关闭*/
    maskClosable?: boolean;
    style?: React.CSSProperties;
    wrapClassName?: string;
    maskTransitionName?: string;
    transitionName?: string;
    className?: string;

    defaultValue?: AkProcessCondition[]; //默认值
    value?: AkProcessCondition[]; //受控的value
    readonly?: boolean;
    flowContext?: ProcessProperties;
}

export interface AkDesignerConditionDialogState {
    value?: AkProcessCondition[];
    tempValue?: AkProcessCondition[];
}

class AkDesignerConditionDialog extends Component<AkDesignerConditionDialogProp,AkDesignerConditionDialogState> {
    static defaultProps={
        defaultValue:[]
    }
    constructor(props, context) {
        super(props, context);
        let value = props.value ? props.value : props.defaultValue;
        this.state = {value: value, tempValue: value.slice(0)};
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value, tempValue: nextProps.value.slice(0)});
        }
    }

    form; //存储condition form

    saveFormRef(form) {
        this.form = form;
    }

    onOk() {
        this.form.getWrappedInstance().validateFields((err, values) => {
            if (err) {
                return;
            }
            let tempValue = values.conditions;
            let value = tempValue.slice(0);
            this.setState({value: value, tempValue: tempValue});
            this.props.onOk(value);
        });
    }

    onCancel(e) {
        this.setState({tempValue: this.state.value.slice(0)});
        this.props.onCancel && this.props.onCancel(e);
    }

    render() {
        const {flowContext, intl, width, title, okText, defaultValue, value, readonly, onOk, onCancel, ...others} = this.props;

        return <AkModal width={width?width:800}
                        title={title?title:intl.formatMessage({id:FlowcraftDesignerLocale.ConditionEditor})}
                        okText={okText?okText:intl.formatMessage({id:CommonLocale.Save})}
                        onOk={this.onOk.bind(this)} onCancel={this.onCancel.bind(this)} {...others}>
            <AkDesignerConditionForm flowContext={flowContext} ref={this.saveFormRef.bind(this)} readonly={readonly}
                                     value={this.state.tempValue}></AkDesignerConditionForm>
        </AkModal>
    }
}

let AkDesignerConditionForm = injectIntl(AkForm.create()(AkDesignerCondition), {withRef: true});

export default injectIntl(AkDesignerConditionDialog);

//export default injectIntl(AkForm.create()(AkDesignerCondition));
