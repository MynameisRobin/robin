import {StencilBaseView} from '../../../util/common';
import {FlowcraftDesignerLocale} from '../../../../../locales/localeid';

export class MailTaskActivity extends StencilBaseView {
    constructor(attributes?: joint.shapes.GenericAttributes < ActivityViewAttr >, options?: any) {
        super(attributes, options);
        this.loadCustomProp(options);
        this.set("markup", '<g class="rotatable bpmn-activity"><g class="content"><rect/><path/><text/></g><' +
                'g class="header"><rect/><text/></g></g>');

        this.initDataSetting();
    }
    loadCustomProp(options) {
        options= Object.assign({},options);
        this.Properties = Object.assign({}, options.Properties, {
            stencil: {
                id: "MailTask"
            }
        });
    }
    defaults() : Backbone.ObjectHash {
        let size: joint.dia.Size = {
            width: 140,
            height: 90
        };
        let headerHeight = 30;
        // this.initDataSetting();
        return joint
            .util
            .deepSupplement({
                size: {
                    width: size.width,
                    height: size.height
                },
                type: "MailTaskActivity",
                attrs: {
                    ".content > rect": {
                        width: size.width,
                        height: size.height - headerHeight,
                        y: headerHeight
                    },
                    ".content > path": {
                        transform: "scale(0.02)",
                        "d": "M62.663178 163.961282l0 672.214958 896.2832 0L958.946378 163.961282 62.663178 16" +
                                "3.961282zM936.539043 795.737226 639.949091 499.148297l296.589952-296.587905L936." +
                                "539043 795.737226 936.539043 795.737226zM920.352385 186.368618 511.841388 594.87" +
                                "5522 103.332437 186.368618 920.352385 186.368618 920.352385 186.368618zM85.06949" +
                                "1 200.484104l298.032814 298.03179L85.069491 796.546661 85.069491 200.484104zM398" +
                                ".947178 514.359744 502.30929 617.721857c2.602268 2.603291 6.14393 3.679809 9.533" +
                                "121 3.25309 3.38919 0.426719 6.930853-0.649799 9.533121-3.25309l102.623285-102.6" +
                                "23285L922.665057 813.766858 99.54211 813.766858 398.947178 514.359744z",
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
                        text: StencilBaseView.format({id: FlowcraftDesignerLocale.StencilTaskMail}),
                        "ref-x": size.width / 2,
                        "ref-y": 10
                    }
                }
            }, super.defaults);
    }
    updateLabel(title : string) {
        this.attr(".content > text", {text: title})
    }
    initDataSetting(a?: any) {
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
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableName}),
                valueType: "input"
            }, {
                key: "subject",
                label:StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableMailSubject}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {subject: value});
                },
                valueType: "expr"
            }, {
                key: "to",
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableMailTo}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {to: value});
                },
                valueType: "expr"
            }, {
                key: "cc",
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableMailCC}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {cc: value});
                },
                valueType: "expr"
            }, {
                key: "html",
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableMailBody}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {html: value});
                },
                valueType: "exprtext"
            }
        ];
    }
}
