import * as React from "react";
import {Component} from "react";
import {DatePicker} from "antd";
import * as moment from "moment";
import {AkTimePickerProps} from "./ak-timepicker";

export interface AkPickerProps {
    prefixCls?: string;
    inputPrefixCls?: string;
    format?: string;
    disabled?: boolean;
    allowClear?: boolean;
    style?: React.CSSProperties;
    popupStyle?: React.CSSProperties;
    locale?: any;
    size?: 'large' | 'small' | 'default';
    getCalendarContainer?: (trigger: any) => React.ReactNode;
    open?: boolean;
    onOpenChange?: (status: boolean) => void;
}
export interface AkSinglePickerProps {
    value?: string|moment.Moment;
    defaultValue?: string|moment.Moment;
    defaultPickerValue?: moment.Moment;
    onChange?: (date: moment.Moment, dateString: string) => void;
}
export interface AkDatePickerProps extends AkPickerProps,
    AkSinglePickerProps {
    showTime?: AkTimePickerProps | boolean;
    showToday?: boolean;
    open?: boolean;
    toggleOpen?: (e: {
        open: boolean;
    }) => void;
    disabledDate?: (current: moment.Moment) => boolean;
    onOpenChange?: (status: boolean) => void;
    placeholder?: string;
}
interface AkDatePickerStates {
    value?: moment.Moment;
}
export class AkDatePicker extends Component < AkDatePickerProps,
    AkDatePickerStates > {
    static RangePicker = DatePicker.RangePicker;
    static MonthPicker = DatePicker.MonthPicker;

    constructor(props, context) {
        super(props, context);

        let value = ("value" in props) ? props.value : props.defaultValue;
        this.state = {value: this.processValue(value)};
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: this.processValue(nextProps.value)});
        }
    }

    processValue(value): moment.Moment {
        let v;
        if (value && typeof value === "string") {
            v = moment(value);
            if (!v.isValid()) {
                v = undefined;
            }
        } else {
            v = value;
        }
        return v;
    }

    onChange(date: moment.Moment, dateString: string) {

        if (!("value" in this.props)) {
            this.setState({value: date});
        }

        this.props.onChange && this.props.onChange(date, dateString);
    }

    render() {
        const {defaultValue, value, onChange, ...others} = this.props;

        return <DatePicker value={this.state.value} onChange={this.onChange.bind(this)} {...others}></DatePicker>
    }
}
class AkDatePickerStyle {
}
