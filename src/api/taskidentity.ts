import {Request} from '../util/request';
export class TaskIdentityAPI {
    /** 获取待认领任务 */
    static async GetTaskIdentity(data : GetTaskIdentityRequest) {
        let url : string = "";
        return await new Request < GetTaskIdentityRequest,
        GetTaskIdentityResponse > ().get(url, data);
    }
}
