import {StencilBaseView} from '../../../util/common';
import { FlowcraftDesignerLocale } from '../../../../../locales/localeid';
export class InclusiveGateway extends StencilBaseView {

    constructor(attributes?: joint.shapes.GenericAttributes < GateWayViewAttr >, options?: any) {
        super(attributes, options);
        this.loadCustomProp(options);
        this.set("markup", '<g class="rotatable  bpmn-gateway"><g class="scalable content"><rect /><circle/>' +
                '</g></g>');
    }
    loadCustomProp(options) {
options= Object.assign({},options);
        this.Properties = Object.assign({}, options.Properties, {
            stencil: {
                id: "InclusiveGateway"
            }
        });
    }
    defaults() : Backbone.ObjectHash {
        this.initDataSetting();
        let size = {
            width: 60,
            height: 60
        }
        return joint
            .util
            .deepSupplement({
                type: 'InclusiveGateway',
                size: size,
                attrs: {
                    '.content > rect': {
                        width: size.width,
                        height: size.height,
                        transform: `rotate(-45)`,
                        "ref-y": size.height / 2
                    },
                    ".content > circle": {
                        cx: size.width / 4,
                        cy: size.width / 4,
                        r: size.width / 4,
                        "ref-x": size.width / 3,
                        "ref-y": size.width / 3
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
