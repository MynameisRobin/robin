interface ProcDraftInfo extends AkBase {
    /** TenantID */
    TenantID?: string;
    /** ProcDraftID */
    ProcDraftID?: string;
    /** ProcDefID */
    ProcDefID?: string;
    /** 表单数据 */
    FormDATA?: string;
    /** Created */
    CreatedStr?: string;
    /** on update CURRENT_TIMESTAMP(3) */
    ModifiedStr?: string;
    /** CreatedBy */
    CreatedBy?: string;
    /** ModifiedBy */
    ModifiedBy?: string;
}

/**分页获取用户所有流程草稿 */
interface GetProcDraftResponse extends AkResponse {
    Data?: ProcDraftInfo[];
}
interface GetProcDraftRequest extends AkRequest {
    pageIndex?: string;
    pageSize?: string;
}

interface GetProcDraftByIDResponse extends AkResponse {
    Data?: ProcDraftInfo
}
interface GetProcDraftByIDRequest extends AkRequest {
    procDraftID?: string;
}

/**保存草稿 */
interface PostProcDraftResponse extends AkResponse {}
interface PostProcDraftRequest extends AkRequest {
    ProcDefID?: string;
    FormData?: string;
}

/** 更新草稿*/
interface PutProcDraftResponse extends AkResponse {}
interface PutProcDraftRequest extends AkRequest {
    ProcDraftID?: string;
    ProcDefID?: string;
    FormData?: string;
}

/**刪除草稿 */
interface DeleteProcDraftResponse extends AkResponse {}
interface DeleteProcDraftRequest extends AkRequest {
    procDraftID?: string;
}
