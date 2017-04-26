import {StencilBaseView} from '../../../util/common';
import {FlowcraftDesignerLocale} from '../../../../../locales/localeid';
export class WaitTaskActivity extends StencilBaseView {
    constructor(attributes?: joint.shapes.GenericAttributes < ActivityViewAttr >, options?: any) {
        super(attributes, options);
        this.loadCustomProp(options);
        this.initDataSetting();
        this.set("markup", '<g class="rotatable bpmn-activity"><g class="content"><rect/><path/><text/></g><' +
                'g class="header"><rect/><text/></g></g>');
    }
    loadCustomProp(options) {
        options = Object.assign({}, options);
        this.Properties = Object.assign({}, options.Properties, {
            stencil: {
                id: "UserTask"
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
                type: "WaitTaskActivity",
                attrs: {
                    ".content > rect": {
                        width: size.width,
                        height: size.height - headerHeight,
                        y: headerHeight
                    },
                    ".content > path": {
                        transform: "scale(0.02)",
                        "d": "M259.799528 667.716193l250.899852 0c5.179966-13.530128 11.289091-26.444226 18.47" +
                                "371-38.787321L259.794412 628.928872l0 38.787321L259.799528 667.716193zM608.95909" +
                                "2 396.198809 259.845577 396.198809l0 38.787321 349.113515 0L608.959092 396.19880" +
                                "9zM143.453939 919.884942c-21.426966 0-38.787321-17.380821-38.787321-38.787321L10" +
                                "4.666619 142.975033c0-21.425942 17.380821-38.787321 38.787321-38.787321l601.2392" +
                                "85 0c21.452548 0 38.81802 17.380821 38.81802 38.787321L783.511244 494.071711c13." +
                                "167878 0.928137 26.090163 2.607379 38.760715 5.38872L822.271959 142.908518c0-42." +
                                "815046-34.703314-77.587944-77.587944-77.587944L143.445753 65.320574c-42.89077 0-" +
                                "77.588968 34.73299-77.588968 77.587944l0 738.122589c0 42.888724 34.704337 77.586" +
                                "921 77.588968 77.586921l430.874493 0c-12.144574-11.840652-23.129744-24.829452-32" +
                                ".779502-38.786297L143.479522 919.83173 143.453939 919.884942zM608.959092 542.028" +
                                "86l0-29.472183L259.845577 512.556677l0 38.786297 336.698789 0c4.009306-3.215222 " +
                                "8.147548-6.372115 12.443379-9.335604L608.959092 542.02886zM763.892457 570.707983" +
                                "c-106.932214 0-193.749338 86.709677-193.749338 194.130008 0 107.136875 86.819171" +
                                " 193.843482 193.749338 193.843482 107.346652 0 194.247688-86.777215 194.247688-1" +
                                "93.843482C958.140145 657.379798 871.198177 570.707983 763.892457 570.707983M763." +
                                "953855 919.884942c-85.532878 0-154.997833-69.395371-154.997833-155.058208 0-85.9" +
                                "82108 69.396394-155.327337 154.997833-155.327337 85.882848 0 155.328361 69.33090" +
                                "3 155.328361 155.327337C919.282216 850.395427 849.844889 919.884942 763.953855 9" +
                                "19.884942M608.959092 279.83173 259.845577 279.83173l0 38.787321 349.113515 0L608" +
                                ".959092 279.83173zM783.488732 667.716193l-38.816996 0L744.671735 784.096574l116." +
                                "416197 0 0-38.787321-77.587944 0 0-77.586921L783.488732 667.716193z",
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
                        text: StencilBaseView.format({id: FlowcraftDesignerLocale.StencilTaskWaitting}),
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
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableName}),
                valueType: "input"
            }, {
                key: "documentation",
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableDesc}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {documentation: value});
                },
                valueType: "text"
            }, {
                key: "usertaskassignment",
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableAssign}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {usertaskassignment: value});
                },
                valueType: "userpicker"
            }, {
                key: "duedatedefinition",
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLableDurdate}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {duedatedefinition: value});
                },
                valueType: "number"
            }, {
                key: "taskurl",
                label: StencilBaseView.format({id: FlowcraftDesignerLocale.PropLablePage}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {taskurl: value});
                },
                valueType: "input"
            }
        ];
    }
}
