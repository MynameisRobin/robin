import {Request} from '../util/request';
export class ResourceAPI {
    /**根据ID获取流程资源 */
    static async getResourceById(data?: GetResourceByIdRequest) {
        let url : string = "/api/admin/resources/id";
        return await new Request < GetResourceByIdRequest,
        GetResourceByIdResponse > ().get(url,data);
    }

    static async putResource(data : PutResourceRequest) {
        let url : string = "";
        return await new Request < PutResourceRequest,
        PutResourceResponse > ().put(url, data);
    }
    /**添加资源 */
    static async postResource(data : PostResourceRequest) {
        let url : string = "/api/admin/resources";
        return await new Request < PostResourceRequest,
        PostResourceResponse > ().post(url, data);
    }
    static async delResource(data : DeleteResourceRequest) {
        let url : string = "";
        return await new Request < DeleteResourceRequest,
        DeleteResourceResponse > ().del(url, data);
    }

}
