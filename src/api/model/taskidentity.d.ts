interface TaskIdentityInfo extends AkBase {
    /** TenantID */
    TenantID?: string;
    /** TaskIdentityID */
    TaskIdentityID?: string;
    /** TaskID */
    TaskID?: string;
    /** Type */
    Type?: number;
    /** IdentityType */
    IdentityType?: number;
    /** IdentityID */
    IdentityID?: string;
    /** ProcDefID */
    ProcDefID?: string;
    /** ProcInstID */
    ProcInstID?: string;
    /** Created */
    CreatedStr?: string;
    /** on update CURRENT_TIMESTAMP(3) */
    ModifiedStr?: string;
    /** CreatedBy */
    CreatedBy?: string;
    /** ModifiedBy */
    ModifiedBy?: string;
}

interface GetTaskIdentityResponse extends AkResponse {
    /**  */
    Data?: TaskIdentityInfo[]
}
interface GetTaskIdentityRequest extends AkRequest {
    pageSize : number;
    pageIndex : number;
}
