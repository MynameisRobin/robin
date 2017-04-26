interface StateInfo extends AkBase {
    /**  TenantID  Index */
    TenantID?: string;
    /**  StateID  Pk */
    StateID?: string;
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

interface GetStateResponse extends AkResponse {
    Data?: StateInfo[]
}
interface GetStateRequest extends AkRequest {}

interface PostStateResponse extends AkResponse {}
interface PostStateRequest extends AkRequest {}

interface PutStateResponse extends AkResponse {}
interface PutStateRequest extends AkRequest {}

interface DeleteStateResponse extends AkResponse {}
interface DeleteStateRequest extends AkRequest {}
