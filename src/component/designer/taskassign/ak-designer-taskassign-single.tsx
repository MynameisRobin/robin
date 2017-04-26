import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";
import {AkRow} from "../../controls/ak-row";
import {AkCol} from "../../controls/ak-col";
import AkIdentityPicker from "../../identity/ak-identitypicker";
import AkDesignerExpr from "../expr/ak-designer-expr";
import {AkIdentity, IdentityAPI} from "../../../api/common/identity";
import {AkSpin} from "../../controls/ak-spin";
import {FlowcraftDesignerLocale, IdentityLocale} from "../../../locales/localeid";
import {AkRadio} from "../../controls/ak-radio";
import AkOrganizationSelect from "../../identity/ak-organization-select";
import AkLocationSelect from "../../identity/ak-location-select";
import AkPositionSelect from "../../identity/ak-position-select";

export interface AkDesignerTaskAssignSingleProp extends IntlProps {
    onChange?: (value: TaskAssignee) => any;
    // childshapes?: ProcessShape[]; //流程中节点的定义
    // variables?: Variables; //流程中变量的定义
    flowContext?: ProcessProperties;
}

export interface AkDesignerTaskAssignSingleState {
    initialized?: boolean;
    type?: 'user'|'position';
    method?: 'direct'|'expression'|'position'|'positionloc'|'positionlocexpr'|'positionorg'|'positionorgexpr';
    position?: AkIdentity
    directValue?: AkIdentity;
    expressionValue?: string;
    positionlocValue?: AkIdentity;
    positionlocexprValue?: string;
    positionorgValue?: AkIdentity;
    positionorgexprValue?: string;
    positions?: AkIdentity[];
    organizations?: AkIdentity[];
    locations?: AkIdentity[];
}

class AkDesignerTaskAssignSingle extends Component<AkDesignerTaskAssignSingleProp,AkDesignerTaskAssignSingleState> {

    static defaultProps: AkDesignerTaskAssignSingleProp = {}

    constructor(props, context) {
        super(props, context);

        this.state = {
            positions: [],
            organizations: [],
            locations: [],
            type: 'user',
            method: 'direct'
        }
    }

    componentWillMount() {
        Promise.all([IdentityAPI.getOrganizations(), IdentityAPI.getLocations(), IdentityAPI.getJobPositions()]).then(res => {
            this.setState({
                initialized: true,
                positions: res[2].Data,
                organizations: res[0].Data,
                locations: res[1].Data
            });
        });
    }

    getUserDisplay() {
        const {flowContext} = this.props;
        const {formatMessage} = this.props.intl;
        const {directValue, expressionValue, method, type} = this.state;

        if (type === 'user') {
            return <div><AkRow><AkCol><AkRadio.Group value={method} onChange={this.methodOnChange.bind(this)}>
                <AkRadio value="direct">
                    {formatMessage({id: FlowcraftDesignerLocale.AssignDirect})}
                </AkRadio>
                <AkRadio value="expression">
                    {formatMessage({id: FlowcraftDesignerLocale.AssignExpression})}
                </AkRadio>
            </AkRadio.Group></AkCol>
            </AkRow>
                <AkRow><AkCol>
                    {method === "direct" &&
                    <AkIdentityPicker value={directValue} onChange={v=>this.valueChange('direct', v)}/>}
                    {method === "expression" &&
                    <AkDesignerExpr width={300} value={expressionValue} onChange={v=>this.valueChange('expression', v)}
                                    singleLine={true} flowContext={flowContext} multilines={1}/>}
                </AkCol></AkRow></div>
        } else {
            return undefined;
        }
    }

    getRoleDisplay() {
        const {flowContext} = this.props;
        const {formatMessage} = this.props.intl;
        const {organizations, locations, position, method, type, positions, positionlocValue, positionlocexprValue, positionorgValue, positionorgexprValue,} = this.state;

        let roleMethod = method;
        if (method === 'positionlocexpr') {
            roleMethod = 'positionloc';
        }
        if (method === 'positionorgexpr') {
            roleMethod = 'positionorg';
        }

        if (type === 'position') {
            return <div>
                <AkRow>
                    <AkPositionSelect onChange={(r,i)=>this.positionOnChange(i)} value={position}
                                      positions={positions}></AkPositionSelect>
                </AkRow>
                <AkRow>
                    <AkRadio.Group value={roleMethod} onChange={this.methodOnChange.bind(this)}>
                        <AkRadio.Button
                            value="role">{formatMessage({id: FlowcraftDesignerLocale.AssignDirect})}</AkRadio.Button>
                        <AkRadio.Button
                            value="positionloc">{formatMessage({id: FlowcraftDesignerLocale.AssignPositionLoc})}</AkRadio.Button>
                        <AkRadio.Button
                            value="positionorg">{formatMessage({id: FlowcraftDesignerLocale.AssignPositionOrg})}</AkRadio.Button>
                    </AkRadio.Group>
                </AkRow>
                {roleMethod === 'positionloc' &&
                <div>
                    <AkRow>
                        <AkRadio.Group value={method} onChange={this.methodOnChange.bind(this)}>
                            <AkRadio value="positionloc">{formatMessage({id: IdentityLocale.Location})}</AkRadio>
                            <AkRadio
                                value="positionlocexpr">{formatMessage({id: FlowcraftDesignerLocale.AssignExpression})}</AkRadio>
                        </AkRadio.Group>
                    </AkRow>
                    <AkRow>
                        {method === "positionloc" &&
                        <AkLocationSelect locations={locations} value={positionlocValue}
                                          onChange={(v, loc)=>this.valueChange('positionloc', loc)}/>}
                        {method === "positionlocexpr" &&
                        <AkDesignerExpr value={positionlocexprValue}
                                        onChange={v=>this.valueChange('positionlocexpr', v)}
                                        singleLine={true} flowContext={flowContext} multilines={1}/>}
                    </AkRow>
                </div>}

                {roleMethod === 'positionorg' &&
                <div>
                    <AkRow>
                        <AkRadio.Group value={method} onChange={this.methodOnChange.bind(this)}>
                            <AkRadio value="positionorg">{formatMessage({id: IdentityLocale.Organization})}</AkRadio>
                            <AkRadio
                                value="positionorgexpr">{formatMessage({id: FlowcraftDesignerLocale.AssignExpression})}</AkRadio>
                        </AkRadio.Group>
                    </AkRow>
                    <AkRow>
                        {method === "positionorg" &&
                        <AkOrganizationSelect organizations={organizations} value={positionorgValue}
                                              onChange={(v,org)=>this.valueChange('positionorg', org)}/>}
                        {method === "positionorgexpr" &&
                        <AkDesignerExpr value={positionorgexprValue}
                                        onChange={v=>this.valueChange('positionorgexpr', v)}
                                        singleLine={true} flowContext={flowContext} multilines={1}/>}
                    </AkRow>
                </div>}
            </div>;
        } else {
            return undefined;
        }
    }

    getAssignmentTitle(type, method, role, value) {
        let title;
        if (value || (method === 'position' && role)) {
            const {formatMessage} = this.props.intl;
            if (type === 'user') {
                if (method === 'direct') {
                    title = formatMessage({id: IdentityLocale.User}) + ":" + value.Name;
                } else {
                    title = formatMessage({id: IdentityLocale.User}) + ":" + value;
                }
            } else if (role) {
                //role必须被设置好，不然不输出title
                switch (method) {
                    case 'position':
                        title = formatMessage({id: IdentityLocale.Position}) + ":" + role.Name;
                        break;
                    case 'positionloc':
                        title = formatMessage({id: IdentityLocale.Position}) + ":" + role.Name + " " + formatMessage({id: FlowcraftDesignerLocale.AssignPositionLoc}) + " " + value.Name;
                        break;
                    case 'positionlocexpr':
                        title = formatMessage({id: IdentityLocale.Position}) + ":" + role.Name + " " + formatMessage({id: FlowcraftDesignerLocale.AssignPositionLoc}) + " " + value;
                        break;
                    case 'positionorg':
                        title = formatMessage({id: IdentityLocale.Position}) + ":" + role.Name + " " + formatMessage({id: FlowcraftDesignerLocale.AssignPositionOrg}) + " " + value.Name;
                        break;
                    case 'positionorgexpr':
                        title = formatMessage({id: IdentityLocale.Position}) + ":" + role.Name + " " + formatMessage({id: FlowcraftDesignerLocale.AssignPositionOrg}) + " " + value;
                        break;
                }
            }
        }
        return title;
    }

    valueChange(changeType, changeValue) {
        switch (changeType) {
            case 'direct':
                this.setState({directValue: changeValue});
                break;
            case 'expression':
                this.setState({expressionValue: changeValue});
                break;
            // case 'positions':
            //     this.setState({positions: changeValue});
            //     break;
            case 'positionloc':
                this.setState({positionlocValue: changeValue});
                break;
            case 'positionlocexpr':
                this.setState({positionlocexprValue: changeValue});
                break;
            case 'positionorg':
                this.setState({positionorgValue: changeValue});
                break;
            case 'positionorgexpr':
                this.setState({positionorgexprValue: changeValue});
                break;
        }

        if (this.props.onChange) {
            const {type, method, position} = this.state;
            this.valueChanged(type, method, position, changeValue);
        }
    }

    valueChanged(type, method, position, changeValue) {
        let assignee: TaskAssignee;
        let title = this.getAssignmentTitle(type, method, position, changeValue);
        if (title) {
            let valueToset = changeValue;

            if (method === 'direct' || method === 'positionloc' || method === 'positionorg') {
                valueToset = changeValue.ID;
            }

            assignee = {
                type: type,
                method: method,
                position: position ? position.ID : undefined,
                value: valueToset,
                title: title
            };
        }

        this.props.onChange(assignee);
    }

    getChangedValue(method) {
        const {directValue, expressionValue, positionlocexprValue, positionlocValue, positionorgexprValue, positionorgValue} = this.state;
        let changeValue;

        switch (method) {
            case 'direct':
                changeValue = directValue;
                break;
            case 'expression':
                changeValue = expressionValue;
                break;
            case 'positionloc':
                changeValue = positionlocValue;
                break;
            case 'positionlocexpr':
                changeValue = positionlocexprValue;
                break;
            case 'positionorg':
                changeValue = positionorgValue;
                break;
            case 'positionorgexpr':
                changeValue = positionorgexprValue;
                break;
        }

        return changeValue;
    }

    positionOnChange(value) {
        this.setState({position: value});

        if (this.props.onChange) {
            const {type, method} = this.state;
            let changeValue = this.getChangedValue(method);

            if (this.props.onChange) {
                this.valueChanged(type, method, value, changeValue);
            }
        }
    }

    methodOnChange(value) {
        let method = value.target.value;
        this.setState({method: method});

        if (this.props.onChange) {
            const {type} = this.state;
            let changeValue = this.getChangedValue(method);

            if (this.props.onChange) {
                this.valueChanged(type, method, value, changeValue);
            }
        }
    }

    typeOnChange(value) {
        let type = value.target.value;
        let method;
        method = (type === 'user') ? 'direct' : 'position';
        this.setState({method: method, type: type});

        if (this.props.onChange) {
            let changeValue = this.getChangedValue(method);

            if (this.props.onChange) {
                this.valueChanged(type, method, this.state.position, changeValue);
            }
        }
    }


    render() {
        const {formatMessage} = this.props.intl;
        const {type} = this.state;

        return <div className="ak-designer-assignee"><AkSpin spinning={!this.state.initialized}>
            <AkRadio.Group value={type} onChange={this.typeOnChange.bind(this)}>
                <AkRadio.Button value="user">
                    {formatMessage({id: IdentityLocale.User})}
                </AkRadio.Button>
                <AkRadio.Button value="position">
                    {formatMessage({id: IdentityLocale.Position})}
                </AkRadio.Button>
            </AkRadio.Group>
            {this.getUserDisplay()}
            {this.getRoleDisplay()}
        </AkSpin></div>;
    }
}

export default injectIntl(AkDesignerTaskAssignSingle);
