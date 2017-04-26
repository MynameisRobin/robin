import {Request} from '../util/request';

export class ProcDraftsAPI {
    /** 分页获取用户所有流程草稿 */
    static async getProcDrafts(data?: GetProcDraftRequest) {
        let url : string = "/api/procdrafts";
        return await new Request < GetProcDraftRequest,
        GetProcDraftResponse > ().get(url, data);
    }
    /**获取单个流程草稿 */
    static async getProcDraftsByID(data?: GetProcDraftByIDRequest) {
        let url : string = "/api/procdrafts/id";
        return await new Request < GetProcDraftByIDRequest,
        GetProcDraftByIDResponse > ().get(url, data);
    }
    /**保存草稿 */
    static async postProcDrafts(data?: PostProcDraftRequest) {
        let url : string = "/api/procdrafts";
        return await new Request < PostProcDraftRequest,
        PostProcDraftResponse > ().post(url, data);
    }
    /**更新草稿 */
    static async putProcDrafts(data?: PutProcDraftRequest) {
        let url : string = "/api/procdrafts";
        return await new Request < PutProcDraftRequest,
        PutProcDraftResponse > ().put(url, data);
    }

    /**删除草稿 */
    static async deleteProcDrafts(data?: DeleteProcDraftRequest) {
        let url : string = "/api/procdrafts";
        return await new Request < DeleteProcDraftRequest,
        DeleteProcDraftResponse > ().put(url, data);
    }
}
