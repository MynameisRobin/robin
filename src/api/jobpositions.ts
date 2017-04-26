import {Request} from '../util/request';
export class JobPositionsAPI {
    /**获取列表 */
    static async getJobPositions(data?: GetJobPositionsRequest) {
        let url : string = "/api/admin/jobpositions";
        return await new Request < GetJobPositionsRequest,
        GetJobPositionsResponse > ().get(url, data);
    }
    /**新增 */
    static async postJobPositions(data?: PostJobPositionsRequest) {
        let url : string = "/api/admin/jobpositions";
        return await new Request < PostJobPositionsRequest,
        PostJobPositionsResponse > ().post(url, data);
    }
    /**更新 */
    static async putJobPositions(data?: PutJobPositionsRequest) {
        let url : string = "/api/admin/jobpositions";
        return await new Request < PutJobPositionsRequest,
        PutJobPositionsResponse > ().put(url, data);
    }
    /**删除 */
    static async deleteJobPositions(data?: DeleteJobPositionsRequest) {
        let url : string = "/api/admin/jobpositions";
        return await new Request < DeleteJobPositionsRequest,
        DeleteJobPositionsResponse > ().del(url, data);
    }
}
