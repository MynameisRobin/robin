import * as React from 'react'
import {Component} from 'react'
import {AkButton} from '../controls/ak-button';
import {injectIntl} from 'react-intl';
import {AkAffix} from '../controls/ak-affix';
import {EventProxy} from './util/eventproxy';

export interface AkDesignerVerticalToolProps extends IntlProps,
DesignerBaseProps {}
interface AkDesignerVerticalToolStates {}
export class AkDesignerVerticalTool extends Component < AkDesignerVerticalToolProps,
AkDesignerVerticalToolStates > {

    graphScale = 1;
    paperScale(sx, sy) {
        this
            .props
            .MainPaper
            .scale(sx, sy);
    };
    zoomOut() {
        this.graphScale -= 0.25;
        if (this.graphScale < 0.25) {
            this.graphScale += 0.25;
            return;
        }

        this.paperScale(this.graphScale, this.graphScale);
        EventProxy.trigger("update_view");
    }
    zoomIn() {
        this.graphScale += 0.25;

        if (this.graphScale > 2) {
            this.graphScale -= 0.25;
            return;
        }
        this.paperScale(this.graphScale, this.graphScale);
        EventProxy.trigger("update_view");
    }
    reset() {
        this.graphScale = 1;
        this.paperScale(this.graphScale, this.graphScale);
        EventProxy.trigger("update_view");
    }
    render() {
        return <div
            style={{
            position: "absolute",
            bottom: 40,
            left: 40
        }}>
            <AkAffix
                style={{
                position: "absolute"
            }}
                offsetBottom={40}>
                <AkButton.Group className="ant-btn-group-vertical">
                    <AkButton icon="plus" onClick={() => this.zoomIn()}></AkButton>
                    <AkButton icon="minus" onClick={() => this.zoomOut()}></AkButton>
                </AkButton.Group>

                <AkButton
                    style={AkDesignerVerticalToolStyle.FullScreen}
                    icon="quanping"
                    onClick={() => {
                    this.reset()
                }}></AkButton>
            </AkAffix>
        </div>;
    }
}
class AkDesignerVerticalToolStyle {
    static FullScreen : React.CSSProperties = {
        display: "block",
        marginTop: "20px"
    }
}
export default injectIntl  (AkDesignerVerticalTool)
