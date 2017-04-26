import * as React from "react";
import {Component} from "react";
import {IdentityAPI, AkPosition, AkIdentity} from "../../api/common/identity";
import {AkSpin} from "../controls/ak-spin";
import {IdentityLocale} from "../../locales/localeid";
import {injectIntl} from "react-intl";
import {AkSelect} from "../controls/ak-select";

export interface AkPositionSelectProp extends IntlProps {
    placeholder?: string;
    notFoundContent?: string;
    positions?: AkPosition[]; //角色数据，如果不传控件自己加载
    defaultValue?: string|AkIdentity;
    value?: string|AkIdentity;
    onChange?: (value: string, identity: AkPosition) => any; //onchange事件，将选中dict输出
}

interface AkPositionSelectState {
    positions?: AkPosition[];
    value?: string;
    initialized?: boolean;
}

class AkPositionSelect extends Component < AkPositionSelectProp,
    AkPositionSelectState > {

    static defaultProps: AkPositionSelectProp = {}

    constructor(props, context) {
        super(props, context);

        let value = "value" in props ? props.value : props.defaultValue;
        this.state = {value: this.parseValue(value)};
    }

    componentWillMount() {
        if ("positions" in this.props) {
            this.initPositions(this.props.positions);
        } else {
            IdentityAPI.getJobPositions().then(d => {
                if (d.Data) {
                    this.initPositions(d.Data);
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

    initPositions(positions: AkPosition[]) {
        this.setState({initialized: true, positions: positions ? positions : []});
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: this.parseValue(nextProps.value)});
        }

        if ("positions" in nextProps && nextProps.positions !== this.props.positions) {
            this.setState({positions: nextProps.positions ? nextProps.positions : []});
        }
    }

    valueChanged(v) {
        if (!("value" in this.props)) {
            this.setState({value: v});
        }

        if (this.props.onChange) {
            const {positions} = this.state;
            let identity;
            if (v && v.length > 0) {
                identity = positions.find(r => r.ID === v);
            }

            this.props.onChange(v, identity);
        }
    }

    render() {
        const {placeholder, notFoundContent, intl} = this.props;

        let pl = placeholder ? placeholder : intl.formatMessage({id: IdentityLocale.PositionPlaceholder});

        return <AkSpin spinning={!this.state.initialized}><AkSelect placeholder={pl} notFoundContent={notFoundContent}
                                                                    value={this.state.value}
                                                                    onChange={v=>this.valueChanged(v)}>
            {this.state.positions.map(r => {
                return <AkSelect.Option key={r.ID} value={r.ID}>{r.Name}</AkSelect.Option>
            })}
        </AkSelect></AkSpin>
    }
}

export default injectIntl(AkPositionSelect);
