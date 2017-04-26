/** 参数管理*/
interface Parameter extends AkBase {
    /** 编码 */
    Encoded?: string;
    /** 方式 */
    PayType?: string;
    /** 扩展字段1 */
    Ext1?: string;
    /** 扩展字段2 */
    Ext2?: string;
    /** 排序 */
    Sort?: string;
}

/**参数管理列表 */
interface GetParameterManagerListResponse extends AkResponse {
    Data?: Parameter[]
}
interface GetParameterManagerListRequest extends AkRequest {
    pageIndex?: string;
    pageSize?: string;
}

/**新增参数 */
interface AddParameterResponse extends AkResponse {}
interface AddParameterRequest extends AkRequest {
    /**方式 */
    payType?: string;
    /**排序 */
    sort?: string;
}

/**编辑参数 */
interface EditParameterResponse extends AkResponse {}
interface EditParameterRequest extends AkRequest {
    /**方式 */
    payType?: string;
    /**排序 */
    sort?: string;
}

/**参数管理列表 */
interface DeleteParameterResponse extends AkResponse {}
interface DeleteParameterRequest extends AkRequest {
    /**编码 */
    encoded?: string;
}
