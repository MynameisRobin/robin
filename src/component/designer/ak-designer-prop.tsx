import * as React from 'react'
import {Component} from 'react'
import {injectIntl} from 'react-intl';
import {AkCard} from '../controls/ak-card';
import {AkAffix} from '../controls/ak-affix';
import {AkIcon} from '../controls/ak-icon';
import {AkInput} from '../controls/ak-input';
import {AkStencilPropItem} from './stencil/stencilpropitem';
import {StencilBaseView} from './util/common';
import { FlowcraftDesignerLocale } from '../../locales/localeid';

interface AkDesignerPropProps extends IntlProps,
DesignerBaseProps {
    /**当前选中的Cell */
    SelectCellView: joint.dia.CellView;
    Close: () => void
}
interface AkDesignerPropStates {}
export class AkDesignerProp extends Component < AkDesignerPropProps,
AkDesignerPropStates > {

    renderSetting() {
        let model = this.props.SelectCellView.model as StencilBaseView;
        model.Properties.properties = Object.assign({}, model.Properties.properties);
        return (model.DataSetting).map((entry, index) => {
            if (entry.notShow) {
                return null;
            }
            entry.value = model.Properties.properties[entry.key];

            return <AkStencilPropItem key={model.id+index} Item={entry} MainData={this.props.MainData}></AkStencilPropItem>
        })
    }
    render() {
        let close = <AkIcon type="close" onClick={() => this.props.Close()}></AkIcon>;
        return <div style={AkDesignerPropStyle.Wapper}>
            <AkAffix offsetTop={60}>
                <AkCard title={this.props.intl.formatMessage({id:FlowcraftDesignerLocale.PropSettingTitle})} extra={close}>
                    {this.renderSetting()}
                </AkCard>
            </AkAffix>
        </div>
    }
}
class AkDesignerPropStyle {
    static Wapper : React.CSSProperties = {
        position: "absolute",
        right: 40,
        top: 60,
        width: 400
    }
}
export default injectIntl  (AkDesignerProp);
