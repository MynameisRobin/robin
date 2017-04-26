import {NavLocale} from "../locales/localeid";
import {PathConfig} from "./pathconfig";
import {NavigatorKey} from "./navigatorkey";

export let NavigatorConfig : MenuData[] = [
    {
        Key: NavigatorKey.ProcessRoot,
        Title: NavLocale.FlowSetting,
        Children: [
            {
                Key: NavigatorKey.ActivityTask,
                Title: NavLocale.FlowActivityTask,
                Path: PathConfig.ActivityTask,
                Icon: "process",
            }, {
                Key: NavigatorKey.ProcActivityInst,
                Title: NavLocale.FlowProcInstActivity,
                Path: PathConfig.ProcInst,
                Icon: "activity"
            }, {
                Key: NavigatorKey.ProcDef,
                Title: NavLocale.FlowProcDefAcvitity,
                Path: PathConfig.ProcDef,
                Icon: "deploy"
            }, {
                Key: NavigatorKey.ProcModel,
                Title: NavLocale.FLowProcModel,
                Path: PathConfig.ProcModel,
                Icon: "define"
            }, {
                Key: NavigatorKey.ProcModel,
                Title: NavLocale.FLowProcModel,
                Path: PathConfig.ProcModelItem,
                NotShow: true,
                Icon: "define",
            }, {
                Key: NavigatorKey.ProcCategory,
                Title: NavLocale.FlowProcDefCategory,
                Path: PathConfig.ProcCategory,
                Icon: "category"
            }
        ]
    }, {
        Key: NavigatorKey.PositionRoot,
        Title: NavLocale.PositionSetting,
        Path: PathConfig.Role,
        Icon: "positions"
    }, {
        Key: NavigatorKey.ProjRoot,
        Title: NavLocale.ProjectSetting,
        Icon: "project"
    }, {
        Key: NavigatorKey.ParamRoot,
        Title: NavLocale.ParamSetting,
        Path: PathConfig.Meta,
        Icon: "argument"
    }, {
        Key: NavigatorKey.ProcessCenter,
        Title: NavLocale.ProcessCenter,
        Path: PathConfig.NewProcess,
        Icon: "center"
    }
]
