import {Request} from "../util/request";
/** 我的申请 */
export class AdminMetadataAPI {
    /**获取分类列表(Root节点) */
    static async GetMetadataCategoryList(data?: AdminGetMetadataCategoryRequest) {
        let url: string = "/api/admin/metadata/categories";
        return await new Request<AdminGetMetadataCategoryRequest,
            GetMetadataCategoryResponse>().get(url, data);
    }
    /**新建分类列表(Root节点) */
    static async PostMetadataCategoryList(data?: PostMetadataCategoryRequest) {
        let url: string = "/api/admin/metadata/categories";
        return await new Request<PostMetadataCategoryRequest,
            PostMetadataCategoryResponse>().post(url, data);
    }
    /**更新分类列表(Root节点) */
    static async PutMetadataCategoryList(data?: PutMetadataCategoryRequest) {
        let url: string = "/api/admin/metadata/categories";
        return await new Request<PutMetadataCategoryRequest,
            PutMetadataCategoryResponse>().put(url, data);
    }
    /**删除分类 */
    static async PutMetadataCategoryDel(data?: PutMetadataCategoryDelRequest) {
        let url: string = "/api/admin/metadata/categories/editstatus";
        return await new Request<PutMetadataCategoryDelRequest,
            PutMetadataCategoryDelResponse>().put(url, data);
    }
    /**获取参数管理列表 */
    static async getMetadataList(data?: AdminGetMetadataRequest) {
        let url: string = "/api/admin/metadata";
        return await new Request<AdminGetMetadataRequest,
            GetMetadataResponse>().get(url, data);
    }
    /**添加下级 */
    static async postMetadataList(data?: PostMetadataRequest) {
        let url: string = "/api/admin/metadata";
        return await new Request<PostMetadataRequest,
            PostMetadataResponse>().post(url, data);
    }
    /**更新下级参数 */
    static async putMetadataList(data?: PutMetadataRequest) {
        let url: string = "/api/admin/metadata";
        return await new Request<PutMetadataRequest,
            PutMetadataResponse>().put(url, data);
    }
    /**删除下级 */
    static async putMetadataDel(data?: PutMetadataDelRequest) {
        let url: string = "/api/admin/metadata/editstatus";
        return await new Request<PutMetadataDelRequest,
            PutMetadataDelResponse>().put(url, data);
    }
}
