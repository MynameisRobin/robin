import {Request} from "../../util/request";

export class MetadataAPI {

    /**
     * 查询metadata的分类
     * @returns {Promise<GetCategoryResponse>}
     */
    static async getCategorys() {
        let url: string = "/api/metadata/categories";
        return await new Request < null,
            GetMetadataCategoryResponse >().get(url);
    }

    /**
     * 查询metadata，返回一级的数据
     * @param request
     * @returns {Promise<GetCategoryResponse>}
     */
    static async get(request: GetMetadataRequest) {
        let url: string = "/api/metadata";
        return await new Request < GetMetadataRequest,
            GetMetadataResponse >().get(url, request);
    }
}
