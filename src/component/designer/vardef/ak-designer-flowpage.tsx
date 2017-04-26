import * as React from "react";
import {Component} from "react";
import {injectIntl, FormattedMessage} from "react-intl";
import {AkButton} from '../../controls/ak-button';
import {AkRow} from '../../controls/ak-row';
import {AkCol} from '../../controls/ak-col';
import {ProcModelItemPageLocale} from '../../../locales/localeid';
import {AkInput} from '../../controls/ak-input';
import {AkModal} from "../../controls/ak-modal";

interface AkDesignerFlowPageProp extends IntlProps {
    value?: FlowPage;
    onChange?: (value : FlowPage) => any;
}

interface AkDesignerFlowPageState {
    flowPage?: FlowPage; //流程页面对象
}

class AkDesignerFlowPage extends Component < AkDesignerFlowPageProp,
AkDesignerFlowPageState > {

    constructor(props, context) {
        super(props, context);
        this.state = {
            flowPage: {}
        }
    }

    onChange() {
        let obj = this.state.flowPage;
        if (this.props.onChange) {
            this
                .props
                .onChange(obj);
        }
    }

    render() {
        let topThis = this;
        let format = this.props.intl.formatMessage;

        return <AkRow type="flex" justify="space-around" className="mb20">
            <AkCol span={4}>
                <FormattedMessage id={ProcModelItemPageLocale.PropsPageName}></FormattedMessage>
            </AkCol>
            <AkCol span={20}>
                <AkInput
                    onChange={(value) => {
                    topThis.state.flowPage.pageName = value;
                    topThis.onChange();
                }}></AkInput>
            </AkCol>
            <AkCol span={4}>
                <FormattedMessage id={ProcModelItemPageLocale.PropsPageApply}></FormattedMessage>
            </AkCol>
            <AkCol span={20}>
                <AkInput
                    onChange={(value) => {
                    this.state.flowPage.applyPage = value;
                    topThis.onChange();
                }}></AkInput>
            </AkCol>
            <AkCol span={4}>
                <FormattedMessage id={ProcModelItemPageLocale.PropsPageApproval}></FormattedMessage>
            </AkCol>
            <AkCol span={20}>
                <AkInput
                    onChange={(value) => {
                    this.state.flowPage.approvalPage = value;
                    topThis.onChange();
                }}></AkInput>
            </AkCol>
        </AkRow>
    }
}

export default injectIntl < typeof AkDesignerFlowPage > (AkDesignerFlowPage);
