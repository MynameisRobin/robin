import {StencilBaseView} from '../../../util/common';
import { FlowcraftDesignerLocale } from '../../../../../locales/localeid';
export class StartEvent extends StencilBaseView {
    constructor(attributes?: joint.shapes.GenericAttributes < EventViewAttr >, options?: any) {
        super(attributes, options);
        this.loadCustomProp(options);
        this.initDataSetting();
        this.set("markup", '<g class="rotatable bpmn-event"><g class="scalable content content-start"><circl' +
                'e/><path /></g></g>');
    }
    loadCustomProp(options) {
options= Object.assign({},options);
        this.Properties =Object.assign({},options.Properties, {
            stencil: {
                id: "StartNoneEvent"
            }
        });
    }
    defaults() : Backbone.ObjectHash {
        let radius = 30;
        return joint
            .util
            .deepSupplement({
                size: {
                    width: (radius * 2),
                    height: (radius * 2)
                },
                type: "StartEvent",
                attrs: {
                    ".content > circle": {
                        cx: radius,
                        cy: radius,
                        r: radius
                    },
                    ".content >  path": {
                        transform: `scale(${radius / 1000})`,
                        d: "M301.466 144.794l455.339 379.153-455.339 379.221z",
                        "ref-x": radius / 2,
                        "ref-y": radius / 2
                    }
                }
            }, super.defaults);
    }
    updateLabel(title : string) {}
    initDataSetting() {
        this.DataSetting = [
            {
                key: "id",
                notShow: true
            }, {
                key: "name",
                label:StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableName}),
                isRequire: true,
                onChange: (value) => {
                    this.updateLabel(value);
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {name: value});
                },
                valueType: "input"
            }, {
                key: "documentation",
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableDesc}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {documentation: value});
                },
                valueType: "text"
            }, {
                key: "taskurl",
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLablePage}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {taskurl: value});
                },
                valueType: "input"
            }
        ];
    }
}
