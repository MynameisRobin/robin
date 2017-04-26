import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";
import {AkForm, AkFormComponentProps} from "../../controls/ak-form";
import {FlowcraftDesignerLocale, CommonLocale} from "../../../locales/localeid";
import {AkInput} from "../../controls/ak-input";

export interface AkDesignerVardefListrefFormProp extends IntlProps,AkFormComponentProps {
    idValidator?: (rule, value, callback, source, options) => void; //验证id是否合法
    status?: "submit"; //更新提交状态
    onSubmit?: (err, values) => void; //更新验证
    defaultValue?: Object; //默认的值
}

interface AkDesignerVardefListrefFormState {

}

class AkDesignerVardefListrefForm extends Component<AkDesignerVardefListrefFormProp,AkDesignerVardefListrefFormState> {

    static defaultProps: AkDesignerVardefListrefFormProp = {}

    constructor(props, context) {
        super(props, context);
    }

    oldId: string;

    componentWillMount() {
        if (this.props.defaultValue) {
            this.oldId = this.props.defaultValue["id"];
            this.props.form.setFieldsValue(this.props.defaultValue);
        }
    }

    componentWillReceiveProps(nextProps) {
        if ("status" in nextProps && nextProps.status != this.props.status) {
            if (nextProps.status === "submit") {
                this.props.form.validateFields((err, values) => {
                    if (this.props.onSubmit) {
                        values.oldId = this.oldId;
                        this.props.onSubmit(err, values);
                    }
                });
            }
        }

        if ("defaultValue" in nextProps && nextProps.defaultValue !== this.props.defaultValue) {
            this.oldId = nextProps.defaultValue["id"];
            this.props.form.setFieldsValue(nextProps.defaultValue);
            //console.log("nextProps.defaultValue",nextProps.defaultValue, this.oldId);
        }
    }

    idValidator(rule, value, callback, source, options) {
        if (this.oldId && value === this.oldId) {
            callback();
        }

        if (this.props.idValidator) {
            this.props.idValidator(rule, value, callback, source, options);
        }
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {getFieldDecorator} = this.props.form;

        return <AkForm>
            <AkForm.Item label={formatMessage({id:FlowcraftDesignerLocale.VariableListRefId})} labelCol={{span:5}}
                         wrapperCol={{span:16}}>
                {getFieldDecorator(
                    'id', {
                        rules: [{
                            required: true,
                            message: formatMessage({id: CommonLocale.FormValidatePleaseInput}) + formatMessage({id: FlowcraftDesignerLocale.VariableListRefId})
                        },
                            {validator: this.idValidator.bind(this)}]
                    }
                )(<AkInput/>)}
            </AkForm.Item>

            <AkForm.Item label={formatMessage({id:FlowcraftDesignerLocale.VariableListRefName})} labelCol={{span:5}}
                         wrapperCol={{span:16}}>
                {getFieldDecorator(
                    'name', {
                        rules: [{
                            required: true,
                            message: formatMessage({id: CommonLocale.FormValidatePleaseInput}) + formatMessage({id: FlowcraftDesignerLocale.VariableListRefName})
                        }]
                    }
                )(<AkInput/>)}
            </AkForm.Item>
        </AkForm>
    }
}

export default injectIntl (AkForm.create()(AkDesignerVardefListrefForm));
