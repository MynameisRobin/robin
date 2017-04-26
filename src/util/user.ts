import * as Cookies from 'js-cookie'

export class User {
    /**
     * 获取用户信息
     *
     * @static
     * @returns {YeeUserInfo}
     *
     * @memberOf User
     */
    static GetUserInfo() : YeeUserInfo {
        return Cookies.getJSON("YGUserLogin")as YeeUserInfo;
    }
    /**
     * 获取用户登录Token
     *
     * @static
     * @returns {string}
     *
     * @memberOf User
     */
    static GetUserLoginToken():string{
        return Cookies.get("LoginToken");
    }
}
