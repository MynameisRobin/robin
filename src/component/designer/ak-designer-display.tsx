import * as React from "react";
import {Component} from "react";
import AkDesignerPaper from "./ak-designer-paper";
import {injectIntl, FormattedMessage} from "react-intl";
import {FlowLink} from './stencil/items/flowlink';
import {StencilBaseView, StencilItemType} from './util/common';
import {StencilFactory} from './stencil/stencil-factory';

interface AkDesignerProps extends IntlProps {
    /*总数据 */
    data: ProcessProperties;
    CompleteData?:any;
}
interface AkDesignerStates {
    /**画布 */
    MainPaper?: joint.dia.Paper;
}
export class AkDesigner extends Component < AkDesignerProps,
AkDesignerStates > {
    /**画板 */
    MainGraph?: joint.dia.Graph;

    constructor(props, context) {
        super(props, context);
        /**动态加载css */
        require.ensure([], () => {
            require("./style/joint.css")
        }, "joint.css");

        this.MainGraph = new joint
            .dia
            .Graph();
    }

    componentWillReceiveProps(nextProps : AkDesignerProps) {
        if (nextProps.data != this.props.data) {
            this.initData(nextProps.data);
        }
    }

    render() {
        return <div id="akmii-pager">
            <AkDesignerPaper
                OnSelectCell={(cellView) => {}}
                MainPaper={this.state.MainPaper}
                MainGraph={this.MainGraph}></AkDesignerPaper>
        </div>
    }

    componentDidMount() {
        let paper = new joint
            .dia
            .Paper({
                el: $("#akmii-pager"),
                defaultConnector: {
                    name: 'rounded'
                },
                interactive: false,
                defaultLink: new FlowLink().attr({
                    '.marker-target': {
                        d: 'M 13 0 L 0 7 L 13 13 z'
                    }
                }),
                gridSize: 1,
                snapLinks: true,
                model: this.MainGraph,
                validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                    return cellViewT != cellViewS;
                }
            });
        this.setState({MainPaper: paper});
    }

    initData(data : ProcessProperties) {
        if (data) {
            if (data.defBlod) {
                data.defBlod = (data.defBlod as StencilBaseView[]).sort((a, b) => {
                    return parseInt(StencilItemType[a["type"]]) - parseInt(StencilItemType[b["type"]])
                });
                (data.defBlod as StencilBaseView[]).forEach(entry => {
                    let cell = StencilFactory.getStencil(parseInt(StencilItemType[entry["type"]]), entry);
                    this
                        .MainGraph
                        .addCell(cell);
                });
            }
        }
    }
    initCompleteData(){

    }

}
class AkDesignerStyle {}
export default injectIntl(AkDesigner)
