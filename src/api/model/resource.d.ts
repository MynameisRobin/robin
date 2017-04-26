interface ResourceInfo extends AkBase {
    /** 租户ID index*/
    TenantID?: string;
    /** 资源ID  key*/
    ResourceID?: string;
    /** Name*/
    Name?: string;
    /** 资源的流数据*/
    Resource?: string;
    /** Created*/
    CreatedStr?: string;
    /** on update CURRENT_TIMESTAMP(3)*/
    ModifiedStr?: string;
    /** CreatedBy*/
    CreatedBy?: string;
    /** ModifiedBy*/
    ModifiedBy?: string;
}

/**根据ID获取资源内容 */
interface GetResourceByIdResponse extends AkResponse {
    Data?: ResourceInfo;
}
interface GetResourceByIdRequest extends AkRequest {
    resourceID?: string;
}

/**添加资源  */
interface PostResourceResponse extends AkResponse {
    Data?: string;
}
interface PostResourceRequest extends AkRequest {
    Name?: string;
    Resource?: string;
}

interface PutResourceResponse extends AkResponse {}
interface PutResourceRequest extends AkRequest {}

interface DeleteResourceResponse extends AkResponse {}
interface DeleteResourceRequest extends AkRequest {}
