import * as React from 'react'
import {Component} from 'react'
import * as _ from 'lodash';
import {injectIntl} from 'react-intl';
import {FlowLink} from './stencil/items/flowlink';
import {StencilBaseView} from './util/common';

interface AkDesignerPaperProps extends IntlProps,
DesignerBaseProps {
    OnSelectCell?: (cellView : joint.dia.CellView) => void;
}
interface AkDesignerPaperStates {}
export class AkDesignerPaper extends Component < AkDesignerPaperProps,
AkDesignerPaperStates > {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    renderPaper(nextProps : AkDesignerPaperProps) {
        setTimeout(function () {
            /**自适应情况下，需要延迟处理页面大小 */
            let parent = nextProps.MainPaper.$el;
            nextProps
                .MainPaper
                .setDimensions(parent.width(), parent.height());
        }, 100);

        let topThis = this;
        nextProps
            .MainPaper
            .drawGrid({color: '#BBB', thickness: 1});

        nextProps
            .MainPaper
            .on("cell:pointerup", (cellView : joint.dia.CellView, evt : JQueryEventObject, x : number, y : number) => {
                if (cellView.model.isLink()) {
                    return;
                }
                console.log(cellView.model);

                topThis
                    .props
                    .OnSelectCell(cellView);
            });
        nextProps
            .MainPaper
            .on("blank:pointerdown", function (evt : JQueryEventObject, x : number, y : number) {
                topThis
                    .props
                    .OnSelectCell(null);
            });
        nextProps
            .MainPaper
            .on("cell:pointermove", function (cellView : joint.dia.CellView, evt : JQueryEventObject, x : number, y : number) {
                if (cellView.model.isLink()) {
                    return;
                }
                topThis
                    .props
                    .OnSelectCell(null);
            });
        nextProps
            .MainPaper
            .on("link:connect", function (cellView : joint.dia.CellView, evt : JQueryEventObject, magnet, arrowhead) {
                let cell = (cellView.model as FlowLink);
                let target = cell.getTargetElement()as StencilBaseView;
                let source = cell.getSourceElement()as StencilBaseView;
                if (target) {
                    _
                        .remove(target.Properties.incoming, function (a) {
                            return a.resourceid == cell.id;
                        })
                    cell.Properties.target = {
                        resourceid: target.id
                    };
                    target.Properties.incoming = Object.assign([], target.Properties.incoming);
                    target
                        .Properties
                        .incoming
                        .push({resourceid: cell.id});
                }
                if (source) {
                    _
                        .remove(source.Properties.outgoing, function (a) {
                            return a.resourceid == cell.id;
                        })
                    cell.Properties.source = {
                        resourceid: source.id
                    };
                    source.Properties.outgoing = Object.assign([], source.Properties.outgoing);
                    source
                        .Properties
                        .outgoing
                        .push({resourceid: cell.id});
                }
            });
        nextProps
            .MainPaper
            .on("link:disconnect", function (cellView : joint.dia.CellView, evt : JQueryEventObject, magnet, arrowhead) {
                let cell = (cellView.model as FlowLink);

                let target = cell.getTargetElement()as StencilBaseView;
                let source = cell.getSourceElement()as StencilBaseView;
                if (!target && cell.Properties.target) {
                    _
                        .remove((topThis.props.MainGraph.getCell(cell.Properties.target.resourceid)as StencilBaseView).Properties.incoming, function (a) {
                            return a.resourceid == cell.Properties.target.resourceid;
                        })
                    cell.Properties.target = null;
                }
                if (!source && cell.Properties.source) {
                    _
                        .remove((topThis.props.MainGraph.getCell(cell.Properties.source.resourceid)as StencilBaseView).Properties.outgoing, function (a) {
                            return a.resourceid == cell.Properties.source.resourceid;
                        })
                    cell.Properties.source = null;
                }
            });
        nextProps
            .MainGraph
            .on("add", (cell : joint.dia.Cell, collection : any, options : any) => {
                let target = (cell as StencilBaseView);
                if (target.Properties) {
                    target.Properties.resourceid = cell.id;
                }
                nextProps.MainData.childshapes = Object.assign([], nextProps.MainData.childshapes);
                nextProps
                    .MainData
                    .childshapes
                    .push(target.Properties);

            });
    }
    componentWillReceiveProps(nextProps : AkDesignerPaperProps) {
        if (this.props.MainPaper == null && nextProps.MainPaper != null) {
            this.renderPaper(nextProps);
        }
    }

    render() {
        return null;
    }
}
class AkDesignerPaperStyle {}
export default injectIntl(AkDesignerPaper);
