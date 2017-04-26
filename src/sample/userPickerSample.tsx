import * as React from "react";
import {Component} from "react";
import {AkButton} from "../component/controls/ak-button";
import {AkPopconfirm} from "../component/controls/ak-popconfirm";
import {AkRow} from "../component/controls";
import {AkCol} from "../component/controls/ak-col";
import AkDesignerExpr from "../component/designer/expr/ak-designer-expr";
import AkDesignerVardef from "../component/designer/vardef/ak-designer-vardef";
import AkDesignerConditionDialog from "../component/designer/ak-designer-condition";
import AkDesignerTaskAssignDialog from "../component/designer/taskassign/ak-designer-taskassign-dialog";
import AkDesignerTaskAssignMulti from "../component/designer/taskassign/ak-designer-taskassign-multi";

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        ID: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}


const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey?, _tns?) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({label: key, key});
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);


const listData = [{key: "1", title: "abcdefg1"}, {key: "2", title: "abcdefg2"}, {key: "3", title: "abcdefg3"}];

const childshapes: ProcessShape[] = [
    {
        resourceid: '123456455656',
        properties: {
            name: 'Test Task1'
        },
        stencil: {
            id: "task"
        }
    },
    {
        resourceid: '123456455657',
        properties: {
            name: 'Test Task'
        },
        stencil: {
            id: "start"
        }
    },
    {
        resourceid: '123456455658',
        properties: {
            name: 'Test Task2'
        },
        stencil: {
            id: "task"
        }
    },
];

class UserPickerSample extends Component<any,any> {


    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedRowKeys: [],
            treeData: gData,
            dataSource: [],
            treeDataSimpleMode: {
                id: 'field',
                rootPId: 0,
            },
            treeCheckedKeys: [],
            test: "abc",
            listCheckedKeys: [],
            listModalVisible: false,
            listModalTitle: "Add list definition",
            listModalStatus: undefined,
            variables: {basic: [], listref: []},
            conditionDialogVisible: false,
            taskassignVisible: false,
        };

        // setTimeout(() => {
        //     this.setState({treeData: this.getTreeData()});
        // }, 2000);
    }

    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        //this.setState({ selectedRowKeys:selectedRowKeys });
    }

    getSimpleTree() {
        return [
            {key: 1, pId: 0, label: 'test1', value: 'test1'},
            {key: 121, pId: 0, label: 'test1', value: 'test121'},
            {key: 11, pId: 1, label: 'test11', value: 'test11'},
            {key: 12, pId: 1, label: 'test12', value: 'test12'},
            {key: 111, pId: 11, label: 'test111', value: 'test111'},
        ];
    }

    getTreeData() {
        return [
            {
                label: 'tree node 0000001', value: 'tree node 0000001', key: 'tree node 0000001', children: [
                {
                    label: 'tree node 00000011', value: 'tree node 00000011', key: 'tree node 00000011', children: [
                    {
                        label: 'tree node 000000111',
                        value: 'tree node 000000111',
                        key: 'tree node 000000111',
                        children: [
                            {
                                label: 'tree node 0000001111',
                                value: 'tree node 0000001111',
                                key: 'tree node 0000001111',
                                children: [
                                    {
                                        label: 'tree node 00000011111',
                                        value: 'tree node 00000011111',
                                        key: 'tree node 00000011111'
                                    }
                                ]
                            }
                        ]
                    },
                    {label: 'tree node 000000112', value: 'tree node 000000112', key: 'tree node 000000112'},
                    {label: 'tree node 000000113', value: 'tree node 000000113', key: 'tree node 000000113'},

                ]
                },
                {label: 'tree node 00000012', value: 'tree node 00000012', key: 'tree node 00000012'},
                {label: 'tree node 00000013', value: 'tree node 00000013', key: 'tree node 00000013'},
                {label: 'tree node 00000014', value: 'tree node 00000014', key: 'tree node 00000014'},
                {label: 'tree node 00000015', value: 'tree node 00000015', key: 'tree node 00000015'},
                {label: 'tree node 00000016', value: 'tree node 00000016', key: 'tree node 00000016'},
                {label: 'tree node 00000017', value: 'tree node 00000017', key: 'tree node 00000017'},
                {label: 'tree node 00000018', value: 'tree node 00000018', key: 'tree node 00000018'},
                {label: 'tree node 00000019', value: 'tree node 00000019', key: 'tree node 00000019'}
            ]
            },
            {label: 'tree node 0000002', value: 'tree node 0000002', key: 'tree node 0000002'},
            {label: 'tree node 0000003', value: 'tree node 0000003', key: 'tree node 0000003'},
            {label: 'tree node 0000004', value: 'tree node 0000004', key: 'tree node 0000004'}
        ];
    }

    autoCompleteChange(value) {
        this.setState({
            dataSource: !value ? [] : [
                    {value: value, text: 'Text:' + value},
                    {value: value + value, text: 'Text:' + value + value},
                    {value: value + value + value, text: 'Text:' + value + value + value},
                ]
        })
    }

    autoCompleteSelect(value) {
    }

    treeOnCheck(d, i) {
        let checkedKeys = {checked: [], halfChecked: []};
        if (d instanceof Array) {
            checkedKeys.checked = d;
        } else {
            checkedKeys = d;
        }

        this.setState({treeCheckedKeys: checkedKeys});
    }

    exprEditor;

    render() {
        //return <div><AkList></AkList></div>;
        //const { loading, selectedRowKeys } = this.state;
        // const rowSelection = {
        //     selectedRowKeys: this.state.selectedRowKeys,
        //     onChange: this.onSelectChange.bind(this),
        // };

        // const loop = data => data.map((item) => {
        //     if (item.children) {
        //         return (
        //             <Tree.TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>
        //                 {loop(item.children)}
        //             </Tree.TreeNode>
        //         );
        //     }
        //     return <Tree.TreeNode key={item.key} title={item.key}/>;
        // });


        //
        return <div>
            {/*<AkRow><AkIdentityPicker multiple={true} identityTypes={["ORGANIZATION","USER"]}*/}
            {/*maxSelection={20}></AkIdentityPicker></AkRow>*/}
            {/*<AkRow>*/}
            {/*/!*<AkCheckbox defaultChecked={true}></AkCheckbox>*!/*/}
            {/*<AkList render={item=>item.title + ":" + item.key} maxSelection={1} dataSource={listData}*/}
            {/*footer={this.renderFooter.bind(this)}*/}
            {/*onChange={keys=>this.setState({listCheckedKeys:keys})}></AkList>*/}
            {/*</AkRow>*/}


            <AkRow>
                <AkCol>

                    <AkDesignerVardef value={this.state.variables}
                                      onChange={this.variableChange.bind(this)}></AkDesignerVardef>
                </AkCol>
                <AkCol>
                    <AkDesignerExpr singleLine={false} multilines={4}
                                    onChange={v=>console.log("dddd", JSON.stringify(v))}></AkDesignerExpr>
                </AkCol>
                <AkCol>
                    <AkButton onClick={()=>this.setState({conditionDialogVisible:true})}>Conditions</AkButton>
                    <AkDesignerConditionDialog defaultValue={[{},{}]} onOk={this.conditionOk.bind(this)}
                                               onCancel={this.conditionCancel.bind(this)}
                                               visible={this.state.conditionDialogVisible}></AkDesignerConditionDialog>
                    {/*<AkDesignerCondition defaultValue={[{},{}]}></AkDesignerCondition>*/}
                    <AkDesignerTaskAssignMulti></AkDesignerTaskAssignMulti>
                </AkCol>
            </AkRow>
            <AkRow>
                <AkButton onClick={()=>this.setState({taskassignVisible:true})}>Assignee</AkButton>
                <AkDesignerTaskAssignDialog onOk={this.assigneeOk.bind(this)} onCancel={this.assigneeCancel.bind(this)}
                                            visible={this.state.taskassignVisible}></AkDesignerTaskAssignDialog>
            </AkRow>

            {/*<AkRow>*/}
            {/*<AkAutoComplete showSearch={true} onSelect={(value)=>this.autoCompleteSelect(value)}*/}
            {/*onChange={(value)=>this.autoCompleteChange(value)} dataSource={this.state.dataSource}*/}
            {/*style={{width:200}}/>*/}
            {/*</AkRow>*/}

            {/*<AkRow><AkTreeSelect placeholder='loading...' style={{width:200}} multiple={true}*/}
            {/*treeData={this.state.treeData}></AkTreeSelect>*/}
            {/*</AkRow>*/}

            {/*<AkRow><AkTreeSelect placeholder='loading...' style={{width:200}} treeNodeFilterProp='title'*/}
            {/*treeCheckable={true} multiple={true}*/}
            {/*treeData={this.getSimpleTree()}*/}
            {/*treeDataSimpleMode={this.state.treeDataSimpleMode}></AkTreeSelect>*/}
            {/*</AkRow>*/}

            {/*<AkRow><AkIdentityPickerAdv identityTypes={["ORGANIZATION","USER"]} multiple={true}*/}
            {/*maxSelection={3}></AkIdentityPickerAdv></AkRow>*/}

            {/*<AkRow>*/}
            {/*<AkTreeSimple maxChecking={2} checkedStrategy="PARENT" checkedKeys={this.state.treeCheckedKeys} onCheck={d=>this.setState({treeCheckedKeys:d})} checkable treeData={this.state.treeData} />*/}
            {/*</AkRow>*/}
            {/*<AkRow><AkTree defaultExpandAll={true} autoExpandParent={true} checkable*/}
            {/*onCheck={this.treeOnCheck.bind(this)}*/}
            {/*onSelect={d=>{console.log("select", d)}}>{loop(gData)}</AkTree></AkRow>*/}
            {/*<AkRow><Table size="small" rowKey="ID" rowSelection={rowSelection} columns={columns} dataSource={data}></Table></AkRow>*/}

            {/*<AkModal width={300} title={this.state.listModalTitle} visible={this.state.listModalVisible}*/}
            {/*onOk={this.submitListForm.bind(this)}>*/}
            {/*<AkDesignerVardefListrefForm onSubmit={this.listFormSubmitted.bind(this)}*/}
            {/*status={this.state.listModalStatus}*/}
            {/*idValidator={this.validateId.bind(this)}></AkDesignerVardefListrefForm>*/}
            {/*</AkModal>*/}
            {/*<AkButton onClick={this.addVariable.bind(this)}>Add variable</AkButton>*/}
        </div>;
    }

    conditionOk(value) {
        console.log(value);
        this.setState({conditionDialogVisible: false});
    }

    conditionCancel() {
        this.setState({conditionDialogVisible: false});
    }

    assigneeOk(value) {
        console.log(value);
        this.setState({taskassignVisible: false});
    }

    assigneeCancel() {
        this.setState({taskassignVisible: false});
    }


    variableChange(v) {
        this.setState({varialbes: v});
    }

    exprEditorChange(v) {
        console.log(v);
    }

    addVariable() {
        const tag = {type: "abc", name: "ddd"}
        this.exprEditor.onTagAdd([tag]);
    }

    listFormSubmitted(err, values) {
        if (err) {
            console.log("submitListForm", err);
            this.setState({listModalStatus: undefined});
        } else {
            console.log("submitListForm", values);
            this.setState({listModalStatus: undefined, listModalVisible: false});
        }
    }


    submitListForm() {
        this.setState({listModalStatus: "submit"});
    }

    validateId(rule, value, callback) {
        if (value === "1") {
            callback("Value cannot be 1");
        } else {
            callback();
        }
    }


    showAddListModal() {
        this.setState({listModalTitle: "Add list definition", listModalVisible: true});
    }

    showEditListModal() {
        this.setState({listModalTitle: "Edit list definition", listModalVisible: true});
    }

    renderFooter(props, state) {
        return <div>
            <AkButton onClick={this.showAddListModal.bind(this)} type="ghost" size="small"
                      style={{margin:5}}>Add</AkButton>
            <AkButton disabled={state.checkedKeys.length === 0} type="ghost" size="small"
                      style={{margin:5}}>Edit</AkButton>
            <AkPopconfirm title="Are you sure?"><AkButton disabled={state.checkedKeys.length === 0} type="ghost"
                                                          size="small"
                                                          style={{margin:5}}>Remove</AkButton></AkPopconfirm>
        </div>
    }

    inputChange(e) {
    }

}

export default UserPickerSample;
