import {Request} from '../util/request';
export class ProcModelAPI {
/***获取所有的申请 */
    static async getProcModel(data:GetProcModelRequest) {
        let url : string = "/api/admin/procmodels";
        return await new Request < GetProcModelRequest,
        GetProcModelResponse > ().get(url,data);
    }
    /**获取流程定义库详情 */
    static async getProcModelByID(data : GetProcModelByIDRequest) {
        let url : string = "/api/admin/procmodels/id";
        return await new Request < GetProcModelByIDRequest,
        GetProcModelByIDResponse > ().get(url, data);
    }
    static async getProcModelByCategory(data : GetProcModelByCategoryRequest) {
        let url : string = "";
        return await new Request < GetProcModelByCategoryRequest,
        GetProcModelByCategoryResponse > ().get(url, data);
    }
    /**添加流程 */
    static async postProcModel(data : PostProcModelRequest) {
        let url : string = "/api/admin/procmodels";
        return await new Request < PostProcModelRequest,
        PostProcModelResponse > ().post(url, data);
    }
    /**流程复制 */
    static async copyProcModel(data : CopyProcModelRequest) {
        let url : string = "/api/admin/procmodels/copy";
        return await new Request < CopyProcModelRequest,
        CopyProcModelResponse > ().post(url, data);
    }
    /**发布流程 */
    static async deployProcModel(data : DeployProcModelRequest) {
        let url : string = "/api/admin/procmodels/deploy";
        return await new Request < DeployProcModelRequest,
        DeployProcModelResponse > ().put(url, data);
    }
    /**更新流程定义库 */
    static async putProcModel(data : PutProcModelRequest) {
        let url : string = "/api/admin/procmodels/basicinfo";
        return await new Request < PutProcModelRequest,
        PutProcModelResponse > ().put(url, data);
    }
    static async putBasicProcModel(data : PutProcModelBasicRequest) {
        let url : string = "/api/procmodels";
        return await new Request < PutProcModelBasicRequest,
        PutProcModelBasicResponse > ().put(url, data);
    }
    static async putCategoryProcModel(data : PutProcModelCategoryRequest) {
        let url : string = "";
        return await new Request < PutProcModelCategoryRequest,
        PutProcModelCategoryResponse > ().put(url, data);
    }
    static async putIconProcModel(data : PutProcModelIconRequest) {
        let url : string = "";
        return await new Request < PutProcModelIconRequest,
        PutProcModelIconResponse > ().put(url, data);
    }
    static async putProcModelDef(data : PutProcModelDefRequest) {
        let url : string = "/api/admin/procmodels/def";
        return await new Request < PutProcModelDefRequest,
        PutProcModelDefResponse > ().put(url, data);
    }

    static async delProcModel(data : DeleteProcModelRequest) {
        let url : string = "";
        return await new Request < DeleteProcModelRequest,
        DeleteProcModelResponse > ().del(url, data);
    }
}

