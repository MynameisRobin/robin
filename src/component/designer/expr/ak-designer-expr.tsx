/**
 * 表达式编辑器，用于条件和邮件模板
 * 邮件模板的formatValue需要额外加<var></var>
 */
import * as React from "react";
import {Component} from "react";
import AkDesignerExprEditor from "./ak-designer-expr-editor";
import {AkIcon} from "../../controls/ak-icon";
import {AkModal} from "../../controls/ak-modal";
import {FlowcraftDesignerLocale, CommonLocale} from "../../../locales/localeid";
import {injectIntl} from "react-intl";
import AkDesignerExprAdv from "./ak-designer-expr-adv";

//默认的category列表
export const exprCategories: exprItem[] = [{
    id: FlowcraftDesignerLocale.ExprCategoryVariable,
    locale: FlowcraftDesignerLocale.ExprCategoryVariable,
    valueType: "variables",
    items: []
},
    {
        id: FlowcraftDesignerLocale.ExprCategoryContext,
        locale: FlowcraftDesignerLocale.ExprCategoryContext,
        items: [
            {
                id: FlowcraftDesignerLocale.ExprItemApplicationID,
                locale: FlowcraftDesignerLocale.ExprItemApplicationID,
                value: "${'type':'application','prop':'ApplicationID'}",
                valueType: "string"
            },
            {
                id: FlowcraftDesignerLocale.ExprItemApplicationNo,
                locale: FlowcraftDesignerLocale.ExprItemApplicationNo,
                value: "${'type':'application','prop':'FlowNo'}",
                valueType: "string"
            },
            {
                id: FlowcraftDesignerLocale.ExprItemApplicationURL,
                locale: FlowcraftDesignerLocale.ExprItemApplicationURL,
                value: "${'type':'application','prop':'ApplicationURL'}",
                valueType: "string"
            },
            {
                id: FlowcraftDesignerLocale.ExprItemProcessName,
                locale: FlowcraftDesignerLocale.ExprItemProcessName,
                value: "${'type':'instance','prop':'Name'}",
                valueType: "string"
            },
            {
                id: FlowcraftDesignerLocale.ExprItemApplicant,
                locale: FlowcraftDesignerLocale.ExprItemApplicant,
                valueType: "user",
                attr: {userid: "${'type':'application','prop':'ApplicantUserID'}"},
            },
            {
                id: FlowcraftDesignerLocale.ExprItemCreatedBy,
                locale: FlowcraftDesignerLocale.ExprItemCreatedBy,
                valueType: "user",
                attr: {userid: "${'type':'application','prop':'CreatedBy'}"}
            },
            {
                id: FlowcraftDesignerLocale.ExprItemCreated,
                locale: FlowcraftDesignerLocale.ExprItemCreated,
                value: "${'type':'application','prop':'Created'}",
                valueType: "datetime"
            },
        ]
    }, {
        id: FlowcraftDesignerLocale.ExprCategoryTask,
        locale: FlowcraftDesignerLocale.ExprCategoryTask,
        valueType: "tasks",
        items: []
    }, {
        id: CommonLocale.Metadata,
        locale: CommonLocale.Metadata,
        valueType: "metadataCategories",
        items: []
    },];

/**
 * 当前task的category
 */
export const exprCurrentTaskCategory: exprItem = {
    id: FlowcraftDesignerLocale.ExprCategoryTask,
    locale: FlowcraftDesignerLocale.ExprCategoryTask, items: [
        {
            id: FlowcraftDesignerLocale.ExprItemTaskID,
            locale: FlowcraftDesignerLocale.ExprItemTaskID,
            value: "${'type':'task','prop':'TaskID'}",
            valueType: "string"
        },
        {
            id: FlowcraftDesignerLocale.ExprItemTaskURL,
            locale: FlowcraftDesignerLocale.ExprItemTaskURL,
            value: "${'type':'task', 'prop':'TaskURL'}",
            valueType: "string"
        },
        {
            id: FlowcraftDesignerLocale.ExprItemTaskName,
            locale: FlowcraftDesignerLocale.ExprItemTaskName,
            value: "${'type':'task','prop':'Name'}",
            valueType: "string"
        },
        {
            id: FlowcraftDesignerLocale.ExprItemTaskAssignee,
            locale: FlowcraftDesignerLocale.ExprItemTaskAssignee,
            attr: {userid: "${'type':'task','prop':'AssigneeID'}"},
            valueType: "user"
        },
        {
            id: FlowcraftDesignerLocale.ExprItemTaskDueDate,
            locale: FlowcraftDesignerLocale.ExprItemTaskDueDate,
            value: "${'type':'task','prop':'DueDate'}",
            valueType: "datetime"
        },
    ]
};

/**
 * 变量模板,需要替换@vari，和type
 */
export const exprVariableTemplate: exprItem = {
    value: "${'type':'variable', 'param':{'id':\"@varid\"}}",
    id: FlowcraftDesignerLocale.Variable,
    preLocale: FlowcraftDesignerLocale.Variable,
    valueType: "string"
};

export const exprMetadataCategoryTemplate: exprItem = {
    valueType: "metadataCategory"
};

export const exprMetadataTemplate: exprItem = {
    valueType: "metadata",
    value: "${'type':'metadata', 'param':{'id':\"@metadataId\", 'categoryId':\"@categoryId\"}}",
}

export const exprUserTemplate: exprItem[] = [
    {
        id: FlowcraftDesignerLocale.ExprUserId,
        locale: FlowcraftDesignerLocale.ExprUserId,
        value: "@userid",
        valueType: "string"
    },
    {
        id: FlowcraftDesignerLocale.ExprUserName,
        locale: FlowcraftDesignerLocale.ExprUserName,
        value: "${ 'type':'user', 'param':{'id':\"@userid\"},'prop':'Name'}",
        valueType: "string"
    },
    {
        id: FlowcraftDesignerLocale.ExprUserEmail,
        locale: FlowcraftDesignerLocale.ExprUserEmail,
        value: "${ 'type':'user', 'param':{'id':\"@userid\"},'prop':'Email'}",
        valueType: "string"
    },
    {
        id: FlowcraftDesignerLocale.ExprUserManager,
        locale: FlowcraftDesignerLocale.ExprUserManager,
        value: "${ 'type':'user', 'param':{'id':\"@userid\"},'prop':'LineManager'}",
        valueType: "string"
    },
    {
        id: FlowcraftDesignerLocale.ExprUserOrganization,
        locale: FlowcraftDesignerLocale.ExprUserOrganization,
        value: "${ 'type':'user', 'param':{'id':\"@userid\"},'prop':'OrganizationID'}",
        valueType: "string"
    },
    {
        id: FlowcraftDesignerLocale.ExprUserLocation,
        locale: FlowcraftDesignerLocale.ExprUserLocation,
        value: "${ 'type':'user', 'param':{'id':\"@userid\"},'prop':'LocationID'}",
        valueType: "string"
    },
];
/**
 * 任务列表对应的模板
 */
export const exprTaskTemplate: exprItem[] = [
    {
        id: FlowcraftDesignerLocale.ExprItemTaskID,
        locale: FlowcraftDesignerLocale.ExprItemTaskID,
        value: "${'type':'task','param':{'defid':\"@defid\"},'prop':'TaskID'}",
        valueType: "string"
    },
    {
        id: FlowcraftDesignerLocale.ExprItemTaskURL,
        locale: FlowcraftDesignerLocale.ExprItemTaskURL,
        value: "${'type':'task','param':{'defid':\"@defid\"}, 'prop':'TaskURL'}",
        valueType: "string"
    },
    {
        id: FlowcraftDesignerLocale.ExprItemTaskName,
        locale: FlowcraftDesignerLocale.ExprItemTaskName,
        value: "${'type':'task','param':{ 'defid':\"@defid\"},'prop':'Name'}",
        valueType: "string"
    },
    {
        id: FlowcraftDesignerLocale.ExprItemTaskAssignee,
        locale: FlowcraftDesignerLocale.ExprItemTaskAssignee,
        attr: {userid: "${'type':'task','param':{'defid':\"@defid\"}, 'prop':'AssigneeID'}"},
        valueType: "user"
    },
    {
        id: FlowcraftDesignerLocale.ExprItemTaskDueDate,
        locale: FlowcraftDesignerLocale.ExprItemTaskDueDate,
        value: "${'type':'task','param':{'defid':\"@defid\"},'prop':'DueDate'}",
        valueType: "datetime"
    },
    {
        id: FlowcraftDesignerLocale.ExprItemTaskOutcome,
        locale: FlowcraftDesignerLocale.ExprItemTaskOutcome,
        value: "${'type':'task','param':{'defid':\"@defid\"}, 'prop':'Outcome'}",
        valueType: "string"
    }
]


export interface AkDesignerExprProp extends IntlProps {
    readonly?: boolean;
    multilines?: number; //显示多少行内容
    singleLine?: boolean; //是否限制单行文本
    advMultilines?: number; //高级编辑器下显示行数
    metadataShowHierarchy?: boolean; //是否展示metadata完整路径
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    flowContext?: ProcessProperties;
    // childshapes?: ProcessShape[]; //流程中节点的定义
    // variables?: Variables; //流程中变量的定义
    width?: number; //显示宽度
}

interface AkDesignerExprState {
    advEditorVisible?: boolean;
    value?: string;
    cachedValue?: string;
}

class AkDesignerExpr extends Component<AkDesignerExprProp,
    AkDesignerExprState> {
    static defaultProps: AkDesignerExprProp = {
        multilines: 5,
        advMultilines: 5,
        defaultValue: "",
        flowContext: {},
        // childshapes: []
    }

    constructor(props, context) {
        super(props, context);

        this.state = {value: props.value ? props.value : props.defaultValue};
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    openAdvanceEditor() {
        this.setState({advEditorVisible: true, cachedValue: this.state.value});
    }

    advanceOK() {
        this.onChange(this.state.cachedValue);
        this.setState({advEditorVisible: false});
    }

    advanceCancel() {
        this.setState({advEditorVisible: false, cachedValue: this.state.value});
    }

    advOnChange(value) {
        this.setState({cachedValue: value});
    }

    onChange(value) {
        if (!("value" in this.props)) {
            this.setState({value: value});
        }

        this.props.onChange && this.props.onChange(value);
    }

    render() {
        const {width, readonly, multilines, advMultilines, flowContext, singleLine, metadataShowHierarchy} = this.props;
        const {value, cachedValue} = this.state;
        const {formatMessage} = this.props.intl;

        let style;
        let editorStyle;
        if (width) {
            style = {width: width};
            editorStyle = {width: width - 30}
        }

        let classname = multilines > 1 ? "ak-expr-editor-multiple" : "ak-expr-editor-single";
        classname = readonly ? classname : classname + " ant-input-group";

        return <span className={classname} style={style}>
            <AkDesignerExprEditor style={editorStyle} singleLine={singleLine} value={value}
                                  onChange={this.onChange.bind(this)}
                                  multilines={multilines}
                                  contentEditable={!readonly}/>
            {readonly ? undefined :<span className="ant-input-group-addon">
                <AkIcon type="bars" onClick={this.openAdvanceEditor.bind(this)}/>
            </span>}

            <AkModal
                title={formatMessage({ id: FlowcraftDesignerLocale.ExprEditor })}
                width={800}
                visible={this.state.advEditorVisible} onOk={this.advanceOK.bind(this)}
                onCancel={this.advanceCancel.bind(this)}>
                <AkDesignerExprAdv metadataShowHierarchy={metadataShowHierarchy} singleLine={singleLine}
                                   variables={flowContext.variables} childshapes={flowContext.childshapes}
                                   multilines={advMultilines}
                                   value={cachedValue} onChange={this.advOnChange.bind(this)}
                                   exprItems={exprCategories}/>
            </AkModal>
        </span>;
    }
}

export default injectIntl(AkDesignerExpr);
