interface JobPositions extends AkBase {
    /**  TenantID  Index */
    TenantID?: string;
    /**  JobPositionID */
    JobPositionID?: string;
    /**  JobPositionName */
    JobPositionName?: string;
    /**  Users */
    Users?: UserInfo[];
}

interface UserInfo extends AkBase {
    Attr?: Object;
    ID?: string;
    Name?: string;
    Type?: Number;
}

enum BindingType {
    JobPosition = 1,
    Dept = 2,
    Location = 3
}

/**添加或更新时 Request参数 */
interface JobPositionParam extends AkBase {
    ID?: string,
    Name?: string;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    UserIDs?: string[],
    BindingType?: BindingType;
    BindingTargetID?: string;
}

/***获取岗位管理列表 */
interface GetJobPositionsResponse extends AkResponse {
    Data?: JobPositions[]
}
interface GetJobPositionsRequest extends AkRequest {
    bindingType?: BindingType;
    bindingTargetID?: string;
}

/***删除 */
interface DeleteJobPositionsResponse extends AkResponse {}
interface DeleteJobPositionsRequest extends AkRequest {
    jobPositionID?: string;
}

/***新增 */
interface PostJobPositionsResponse extends AkResponse {}
interface PostJobPositionsRequest extends AkRequest {
    ID?: string,
    Name?: string;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    UserIDs?: string[],
    BindingType?: BindingType;
    BindingTargetID?: string;
}

/***更新 */
interface PutJobPositionsResponse extends AkResponse {}
interface PutJobPositionsRequest extends AkRequest {
    ID?: string,
    Name?: string;
    Ext1?: string;
    Ext2?: string;
    Ext3?: string;
    UserIDs?: string[],
    BindingType?: BindingType;
    BindingTargetID?: string;
}
