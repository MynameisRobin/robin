import {Request} from '../util/request';
export class FlowRulesAPI {

    /**根据key查询 */
    static async getFlowRulesByKey(data?: GetFlowRulesByKeyRequest) {
        let url : string = "/api/admin/flownorules/key";
        return await new Request < GetFlowRulesByKeyRequest,
        GetFlowRulesByKeyResponse > ().get(url, data);
    }
    /**编辑 */
    static async putFlowRules(data : PutFlowRulesRequest) {
        let url : string = "/api/admin/flownorules";
        return await new Request < PutFlowRulesRequest,
        PutFlowRulesResponse > ().put(url, data);
    }
    /**新增 */
    static async postFlowRules(data : PostFlowRulesRequest) {
        let url : string = "/api/admin/flownorules";
        return await new Request < PostFlowRulesRequest,
        PostFlowRulesResponse > ().post(url, data);
    }
    /**删除 */
    static async delFlowRules(data : DeleteFlowRulesRequest) {
        let url : string = "/api/admin/flownorules";
        return await new Request < DeleteFlowRulesRequest,
        DeleteFlowRulesResponse > ().del(url, data);
    }
    /**获取  */
    static async getAllFlowRules(data?: GetAllFlowRulesRequest) {
        let url : string = "/api/admin/flownorules";
        return await new Request < GetAllFlowRulesRequest,
        GetAllFlowRulesResponse > ().get(url, data);
    }
}
