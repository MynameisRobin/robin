import appLocaleData from 'react-intl/locale-data/en'
import {addLocaleData} from 'react-intl';

import * as en from 'react-intl/locale-data/en';
import * as zh from 'react-intl/locale-data/zh';
import * as antdEn from 'antd/lib/locale-provider/en_US';
import {AppLocaleStatic} from '../config/static';

export async function getLocale(language?: string) : Promise < AppLocaleStatic > {
    if(!language) {
        //Default local_lanΩguage
        let DEFAULT_LOCALE = 'zh-CN';
        language = navigator.language || (navigator as any).browserLanguage || DEFAULT_LOCALE;
    }
    let languageWithoutRegionCode = language
        .toLowerCase()
        .split(/[_-]+/)[0];

    let antd = null;

    let appLocaleStatic: AppLocaleStatic;
    return new Promise < AppLocaleStatic > ((resolve : (locale) => void, reject : (reason : any) => void) => {
        switch (languageWithoutRegionCode) {
            case 'en':
                addLocaleData([...en]);
                antd = antdEn;
                require.ensure([], () => {
                    appLocaleStatic = new AppLocaleStatic({locale: languageWithoutRegionCode, messages: appLocaleStatic, antd: antd})
                    appLocaleStatic.messages = require("./en.json")as string;
                    resolve(appLocaleStatic)
                }, "en.json");
                break;
            case 'zh':
            default:
                addLocaleData([...zh]);
                require.ensure([], () => {
                    appLocaleStatic = new AppLocaleStatic({locale: languageWithoutRegionCode, messages: appLocaleStatic, antd: antd})
                    appLocaleStatic.messages = require("./zh.json")as string;
                    resolve(appLocaleStatic);
                }, "zh.json");
                break;
        }
    });
}
