import {Request} from "../../util/request";

export const AkIdentityType_User = 1;
export const AkIdentityType_Organization = 2;
export const AkIdentityType_Group = 3;
export const AkIdentityType_Role = 4;
export const AkIdentityType_Location = 5;

// export type AkIdentityType = AkIdentityType_User|AkIdentityType_Organization|AkIdentityType_Group|AkIdentityType_Role|AkIdentityType_Location;

export class AkIdentity {
    constructor(identity?: AkIdentity) {
        if (identity) {
            this.ID = identity.ID;
            this.Name = identity.Name;
            this.Type = identity.Type;
            this.Attr = identity.Attr;
        }
    }
    ID: string; //标示
    Name?: string; //显示名
    Type: number;
    Attr?: Object; //其它属性
}

export class AkUser extends AkIdentity {

    get Login(): string {
        return this.Attr['Login'];
    }

    set Login(value: string) {
        this.Attr['Login'] = value;
    }

    get Email(): string {
        return this.Attr['Email'];
    }

    set Email(value: string) {
        this.Attr['Email'] = value;
    }

    get Picture(): string {
        return this.Attr['Picture'];
    }

    set Picture(value: string) {
        this.Attr['Picture'] = value;
    }

    get PersonalSite(): string {
        return this.Attr['PersonalSite'];
    }

    set PersonalSite(value: string) {
        this.Attr['PersonalSite'] = value;
    }

    get LineManager(): string {
        return this.Attr['LineManager'];
    }

    set LineManager(value: string) {
        this.Attr['LineManager'] = value;
    }
}

export class AkOrganization extends AkIdentity {

    get Parent(): string {
        return this.Attr['ParentID'];
    }

    get Manager(): string {
        return this.Attr['Manager'];
    }
}

export class AkPosition extends AkIdentity {
}

export class AkGroup extends AkIdentity {
}

export class AkLocation extends AkIdentity {
}

interface IdentityRequest {
    ID?: string,
    Type?: number
}

export interface ResolveIdentityRequest extends AkRequest {
    identities: IdentityRequest[]
}

export interface  SearchIdentitiesRequest extends AkRequest {
    keyword: string,
    types: number[],
    rowCount: number
}

export interface  SearchUserRequest extends AkRequest {
    keyword?: string,
    orgId?: string,
    pageIndex?: number,
    pageSize?: number
}


interface  IdentitiesResponse extends AkResponse {
    Data?: AkIdentity[];
}

interface GetOrganizationsResponse extends AkResponse {
    Data?: AkIdentity[];
}

export class IdentityAPI {

    /**
     * 根据Identity的key解析对象
     * todo: 需要同时传入Identiyt的Type
     * @param vals
     * @returns {Promise<IdentitiesResponse>}
     */
    static async resolveIdentities(data: ResolveIdentityRequest) {
        let url: string = "/api/identities/resolve";
        return await new Request < ResolveIdentityRequest,
            IdentitiesResponse >().post(url, data);
    }

    /**
     * 根据Keyword查询Identity
     * @param data
     * @returns {Promise<IdentitiesResponse>}
     */
    static async searchIdentities(data: SearchIdentitiesRequest) {
        let url: string = "/api/identities/search";
        return await new Request < SearchIdentitiesRequest,
            IdentitiesResponse >().post(url, data);
    }

    /**
     * 根据条件搜索用户
     * @param data
     * @returns {Promise<IdentitiesResponse>}
     */
    static async searchUser(data: SearchUserRequest) {
        let url: string = "/api/identities/user/search";
        return await new Request < SearchUserRequest,
            IdentitiesResponse >().get(url, data);
    }

    /**
     * 将identity的数组，转换成字典对象
     * @param identities
     * @returns {{}}
     */
    static identityArray2Dict(identities: AkIdentity[]): Object {
        let value = {};
        identities.forEach(val => {
            value[val.ID] = val;
        });
        return value;
    }

    /**
     * 将identity字典对象，转成数组
     * @param dict
     * @returns {AkIdentity[]}
     */
    static identityDict2Array(dict: Object): AkIdentity[] {
        return Object.keys(dict).map(k => {
            return dict[k];
        });
    }

    /**
     * 获取所有的组织
     * @returns {Promise<IdentitiesResponse>}
     */
    static async getOrganizations() {
        // let mock: IdentitiesResponse = {
        //     Status: "0",
        //     Message: "",
        //     Data: [
        //         {ID: "1", Type: "ORGANIZATION", Name: "部门根结点blablabla", Attr: {Parent: "", Manager: ""}},
        //         {ID: "2", Type: "ORGANIZATION", Name: "子结点1blablabla", Attr: {Parent: "1", Manager: ""}},
        //         {ID: "3", Type: "ORGANIZATION", Name: "子节点2blablabla", Attr: {Parent: "1", Manager: ""}},
        //         {ID: "4", Type: "ORGANIZATION", Name: "子节点11blablabla", Attr: {Parent: "2", Manager: ""}},
        //         {ID: "5", Type: "ORGANIZATION", Name: "子节点111blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "6", Type: "ORGANIZATION", Name: "子节点112blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "7", Type: "ORGANIZATION", Name: "子节点113blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "8", Type: "ORGANIZATION", Name: "子节点114blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "9", Type: "ORGANIZATION", Name: "子节点115blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "10", Type: "ORGANIZATION", Name: "子节点162blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "11", Type: "ORGANIZATION", Name: "子节点163blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "12", Type: "ORGANIZATION", Name: "子节点164blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "13", Type: "ORGANIZATION", Name: "子节点165blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "14", Type: "ORGANIZATION", Name: "子节点166blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "15", Type: "ORGANIZATION", Name: "子节点167blablabla", Attr: {Parent: "4", Manager: ""}},
        //         {ID: "16", Type: "ORGANIZATION", Name: "子节点168blablabla", Attr: {Parent: "4", Manager: ""}},
        //
        //     ]
        // }
        // return Promise.resolve<IdentitiesResponse>(mock);
        let url: string = "/api/identities/organizations";
        return await new Request < null,
            IdentitiesResponse >().get(url);
    }

    /**
     * 获取所有地区信息
     * @returns {Promise<IdentitiesResponse>}
     */
    static async getLocations() {
        // let mock: IdentitiesResponse = {
        //     Status: "0",
        //     Message: "",
        //     Data: [
        //         {ID: "1", Type: "LOCATION", Name: "北京"},
        //         {ID: "2", Type: "LOCATION", Name: "上海"},
        //         {ID: "3", Type: "LOCATION", Name: "西安"},
        //     ]
        // }
        //
        // return Promise.resolve<IdentitiesResponse>(mock);
        let url: string = "/api/identities/locations";
        return await new Request < null,
            IdentitiesResponse >().get(url);
    }

    /**
     * 获取所有岗位信息
     * @returns {Promise<IdentitiesResponse>}
     */
    static async getJobPositions() {
        // let mock: IdentitiesResponse = {
        //     Status: "0",
        //     Message: "",
        //     Data: [
        //         {ID: "1", Type: "ROLE", Name: "角色1"},
        //         {ID: "2", Type: "ROLE", Name: "角色2"},
        //         {ID: "3", Type: "ROLE", Name: "角色3"},
        //         {ID: "4", Type: "ROLE", Name: "角色4"},
        //         {ID: "5", Type: "ROLE", Name: "角色5"},
        //     ]
        // }
        //
        // return Promise.resolve<IdentitiesResponse>(mock);
        let url: string = "/api/identities/positions";
        return await new Request < null,
            IdentitiesResponse >().get(url);
    }

    /**
     * 获取所有组信息
     * @returns {Promise<IdentitiesResponse>}
     */
    static async getGroups() {
        // let mock: IdentitiesResponse = {
        //     Status: "0",
        //     Message: "",
        //     Data: [
        //         {ID: "1", Type: "GROUP", Name: "组1"},
        //         {ID: "2", Type: "GROUP", Name: "组2"},
        //         {ID: "3", Type: "GROUP", Name: "组3"},
        //         {ID: "5", Type: "GROUP", Name: "组5"},
        //     ]
        // }
        //
        // return Promise.resolve<IdentitiesResponse>(mock);
        let url: string = "/api/identities/groups";
        return await new Request < null,
            IdentitiesResponse >().get(url);
    }

}
