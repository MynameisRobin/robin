import * as React from "react";
import {Component} from "react";
import {AkIdentity, IdentityAPI, AkOrganization} from "../../api/common/identity";
import {AkTreeSelect} from "../controls/ak-treeselect";
import {AkSpin} from "../controls/ak-spin";
import {IdentityLocale} from "../../locales/localeid";
import {injectIntl} from "react-intl";

export interface AkOrganizationSelectProp extends IntlProps {
    placeholder?: string;
    notFoundContent?: string;
    treeDefaultExpandAll?: boolean;
    organizations?: AkIdentity[]; //组织数据，如果不传控件自己加载
    defaultValue?: string|AkIdentity;
    value?: string|AkIdentity;
    onChange?: (value: string, identity: AkOrganization) => any; //onchange事件，将选中dict输出
}

interface AkOrganizationSelectState {
    value?: string;
    initialized?: boolean;
    organizationTree?: Object[];
    orgDict?: {[key: string]: AkOrganization}
}

class AkOrganizationSelect extends Component < AkOrganizationSelectProp,
    AkOrganizationSelectState > {

    static defaultProps: AkOrganizationSelectProp = {
        treeDefaultExpandAll: true
    }

    constructor(props, context) {
        super(props, context);
        let value = "value" in props ? props.value : props.defaultValue;
        this.state = {value: this.parseValue(value), orgDict: {}, organizationTree: []}
    }

    componentWillMount() {
        if ("organizations" in this.props) {
            this.initOrganization(this.props.organizations);
        } else {
            IdentityAPI.getOrganizations().then(d => {
                if (d.Data) {
                    this.initOrganization(d.Data);
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

    initOrganization(organizations: AkIdentity[]) {
        let orgDict = this.state.orgDict;

        let orgs = organizations.map(identity => {
            let org = new AkOrganization(identity);
            orgDict[org.ID] = org;
            return {key: org.ID, value: org.ID, pId: org.Parent, label: org.Name}
        });
        this.setState({initialized: true, organizationTree: orgs});
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: this.parseValue(nextProps.value)});
        }
    }

    valueChanged(v) {

        if (!("value" in this.props)) {
            this.setState({value: v});
        }

        if (this.props.onChange) {
            const {orgDict} = this.state;
            let identity;
            if (v && v in orgDict) {
                identity = orgDict[v];
            }

            this.props.onChange(v, identity);
        }
    }

    render() {
        const {placeholder, notFoundContent, treeDefaultExpandAll, intl} = this.props;

        let pl = placeholder ? placeholder : intl.formatMessage({id: IdentityLocale.OrganizationPlaceholder});

        const treeDataSimpleMode = {
            id: 'key', rootPId: "0"
        }

        return <AkSpin spinning={!this.state.initialized}><AkTreeSelect notFoundContent={notFoundContent}
                                                                        placeholder={pl} multiple={false}
                                                                        value={this.state.value}
                                                                        treeCheckable={false}
                                                                        treeNodeFilterProp='title' showSearch={true}
                                                                        allowClear={true}
                                                                        treeData={this.state.organizationTree}
                                                                        treeDataSimpleMode={treeDataSimpleMode}
                                                                        onChange={v=>this.valueChanged(v)}
                                                                        treeDefaultExpandAll={treeDefaultExpandAll}
        /></AkSpin>
    }
}

export default injectIntl(AkOrganizationSelect);
