import * as React from "react";
import {Component} from "react";
import {AkTab} from "../controls/ak-tab";
import {AkTag} from "../controls/ak-tag";
import {AkTabPane} from "../controls/ak-tab-pane";
import {
    IdentityAPI,
    AkOrganization,
    SearchUserRequest,
    AkUser,
    AkIdentity,
    AkIdentityType_User,
    AkIdentityType_Organization
} from "../../api/common/identity";
import {injectIntl} from "react-intl";
import {IdentityLocale, CommonLocale} from "../../locales/localeid";
import {AkTreeSelect} from "../controls/ak-treeselect";
import {AkSearch} from "../controls/ak-search";
import {AkTable, AkColumnProps, AkTableRowSelection} from "../controls/ak-table";
import {AkRow} from "../controls/ak-row";
import {AkCol} from "../controls/ak-col";
import {AkTreeSimple} from "../controls/ak-tree-simple";

interface AkIdentityPickerAdvProp extends IntlProps {
    identityTypes?: number[];
    searchRowCount?: number;
    multiple?: boolean; //is allow multiple selection
    maxSelection?: number; //how many identity selection allowed
    nameDisplayLength?: number; //超出长度的名称会被截取
    style?: Object; //additional style apply to control
    defaultValue?: AkIdentity[]; //default selection
    value?: Object|AkIdentity[]; //和onChange一起结合使用，如果value赋值则defaultValue无效
    onChange?: (value: Object) => void;
    allowRowClickSelection?: boolean; //允许通过点击行选中
    treeDefaultExpandAll?: boolean; //树选择是否自动展开
}

interface AkIdentityPickerAdvState {
    maxSelection?: number; //最大选择项
    userTabLoading?: boolean; //是否加载中状态
    userTabTotal?: number; //总用户数
    userSearchResult?: AkUser[]; //用户搜索结果
    userSelectedRowKeys?: string[];  // 用户选择结果key列表
    organizationCheckedKeys?: string[]; //Organization选中结果
    organizationDict?: Object; //Organization对象的Dict
    organizationTreeMax?: number; //organization对象最大的选择项
    selectionDisabled?: boolean; //用户选择的checkbox是否禁用
    organizationTree?: Array<Object>;
    userValue?: Object; //选中的user identity;
    orgValue?: Object; //选中的organization identity
}

class UserAkTable extends AkTable < AkUser > {
}

class AkIdentityPickerAdv extends Component<AkIdentityPickerAdvProp,AkIdentityPickerAdvState> {

    static defaultProps: AkIdentityPickerAdvProp = {
        identityTypes: [AkIdentityType_User],
        searchRowCount: 8,
        multiple: false,
        maxSelection: 200,
        defaultValue: [],
        allowRowClickSelection: true,
        treeDefaultExpandAll: true,
    }

    searchUserRequest: SearchUserRequest = { orgId: "-1", pageSize: this.props.searchRowCount, pageIndex: 1};
    columns: AkColumnProps < AkUser > [] = [
        {
            title: "Name",
            key: "Name",
            dataIndex: "Name"
        }, {
            title: "Email",
            key: "Email",
            dataIndex: "Attr.Email"
        }
    ];

    constructor(props: AkIdentityPickerAdvProp, context) {
        super(props, context);

        let value = ("value" in this.props) ? this.getDictFromValue(this.props.value) : this.getDictFromValue(this.props.defaultValue);

        let orgKeys = [];
        let userKeys = [];

        let userValue = {};
        let orgValue = {};

        this.processValue(value, userKeys, userValue, orgKeys, orgValue);


        this.state = {
            maxSelection: props.multiple ? props.maxSelection : 1,
            organizationDict: {},
            organizationTree: [],
            userTabTotal: 0,
            userTabLoading: true,
            userSearchResult: [],
            userValue: userValue,
            orgValue: orgValue,
            userSelectedRowKeys: userKeys,
            selectionDisabled: false,
            organizationCheckedKeys: orgKeys,
        };
    }

    componentWillMount() {
        if (this.hasOrganizationTab() || this.hasUserTab()) {
            //读取所有的组织信息
            IdentityAPI.getOrganizations().then(d => {
                let dict = this.state.organizationDict;
                let orgs = d.Data.map(identity => {
                    let org = new AkOrganization(identity);
                    dict[org.ID] = org;
                    return {key: org.ID, value: org.ID, pId: org.Parent, label: org.Name}
                });
                this.setState({organizationTree: orgs, organizationDict: dict});
            });
        }

        if (this.hasUserTab()) {
            this.searchUser();
        }
    }

    /**
     * 根据传入的value，解析出user、organization等对象
     * @param value
     * @param userKeys
     * @param userValue
     * @param orgKeys
     * @param orgValue
     */
    processValue(value: Object, userKeys: string[], userValue: Object, orgKeys: string[], orgValue: Object) {
        Object.keys(value).forEach(k => {
            let v: AkIdentity = value[k];
            switch (v.Type) {
                case AkIdentityType_Organization:
                    orgValue[v.ID] = v;
                    orgKeys.push(v.ID);
                    break;
                case AkIdentityType_User:
                    userValue[v.ID] = v;
                    userKeys.push(v.ID);
                    break;
                default:
            }
        });
    }

    componentWillReceiveProps(nextProps: AkIdentityPickerAdvProp) {
        if ("value" in nextProps && nextProps.value !== this.props.value) {
            console.log("receive value", nextProps.value);
            let value = this.getDictFromValue(nextProps.value);
            let orgKeys = [];
            let userKeys = [];

            let userValue = {};
            let orgValue = {};
            this.processValue(value, userKeys, userValue, orgKeys, orgValue);

            this.setState({
                userValue: userValue,
                userSelectedRowKeys: userKeys,
                orgValue: orgValue,
                organizationCheckedKeys: orgKeys
            });
        }
    }

    /**
     * 根据传入参数适配专成Dict
     * @param data
     */
    getDictFromValue(data: AkIdentity[]|Object) {
        if (data) {
            if (data instanceof Array) {
                return IdentityAPI.identityArray2Dict(data);
            } else {
                return data;
            }
        } else {
            return {};
        }
    }

    hasTab(type: number) {
        if (this.props.identityTypes instanceof Array) {
            return this.props.identityTypes.indexOf(type) > -1;
        } else {
            return this.props.identityTypes === type;
        }
    }

    hasUserTab() {
        return this.hasTab(AkIdentityType_User);
    }

    hasOrganizationTab() {
        return this.hasTab(AkIdentityType_Organization);
    }

    /**
     * 修改用户选中值及触发相应事件
     * @param value
     * @param rowKeys
     * @param selectionDisabled
     */
    changeUserValue(value: Object, rowKeys: string[], selectionDisabled: boolean) {

        const {orgValue} = this.state;

        let state = {selectionDisabled: selectionDisabled};

        if (!rowKeys) {
            rowKeys = Object.keys(value);
        }

        //如果传入value，则value由外部控制
        if (!("value" in this.props)) {
            state = Object.assign(state, {userSelectedRowKeys: rowKeys, userValue: value});
        }

        this.setState(state);


        if (this.props.onChange) {
            this.props.onChange(Object.assign({}, orgValue, value));
        }
    }

    /**
     * 修改组织选中值及触发相应事件
     * @param value
     * @param rowKeys
     * @param selectionDisabled
     */
    changeOrgValue(value: Object, rowKeys: string[], selectionDisabled: boolean) {
        const {userValue} = this.state;

        let state = {selectionDisabled: selectionDisabled};

        if (!rowKeys) {
            rowKeys = Object.keys(value);
        }

        //如果传入value，则value由外部控制
        if (!("value" in this.props)) {
            state = Object.assign(state, {organizationCheckedKeys: rowKeys, orgValue: value});
        }

        this.setState(state);
        if (this.props.onChange) {
            // let orgs = Object.keys(value).map(k => value[k]);
            // let users = Object.keys(userValue).map(k => userValue[k]);

            //this.props.onChange(orgs.concat(users));

            this.props.onChange(Object.assign({}, userValue, value));
        }
    }

    /**
     * 移除选中的identity
     * @param identity
     */
    tagClosed(identity: AkIdentity) {
        let value;
        let keys;
        let index;

        switch (identity.Type) {
            case AkIdentityType_User:
                value = this.state.userValue;
                keys = this.state.userSelectedRowKeys;

                delete value[identity.ID];
                index = keys.indexOf(identity.ID);
                if (index > -1) {
                    keys.splice(index, 1);
                }

                this.changeUserValue(value, keys, false);
                break;
            case AkIdentityType_Organization:
                value = this.state.orgValue;
                keys = this.state.organizationCheckedKeys;

                delete value[identity.ID];
                index = keys.indexOf(identity.ID);
                if (index > -1) {
                    keys.splice(index, 1);
                }

                this.changeOrgValue(value, keys, false);
                break;
            default:
        }


    }

    /**
     * 获取选中identity的Tag
     * @returns {any[]}
     */
    getTagDisplay() {
        const {userValue, orgValue} = this.state;

        let value = Object.assign({}, userValue, orgValue);

        return Object.keys(value).map((v) => {
            let identity = value[v];
            let islong = identity.Name.length > this.props.nameDisplayLength;
            return <AkTag closable={true}
                          key={identity.ID}
                          afterClose={() => this.tagClosed(identity)}>
                {islong
                    ? identity
                        .Name
                        .slice(0, this.props.nameDisplayLength)
                    : identity.Name}
            </AkTag>;
        });
    }

    /**
     * 获取用户选择Tab
     * @returns {any}
     */
    getUserTab() {
        const intl = this.props.intl;

        const treeDataSimpleMode = {
            id: 'key',
            rootPId: "0"
        };
        let placeholder = intl.formatMessage({id: IdentityLocale.Organization}) + " : " + intl.formatMessage({id: CommonLocale.All});

        return <AkTabPane tab={intl.formatMessage({id:IdentityLocale.User})} key="USER">
            <AkRow gutter={16}>
                <AkCol span={12}>
                    <AkTreeSelect notFoundContent="loading..." placeholder={placeholder} multiple={false}
                                  treeCheckable={false}
                                  treeNodeFilterProp='title' showSearch={true} allowClear={true}
                                  treeData={this.state.organizationTree}
                                  treeDataSimpleMode={treeDataSimpleMode}
                                  onChange={v=>this.organizationChanged(v)}
                                  treeDefaultExpandAll={this.props.treeDefaultExpandAll}
                    />
                </AkCol>
                <AkCol span={12}>
                    <AkSearch placeholder="input user name or login" onSearch={v=>this.keywordChanged(v)}/>
                </AkCol>
            </AkRow>
            <AkRow style={{marginTop:5}}>
                {this.getUserTabTable()}
            </AkRow>
        </AkTabPane>
    }

    /**
     * 获取user tab中的用户列表
     * @returns {any}
     */
    getUserTabTable() {
        let userTabPagination = {
            total: this.state.userTabTotal,
            onChange: (page: number) => {
                this.setState({userTabLoading: true});
                this.searchUserRequest.pageIndex = page;
                this.searchUser();
            }
        }

        let rowSelection: AkTableRowSelection<AkUser> = {
            type: this.props.multiple ? "checkbox" : "radio",
            selectedRowKeys: this.state.userSelectedRowKeys,
            onChange: this.userTabTableSelectChange.bind(this),
            getCheckboxProps: record => ({
                disabled: this.state.userSelectedRowKeys.indexOf(record.ID) === -1 && this.state.selectionDisabled
            })
        };

        return <UserAkTable rowSelection={rowSelection}
                            onRowClick={this.props.allowRowClickSelection?this.userTableRowOnClick.bind(this):undefined}
                            size="small"
                            rowKey="ID"
                            columns={this.columns} loading={this.state.userTabLoading}
                            pagination={userTabPagination} dataSource={this.state.userSearchResult}/>;
    }

    /**
     * user table row click事件，更新check状态
     * @param record
     */
    userTableRowOnClick(record: AkIdentity) {
        let {userValue, userSelectedRowKeys, maxSelection} = this.state;

        let selectionDisabled = false;
        if (userValue.hasOwnProperty(record.ID)) {
            delete userValue[record.ID];
            userSelectedRowKeys = Object.keys(userValue);
            selectionDisabled = false;
        } else {
            let count = Object.keys(userValue).length;
            if (maxSelection === 0 || count < maxSelection) {
                userValue[record.ID] = record;
                userSelectedRowKeys.push(record.ID);
                count++;
            }

            selectionDisabled = maxSelection > 0 && count === maxSelection;
        }

        this.changeUserValue(userValue, userSelectedRowKeys, selectionDisabled);
    }

    /**
     * user table check变化后更新选中的value
     * @param selectedRowKeys
     */
    userTabTableSelectChange(selectedRowKeys) {
        let value = this.state.userValue;
        const {maxSelection} = this.state;

        //移除未选中的项目
        Object.keys(value).forEach(key => {
            if (selectedRowKeys.indexOf(key) === -1) {
                delete value[key];
            }
        });


        let selectionCount = Object.keys(value).length;
        let rowKeys = selectedRowKeys.slice(0);

        //根据当前页的结果集，添加选中的user
        this.state.userSearchResult.forEach(u => {
            let index = rowKeys.indexOf(u.ID);
            if (index > -1) {
                if (!value.hasOwnProperty(u.ID)) {
                    if (maxSelection === 0 || selectionCount < maxSelection) {
                        value[u.ID] = u;
                        selectionCount++;
                    } else {
                        rowKeys.splice(index, 1);
                    }
                }
            }
        });

        let selectionDisabled = maxSelection > 0 && selectionCount === maxSelection;

        this.changeUserValue(value, rowKeys, selectionDisabled);
    }

    //
    // /**
    //  * user table单行选中执行更新value，仅用于multiple为false
    //  * @param record
    //  */
    // userTabTableRowClick(record: AkIdentity) {
    //     let value = {};
    //     value[record.ID] = record;
    //     this.setState({value: value});
    // }

    /**
     * 用户的组织变更事件
     * @param value
     */

    organizationChanged(value) {
        this.setState({userTabLoading: true});
        this.searchUserRequest.orgId = value;
        this.searchUser(true);
    }

    /**
     * 用户关键值搜索变更事件
     * @param value
     */
    keywordChanged(value) {
        this.setState({userTabLoading: true});
        this.searchUserRequest.keyword = value;
        this.searchUser(true);
    }

    /**
     * 执行用户搜索
     * @param reset //是否重置当前页面为第一页
     */
    searchUser(reset?: boolean) {
        if (reset) {
            this.searchUserRequest.pageIndex = 1;
        }

        IdentityAPI.searchUser(this.searchUserRequest).then(rs => {
            let u = rs.Data.map(a => new AkUser(a));

            this.setState({
                userTabLoading: false,
                userSearchResult: u,
                userTabTotal: rs.TotalCount,
            });
        });
    }


    getOrganizationTab() {
        const intl = this.props.intl;
        //let placeholder = intl.formatMessage({id: IdentityLocale.Organization}) + " : " + intl.formatMessage({id: CommonLocale.All});
        return <AkTabPane tab={intl.formatMessage({id:IdentityLocale.Organization})} key="ORGANIZATION">
            <div style={{height:375, overflowY:"auto", margin:0, padding:0}}>
                <AkTreeSimple disableCheck={this.state.selectionDisabled}
                              checkedKeys={this.state.organizationCheckedKeys}
                              onCheck={this.organizationTreeChecked.bind(this)} checkable defaultExpandAll
                              checkedStrategy="PARENT" treeData={this.state.organizationTree}
                              simpleTreeDescriber={true}/>
            </div>
        </AkTabPane>
    }

    /**
     * organizationTree 变化后更新事件
     * @param checkedKeys
     */
    organizationTreeChecked(checkedKeys: string[]) {
        const {maxSelection, userSelectedRowKeys, organizationDict} = this.state;
        let disable = false;
        if (maxSelection > 0) {
            checkedKeys.splice(maxSelection - userSelectedRowKeys.length, checkedKeys.length);
            if (checkedKeys.length + userSelectedRowKeys.length >= maxSelection) {
                disable = true;
            }
        }
        let value = {};
        checkedKeys.forEach(k => {
            value[k] = organizationDict[k];
        });

        this.changeOrgValue(value, checkedKeys, disable);
    }

    // /**
    //  * 根据搜索结果和已经选择的内容，更新checked状态
    //  */
    // findUserSelectedRowKeys(searchResult: AkIdentity[]) {
    //     //return Object.keys(this.state.value);
    //     let rowKeys: string[] = [];
    //
    //     if (this.props.multiple) {
    //         Object.keys(this.state.value).forEach(field => {
    //             let v = this.state.value[field];
    //             let fs = searchResult.find(sr => {
    //                 return sr.ID === v.ID;
    //             });
    //             if (fs) {
    //                 rowKeys.push(fs.ID);
    //             }
    //         });
    //     }
    //     return rowKeys;
    // }

    render() {
        return <div><AkTab>
            {this.hasUserTab() ? this.getUserTab() : undefined}
            {this.hasOrganizationTab() ? this.getOrganizationTab() : undefined}
        </AkTab>
            <div style={{height:58, overflowY:"auto", marginTop:10}}>
                {this.getTagDisplay()}
            </div>
        </div>
    }
}

export default injectIntl(AkIdentityPickerAdv);
