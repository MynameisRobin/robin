import {StencilBaseView} from '../../../util/common';
import { FlowcraftDesignerLocale } from '../../../../../locales/localeid';
export class StopRejectEvent extends StencilBaseView {
    constructor(attributes?: joint.shapes.GenericAttributes < EventViewAttr >, options?: any) {
        super(attributes, options);
        this.loadCustomProp(options);
        this.set("markup", '<g class="rotatable bpmn-event"><g class="scalable content content-stop"><circle' +
                '/><path /></g></g>');
    }
    loadCustomProp(options) {
options= Object.assign({},options);
        this.Properties = this.Properties = Object.assign({}, options.Properties, {
            stencil: {
                id: "EndRejectEvent"
            }
        });
    }
    defaults() : Backbone.ObjectHash {
        this.initDataSetting();
        let radius = 30;
        return joint
            .util
            .deepSupplement({
                size: {
                    width: (radius * 2),
                    height: (radius * 2)
                },
                type: "StopRejectEvent",
                attrs: {
                    ".content > circle": {
                        cx: radius,
                        cy: radius,
                        r: radius
                    },
                    ".content >  path": {
                        transform: `scale(${radius / 1000})`,
                        d: "M902.271 256.085 755.922 109.737 512.011 353.649 268.094 109.732l-146.35 146.35 " +
                                "243.917 243.917L121.745 743.914l146.348 146.349 243.916-243.916 243.914 243.914 " +
                                "146.35-146.35L658.358 499.997 902.271 256.085z",
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
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableName}),
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
            }
        ];
    }
}
