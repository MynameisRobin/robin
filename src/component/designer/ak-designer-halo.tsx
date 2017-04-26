import * as React from 'react'
import {Component} from 'react'
import * as _ from 'lodash';
import {injectIntl} from 'react-intl';
import {AkButton} from '../controls/ak-button';
import AkDesignerProp from './ak-designer-prop';
import {FlowLink} from './stencil/items/flowlink';
import {StencilBaseView, StencilItemType} from './util/common';

interface AkDesignerHaloProps extends IntlProps,
DesignerBaseProps {
    /**当前选中的Cell */
    SelectCellView: joint.dia.CellView;
    /** 移除*/
    OnRemove: () => void;
    /**设置 */
    OnSetting: () => void;
}
interface AkDesignerHaloStates {
    isStopStencil?: boolean;
}
class AkDesignerHalo extends Component < AkDesignerHaloProps,
AkDesignerHaloStates > {

    BoxStyle?: React.CSSProperties;

    _linkView : joint.dia.LinkView;

    constructor(props, context) {
        super(props, context);
        const {model} = this.props.SelectCellView;
        this.state = {
            isStopStencil: model.attributes.type == StencilItemType[StencilItemType.StopEvent] || model.attributes.type == StencilItemType[StencilItemType.StopEvent]
        }
    }
    componentDidMount() {
        this.updateStyle();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            const {model} = nextProps.SelectCellView;
            this.setState({
                isStopStencil: model.attributes.type == StencilItemType[StencilItemType.StopEvent] || model.attributes.type == StencilItemType[StencilItemType.StopEvent]
            })
        }
    }

    /**更新工具条的位置 */
    updateStyle() {
        if (this.props.SelectCellView && !this.props.SelectCellView.model.isLink()) {
            let bBox = this
                .props
                .SelectCellView
                .getBBox();
            this.BoxStyle = Object.assign({}, AkDesignerHaloStyle.haloWarrpper, {
                top: bBox.y + bBox.height + 2,
                left: bBox.x - (30 * (this.state.isStopStencil
                    ? 2
                    : 3) - bBox.width) / 2
            });
        }
    }
    /**开始连线 */
    startLinking(evt) {
        let topThis = this;
        let model = this.props.SelectCellView.model as StencilBaseView;

        var link = new FlowLink(null, {format: this.props.intl.formatMessage});
        link.on("remove", function (cell : FlowLink) {
            let target = cell.getTargetElement()as StencilBaseView;
            let source = cell.getSourceElement()as StencilBaseView;
            if (target) {
                _
                    .remove(target.Properties.incoming, function (a) {
                        return a.resourceid == cell.id;
                    })
                cell.Properties.target = null;
            }
            if (source) {
                _
                    .remove(source.Properties.outgoing, function (a) {
                        return a.resourceid == cell.id;
                    })
                cell.Properties.source = null;
            }
        });
        var paperPoint = this
            .props
            .MainPaper
            .snapToGrid({x: evt.clientX, y: evt.clientY})
        link.set({
            source: {
                id: model.id
            },
            target: {
                x: paperPoint.x,
                y: paperPoint.y
            }
        });
        link.Properties.source = {
            resourceid: this.props.SelectCellView.model.id
        }
        model.Properties.outgoing = Object.assign([], model.Properties.outgoing);
        model
            .Properties
            .outgoing
            .push({resourceid: link.id});
        this
            .props
            .MainGraph
            .addCell(link);
        this._linkView = this
            .props
            .MainPaper
            .findViewByModel(link)as joint
            .dia
            .LinkView;
        this
            ._linkView
            .startArrowheadMove('target', {whenNotAllowed: 'remove'});
        $(document).on({
            'mousemove.joint_link': this.doLink,
            'mouseup.joint_link': this.stopLinking
        }, {
            view: this._linkView,
            paper: this.props.MainPaper
        });
    }
    /**连线过程 */
    doLink(evt) {
        if (evt.data.view) {
            var p = evt
                .data
                .paper
                .snapToGrid({x: evt.clientX, y: evt.clientY});
            evt
                .data
                .view
                .pointermove(evt, p.x, p.y);
        }
    }
    /**停止连线 */
    stopLinking(evt) {
        if (evt.data.view) {
            evt
                .data
                .view
                .pointerup(evt);
            evt.data.view = null;
        }
        $(document).off('.joint_link');
    }
    /**移除图形 */
    removeCell() {
        let topThis = this;
        var models = this
            .props
            .MainGraph
            .getCells();
        let sourceBox = topThis
            .props
            .SelectCellView
            .getBBox();

        models.map(function (entry) {
            if (entry.isLink()) {
                let link = entry as FlowLink;
                if (link.attributes.source.id === topThis.props.SelectCellView.model.id) {
                    link.set({
                        source: {
                            x: sourceBox.x + sourceBox.width / 2,
                            y: sourceBox.y + sourceBox.height / 2
                        }
                    });
                    link.Properties.source = null;
                }
                if (link.attributes.target.id === topThis.props.SelectCellView.model.id) {
                    link.set({
                        target: {
                            x: sourceBox.x + sourceBox.width / 2,
                            y: sourceBox.y + sourceBox.height / 2
                        }
                    });
                    link.Properties.target = null;
                }
            }
        });

        (this.props.SelectCellView.model as StencilBaseView).remove({disconnectLinks: true});
        this
            .props
            .OnRemove();
    }

    render() {
        const {model} = this.props.SelectCellView;
        if (model.isLink()) {
            return null;
        }
        this.updateStyle();
        let link = !this.state.isStopStencil
            ? <AkButton
                    icon="arrowscurve"
                    onMouseDown={(evt) => {
                    this.startLinking(evt);
                }}></AkButton>
            : null;

        return <div>
            <div style={this.BoxStyle}>
                <AkButton.Group size="small">
                    <AkButton
                        icon="del"
                        onClick={() => {
                        this.removeCell();
                    }}></AkButton>
                    <AkButton
                        icon="setting"
                        onClick={() => {
                        this
                            .props
                            .OnSetting();
                    }}></AkButton>
                    {link}
                </AkButton.Group>
            </div>
        </div>
    }

}
class AkDesignerHaloStyle {
    static haloWarrpper : React.CSSProperties = {
        display: "inline-block",
        position: "absolute",
        zIndex: 2
    }
}

export default injectIntl(AkDesignerHalo);
