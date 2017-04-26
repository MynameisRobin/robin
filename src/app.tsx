import * as React from "react";
import {Component} from "react";
import {render} from "react-dom";
import router from "./config/router";
import {IntlProvider} from "react-intl";
import {getLocale} from './locales/index';
import {AkLocalProvider} from './component/controls/ak-localeprovider';

import {getTheme} from './themes/'
import {AppLocaleStatic} from './config/static';
import {AkSpin} from './component/controls/ak-spin';
import { User } from './util/user';

interface AppProps {}
interface AppStates {
    appLocale?: AppLocaleStatic
}
export class App extends Component < AppProps,
AppStates > {
    constructor(props, context) {
        super(props, context);
        this.state = {
            appLocale: null
        }
        getTheme();
    }
    componentDidMount() {
        getLocale().then(data => {
            this.setState({appLocale: data})
        })
    }

    render() {
        let children;
        if (this.state.appLocale) {
            children = <AkLocalProvider locale={this.state.appLocale.antd}>
                <IntlProvider
                    locale={this.state.appLocale.locale}
                    messages={this.state.appLocale.messages}>
                    {router}
                </IntlProvider>
            </AkLocalProvider>
        } else {
            children = <AkSpin></AkSpin>
        }
        return <div style={{ height: "100%" }}>{children}</div>;
    }
}
class AppStyle {}

render(
    <App/>, document.getElementById("app_content"));
