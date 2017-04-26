import { Request } from '../util/request';
/** 我的申请 */
export class ApplyAPI {
    /** 获取申请列表(我的) */
    static async getApply(data: GetApplyRequest) {
        let url: string = "/api/applications";
        return await new Request<GetApplyRequest,
            GetApplyResponse>().get(url, data);
    }
    static async putApply(data: PutApplyRequest) {
        let url: string = "/api/applications";
        return await new Request<PutApplyRequest,
            PutCategoryResponse>().put(url, data);
    }
    static async postApply(data: PostApplyRequest) {
        let url: string = "/api/applications";
        return await new Request<PostApplyRequest,
            PostCategoryResponse>().post(url, data);
    }
    static async delApply(data: DeleteApplyRequest) {
        let url: string = "/api/applications";
        return await new Request<DeleteApplyRequest,
            DeleteCategoryResponse>().del(url, data);
    }
}
