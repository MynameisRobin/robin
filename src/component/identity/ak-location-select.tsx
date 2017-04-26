import * as React from "react";
import {Component} from "react";
import {IdentityAPI, AkLocation, AkIdentity} from "../../api/common/identity";
import {AkSpin} from "../controls/ak-spin";
import {IdentityLocale} from "../../locales/localeid";
import {injectIntl} from "react-intl";
import {AkSelect} from "../controls/ak-select";

export interface AkLocationSelectProp extends IntlProps {
    placeholder?: string;
    notFoundContent?: string;
    locations?: AkLocation[]; //地区数据，如果不传控件自己加载
    defaultValue?: string|AkIdentity;
    value?: string|AkIdentity;
    onChange?: (value: string, identity: AkLocation) => any; //onchange事件，将选中dict输出
}

interface AkLocationSelectState {
    locations?: AkLocation[];
    value?: string;
    initialized?: boolean;
}

class AkLocationSelect extends Component < AkLocationSelectProp,
    AkLocationSelectState > {

    static defaultProps: AkLocationSelectProp = {}

    constructor(props, context) {
        super(props, context);

        let value = "value" in props ? props.value : props.defaultValue;
        this.state = {value: this.parseValue(value)}
    }

    componentWillMount() {
        if ("locations" in this.props) {
            this.initLocations(this.props.locations);
        } else {
            IdentityAPI.getLocations().then(d => {
                if (d.Data) {
                    this.initLocations(d.Data);
                }
            });
        }
    }

    parseValue(value) {
        let val = value;

        if (value && value.ID) {
            val = value.ID;
        }
        return val;
    }


    initLocations(locations: AkLocation[]) {
        this.setState({initialized: true, locations: locations});
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: this.parseValue(nextProps.value)});
        }

        if ("locations" in nextProps && nextProps.locations !== this.props.locations) {
            this.setState({locations: nextProps.locations});
        }
    }

    valueChanged(v) {
        if (!("value" in this.props)) {
            this.setState({value: v});
        }

        if (this.props.onChange) {
            const {locations} = this.state;
            let identity;
            if (v && v.length > 0) {
                identity = locations.find(r => r.ID === v);
            }
            this.props.onChange(v, identity);
        }
    }

    render() {
        const {placeholder, notFoundContent, intl} = this.props;

        let pl = placeholder ? placeholder : intl.formatMessage({id: IdentityLocale.LocationPlaceholder});

        return <AkSpin spinning={!this.state.initialized}><AkSelect placeholder={pl} notFoundContent={notFoundContent}
                                                                    value={this.state.value}
                                                                    onChange={v=>this.valueChanged(v)}>
            {this.state.locations.map(r => {
                return <AkSelect.Option key={r.ID} value={r.ID}>{r.Name}</AkSelect.Option>
            })}
        </AkSelect></AkSpin>
    }
}

export default injectIntl(AkLocationSelect);
