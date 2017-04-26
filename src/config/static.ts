/**
 * 国际化
 */
export class AppLocaleStatic {
    constructor(options : AppLocaleStatic) {
        this.locale = options.locale;
        this.formats = options.formats;
        this.defaultFormats = options.defaultFormats;
        this.defaultLocale = options.defaultLocale;
        this.messages = options.messages;
        this.antd = options.antd;
    }
    antd?: Object;
    locale?: string;
    formats?: Object;
    messages?: Object;
    defaultLocale?: string;
    defaultFormats?: Object;
}
