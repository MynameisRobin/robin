interface ProcessInfo extends AkBase {
    /** TenantID */
    TenantID?: string;
    /** ProcDefID Pk */
    ID?: string;
    /** CategoryID */
    CategoryID?: string;
    /** 类别名称 */
    CategoryName?: string;
    /** Name */
    Name?: string;
    /** Localization */
    Localization?: string;
    /** 流程key，对应于程序访问 */
    Key?: string;
    /** Version */
    Version?: number;
    /** Description */
    Description?: string;
    /** 流程定义内容JSON/XML的ResourceID */
    DefResourceID?: string;
    /**json数据 */
    DefBlob?: string;
    /** ImgResourceID */
    ImgResourceID?: string;
    /**图片数据 */
    ImgBlob?: string;
    /** IconURL */
    IconURL?: string;
    /** 状态, 0:未激活 1:正常 */
    Status?: number;
    /** 是否设置权限，0:未设置 */
    IsItemPerm?: boolean;
    /** DeployTime */
    DeployTimeStr?: string;
    /** DeployedDefID */
    DeployedDefID?: string;
    /** 流程发起对应表单URL地址 */
    FormURL?: string;
    /** Created */
    CreatedStr?: string;
    /** on update CURRENT_TIMESTAMP(3) */
    ModifiedStr?: string;
    /** CreatedBy */
    CreatedBy?: string;
    /** ModifiedBy */
    ModifiedBy?: string;
}

interface GetProcModelByCategoryResponse extends AkResponse {}
interface GetProcModelByCategoryRequest extends AkRequest {}

interface GetProcModelByIDResponse extends AkResponse {
    Data?: ProcessInfo
}
interface GetProcModelByIDRequest extends AkRequest {
    procModelID?: string;
}

interface GetProcModelResponse extends AkResponse {

    Data?: ProcessInfo[]
}
interface GetProcModelRequest extends AkRequest {
    pageSize?: string;
    pageIndex?: string;
    categoryID?: string;
    status?: string;
    name?: string;
    key?: string;
}

/*** 添加流程模型*/
interface PostProcModelResponse extends AkResponse {
    Data?: string;
}
interface PostProcModelRequest extends AkRequest {
    ProcModelID?: string;
    Name?: string;
    CategoryID?: string;
    Description?: string;
    Key?: string;
    Localization?: string;
    FormUrl?: string;
    IconUrl?: string;
}
/**
 * 流程复制
 */
interface CopyProcModelResponse extends AkResponse {
    Data?: string;
}
/**
 * 流程复制
 */
interface CopyProcModelRequest extends AkRequest {
    Key?: string;
    Name?: string;
    ProcModelID?: string;
}

/**更新流程定义 */
interface PutProcModelResponse extends AkResponse {
    Data?:string;
}
interface PutProcModelRequest extends AkRequest {
    /**定义ID */
    ProcModelID?: string;
    Name?: string;
    CategoryID?:string;
    Description?:string;
    Key?:string;
    Localization?:string;
    FormUrl?:string;
    IconUrl?:string;
}

interface DeployProcModelResponse extends AkResponse {
    Data?: string
}
interface DeployProcModelRequest extends AkRequest {
    ProcModelID?: string;
}

interface PutProcModelBasicResponse extends AkResponse {}
interface PutProcModelBasicRequest extends AkRequest {}

/**
 * 更新Category
 */
interface PutProcModelCategoryResponse extends AkResponse {}
/**
 * 更新Category
 */
interface PutProcModelCategoryRequest extends AkRequest {}

/**
 * 更新Icon
 */
interface PutProcModelIconResponse extends AkResponse {}
/**
 * 更新Icon
 */
interface PutProcModelIconRequest extends AkRequest {}

/**
 * 更新Def
 */
interface PutProcModelDefResponse extends AkResponse {
    Data?: string;
}
/**
 * 更新Def
 */
interface PutProcModelDefRequest extends AkRequest {
    DefBlob?: string;
    ImgBlob?: string;
    Name?: string;
    ProcModelID?: string;
    ImgResourceID?:string;
    DefResourceID?:string;
}

interface DeleteProcModelResponse extends AkResponse {}
interface DeleteProcModelRequest extends AkRequest {}

