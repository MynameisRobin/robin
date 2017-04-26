import * as React from "react";
import {Component} from "react";
import {injectIntl} from "react-intl";
import {AkAffix} from "../controls/ak-affix";
import {AkButton} from "../controls/ak-button";
import {AkTooltip} from "../controls/ak-tooltip";
import {EventManager} from "./util/eventmanager";
import {FlowcraftDesignerLocale} from "../../locales/localeid";
import {AkModal} from "../controls/ak-modal";
import AkDesignerVardef from "./vardef/ak-designer-vardef";

interface AkDesignerToolProps extends IntlProps,
DesignerBaseProps {
    /**保存 */
    onSave?: () => void;
    /**发布 */
    onDeploy?: () => void;
    /**设置流程变量 */
    onOpenVariable?: () => void;
}
interface AkDesignerToolStates {
    variableVisible?: boolean; //variable对话框显示
    cachedVariable?: Variables; //缓存Variable对象
}
export class AkDesignerTool extends Component < AkDesignerToolProps,
AkDesignerToolStates > {

    constructor(props : AkDesignerToolProps, context) {
        super(props, context);
        this.state = {
            variableVisible: false
        };
    }
    undo() {
        EventManager.Undo();
    }
    redo() {
        EventManager.Redo();
    }
    openVariableDialog() {
        const variables = this.props.MainData.variables;
        const value = {
            basic: variables?variables
                .basic
                .slice(0):[],
            listref: variables?variables
                .listref
                .slice(0):[]
        };
        this.setState({variableVisible: true, cachedVariable: value});
    }
    /**
     * 加载变量框
     *
     * @returns
     *
     * @memberOf AkDesignerTool
     */
    renderVairaibleDialog() {
        return <AkModal
            width={850}
            style={{
            top: 30
        }}
            visible={this.state.variableVisible}
            onOk={this
            .variableOk
            .bind(this)}
            onCancel={this
            .variableCancel
            .bind(this)}>
            <AkDesignerVardef
                value={this.state.cachedVariable}
                onChange={this
                .variablesOnChange
                .bind(this)}></AkDesignerVardef>
        </AkModal>
    }

    variablesOnChange(v) {
        this.setState({cachedVariable: v});
    }

    variableOk() {
        this.props.MainData.variables=this.state.cachedVariable;
        this.setState({variableVisible: false, cachedVariable: null});
    }

    variableCancel() {
        this.setState({variableVisible: false, cachedVariable: null});
    }

    render() {
        const {intl} = this.props;

        return <div style={AkDesignerToolStyle.StaticTop}>
            {this.renderVairaibleDialog()}
            <AkAffix
                offsetTop={10}>
                <AkButton.Group style={{
                    marginRight: 30
                }}>
                    <AkTooltip
                        title={intl.formatMessage({id: FlowcraftDesignerLocale.BasicVariable})}>
                        <AkButton icon="line" onClick={() => this.openVariableDialog()}/>
                    </AkTooltip>
                </AkButton.Group>

                <AkButton.Group>
                    <AkTooltip title={"save"}>
                        <AkButton icon="save" onClick={() => this.props.onSave()}></AkButton>
                    </AkTooltip>
                    <AkTooltip title={"deploy"}>
                        <AkButton icon="fly" onClick={() => this.props.onDeploy()}></AkButton>
                    </AkTooltip>
                    <AkTooltip title={"undo"}>
                        <AkButton
                            icon="undo"
                            onClick={() => {
                            this.undo()
                        }}></AkButton>
                    </AkTooltip>
                    <AkTooltip title={"redo"}>
                        <AkButton icon="redo" onClick={() => this.redo()}></AkButton>
                    </AkTooltip>
                    <AkTooltip title={"exit"}>
                        <AkButton icon="exit" onClick={() => {}}></AkButton>
                    </AkTooltip>
                </AkButton.Group>
            </AkAffix>
        </div>
    }
}
class AkDesignerToolStyle {
    static StaticTop : React.CSSProperties = {
        position: 'absolute',
        top: 10,
        right: 40
    }
}

export default injectIntl(AkDesignerTool);
