/**
 * 表达式编辑器，用于条件和邮件模板
 * 邮件模板的formatValue需要额外加<var></var>
 */
import * as React from "react";
import {Component} from "react";
import AkDesignerExprEditor from "./ak-designer-expr-editor";
import {AkRow} from "../../controls/ak-row";
import {AkCol} from "../../controls/ak-col";
import {AkList} from "../../controls/ak-list";
import {injectIntl} from "react-intl";
import {
    exprUserTemplate,
    exprVariableTemplate,
    exprTaskTemplate,
    exprMetadataCategoryTemplate,
    exprMetadataTemplate
} from "./ak-designer-expr";
import {AkButton} from "../../controls/ak-button";
import {MetadataAPI} from "../../../api/common/metadata";

export interface AkDesignerExprAdvProp extends IntlProps {
    multilines?: number; //显示编辑的行数
    singleLine?: boolean; //是否限制单行文本
    metadataShowHierarchy?: boolean; //是否展示metadata完整路径
    value?: string;
    defaultValue?: string;
    readonly?: boolean;
    exprItems?: exprItem[];
    onChange?: (value: string) => void;
    childshapes?: ProcessShape[]; //流程中节点的定义
    variables?: Variables; //流程中变量的定义
}

interface AkDesignerExprAdvState {
    advEditorVisible?: boolean;
    checkedItems?: exprItem[];
    exprList?: any[];
}

class AkDesignerExprAdv extends Component < AkDesignerExprAdvProp,
    AkDesignerExprAdvState > {
    static defaultProps: AkDesignerExprAdvProp = {
        defaultValue: "",
        childshapes: []
    }

    constructor(props, context) {
        super(props, context);

        this.state = {checkedItems: [], exprList: []};
    }

    editor;

    listCheckChanged(keys, level) {
        let {checkedItems} = this.state;

        let items = this.props.exprItems;
        if (level > 0) {
            items = checkedItems[level - 1].items;
        }

        checkedItems.splice(level, checkedItems.length);
        if (keys.length > 0) {

            const key = keys[0];
            let selected = items.find(i => i.id === key);
            if (selected) {
                checkedItems.push(selected);
            }
        }

        this.setState({checkedItems: checkedItems}, () => {
            this.getExprLists().then(d => {
                this.setState({exprList: d}, () => {
                    if (d.length > 0) {
                        let nodes = (this.refs["exprListContainer"] as HTMLDivElement).childNodes[0].childNodes;
                        nodes.length > 0 && (nodes[nodes.length - 1] as HTMLDivElement).scrollIntoView();
                    }
                });
            });
        });
    }


    /**
     * 根据对象类型，构造子对象数组
     * @param item
     * @returns {any}
     */
    async parseExprItemsByValueType(item) {
        const {variables, childshapes, intl, metadataShowHierarchy} = this.props;

        let items;
        switch (item.valueType) {
            case "variables":
                //每次都需要根据最新的variables构造列表
                if (variables && variables.basic) {
                    items = variables.basic.map(v => {
                        let item = Object.assign({}, exprVariableTemplate, {
                            id: exprVariableTemplate.id + ":" + v.id,
                            title: v.name,
                            type: v.type
                        });
                        item.value = item.value.replace("@varid", v.id);
                        return item;
                    });
                }
                break;
            case "user":
                //如果对象已经构建，则不需要重复创建
                if (item.items && item.items.length > 0) {
                    items = item.items;
                } else {
                    items = exprUserTemplate.map(t => {
                        return Object.assign({}, t, {
                            value: t.value.replace("@userid", item.attr["userid"]),
                            preLocale: item.locale
                        });
                    });
                }
                break;
            case "tasks":
                //构造任务上下文列表,需要每次根据最新的childshape更新
                items = [];
                for (let i in childshapes) {
                    const shape = childshapes[i];
                    const stencil = shape.stencil.id;
                    if (stencil === "task" || stencil === "UserTask" || stencil === "CandidateTask") {
                        items.push({
                            id: shape.resourceid,
                            title: shape.properties["name"],
                            valueType: "task"
                        });
                    }
                }
                break;
            case "task":
                //如果对象已经构建，则不需要重复创建
                if (item.items && item.items.length > 0) {
                    items = item.items;
                } else {
                    items = exprTaskTemplate.map(t => {
                        if (t.valueType === "user") {
                            let expr = Object.assign({}, t, {
                                attr: {userid: t.attr["userid"].replace("@defid", item.id)},
                                prefix: item.title
                            });
                            expr.items = exprUserTemplate.map(u => {
                                return Object.assign({}, u, {
                                    value: u.value.replace("@userid", expr.attr["userid"]),
                                    prefix: item.title + ":" + intl.formatMessage({id: expr.locale})
                                });
                            });

                            return expr;
                        } else {
                            return Object.assign({}, t, {
                                value: t.value.replace("@defid", item.id),
                                prefix: item.title
                            });
                        }
                    });
                }
                break;
            case "metadataCategories":
                //如果对象已经构建，则不需要重复创建
                if (item.items && item.items.length > 0) {
                    items = item.items;
                } else {
                    let response = await MetadataAPI.getCategorys();
                    var t = exprMetadataCategoryTemplate;
                    items = response.Data.map(c => {
                        return Object.assign({}, t, {id: c.CategoryID, title: c.Name});
                    });
                }
                break;
            case "metadataCategory":
                //如果对象已经构建，则不需要重复创建
                if (item.items && item.items.length > 0) {
                    items = item.items;
                } else {
                    let response = await MetadataAPI.get({categoryID: item.id});
                    var t = exprMetadataTemplate;
                    items = response.Data.map(c => {
                        return Object.assign({}, t, {
                            id: c.ID,
                            title: c.Name,
                            prefix: item.title,
                            attr: {categoryID: c.CategoryID, parentID: c.ParentID},
                            value: t.value.replace("@metadataId", c.ID).replace("@categoryId", c.CategoryID)
                        });
                    });
                }
                break;
            case "metadata":
                //如果对象已经构建，则不需要重复创建
                if (item.items && item.items.length > 0) {
                    items = item.items;
                } else {
                    let response = await MetadataAPI.get({categoryID: item.attr.categoryID, parentID: item.id});
                    var t = exprMetadataTemplate;
                    items = response.Data.map(c => {
                        return Object.assign({}, t, {
                            id: c.ID,
                            title: c.Name,
                            prefix: metadataShowHierarchy ? item.prefix + ":" + item.title : item.prefix,
                            attr: {categoryID: c.CategoryID, parentID: item.id},
                            value: t.value.replace("@metadataId", c.ID).replace("@categoryId", c.CategoryID)
                        });
                    });
                }
                break;
            default:
                items = item.items;
        }

        return items;
    }

    getExprlist(exprItems: exprItem[], level) {

        const {formatMessage} = this.props.intl;
        const {checkedItems} = this.state;

        let k = [];
        let childChecked = checkedItems[level];
        if (childChecked) {
            k.push(childChecked.id);
        }

        let items = exprItems.map(d => {
            return {key: d.id, title: d.locale ? formatMessage({id: d.locale}) : d.title}
        });

        return <div key={level} width={32} style={{float:'left', marginRight:10, marginBottom:10}}>
            <AkList maxSelection={1}
                    dataSource={items}
                    checkedKeys={k} footer={()=>this.renderListFooter(exprItems, k)}
                    onChange={(keys)=>this.listCheckChanged(keys, level)}></AkList>
        </div>

    }

    renderListFooter(exprItems: exprItem[], checkedKeys: string[]) {
        let item: exprItem;
        if (checkedKeys.length > 0) {
            let key = checkedKeys[0];
            item = exprItems.find(e => e.id === key);
        }

        let disabled = !(item && item.value);

        return <AkButton onClick={()=>this.insertExpr(item)} type="ghost"
                         size="small" disabled={disabled}
                         style={{margin:5, float:"right"}}>Insert</AkButton>;
    }

    insertExpr(item: exprItem) {
        this.editor.onTagAdd([item]);
    }

    async getExprLists() {
        const {checkedItems} = this.state;

        let lastSelected;
        let result = [];
        for (let i = 0; i < checkedItems.length; i++) {
            let item = checkedItems[i];
            lastSelected = item;
            item.items = await this.parseExprItemsByValueType(item);

            let k = [];
            let childChecked = checkedItems[i + 1];
            if (childChecked) {
                k.push(childChecked.title);
            }

            if (item.items && item.items.length > 0) {
                result.push(this.getExprlist(item.items, i + 1));
            }
        }
        return result;
    }


    // getExprLists() {
    //     const {checkedItems} = this.state;
    //
    //     let lastSelected;
    //     return checkedItems.map((item, idx) => {
    //         lastSelected = item;
    //         item.items = this.parseExprItemsByValueType(item);
    //
    //         let k = [];
    //         let childChecked = checkedItems[idx + 1];
    //         if (childChecked) {
    //             k.push(childChecked.title);
    //         }
    //
    //         if (item.items && item.items.length > 0) {
    //             return this.getExprlist(item.items, idx + 1);
    //         }
    //     });
    // }

    formatTagDisplay(item) {
        const {formatMessage} = this.props.intl;
        let prefix = item.preLocale ? formatMessage({id: item.preLocale}) : item.prefix;
        prefix = prefix ? prefix + ":" : "";
        let title = item.locale ? formatMessage({id: item.locale}) : item.title;
        return prefix + title;
    }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate');
    //
    // }

    render() {
        const {defaultValue, value, onChange, multilines, singleLine} = this.props;
        const {exprList} = this.state;

        const width = (1 + exprList.length) * 190;
        return <div><AkRow><AkCol>
            <AkDesignerExprEditor singleLine={singleLine} defaultValue={defaultValue} value={value}
                                  multilines={multilines}
                                  formatDisplay={this.formatTagDisplay.bind(this)}
                                  ref={e=>this.editor=e} contentEditable={!this.props.readonly} onChange={onChange}/>
        </AkCol></AkRow>
            <div ref="exprListContainer" style={{marginTop:10, overflowX:'auto', clear:'both'}}>
                <div style={{width:width}}>
                {this.getExprlist(this.props.exprItems, 0)}
                    {exprList}
                </div>
            </div>
        </div>

    }
}

export default injectIntl(AkDesignerExprAdv);
