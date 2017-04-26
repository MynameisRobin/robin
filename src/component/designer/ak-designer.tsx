import * as React from "react";
import {Component} from "react";
import AkDesignerPaper from "./ak-designer-paper";
import {injectIntl, FormattedMessage} from "react-intl";
import AkDesignerStencil from "./ak-designer-stencil";
import AkDesignerTool from "./ak-designer-tool";
import AkDesignerVerticalTool from "./ak-designer-verticaltool";
import AkDesignerHalo from "./ak-designer-halo";
import {EventProxy} from "./util/eventproxy";
import AkDesignerProp from "./ak-designer-prop";
import {EventManager} from "./util/eventmanager";
import {FlowLink} from "./stencil/items/flowlink";
import {StencilBaseView, StencilItemType} from "./util/common";
import {StencilFactory} from "./stencil/stencil-factory";
import {AkModal} from "../controls/ak-modal";
import AkDesignerFlowPage from "./vardef/ak-designer-flowpage";
import {ProcModelItemPageLocale} from '../../locales/localeid';
import {Raster} from './util/raster';

interface AkDesignerProps extends IntlProps {
    /*总数据 */
    Data?: ProcessProperties;
    /**保存 */
    onSave?: (defData : ProcessProperties, img?: string) => void;
    /**发布 */
    onDeploy?: (defData : ProcessProperties) => void;
}
interface AkDesignerStates {
    /**画布 */
    MainPaper?: joint.dia.Paper;
    /**
     * 页面主数据
     *
     * @type {ProcessProperties}
     * @memberOf AkDesignerStates
     */
    MainData?: ProcessProperties;
    /**被选中的Cell */
    SelectCell?: joint.dia.CellView;
    /**展示属性框 */
    showProp?: boolean;
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
        this.state = {
            MainData: {}
        }
        this.MainGraph = new joint
            .dia
            .Graph();
    }

    componentWillReceiveProps(nextProps : AkDesignerProps) {
        if (nextProps.Data != this.props.Data) {
            this.initData(nextProps.Data);
        }
    }

    componentWillUpdate(nextProps : AkDesignerProps, nextState : AkDesignerStates) {
        if (nextState.SelectCell === null) {
            nextState.showProp = false;
        }
    }
    /**
     * 可拖拽控件库
     *
     * @returns
     *
     * @memberOf AkDesigner
     */
    renderStencil() {
        return <AkDesignerStencil
            MainPaper={this.state.MainPaper}
            MainGraph={this.MainGraph}
            MainData={this.state.MainData}></AkDesignerStencil>;
    }
    /**
     * 右上角工具栏
     *
     * @returns
     *
     * @memberOf AkDesigner
     */
    renderTool() {
        return <AkDesignerTool
            MainPaper={this.state.MainPaper}
            MainGraph={this.MainGraph}
            MainData={this.state.MainData}
            onDeploy={() => {
            this
                .props
                .onDeploy(this.getCellData());
        }}
            onSave={() => {
            this.saveDef();
        }}></AkDesignerTool>;
    }
    /**
     * 放大/缩小/还原按钮
     *
     * @returns
     *
     * @memberOf AkDesigner
     */
    renderVerticalTool() {
        return <AkDesignerVerticalTool
            MainPaper={this.state.MainPaper}
            MainGraph={this.MainGraph}></AkDesignerVerticalTool>;
    }
    /**
     * 属性框
     *
     * @returns
     *
     * @memberOf AkDesigner
     */
    renderProp() {
        console.log(this.state.MainData);

        return this.state.SelectCell && this.state.showProp
            ? <AkDesignerProp
                    MainPaper={this.state.MainPaper}
                    MainGraph={this.MainGraph}
                    MainData={this.state.MainData}
                    Close={() => {
                    this.setState({showProp: false});
                }}
                    SelectCellView={this.state.SelectCell}></AkDesignerProp>
            : null;
    }
    /**
     * 工具栏边框(后期增加拖拽放大，缩小)
     *
     * @returns
     *
     * @memberOf AkDesigner
     */
    renderHalo() {
        let topThis = this;

        EventProxy.on("update_view", function () {
            if (topThis.state.SelectCell && topThis.state.MainPaper.findViewByModel(topThis.state.SelectCell.model)) {
                topThis.setState({
                    SelectCell: topThis
                        .state
                        .MainPaper
                        .findViewByModel(topThis.state.SelectCell.model)
                });
            } else {
                topThis.setState({SelectCell: null});
            }
        });
        return this.state.SelectCell
            ? <AkDesignerHalo
                    MainGraph={this.MainGraph}
                    MainPaper={this.state.MainPaper}
                    MainData={this.state.MainData}
                    OnRemove={() => {
                    topThis.setState({SelectCell: null});
                }}
                    OnSetting={() => {
                    topThis.setState({showProp: true});
                }}
                    SelectCellView={this.state.SelectCell}></AkDesignerHalo>
            : null;
    }

    render() {

        return <div id="akmii-pager" style={AkDesignerStyle.UnUserSelect}>
            <AkDesignerPaper
                OnSelectCell={(cellView) => {
                this.setState({SelectCell: cellView})
            }}
                MainData={this.state.MainData}
                MainPaper={this.state.MainPaper}
                MainGraph={this.MainGraph}></AkDesignerPaper>
            {this.renderProp()}
            {this.renderHalo()}
            {this.renderStencil()}
            {this.renderTool()}
            {this.renderVerticalTool()}
        </div>
    }

    componentDidMount() {
    }
    initPaper() {
        let paper = new joint
            .dia
            .Paper({
                el: $("#akmii-pager"),
                defaultConnector: {
                    name: 'rounded'
                },
                interactive: true,
                defaultLink: new FlowLink(null, {format: this.props.intl.formatMessage}).attr({
                    '.marker-target': {
                        d: 'M 13 0 L 0 7 L 13 13 z'
                    }
                }),
                gridSize: 1,
                snapLinks: true,
                model: this.MainGraph,
                validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                    let canConnection = cellViewT != cellViewS && cellViewT.model.attributes.type != StencilItemType[StencilItemType.StartEvent];
                    return canConnection;
                }
            });

        EventManager.init(this.MainGraph, paper);
        let topThis = this;
        if (!paper["_events"].hasOwnProperty("link:options")) {
            paper
                .on("link:options", function (cellView : joint.dia.CellView, evt : JQueryEventObject, x : number, y : number) {
                    /**设置线的属性 */
                    topThis.setState({SelectCell: cellView, showProp: true});
                });
        }
        return paper;
    }
    initData(data : ProcessProperties) {
        let paper = this.initPaper();
        this.setState({MainData: data, MainPaper: paper});
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

    getCellData() {
        let cells = this
            .MainGraph
            .getCells();

        let defData : ProcessProperties = {
            childshapes: [],
            defBlod: []
        };
        cells.map(entry => {
            defData
                .childshapes
                .push((entry as StencilBaseView).Properties);
            let cell = JSON.parse(JSON.stringify(entry))as StencilBaseView;
            cell.Properties = (entry as StencilBaseView).Properties;

            defData
                .defBlod
                .push(cell);
        });
        defData.variables = this.state.MainData.variables;
        return defData;
    }

    saveDef() {
        new Raster(this.state.MainPaper)
            .toDataURL({})
            .then(data => this.props.onSave(this.getCellData(), data))
    }
}
class AkDesignerStyle {
    static UnUserSelect : React.CSSProperties = {
        userSelect: "none",
        background: "#EEE",
        width: "100%",
        height: "100%"
    }
}
export default injectIntl(AkDesigner)
