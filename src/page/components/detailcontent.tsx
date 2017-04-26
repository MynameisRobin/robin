import * as React from "react";
import {Component} from "react";
import {AkFormComponentProps, AkForm} from "../../component/controls/ak-form";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router";
import {AkRow} from "../../component/controls/ak-row";
import {AkCol} from "../../component/controls/ak-col";

interface DetailColumn {
    title?: React.ReactNode;
    dataIndex?: string;
    render?: (text : any) => void;
}

interface DetailContentProps extends IntlProps,
RouterProps,
AkFormComponentProps {
    columns?: DetailColumn[];
}
interface DetailContentStates {}
export class DetailContent extends Component < DetailContentProps,
DetailContentStates > {
    renderDetail() {
        return this.props.columns
            ? this
                .props
                .columns
                .map((entry, index) => {
                    return <AkCol >
                        <AkForm.Item></AkForm.Item>
                    </AkCol>
                })
            : null;
    }
    render() {
        return <AkForm inline>
            <AkRow></AkRow>
        </AkForm>
    }
}
class DetailContentStyle {}
export default injectIntl (withRouter(AkForm.create()(DetailContent)))
