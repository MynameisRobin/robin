import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";

interface AkStencilDragProps extends IntlProps,
DesignerBaseProps {
    /**
     *源视图
     *
     * @type {joint.dia.CellView}
     * @memberOf AkStencilDragProps
     */
    SourceCell: joint.dia.Cell;
    /**
     * 鼠标所在的位置
     *
     * @type {joint.dia.Point}
     * @memberOf AkStencilDragProps
     */
    EventPosition: joint.dia.Point;
    OnMouseUp: (evt) => void
}
interface AkStencilDragStates {}
class AkStencilDrag extends Component < AkStencilDragProps,
AkStencilDragStates > {
    /**
     * 拖动的元素所用的画板
     *
     * @type {joint.dia.Graph}
     * @memberOf AkStencilDrag
     */
    Graph?: joint.dia.Graph;
    /**
     * 拖动元素所用的纸张
     *
     * @type {joint.dia.Paper}
     * @memberOf AkStencilDrag
     */
    Paper?: joint.dia.Paper;
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.Graph = new joint
            .dia
            .Graph();
        this.RenderTool();
    }
    RenderTool() {
        let topThis = this;
        let flyTool = this.props.SourceCell.clone()

        this.Paper = new joint
            .dia
            .Paper({el: $("#akmii-drag"), interactive: false, model: this.Graph});
        flyTool.attributes.position = {
            x: 10,
            y: 10
        };
        this
            .Graph
            .addCell(flyTool);
        let bbox = flyTool
            .findView(this.Paper)
            .getBBox();
        this
            .Paper
            .setDimensions(bbox.width + 20, bbox.height + 20);

        $("#akmii-drag").css({
            left: this.props.EventPosition.x - bbox.width / 2 - 10,
            top: this.props.EventPosition.y - bbox.height / 2 - 10
        });
        $('body').on('mousemove.fly', function (e : JQueryEventObject) {
            $("#akmii-drag").css({
                left: e.clientX - bbox.width / 2 - 10,
                top: e.clientY - bbox.height / 2 - 10
            });
        });
        $('body').on('mouseup.fly', function (e : JQueryEventObject) {
            let x = e.clientX;
            let y = e.clientY;
            let target = topThis
                .props
                .MainPaper
                .$el
                .offset();
            if (x > target.left && x < target.left + topThis.props.MainPaper.$el.width() && y > target.top && y < target.top + topThis.props.MainPaper.$el.height()) {
                var tempCell =flyTool.clone();

                let bbox = topThis
                    .props
                    .MainPaper
                    .snapToGrid({x: e.clientX, y: e.clientY})
                tempCell.attributes.position = {
                    x: (bbox.x - tempCell.attributes.size.width / 2),
                    y: (bbox.y - tempCell.attributes.size.height / 2)
                };
                console.log(tempCell);

                topThis
                    .props
                    .MainGraph
                    .addCell(tempCell);
            }
            $('body')
                .off('mousemove.fly')
                .off('mouseup.fly');
            flyTool.remove();
            $("#akmii-drag").html('');
            topThis.forceUpdate();
            topThis
                .props
                .OnMouseUp(e);
        });
    }
    render() {
        return <div
            id="akmii-drag"
            style={{
            background: "0 0",
            "position": "fixed",
            "zIndex": 100,
            "opacity": 0.9,
            "pointerEvent": "none"
        }}></div>;
    }
}
export default injectIntl(AkStencilDrag)
