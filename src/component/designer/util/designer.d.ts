/**基础属性 */
interface DesignerBaseProps {
    /**
     * 主画板
     *
     * @type {joint.dia.Graph}
     * @memberOf JointToolTipBaseProps
     */
    MainGraph?: joint.dia.Graph;
    /**
     * 纸张
     *
     * @type {joint.dia.Paper}
     * @memberOf JointToolTipBaseProps
     */
    MainPaper?: joint.dia.Paper;
    /**
     * 流程主数据
     *
     * @type {ProcessProperties}
     * @memberOf DesignerBaseProps
     */
    MainData?:ProcessProperties;
}

/**Stencil属性 */
interface StencilProp {
    key : string;
    notShow?: boolean;
    readonly?: boolean;
    isRequire?: boolean;
    onChange?: (value : any) => void;
    label?: string|React.ReactNode;
    valueType?: "input" | "text" | "number" | "datetime" | "select" | "boolean" | "userpicker"|"userpickermulti" | "condition" | "expr" | "exprtext";
    value?: any;
}
interface BoxPadding {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
interface ActivityViewAttr extends joint.dia.TextAttrs {}
interface GateWayViewAttr extends joint.dia.TextAttrs {}
interface FlowLinkViewAttr extends joint.dia.TextAttrs {}

interface EventViewAttr extends joint.shapes.basic.CircleAttrs {}
