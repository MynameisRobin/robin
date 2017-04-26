import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";
import {IdentityAPI, AkIdentity, AkIdentityType_User} from "../../api/common/identity";
import {AkTag} from "../controls/ak-tag";
import {AkButton} from "../controls/ak-button";
import {AkAutoComplete, AkDataSourceItemType} from "../controls/ak-autocomplete";
import {AkModal} from "../controls/ak-modal";
import AkIdentityPickerAdv from "./ak-identitypicker-adv";
import {AkSpin} from "../controls/ak-spin";

export interface AkIdentityPickerProp extends IntlProps {
    identityTypes?: number[];
    searchRowCount?: number;
    multiple?: boolean; //is allow multiple selection
    maxSelection?: number; //how many identity selection allowed
    maxDisplay?: number; //how many identity will be displayed on control
    displayAll?: boolean; //是否显示全部选项
    nameDisplayLength?: number; //超出长度的名称会被截取
    style?: React.CSSProperties; //additional style apply to control
    placeholder?: string; //输入默认的提示语
    defaultValue?: string | string[] | AkIdentity | AkIdentity[]; //default selection
    readonly?: boolean;
    autoCollapse?: boolean; //展开隐藏内容后，鼠标离开是否自动收起
    value?: string|string[]|AkIdentity|AkIdentity[]; //和onChange一起结合使用，如果value赋值则defaultValue无效
    onChange?: (value: AkIdentity|AkIdentity[]) => any; //onchange事件，将选中dict输出
}

interface AkIdentityPickerState {
    value?: Object;
    maxSelection?: number; //最大选择项
    initialized?: boolean; //是否初始化完成
    displayAll?: boolean;
    searchResult?: AkIdentity[];
    dataSource?: AkDataSourceItemType[];
    advanceVisible?: boolean; //高级选择器显示
    advanceTempValue?: Object; //advance picker的临时值
}

let resolvedIdentities: {
    [key: string]: AkIdentity;
} = {};

class AkIdentityPicker extends Component < AkIdentityPickerProp,
    AkIdentityPickerState > {
    static defaultProps: AkIdentityPickerProp = {
        identityTypes: [AkIdentityType_User],
        searchRowCount: 10,
        multiple: false,
        maxSelection: 200,
        maxDisplay: 5,
        placeholder: '+ New Identity',
        defaultValue: [],
        nameDisplayLength: 20,
        readonly: false,
        displayAll: false,
        autoCollapse: false
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            maxSelection: props.multiple ? props.maxSelection : 1,
            value: {},
            initialized: false,
            searchResult: [],
            advanceVisible: false,
            advanceTempValue: {},
        };
    }

    componentWillMount() {
        let value = ("value" in this.props) ? this.props.value : this.props.defaultValue;
        this.parseUnresolvedValue(value).then(d => {
            this.setState({value: IdentityAPI.identityArray2Dict(d), initialized: true})
        });
    }

    componentWillReceiveProps(nextProps: AkIdentityPickerProp) {
        if ("value" in nextProps && nextProps.value != this.props.value) {
            this.parseUnresolvedValue(nextProps.value).then(d => {
                this.setState({value: IdentityAPI.identityArray2Dict(d), initialized: true})
            });
        }
    }

    // /**
    //  * 根据传入参数适配专成Dict
    //  * @param data
    //  */
    // getDictFromValue(data: AkIdentity[]|AkIdentity|string) {
    //     if (data) {
    //         if (data instanceof String) {
    //
    //         } else if (data instanceof Array) {
    //             return IdentityAPI.identityArray2Dict(data);
    //         } else {
    //             return data;
    //         }
    //     } else {
    //         return {};
    //     }
    // }

    changeValue(value: Object) {
        console.log(value);
        if (!("value" in this.props)) {
            //如果外部传入value，则value由外部控制
            this.setState({value: value});
        }
        if (this.props.onChange) {
            if (this.props.multiple) {
                this.props.onChange(Object.keys(value).map(k => value[k]));
            } else {
                let values = Object.keys(value).map(k => value[k]);
                this.props.onChange(values.length > 0 ? values[0] : undefined);
            }
        }
    }

    async parseUnresolvedValue(val) {

        let result = [];
        let valArr = [];
        if (val) {
            if (val instanceof Array) {
                valArr = val;
            } else {
                valArr.push(val);
            }

            //获取所有需要解析的id数组，一次获取解析
            let identityIDs = [];
            valArr.forEach(p => {
                if (p && ("ID" in p || p instanceof AkIdentity)) {
                    result.push(p);
                } else if (p) {
                    if (p in resolvedIdentities) {
                        result.push(resolvedIdentities[p]);
                    } else {
                        identityIDs.push(p);
                    }
                }
            });

            if (identityIDs.length > 0) {
                let ids = await this.getIdentityFromSimpleValue(identityIDs);
                ids.forEach(id => {
                    resolvedIdentities[id.ID] = id;
                    result.push(id);
                });
            }
        }

        return result;
    }


    // //根据设置的defaultvalue解析出AkIdentity对象数组
    // async parseDefaultValue(val) {
    //     let result = [];
    //     if (val !== undefined) {
    //         if (val instanceof Array) {
    //             //获取所有需要解析的id数组，一次获取解析
    //             let identityIDs = [];
    //             val.forEach(p => {
    //                 if (p instanceof AkIdentity) {
    //                     result.push(p);
    //                 } else {
    //                     identityIDs.push(p);
    //                 }
    //             });
    //
    //             if (identityIDs.length > 0) {
    //                 result = result.concat(await this.getIdentityFromSimpleValue(identityIDs));
    //             }
    //         } else {
    //             await this.parseSingleValue(result, val);
    //         }
    //     }
    //     return result;
    // }
    //
    // /**
    //  * 解析单个value
    //  * @param arr
    //  * @param val
    //  * @returns {Promise<void>}
    //  */
    // async parseSingleValue(arr, val) {
    //     if (val instanceof String) {
    //         let str = val as string;
    //         if (str in resolvedIdentities) {
    //             arr.push(resolvedIdentities[str]);
    //         } else {
    //             let ids = await this.getIdentityFromSimpleValue([val]);
    //             if (ids.length>0) {
    //                 let id = ids[0];
    //                 resolvedIdentities[id.ID] = id;
    //                 arr.push(id);
    //             }
    //         }
    //     } else if (val instanceof AkIdentity) {
    //         arr.push(val);
    //     } else {
    //         //not support value type
    //     }
    // }

    async getIdentityFromSimpleValue(vals) {
        let checkArray = [];
        if (typeof vals === "string") {
            checkArray.push(vals);
        } else {
            checkArray = vals;
        }
        //默认搜索使用identitytypes的第一个选项，不然值应该是AkIdentity对象
        let identities = checkArray.map(ca => {
            return {ID: ca, Type: this.props.identityTypes[0]}
        });
        let rs = await IdentityAPI.resolveIdentities({identities: identities});
        ///todo: process error?
        return rs.Data;
    }

    tagClosed(removedTag) {
        let value = this.state.value;
        delete value[removedTag.ID];
        this.changeValue(value);
    }

    /**
     * 显示选中的Identity名称
     * @returns {any[]}
     */
    getTagDisplay() {
        const {value} = this.state;

        return (this.props.displayAll || this.state.displayAll
            ? Object.keys(value)
            : Object.keys(value).slice(0, this.props.maxDisplay)).map((v) => {

            return this.getSingleTagDisplay(value[v]);
        });
    }

    getSingleTagDisplay(value: AkIdentity) {
        let islong = value.Name.length > this.props.nameDisplayLength;
        return <AkTag
            key={value.ID}
            closable={!this.props.readonly}
            afterClose={() => this.tagClosed(value)}>
            {islong
                ? value
                    .Name
                    .slice(0, this.props.nameDisplayLength)
                : value.Name}
        </AkTag>
    }

    /**
     * 显示更多按钮
     * @returns {any}
     */
    getMoreDisplay() {
        const {value} = this.state;
        let moreCount = Object
                .keys(value)
                .length - this.props.maxDisplay;

        if (!this.props.displayAll && !this.state.displayAll && moreCount > 0) {
            return <AkButton
                style={{
                marginRight: 8
            }}
                onClick={() => {
                this.setState({displayAll: true})
            }}
                size="small">{moreCount + ' more'}</AkButton>;
        }
        return null;
    }

    /**
     * 如果设置了自动折叠，对应的处理逻辑
     */
    handleContainerMouseLeave() {
        if (this.props.autoCollapse && !this.props.displayAll) {
            this.setState({displayAll: false});
        }
    }

    /**
     * 根据输入值的变化调用后端搜索api
     * @param value 当前输入的值
     */
    handleInputChange(value) {
        if (value.trim().length > 0) {
            IdentityAPI
                .searchIdentities({
                    types: this.props.identityTypes,
                    keyword: value,
                    rowCount: this.props.searchRowCount
                })
                .then(d => {
                    this.setState({
                        searchResult: d.Data,
                        dataSource: d
                            .Data
                            .map(identity => {
                                return {value: identity.ID, text: identity.Name}
                            })
                    });
                });
        } else if (this.state.searchResult.length > 0) {
            this.setState({searchResult: [], dataSource: []});
        }
    }

    handleIdentitySelected(value) {
        var fs = this.state.searchResult.find(sr => {
            return sr.ID === value;
        });

        if (fs) {
            this.addValue(fs);
        }
    }

    addValue(value: AkIdentity) {
        let v = this.state.value;
        const {maxSelection} = this.state;
        if (!v.hasOwnProperty(value.ID)) {
            if (maxSelection > 0 && Object.keys(v).length >= maxSelection) {
                //maxSelection>0 有选择上限，提示错误
            } else {
                v[value.ID] = value;
                this.changeValue(v);
            }
        }
    }

    advancePickerOK() {
        this.setState({advanceVisible: false});
        this.changeValue(this.state.advanceTempValue); //直接传对象，因为adv控件不直接使用
    }

    advancePickerCancel() {
        this.setState({advanceVisible: false, advanceTempValue: this.state.value});//直接传对象，因为adv控件不直接使用
    }

    advanceValueChange(value) {
        console.log("valueChange", value);
        this.setState({advanceTempValue: value});
    }

    getAdvancePickerDisplay() {
        const {searchRowCount, value, onChange, maxDisplay, displayAll, style, placeholder, defaultValue, readonly, autoCollapse, ...others} = this.props;

        return <AkModal style={{top:30}} visible={this.state.advanceVisible} onOk={this.advancePickerOK.bind(this)}
                        onCancel={this.advancePickerCancel.bind(this)}>
            <AkIdentityPickerAdv searchRowCount={8} value={this.state.advanceTempValue}
                                 onChange={this.advanceValueChange.bind(this)} {...others}></AkIdentityPickerAdv>
        </AkModal>
    }

    displayAdvancePicker() {
        let newValue = Object.assign({}, this.state.value);
        console.log("open", newValue);
        this.setState({advanceVisible: true, advanceTempValue: newValue});
    }

    getInputDisplay() {
        if (!this.props.readonly)
            return <AkAutoComplete
                style={{
                width: 120
            }}
                iconType="setting"
                iconClick={this.displayAdvancePicker.bind(this)}
                showSearch={true}
                placeholder={this.props.placeholder}
                dataSource={this.state.dataSource}
                onChange={value => this.handleInputChange(value)}
                onSelect={value => this.handleIdentitySelected(value)}/>;
    }

    render() {
        //const props = Object.assign({}, this.getDefaultProps(), this.props);
        return <div
            className="ak-identity-picker-wrapper"
            style={this.props.style}
            onMouseLeave={this
            .handleContainerMouseLeave
            .bind(this)}>
            <AkSpin size="small" spinning={!this.state.initialized}>
                {this.getTagDisplay()
                }
                {this.getMoreDisplay()
                }
                {this.getInputDisplay()
                }
                {this.getAdvancePickerDisplay()
                }
            </AkSpin>
        </div>;
    }
}

export default injectIntl(AkIdentityPicker);
