import * as React from 'react'
import {Component} from 'react'
import RequistionContent from '../components/requisitioncontent';
import {AkCol} from '../../component/controls/ak-col';
import {AkInput} from '../../component/controls/ak-input';
import {FormattedMessage} from 'react-intl';
import {AkSelect} from '../../component/controls/ak-select';
import {DailyReimburseApplicationPageLocale} from '../../locales/localeid';
import {AkRow} from '../../component/controls/ak-row';

interface LeaveRequestProps {}
interface LeaveRequestStates {
    variables?: any;
}
class LeaveRequest extends Component < LeaveRequestProps,
LeaveRequestStates > {
    constructor(props, context) {
        super(props, context);
        this.state = {
            variables: {}
        }
    }

    onSave() {
        {};
        this.setState({variables: {}})
        return false;
    }
    onCancel() {}
    onSubmit() {}
    renderReimburse() {
        return <AkRow type="flex" justify="space-around" gutter={6}>
            <AkCol span={3}>
                <FormattedMessage id={DailyReimburseApplicationPageLocale.PropsProjectName}></FormattedMessage>
                <span className="ant-form-item-required"></span>
            </AkCol>
            < AkCol span={9}>
                <AkSelect
                    onChange={value => {

                    this.state.variables.projectName = value + "";
                    this.setState({variables:this.state.variables})
                }}>
                    <AkSelect.OptGroup label="Manager">
                        <AkSelect.Option value="jack">
                            jack
                        </AkSelect.Option>
                        <AkSelect.Option value="lucy">
                            lucy
                        </AkSelect.Option>
                    </AkSelect.OptGroup>
                    <AkSelect.OptGroup label="Engineer">
                        <AkSelect.Option value="jackEngineer">
                            jackEngineer
                        </AkSelect.Option>
                        <AkSelect.Option value="lucyEngineer">
                            lucyEngineer
                        </AkSelect.Option>
                    </AkSelect.OptGroup>
                </AkSelect>
            </AkCol>
            <AkCol span={3}>
                <FormattedMessage id={DailyReimburseApplicationPageLocale.PropsAmount}></FormattedMessage >
                <span className="ant-form-item-required"></span>
            </AkCol>
            <AkCol span={9}>
                <AkInput
                    defaultValue={this.state.variables.totalAmount}
                    onChange={(value) => {
                    this.state.variables.totalAmount = value;
                    this.setState({variables:this.state.variables})
                }}></AkInput >
            </AkCol>
            < AkCol span={24}>
                {/*{this.renderDetail()}*/}
            </AkCol>
            <AkCol span={24}>
                {/*<AkButton type="dashed" onClick={this.addReimburseDetail} icon="plus"></AkButton >*/}
            </AkCol>
        </AkRow>
    }

    render() {
        return <RequistionContent
            variables={this.state.variables}>
            {this.renderReimburse()}
            </RequistionContent>
    }
}

class LeaveRequestStyle {}

export default LeaveRequest;
