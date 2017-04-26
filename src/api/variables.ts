import {Request} from '../util/request';
/** 获取流程变量 */
export class VariableAPI {
    /** 根据ApplicationID获取流程变量 */
    static async getVariableByApplication(data : GetVariablesByApplicationIDRequest) {
        let url : string = "/api/variables";
        return await new Request < GetVariablesByApplicationIDRequest,
        GetVariablesByApplicationIDResponse > ().get(url, data);
    }
}
