/**流程变量 */

/**根据ApplicationID获取流程变量 */
interface GetVariablesByApplicationIDResponse extends AkResponse {
    Data?:Object;
}
interface GetVariablesByApplicationIDRequest extends AkRequest {
    applicationID : string;
}
