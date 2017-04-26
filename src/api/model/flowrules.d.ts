interface FlowRules extends AkBase {
    TenantID?: string;
    DefKey?: string;
    Prefix?: string;
    StartIndex?: string;
    CustomLength?: string;
    AutoIncrement?: string;
    CurrentNo?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
}

/**新增 */
interface PostFlowRulesResponse extends AkResponse {}
interface PostFlowRulesRequest extends AkRequest {
    defKey?: string;
    startIndex?: string;
    customLength?: string;
    autoIncrement?: string;
    prefix?: string;
}

/**编辑 */
interface PutFlowRulesResponse extends AkResponse {}
interface PutFlowRulesRequest extends AkRequest {
    defKey?: string;
    startIndex?: string;
    customLength?: string;
    autoIncrement?: string;
    prefix?: string;
}

interface DeleteFlowRulesResponse extends AkResponse {}
interface DeleteFlowRulesRequest extends AkRequest {}

/**根据key查询 */
interface GetFlowRulesByKeyResponse extends AkResponse {
    Data : FlowRules
}
interface GetFlowRulesByKeyRequest extends AkRequest {
    defKey?: string;
}

/**查询所有流程编号规则 */
interface GetAllFlowRulesResponse extends AkResponse {
    Data : FlowRules[]
}
interface GetAllFlowRulesRequest extends AkRequest {
    defKey?: string;
    pageIndex?: string;
    pageSize?: string;
}
