import * as request from 'superagent';
import * as Cookies from 'js-cookie';

export class Request < TRequest,
TResponse > {
    /**
     * 默认参数
     *
     * @type {AkRequestParam < TRequest >}
     * @memberOf Request
     */
    defaultParam : AkRequestParam < TRequest > = {
        Url: '',
        Data: null,
        Loading: true,
        Querys: null,
        // Prefix: '//192.168.0.55',
        // Prefix: '//112.65.130.206:8034',
        Prefix: 'http://114.55.86.252:8080/mockjs/1'
        // Prefix:'http://192.168.3.82:8090'
    }
    /**
     * 处理Http请求
     *
     * @param {(url : string) => request.SuperAgentRequest} func
     * @param {AkRequestParam < TRequest >} [param]
     * @returns
     *
     * @memberOf Request
     */
    processResponse(func : (url : string) => request.SuperAgentRequest, param?: AkRequestParam < TRequest >) {
        let request = func(param.Prefix
            ? param.Prefix + param.Url
            : '' + param.Url);

        request.type("json");
        request.set("LoginToken", Cookies.get("LoginToken"));
        request.withCredentials();
        if (param.Data) {
            request.send(JSON.stringify(param.Data));
        }

        if (param.Querys) {
            request.query(param.Querys);
        }

        return new Promise < TResponse > ((resolve : (response : TResponse) => void, reject : (reason : any) => void) => {
            request
                .end(function (error, response : request.Response) : void {
                    if(param.Loading) {
                        ///TODO:
                    }
                    let body = response.body;
                    // // if (is_dev) {     body = Mock.mock(body); } try {     let regex =
                    // /(@param\|([\s\S]*))/;     if (regex.test(body.Data)) {         body.Data =
                    // param.Data[RegExp.$2];     } } catch (a) {}

                    if (response.ok) {
                        resolve(body);
                    } else {
                        reject(body);
                    }
                });
        });
    }
    /**
     * 构造请求数据
     *
     * @param {IArguments} args
     * @returns {AkRequestParam < TRequest >}
     *
     * @memberOf Request
     */
    buildData(args : IArguments | any[]) : AkRequestParam < TRequest > {
        if(typeof(args[0]) === "string") {
            return Object.assign({}, this.defaultParam, {
                Url: args[0],
                Data: args[1]
            })
        } else {
            return Object.assign({}, this.defaultParam, args[0])
        }
    }
    buildFormData(args : IArguments | any[]) : AkRequestParam < TRequest > {
        if(typeof(args[0]) === "string") {
            return Object.assign({}, this.defaultParam, {
                Url: args[0],
                Data: args[1]
            })
        } else {
            return Object.assign({}, this.defaultParam, args[0])
        }
    }
    buildQueeryParam(url, data) {
        if (data) {
            url += "?";
            Object
                .getOwnPropertyNames(data)
                .forEach(name => {
                    url += name + "=" + data[name] + "&";
                });
            url = url.slice(0, url.length - 1);
        }
        return url;
    }
    /**
     * get方法
     *
     * @template TResponse
     * @param {string} url
     * @returns {Promise < TResponse >}
     *
     * @memberOf Request
     */
    get(url : string, data?: TRequest) : Promise < TResponse > {
        return this.processResponse(request.get, this.buildData([
            this.buildQueeryParam(url, data),
            data
        ]))
    }
    /**
     * POST方法
     *
     * @template TResponse
     * @param {string} url
     * @param {TRequest} [data]
     * @returns {Promise < TResponse >}
     *
     * @memberOf Request
     */
    post(url : string, data?: TRequest) : Promise < TResponse > {
        return this.processResponse(request.post, this.buildData(arguments));
    }
    put(url : string, data?: TRequest) : Promise < TResponse > {
        return this.processResponse(request.put, this.buildData(arguments));
    }
    del(url : string, data?: TRequest) : Promise < TResponse > {
        return this.processResponse(request.delete, this.buildData([
            this.buildQueeryParam(url, data),
            data
        ]));
    }
}
