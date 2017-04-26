import { FlowcraftDesignerLocale } from '../../../../locales/localeid';
import { StencilBaseView } from '../../util/common';
export class FlowLink extends joint.dia.Link {
    /**设置 */
    DataSetting?: StencilProp[];
    /**属性值 */
    Properties?: ProcessShape;

    isLink() : boolean {return true;}

    constructor(attributes?: joint.shapes.GenericAttributes < FlowLinkViewAttr >, options?: any) {
        super(attributes, options);
        this.loadCustomProp(options);
        this.initDataSetting();

        this.set("markup", [
            '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
            '<path class="marker-source" />',
            '<path class="marker-target" />',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="labels"/>',
            '<g class="marker-vertices"/>',
            '<g class="marker-arrowheads"/>',
            '<g class="link-tools"/>'
        ].join(''));
    }
    loadCustomProp(options) {
        options= Object.assign({},options);
        this.Properties = Object.assign({}, options.Properties, {
            stencil: {
                id: "SequenceFlow"
            }
        });
    }
    defaults() : Backbone.ObjectHash {
        return joint
            .util
            .deepSupplement({
                type: 'FlowLink',
                attrs: {
                    '.marker-source': {
                        d: 'M 0 0'
                    },
                    '.marker-target': {
                        d: 'M 10 0 L 0 5 L 10 10 z',
                        fill: '#000000'
                    }
                }
            }, super.defaults);
    }
    initialize() {
        joint
            .dia
            .Link
            .prototype
            .initialize
            .apply(this, arguments);
    }
    updateLabel(title : string) {
        this.label(0, {
            position: .5,
            attrs: {
                text: {
                    fillOpacity: 0,
                    text: title
                }
            }
        })
    }
    changeSource() {
        if (this.Properties.properties["conditioninfo"] && (this.Properties.properties["conditioninfo"]).length > 0) {
            this.attr(".marker-source", {d: "M 20 8 L 10 0 L 0 8 L 10 16 z"})
        } else {
            this.attr(".marker-source", {d: "M 0 0"})
        }
    }
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
            }, {
                key: "conditioninfo",
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableExpr}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {conditioninfo: value});
                    this.changeSource();
                },
                valueType: "condition"
            }
        ];
    }
}
