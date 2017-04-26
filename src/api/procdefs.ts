import {Request} from '../util/request';

export class ProcDefsAPI {
    /**获取已部署流程列表 */
    static async getProcDefs(data?: GetProcDefsRequest) {
        let url : string = "/api/admin/procdefs";
        return await new Request < GetProcDefsRequest,
        GetProcDefsResponse > ().get(url, data);
    }
    /**启用流程定义 */
    static async putEnableStatus(data?: PutEnableStatusRequest) {
        let url : string = "/api/admin/procdefs/enable";
        return await new Request < PutEnableStatusRequest,
        PutEnableStatusResponse > ().put(url, data);
    }
    /**禁用流程定义 */
    static async putDisableStatus(data?: PutDisableStatusRequest) {
        let url : string = "/api/admin/procdefs/disable";
        return await new Request < PutDisableStatusRequest,
        PutDisableStatusResponse > ().put(url, data);
    }

    /**根据ID获取流程定义 */
    static async getProcDefsById(data?: GetProcDefByIDRequest) {
        let url : string = "/api/procdefs/id";
        return await new Request < GetProcDefByIDRequest,
        GetProcDefByIDResponse > ().get(url, data);
    }
    /**根据key获取所有版本号 */
    static async getAllVersionByKey(data?: GetProcdefVersionRequest) {
        let url : string = "/api/procdefs/versions/key";
        return await new Request < GetProcdefVersionRequest,
        GetProcdefVersionResponse > ().get(url, data);
    }
    /**根据key和version获取特定版本流程定义 */
    static async getProcDefsByKeyAndVersion(data?: GetProcdefByIdAndVersionRequest) {
        let url : string = "/api/procdefs/version";
        return await new Request < GetProcdefByIdAndVersionRequest,
        GetProcdefByIdAndVersionResponse > ().get(url, data);
    }

    /**根据key获取最新版本流程定义 */
    static async getProcDefsByKey(data?: GetProcdefBykeyRequest) {
        let url : string = "/api/procdefs/version";
        return await new Request < GetProcdefBykeyRequest,
        GetProcdefBykeyResponse > ().get(url, data);
    }

    /**获取用户持有的流程定义 */
     static async getAllApplication(data:GetAllApplicationsRequest) {
        let url : string = "/api/procdefs";
        return await new Request < GetAllApplicationsRequest,
        GetAllApplicationsResponse > ().get(url,data);
    }

     /**已部署流程详情 修改流程分类 */
    static async putEditCategory(data?: PutEditCategoryRequest) {
        let url : string = "/api/procdefs/category";
        return await new Request < PutEditCategoryRequest,
        PutEditCategoryResponse > ().put(url, data);
    }
}
