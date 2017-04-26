export class StencilBaseView extends joint.dia.Element {
    /**设置 */
    DataSetting?: StencilProp[];
    /**属性值 */
    Properties?: ProcessShape;
    /**初始化值 */
    initPropSetting?: () => void;
    /**
     * 格式化方法
     *
     *
     * @memberOf StencilBaseView
     */
    static format : ({id: string}) => string;
}
/**
 * 工具项类型
 */
export enum StencilItemType {
    StartEvent,
    StopEvent,
    StopRejectEvent,
    InclusiveGateway,
    WaitTaskActivity,
    ReceiveTaskActivity,
    MailTaskActivity,
    VariableActivity,
    FlowLink
}
