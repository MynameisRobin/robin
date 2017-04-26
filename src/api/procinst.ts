import {Request} from '../util/request';

export class ProcInstAPI {
    static async getProcInst() {
        let url : string = "/api/ProcInsts";
        return await new Request < GetProcInstRequest,
        GetProcInstResponse > ().get(url);
    }
    static async getActivityProcInst(data : GetActiveProcInstRequest) {
        let url : string = "/api/applications";
        return await new Request < GetActiveProcInstRequest,
        GetActiveProcInstResponse > ().get(url, data);
    }
        /**开启一个流程By Key */
    static async postStartProcInstByKey(data : PostStartProcInstByKeyRequest) {
        let url : string = "/api/procinsts/Start/key";
        return await new Request < PostStartProcInstByKeyRequest,
        PostStartProcInstByKeyResponse > ().post(url, data);
    }
    /**开启一个流程By Id */
    static async postStartProcInstById(data : PostStartProcInstByIdRequest) {
        let url : string = "/api/procinsts/Start/id";
        return await new Request < PostStartProcInstByIdRequest,
        PostStartProcInstByIdResponse > ().post(url, data);
    }
    /** 获取流程实例详情 */
    static async getApplicantByUserID(data : GetApplicantRequest) {
        let url : string = "/api/applications/applicant";
        return await new Request < GetApplicantRequest,
        GetApplicantResponse > ().get(url, data);
    }
    static async putProcInst(data : PutProcInstRequest) {
        let url : string = "";
        return await new Request < PutProcInstRequest,
        PutProcInstResponse > ().put(url, data);
    }

    static async postProcInst(data : PostProcInstRequest) {
        let url : string = "";
        return await new Request < PostProcInstRequest,
        PostProcInstResponse > ().post(url, data);
    }
    static async deleteProcInst(data : DeleteProcInstRequest) {
        let url : string = "";
        return await new Request < DeleteProcInstRequest,
        DeleteProcInstResponse > ().del(url, data);
    }
    /** 获取流程实例详情 */
    static async getProcInstItemInfoByID(data : GetProcInstItemByIDRequest) {
        let url : string = "/api/admin/applications/detail";
        return await new Request < GetProcInstItemByIDRequest,
        GetProcInstItemByIDResponse > ().get(url, data);
    }
    /**撤回 */
    static async putProcInstItemRevoke(data : RevokeApplicationRequest) {
        let url : string = "/api/admin/applications/revoke";
        return await new Request < RevokeApplicationRequest,
        RevokeApplicationResponse > ().put(url, data);
    }
    /**取消 */
    static async putProcInstItemCancel(data : CancleApplicationRequest) {
        let url : string = "/api/admin/applications/cancel";
        return await new Request < CancleApplicationRequest,
        CancleApplicationResponse > ().put(url, data);
    }
}
export let ApplicationStatusLocale = "model.application.status.";
export enum ApplicationStatusEnum
{
    /**
     * 草稿
     */
    Draft=-2,
    Any = -1,
    /**开始 */
    Start = 0,
    /** 运行中 */
    Running = 1,
    /** 已结束 */
    Complete = 2,
    /** 拒绝 */
    Reject = 3,
    /** 出错 */
    Error = 4,
    /** 撤回流程 */
    Revoke = 5,
    /** 取消流程 */
    Cancel = 6
}
