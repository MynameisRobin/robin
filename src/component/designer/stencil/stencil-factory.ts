import {StartEvent} from './items/event/startevent';
import {StopEvent} from './items/event/stopevent';
import {InclusiveGateway} from './items/gateway/inclusivegateway';
import {MailTaskActivity} from './items/activity/mailtask';
import {ReceiveTaskActivity} from './items/activity/receivetask';
import {WaitTaskActivity} from './items/activity/waittask';
import {VariableActivity} from './items/activity/variable';
import {StencilItemType} from '../util/common';
import {FlowLink} from './items/flowlink';
import { StopRejectEvent } from './items/event/stoprejectevent';

export class StencilFactory {
    static getStencil(type : StencilItemType, options?: any) {
        switch (type) {
            case StencilItemType.StartEvent:
                return new StartEvent(options, options);
            case StencilItemType.InclusiveGateway:
                return new InclusiveGateway(options, options);
            case StencilItemType.WaitTaskActivity:
                return new WaitTaskActivity(options, options)
            case StencilItemType.ReceiveTaskActivity:
                return new ReceiveTaskActivity(options, options);
            case StencilItemType.MailTaskActivity:
                return new MailTaskActivity(options, options);
            case StencilItemType.VariableActivity:
                return new VariableActivity(options, options)
            case StencilItemType.StopEvent:
                return new StopEvent(options, options);
                case StencilItemType.StopRejectEvent:
                return new StopRejectEvent(options, options);
            case StencilItemType.FlowLink:
                return new FlowLink(options, options);
            default:
                return null;
        }
    }
}
