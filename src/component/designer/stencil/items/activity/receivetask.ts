import {StencilBaseView} from '../../../util/common';
import { FlowcraftDesignerLocale } from '../../../../../locales/localeid';
export class ReceiveTaskActivity extends StencilBaseView {
    constructor(attributes?: joint.shapes.GenericAttributes < ActivityViewAttr >, options?: any) {
        super(attributes, options);
        this.loadCustomProp(options);
        this.set("markup", '<g class="rotatable bpmn-activity"><g class="content"><rect/><path/><text/></g><' +
                'g class="header"><rect/><text/></g></g>');
        this.initDataSetting();
    }
    loadCustomProp(options) {
        options= Object.assign({},options);
        this.Properties =Object.assign({},options.Properties, {
            stencil: {
                id: "CandidateTask"
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
                type: "ReceiveTaskActivity",
                attrs: {
                    ".content > rect": {
                        width: size.width,
                        height: size.height - headerHeight,
                        y: headerHeight
                    },
                    ".content > path": {
                        transform: "scale(0.02)",
                        "d": "M936.7552 654.04928c-34.65216 20.76672-138.89536 109.9776-176.3328 114.688-37.06" +
                                "88 4.7104-137.37984-2.62144-208.77312-9.37984-80.77312-7.5776-49.27488-40.26368-" +
                                "36.49536-43.74528 12.77952-3.52256 167.48544-11.8784 219.17696-17.8176 46.53056-" +
                                "5.36576 39.81312-51.2-12.65664-53.0432-52.38784-1.80224-289.95584-17.89952-369.7" +
                                "8688-12.53376-79.91296 5.36576-196.608 112.10752-196.608 112.10752l4.34176 16.95" +
                                "744 170.14784 151.10144 22.7328-1.80224c0 0 41.73824-24.00256 76.43136-31.21152 " +
                                "34.69312-7.24992 226.42688 13.84448 292.6592 4.21888 66.23232-9.6256 236.83072-1" +
                                "52.41216 274.26816-183.5008 18.18624-15.23712 31.21152-36.94592 27.40224-42.8032" +
                                "C1005.11744 629.51424 959.20128 640.53248 936.7552 654.04928L936.7552 654.04928z" +
                                "M120.95488 773.36576c-15.64672-14.21312-33.30048-10.8544-43.99104-2.29376-10.731" +
                                "52 8.51968-55.296 43.17184-68.03456 51.93728-19.70176 13.55776-2.2528 36.20864 9" +
                                ".0112 46.85824 11.18208 10.60864 131.85024 122.4704 149.66784 140.0832 17.85856 " +
                                "17.57184 36.20864 15.68768 49.64352 4.38272 13.39392-11.264 44.48256-37.96992 64" +
                                ".38912-51.93728 19.90656-13.9264 18.14528-29.85984 4.25984-42.47552C272.09728 90" +
                                "7.264 136.68352 787.53792 120.95488 773.36576L120.95488 773.36576zM120.95488 773" +
                                ".36576M446.01344 174.4896l343.77728 0 0 61.44-343.77728 0 0-61.44ZM350.78144 205" +
                                ".2096c0-8.02816 3.2768-16.05632 9.0112-21.66784 5.65248-5.7344 13.63968-9.05216 " +
                                "21.7088-9.05216 8.02816 0 16.05632 3.31776 21.66784 9.05216 5.7344 5.65248 9.052" +
                                "16 13.63968 9.05216 21.66784 0 8.06912-3.31776 16.09728-9.05216 21.74976C397.557" +
                                "76 232.6528 389.57056 235.9296 381.50144 235.9296c-8.06912 0-16.09728-3.2768-21." +
                                "7088-8.97024C354.0992 221.26592 350.78144 213.27872 350.78144 205.2096L350.78144" +
                                " 205.2096zM445.93152 316.86656l343.90016 0 0 61.44-343.90016 0 0-61.44ZM350.7814" +
                                "4 347.58656c0-8.06912 3.2768-16.09728 9.0112-21.66784 5.65248-5.77536 13.63968-9" +
                                ".05216 21.7088-9.05216 8.02816 0 16.05632 3.2768 21.66784 9.05216 5.7344 5.61152" +
                                " 9.05216 13.59872 9.05216 21.66784S408.90368 363.68384 403.21024 369.37728C397.5" +
                                "5776 375.02976 389.57056 378.30656 381.50144 378.30656c-8.06912 0-16.09728-3.276" +
                                "8-21.7088-8.97024C354.0992 363.68384 350.78144 355.69664 350.78144 347.58656L350" +
                                ".78144 347.58656zM445.93152 459.24352l343.90016 0 0 61.44-343.90016 0 0-61.44ZM3" +
                                "50.78144 489.96352c0-8.02816 3.2768-16.05632 9.0112-21.66784 5.65248-5.7344 13.6" +
                                "3968-9.05216 21.7088-9.05216 8.02816 0 16.05632 3.31776 21.66784 9.05216 5.7344 " +
                                "5.65248 9.05216 13.63968 9.05216 21.66784 0 8.06912-3.31776 16.09728-9.05216 21." +
                                "74976-5.65248 5.69344-13.63968 8.97024-21.66784 8.97024-8.06912 0-16.09728-3.276" +
                                "8-21.7088-8.97024C354.0992 506.01984 350.78144 498.03264 350.78144 489.96352L350" +
                                ".78144 489.96352zM344.4736 506.59328M816.04608 55.82848l-491.52 0c-39.5264 0-71." +
                                "68 32.1536-71.68 71.68l0 427.37664c0 16.95744 13.76256 30.72 30.72 30.72s30.72-1" +
                                "3.76256 30.72-30.72L314.28608 127.50848c0-5.57056 4.66944-10.24 10.24-10.24l491." +
                                "52 0c5.57056 0 10.24 4.66944 10.24 10.24l0 427.37664c0 16.95744 13.76256 30.72 3" +
                                "0.72 30.72s30.72-13.76256 30.72-30.72L887.72608 127.50848C887.72608 87.98208 855" +
                                ".57248 55.82848 816.04608 55.82848z",
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
                        text: StencilBaseView.format({id: FlowcraftDesignerLocale.StencilTaskReceive}),
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
                key: "usertaskassignment",
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableAssign}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {usertaskassignment: value});
                },
                valueType: "userpickermulti"
            }, {
                key: "duedatedefinition",
                label: StencilBaseView.format({id:FlowcraftDesignerLocale.PropLableDurday}),
                onChange: (value) => {
                    this.Properties.properties = Object.assign({}, this.Properties.properties, {duedatedefinition: value});
                },
                valueType: "number"
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
