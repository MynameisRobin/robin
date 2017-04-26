import {NavLocale} from '../locales/localeid';
import {PathConfig} from './pathconfig';
import {NavigatorKey} from './navigatorkey';

export let NavigatorConfig : MenuData[] = [
    {
        Key: NavigatorKey.NewProcess,
        Title: NavLocale.NewProcess,
        Path: PathConfig.NewProcess,
        Icon: "plus"
    }, {
        Key: NavigatorKey.WaittingTask,
        Title: NavLocale.WaitingTask,
        Path: PathConfig.WaitingTask,
        Icon: "wait-task"
    }, {
        Key: NavigatorKey.FinishTask,
        Title: NavLocale.FinishTask,
        Path: PathConfig.FinishTask,
        Icon: "done-task"
    }, {
        Key: NavigatorKey.Application,
        Title: NavLocale.Application,
        Path: PathConfig.Application,
        Icon: "apply-task"
    }, {
        Key: NavigatorKey.ReceiveTask,
        Title: NavLocale.ReceiveTask,
        Path: PathConfig.ReceiveTask,
        Icon: "receive-task"
    }
]
