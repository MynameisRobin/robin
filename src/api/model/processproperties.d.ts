/**基础属性 */
interface ProcessProperties {
    /**更新Stencil文字/值 */
    updateLabel?: (value?: any) => void;
    resourceid?: string;
    properties?: {
        [key: string]: any;
    };
    pageurls?: PageVariable[];
    variables?: Variables;
    /**流程页面 */
    flowPage?:FlowPage;
    childshapes?: ProcessShape[];
    // stencil?: {
    //     id: string;
    // };
    defBlod?: any;
}

interface ProcessShape {
    resourceid?: string;
    properties?: {
        [key: string]: string;
    };
    stencil?: {
        id: string;
    };
    target?: Resource;
    source?: Resource;
    outgoing?: Resource[];
    incoming?: Resource[];
    //childshapes?:ProcessShape[]; can have children?
}

interface AkProcessCondition {
    pre?: 'and' | 'or' | string;
    left?: string;
    op?: string;
    right?: string;
    conditions?: AkProcessCondition[];
}

interface PageVariable {
    id?: string;
    name?: string;
    url?: string;
}

interface Variables {
    basic : Variable[],
    listref : ListRef[]
}

interface ListRef {
    id : string;
    name : string;
    fields : Variable[];
}

interface Variable {
    id?: string;
    name?: string;
    type?: string;
    key?: string;
    value?: string;
    defaultvalue?: string;
    params?: {}
}
interface Resource {
    resourceid : string;
}

/**流程页面 */
interface FlowPage {
    /**页面名称 */
    pageName?: string;
    /**申请页面 */
    applyPage?: string;
    /**审批页面 */
    approvalPage?: string;
}

interface TaskAssignee {
    type?: 'user'|'positions';
    method?: 'direct'|'expression'|'positions'|'positionloc'|'positionlocexpr'|'positionorg'|'positionorgexpr';
    position?: string;
    value?: string;
    title?: string;
}
