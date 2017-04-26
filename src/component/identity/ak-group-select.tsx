import * as React from "react";
import {Component} from "react";
import {IdentityAPI, AkGroup, AkIdentity} from "../../api/common/identity";
import {AkSpin} from "../controls/ak-spin";
import {IdentityLocale} from "../../locales/localeid";
import {injectIntl} from "react-intl";
import {AkSelect} from "../controls/ak-select";

export interface AkGroupSelectProp extends IntlProps {
    placeholder?: string;
    notFoundContent?: string;
    groups?: AkGroup[]; //组数据，如果不传控件自己加载
    defaultValue?: string|AkIdentity;
    value?: string|AkIdentity;
    onChange?: (value: string, identity: AkGroup) => any; //onchange事件，将选中dict输出
}

interface AkGroupSelectState {
    groups?: AkGroup[];
    value?: string;
    initialized?: boolean;
}

class AkGroupSelect extends Component < AkGroupSelectProp,
    AkGroupSelectState > {

    static defaultProps: AkGroupSelectProp = {}

    constructor(props, context) {
        super(props, context);
        let value = "value" in props ? props.value : props.defaultValue;
        this.state = {value: this.parseValue(value)}
    }

    componentWillMount() {
        if ("groups" in this.props) {
            this.initGroups(this.props.groups);
        } else {
            IdentityAPI.getGroups().then(d => {
                if (d.Data) {
                    this.initGroups(d.Data);
                }
            });
        }
    }

    parseValue(value) {
        if (value && value.ID) {
            return value.ID;
        } else {
            return value;
        }
    }

    initGroups(groups: AkGroup[]) {
        this.setState({initialized: true, groups: groups});
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: this.parseValue(nextProps.value)});
        }

        if ("groups" in nextProps && nextProps.groups !== this.props.groups) {
            this.setState({groups: nextProps.groups});
        }
    }

    valueChanged(v) {
        if (!("value" in this.props)) {
            this.setState({value: v});
        }

        if (this.props.onChange) {
            const {groups} = this.state;
            let identity;
            if (v && v.length > 0) {
                identity = groups.find(r => r.ID === v);
            }
            this.props.onChange(v, identity);
        }
    }

    render() {
        const {placeholder, notFoundContent, intl} = this.props;

        let pl = placeholder ? placeholder : intl.formatMessage({id: IdentityLocale.GroupPlaceholder});

        return <AkSpin spinning={!this.state.initialized}><AkSelect placeholder={pl} notFoundContent={notFoundContent}
                                                                    value={this.state.value}
                                                                    onChange={v=>this.valueChanged(v)}>
            {this.state.groups.map(r => {
                return <AkSelect.Option key={r.ID} value={r.ID}>{r.Name}</AkSelect.Option>
            })}
        </AkSelect></AkSpin>
    }
}

export default injectIntl(AkGroupSelect);
