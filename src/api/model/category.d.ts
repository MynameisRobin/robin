interface CategoryInfo extends AkBase {
    /**  TenantID  Index */
    TenantID?: string;
    /**  CategoryID  Pk */
    CategoryID?: string;
    /**  Name */
    Name?: string;
    /**  Localization */
    Localization?: string;
    /**  Created */
    CreatedStr?: string;
    /**  on update CURRENT_TIMESTAMP(3) */
    ModifiedStr?: string;
    /**  CreatedBy */
    CreatedBy?: string;
    /**  ModifiedBy */
    ModifiedBy?: string;
}

interface GetCategoryResponse extends AkResponse {
    Data?: CategoryInfo[]
}
interface GetCategoryRequest extends AkRequest {
    name?: string;
    pageIndex?: string;
    pageSize?: string;
}

interface PostCategoryResponse extends AkResponse {
    Data?:string;
}
interface PostCategoryRequest extends AkRequest {
    Name?: string;
    Localization?: string;
}

interface PutCategoryResponse extends AkResponse {
    Data?: string;
}
interface PutCategoryRequest extends AkRequest {
    CategoryID?: string;
    Name?: string;
    Localization?: string;
}

interface DeleteCategoryResponse extends AkResponse {
    Data?: string;
}
interface DeleteCategoryRequest extends AkRequest {
    categoryID?: number;
}
