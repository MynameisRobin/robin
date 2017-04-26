import * as React from 'react'
import { Component } from 'react'
import { AkRow } from '../../component/controls/ak-row';
import { AkmiiHeader } from '../../component/frame/header';
import { AkCol } from '../../component/controls/ak-col';
import { FormattedMessage } from 'react-intl';
import { AkIcon } from '../../component/controls/ak-icon';
import { AkLayout } from '../../component/controls/ak-layout';
import { AkBackTop } from '../../component/controls/ak-backtop';
import { hashHistory } from 'react-router';

export interface MainContentProps extends IntlProps {
    Header?: string | React.ReactNode;
    Search?: React.ReactNode;
    WithBack?: boolean;
    className?: string;
}
interface MainContentStates { }
export class MainContent extends Component<MainContentProps,
    MainContentStates> {

    renderHeader() {
        let header = this.props.Header;
        if (typeof this.props.Header === "string") {
            header = <AkRow type="flex" align="middle" justify="center">
                {this.renderBack()}
                <AkCol className="ak-header-title">
                    <FormattedMessage id={this.props.Header}></FormattedMessage>
                </AkCol>
            </AkRow>
        }
        return header;
    }
    renderBack() {
        return this.props.WithBack
            ? <AkCol>
                <div
                    className="ak-header-back"
                    onClick={() => {
                        hashHistory.goBack();
                    } }>
                    <AkIcon type="leftarrow"></AkIcon>
                </div>
            </AkCol>
            : null
    }
    renderLayout() {
        // render() {
        return <AkLayout>
            <AkLayout.Header>
                <AkRow type="flex" align="middle" justify="space-between">
                    {this.renderHeader()}
                    <AkCol>
                        {this.props.Search}
                    </AkCol>
                </AkRow>
            </AkLayout.Header>
            <AkLayout.Content>
                {this.props.children}
            </AkLayout.Content>
        </AkLayout>
    }
    render() {
        return <AkRow className={this.props.className}>
            <AkRow className="ak-header">
                <AkRow type="flex" align="middle" justify="space-between">
                    {this.renderHeader()}
                    <AkCol>
                        {this.props.Search}
                    </AkCol>
                </AkRow>
            </AkRow>
            <AkRow className="ak-main-content-body">
                {this.props.children}
            </AkRow>
        </AkRow>
    }
}
class MainContentStyle { }
