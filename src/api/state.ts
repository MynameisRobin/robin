import {Request} from '../util/request';
export class StateAPI {

    static async getState(data?: GetStateRequest) {
        let url : string = "/api/state";
        return await new Request < GetStateRequest,
        GetStateResponse > ().get(url, data);
    }
    static async putState(data : PutStateRequest) {
        let url : string = "";
        return await new Request < PutStateRequest,
        PutStateResponse > ().put(url, data);
    }
    static async postState(data : PostStateRequest) {
        let url : string = "";
        return await new Request < PostStateRequest,
        PostStateResponse > ().post(url, data);
    }
    static async delState(data : DeleteStateRequest) {
        let url : string = "";
        return await new Request < DeleteStateRequest,
        DeleteStateResponse > ().del(url, data);
    }
}
