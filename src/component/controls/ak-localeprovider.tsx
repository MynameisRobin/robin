import * as React from 'react'
import {Component} from 'react'
import {LocaleProvider} from 'antd';

interface AkLocalProviderProps {
    locale : {
        Pagination?: Object;
        DatePicker?: Object;
        TimePicker?: Object;
        Calendar?: Object;
        Table?: Object;
        Modal?: Object;
        Popconfirm?: Object;
        Transfer?: Object;
        Select?: Object;
    };
    children?: React.ReactElement < any >;
}
interface AkLocalProviderStates {}
export class AkLocalProvider extends Component < AkLocalProviderProps,
AkLocalProviderStates > {
    render() {
        return <LocaleProvider {...this.props}></LocaleProvider>
    }
}
class AkLocalProviderStyle {}
