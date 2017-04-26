/** 获取已部署流程详情 返回值 GET /api/procdefs/id */
interface GetProcDefByIDResponse extends AkResponse {
    Data?: ProcessInfo
}
interface GetProcDefByIDRequest extends AkRequest {
    procDefID?: string;
}

/** 根据key获取所有版本号 GET /api/procdefs/versions/key */
interface GetProcdefVersionResponse extends AkResponse {
    Data?: []
}
interface GetProcdefVersionRequest extends AkRequest {
    key?:string;
}

/**根据key和version获取特定版本流程定义 */
interface GetProcdefByIdAndVersionResponse extends AkResponse {
    Data?: ProcessInfo
}
interface GetProcdefByIdAndVersionRequest extends AkRequest {
    key?:string;
    version?:string;
}

/***根据key获取最新版本流程定义 */
interface GetProcdefBykeyResponse extends AkResponse {
    Data?: ProcessInfo
}
interface GetProcdefBykeyRequest extends AkRequest {
    key?:string;
}


/**已部署流程 列表 */
interface GetProcDefsRequest extends AkRequest {
    categoryID?: string;
    flowName?: string;
    flowKey?: string;
    isItemPerm?: string;
    status?: string;
    pageIndex?: string;
    pageSize?: string;
}
interface GetProcDefsResponse extends AkResponse {
    Data?: ProcessInfo[]
}

/**启用已部署流程（状态） 列表 */
interface PutEnableStatusRequest extends AkRequest {
    ProcDefID?: string;
}
interface PutEnableStatusResponse extends AkResponse {
    Data?: string;
}

/**禁用已部署流程（状态） 列表 */
interface PutDisableStatusRequest extends AkRequest {
    ProcDefID?: string;
}
interface PutDisableStatusResponse extends AkResponse {
    Data?: string;
}

/*** 新建流程 */
interface GetAllApplicationsResponse extends AkResponse {
    Data?:ProcessInfo[]
}
interface GetAllApplicationsRequest extends AkRequest {
    categoryID?:string;
    flowName?:string;
    pageIndex?:string;
    pageSize?:string;
}

/***已部署流程详情 修改流程分类 */
interface PutEditCategoryResponse extends AkResponse {
}
interface PutEditCategoryRequest extends AkRequest {
    categoryID?:string;
    key?:string;
}
