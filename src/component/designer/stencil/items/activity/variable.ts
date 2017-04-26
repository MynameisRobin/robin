import {StencilBaseView} from '../../../util/common';
import { FlowcraftDesignerLocale } from '../../../../../locales/localeid';
export class VariableActivity extends StencilBaseView {

    constructor(attributes?: joint.shapes.GenericAttributes < ActivityViewAttr >, options?: any) {
        super(attributes, options);
        this.loadCustomProp(options);
        this.initDataSetting();
        this.set("markup", '<g class="rotatable bpmn-activity"><g class="content"><rect/><path/><text/></g><' +
                'g class="header"><rect/><text/></g></g>');
    }
    loadCustomProp(options) {
        options= Object.assign({},options);
        this.Properties =Object.assign({},options.Properties, {
            stencil: {
                id: "SetVariableTask"
            }
        });
    }
    defaults() : Backbone.ObjectHash {
        let size: joint.dia.Size = {
            width: 140,
            height: 90
        };
        let headerHeight = 30;
        return joint
            .util
            .deepSupplement({
                size: {
                    width: size.width,
                    height: size.height
                },
                type: "VariableActivity",
                attrs: {
                    ".content > rect": {
                        width: size.width,
                        height: size.height - headerHeight,
                        y: headerHeight
                    },
                    ".content > path": {
                        transform: "scale(0.02)",
                        "d": "M20.992 748.544h635.904c11.264 0 20.992 9.216 20.992 20.48v4.096c0 11.264-9.216 " +
                                "20.48-20.992 20.48H20.992c-11.264 0-20.992-9.216-20.992-20.48v-4.096c0-11.264 9." +
                                "216-20.48 20.992-20.48z m1015.808 0h162.304c11.264 0 20.992 9.216 20.992 20.48v4" +
                                ".096c0 11.264-9.216 20.48-20.992 20.48h-162.304c-11.264 0-20.992-9.216-20.992-20" +
                                ".48v-4.096c0.512-11.264 9.728-20.48 20.992-20.48z m-178.688-66.048c49.664 0.512 " +
                                "90.112 40.448 89.6 89.088-0.512 49.152-40.96 88.576-90.624 88.064-49.664-0.512-8" +
                                "9.6-39.936-89.6-88.576s40.96-88.576 90.624-88.576zM20.992 216.576h635.904c11.264" +
                                " 0 20.992 9.216 20.992 20.48v4.096c0 11.264-9.216 20.48-20.992 20.48H20.992c-11." +
                                "264 0-20.992-9.216-20.992-20.48v-4.096c0-11.264 9.216-20.48 20.992-20.48z m1016." +
                                "32 0h162.304c11.264 0 20.992 9.216 20.992 20.48v4.096c0 11.264-9.216 20.48-20.99" +
                                "2 20.48h-162.304c-11.264 0-20.992-9.216-20.992-20.48v-4.096c0-11.264 9.216-20.48" +
                                " 20.992-20.48z m-178.688-66.56c49.664 0.512 90.112 40.448 89.6 89.088-0.512 49.1" +
                                "52-40.96 88.576-90.624 88.064-49.664-0.512-89.6-39.936-89.6-88.576s40.448-88.576" +
                                " 90.624-88.576z m-295.424 332.8h635.904c11.264 0 20.992 9.216 20.992 20.48v3.584" +
                                "c0 11.264-9.216 20.48-20.992 20.48H563.2c-11.264 0-20.992-9.216-20.992-20.48v-3." +
                                "072c0-11.776 9.216-20.992 20.992-20.992z m-542.208 0h161.28c11.264 0 20.992 9.21" +
                                "6 20.992 20.48v3.584c0 11.264-9.216 20.48-20.992 20.48H20.992c-11.264 0-20.992-9" +
                                ".216-20.992-20.48v-3.072c0-11.776 9.216-20.992 20.992-20.992z m340.48-67.072c50." +
                                "176 0 90.624 39.424 90.624 88.576s-39.936 89.088-90.112 89.088S271.36 553.984 27" +
                                "1.36 504.832v-0.512c0-48.64 40.448-88.576 90.112-88.576z",
                        "ref-x": size.width / 2 - 10,
                        "ref-y": headerHeight + 5
                    },
                    ".content > text": {
                        text: "",
                        "ref-x": size.width / 2,
                        "ref-y": size.height - headerHeight + 5
                    },
                    ".header > rect": {
                        width: size.width,
                        height: headerHeight
                    },
                    ".header > text": {
                        text: StencilBaseView.format({id: FlowcraftDesignerLocale.StencilTaskVariable}),
                        "ref-x": size.width / 2,
                        "ref-y": 10
                    }
                }
            }, super.defaults);
    }
    updateLabel(title : string) {
        this.attr(".content > text", {text: title})
    }
    initDataSetting() {

        this.DataSetting = [
            {
                key: "resourceid",
                notShow: true
            }, {
                key: "name",
                onChange: (value) => {
                    this.updateLabel(value);
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {name: value});
                },
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableName}),
                valueType: "input"
            }, {
                key: "documentation",
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableDesc}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {documentation: value});
                },
                valueType: "text"
            }, {
                key: "varibles",
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableVariable}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {varibles: value});
                },
                valueType: "expr"
            }
        ];
    }
}
