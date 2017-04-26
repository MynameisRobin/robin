
/**MetaData 基础信息 */
interface MetadataInfo extends AkBase {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Level?: number;
    Localization?: string;
    Mapping?: string;
    Name?: string;
    Order?: number;
    ParentID?: string;
    Status?: number;
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
}

/**MetaData 分类信息 */
interface MetadataCategoryInfo extends AkBase {
    CategoryID: string;
    Code: string;
    Description: string;
    Ext: string;
    Localization: string;
    Name: string;
    Status: number;
    TenantID: string;
    CreatedStr: string;
    CreatedBy: string;
    ModifiedStr: string;
    ModifiedBy: string;
}

/**获取分类 */
interface GetMetadataCategoryResponse extends AkResponse {
    Data?: MetadataCategoryInfo[]
}


/**管理员获取category列表**/
interface AdminGetMetadataCategoryRequest extends AkRequest {
    status?: number;
    pageIndex?: string;
    pageSize?: string;
}

/**新建分类 */
interface PostMetadataCategoryResponse extends AkResponse {
    Data?: MetadataCategoryInfo[]
}
interface PostMetadataCategoryRequest extends AkRequest {
    Code?: string;
    Name?: string;
    Description?: string;
    Localization?: string;
    Ext?: string;
    Status?: boolean;
}

/**修改分类 */
interface PutMetadataCategoryResponse extends AkResponse {
    Data?: MetadataCategoryInfo[]
}
interface PutMetadataCategoryRequest extends AkRequest {
    Code?: string;
    Name?: string;
    Ext?: string;
    Order?: number;
    Description?: string;
}

/**删除分类 */
interface PutMetadataCategoryDelResponse extends AkResponse {
    Data?: MetadataCategoryInfo[]
}
interface PutMetadataCategoryDelRequest extends AkRequest {
    CategoryID?: string;
    Status?: boolean;
}

/**参数管理列表 */
interface GetMetadataResponse extends AkResponse {
    Data?: MetadataInfo[]
}

/**获取metadata**/
interface GetMetadataRequest extends AkRequest {
    categoryID: string;
    parentID?: string;
}


interface AdminGetMetadataRequest extends AkRequest {
    status: number;
    categoryID: string;
    parentID: string;
}

interface PostMetadataResponse extends AkResponse {
}
interface PostMetadataRequest extends AkRequest {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Name?: string;
    Order?: number;
    ParentID?: string;
    Status?: number;
    Mapping?: string;
    Localization?: string,
}
/**更新 */
interface PutMetadataResponse extends AkResponse {
}
interface PutMetadataRequest extends AkRequest {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Level?: number;
    Localization?: string;
    Mapping?: string;
    Name?: string;
    ParentID?: string;
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
    Order?: number;
    Status?: number;
}
/**删除 */
interface PutMetadataDelResponse extends AkResponse {
}
interface PutMetadataDelRequest extends AkRequest {
    CategoryID?: string;
    ID?: string;
    Status?: boolean;
}


/**新增参数 */
interface AddMetadataResponse extends AkResponse { }
interface AddMetadataRequest extends AkRequest {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Level?: number;
    Localization?: string;
    Mapping?: string;
    Name?: string;
    ParentID?: string;
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
    Order?: number;
    Status?: number;
}

/**编辑 */
interface EditMetadataResponse extends AkResponse { }
interface EditMetadataRequest extends AkRequest {
    CategoryID?: string;
    Code?: string;
    Description?: string;
    Ext?: string;
    ID?: string;
    Level?: number;
    Localization?: string;
    Mapping?: string;
    Name?: string;
    ParentID?: string;
    TenantID?: string;
    CreatedStr?: string;
    CreatedBy?: string;
    ModifiedStr?: string;
    ModifiedBy?: string;
    Order?: number;
    Status?: number;
}

/**参数管理列表 */
interface DeleteMetadataResponse extends AkResponse { }
interface DeleteMetadataRequest extends AkRequest {
    CategoryID?: string;
    ID?: string;
    Status?: boolean;
}
