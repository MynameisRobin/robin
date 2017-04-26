import * as React from 'react'
import { Component } from 'react'
import { withRouter, Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { AkIcon } from '../../component/controls/ak-icon';
import { AkInput } from '../../component/controls/ak-input';
import { AkButton } from '../../component/controls/ak-button';
import { AkCheckbox } from '../../component/controls/ak-checkbox';
import { Form, Icon, Input, Button } from 'antd';
import { AkFormComponentProps, AkForm } from '../../component/controls/ak-form';

interface LeaveApplicationProps extends IntlProps, AkFormComponentProps {
}

interface LeaveApplicationStates { }

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
let uid = 0;
class LeaveApplication extends Component<LeaveApplicationProps, LeaveApplicationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }
    addCondition() {
        const {form} = this.props;
        const conditions = form.getFieldValue('conditions');
        const nextConditions = conditions.concat({ key: uid++, pre: 'and', left: '', op: '', right: '' });
        form.setFieldsValue({ conditions: nextConditions });
    }

    removeCondition(key) {
        const {form} = this.props;
        const conditions = form.getFieldValue('conditions');
        form.setFieldsValue({ conditions: conditions.filter(k => k.key !== key) });
    }

    handleSubmit(e) {
        e.preventDefault;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue} = this.props.form;
        const conditions = getFieldValue('conditions');
        return <div className="wrapper-z1170" style={{ margin: "100px auto" }}>
            <AkForm onSubmit={this.handleSubmit} className="login-form">
                <AkForm.Item>
                    <h1>Login</h1>
                </AkForm.Item>
                <AkForm.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input addonBefore={<AkIcon type="user" />} placeholder="Username" />
                        )}
                </AkForm.Item>
                <AkForm.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input type="password" addonBefore={<AkIcon type="lock" />} placeholder="Password" />
                        )}
                </AkForm.Item>
                <AkForm.Item>
                    {getFieldDecorator('textarea', {
                        rules: [{ required: true, message: 'Please input your description!' }],
                    })(
                        <Input type="textarea" placeholder="Description" />
                        )}
                </AkForm.Item>
                <AkForm.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <AkCheckbox>记住我</AkCheckbox>
                        )}
                    <a className="login-form-forgot">忘了我？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                     或者<a>现在注册吧!</a>
                </AkForm.Item>
            </AkForm>
        </div>
    }
}

let AkLeaveApplication = injectIntl(AkForm.create()(LeaveApplication), { withRef: true });
export default injectIntl(withRouter(AkLeaveApplication))