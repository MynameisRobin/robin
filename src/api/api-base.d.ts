interface AkBase {}
interface AkRequest extends AkBase{}
interface AkResponse extends AkBase{
    /**
     * 状态
     */
    Status?: string;
    /**
     * 消息
     */
    Message?: string;
    /**
     * 总记录数
     */
    TotalCount?:number;
}

interface AkRequestParam<T> {
    /**
     * URL 请求访问的路径
     *
     * @type {string}
     * @memberOf RequestParam
     */
    Url?: string;
    /**
     * 请求的数据
     *
     * @type {WObject}
     * @memberOf RequestParam
     */
    Data?: T;
    /**
     * 是否显示加载中
     *
     * @type {boolean}
     * @memberOf RequestParam
     */
    Loading?: boolean;
    /**
     * 查询参数
     *
     * @type {WObject}
     * @memberOf RequestParam
     */
    Querys?: AkBase;
    /**
     * 访问接口前缀
     *
     * @type {string}
     * @memberOf RequestParam
     */
    Prefix?: string
}
