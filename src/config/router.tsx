import * as React from 'react'
import {Component} from 'react'
import {
    Router,
    Route,
    IndexRoute,
    browserHistory,
    hashHistory,
    withRouter,
    History
} from 'react-router';
import UserPickerSample from '../sample/userPickerSample'

import {AkmiiFrame, AkmiiChildFrame} from '../component/frame/index';

import {PathConfig} from './pathconfig';

import {
    AcvitityTaskPage,
    OverTimeTaskPage,
    ProcCategoryPage,
    ProcDefPage,
    ProcDesignerPage,
    ProcInstPage,
    ProcInstItemPage,
    ProcModelPage,
    ProcDefItemPage,
    ProcModelItemPage,
    ProcModelDesignerPage,
    MetaPage,
    FlowRulesPage,
    JobPositionsPage,
    OrganizationRolePage,
    LocationRolePage
} from '../page/admin/'

import {
    NewProcess,
    WaitingTask,
    FinishTask,
    FinishTaskItem,
    Application,
    TaskApprove,
    LeaveRequest,
    LeaveApproval,
    ReceiveTask,
    ReceiveTaskItem
} from '../page/'

import {
    CashApplication,
    CashAudit,
    CashView,
    DailyReimbursementApplication,
    DailyReimbursementAudit,
    DailyReimbursementView,
    LeaveApplication,
    LeaveAudit,
    LeaveView,
    PaymentApplication,
    PaymentAudit,
    PaymentView,
    TravelApplication,
    TravelAudit,
    TravelView,
    TravelExpenseApplication,
    TravelExpenseAudit,
    TravelExpenseView
} from '../page/apps/workflow/'

const history = hashHistory;
function checkAuth(nextState, replace) {}

window.openWithHash = (url?: string, target?: string, features?: string, replace?: boolean) : Window => {
    if (history === hashHistory) {
        return window.open(`${window.location.pathname}#${url}`, target, features, replace);
    }
    return window.open(url, target, features, replace);
}

const routerConfig = (
    <Router history={history}>
        <Route path={PathConfig.Home} onEnter={checkAuth} component={AkmiiFrame}>
            <IndexRoute component={AcvitityTaskPage}></IndexRoute>
            <Route path={PathConfig.ActivityTask} component={AcvitityTaskPage}></Route>
            <Route path={PathConfig.ProcInst} component={ProcInstPage}></Route>
            <Route path={PathConfig.ProcDef} component={ProcDefPage}></Route>
            <Route path={PathConfig.ProcModel} component={ProcModelPage}></Route>
            <Route path={PathConfig.ProcModelItem} component={ProcModelItemPage}></Route>
            <Route path={PathConfig.ProcCategory} component={ProcCategoryPage}></Route>
            <Route path={PathConfig.ProcDefItme} component={ProcDefItemPage}></Route>
            <Route path={PathConfig.ProcInstItme} component={ProcInstItemPage}></Route>
        </Route>
        <Route path={PathConfig.Role} component={JobPositionsPage}></Route>
         <Route path={PathConfig.LocationRole} component={LocationRolePage}></Route>
        <Route path={PathConfig.OrganizationRole} component={OrganizationRolePage}></Route>
        <Route path={PathConfig.Meta} component={MetaPage}></Route>
        <Route path={PathConfig.Home} onEnter={checkAuth} component={AkmiiChildFrame}>
            <Route path={PathConfig.NewProcess} component={NewProcess}></Route>
            <Route path={PathConfig.WaitingTask} component={WaitingTask}></Route>
            <Route path={PathConfig.FinishTask} component={FinishTask}></Route>
            <Route path={PathConfig.FinishTaskItem} component={FinishTaskItem}></Route>
            <Route path={PathConfig.Application} component={Application}></Route>
            <Route path={PathConfig.TaskApprove} component={TaskApprove}></Route>
            <Route path={PathConfig.ReceiveTask} component={ReceiveTask}></Route>
            <Route path={PathConfig.ReceiveTaskItem} component={ReceiveTaskItem}></Route>
        </Route>
        <Route path={PathConfig.CashApplication} component={CashApplication}></Route>
        <Route path={PathConfig.CashAudit} component={CashAudit}></Route>
        <Route path={PathConfig.CashView} component={CashView}></Route>
        <Route
            path={PathConfig.DailyReimbursementApplication}
            component={DailyReimbursementApplication}></Route>
        <Route
            path={PathConfig.DailyReimbursementAudit}
            component={DailyReimbursementAudit}></Route>
        <Route
            path={PathConfig.DailyReimbursementView}
            component={DailyReimbursementApplication}></Route>
        <Route path={PathConfig.LeaveApplication} component={LeaveApplication}></Route>
        <Route path={PathConfig.LeaveAudit} component={LeaveAudit}></Route>
        <Route path={PathConfig.LeaveView} component={LeaveView}></Route>
        <Route path={PathConfig.PaymentApplication} component={PaymentApplication}></Route>
        <Route path={PathConfig.PaymentAudit} component={PaymentAudit}></Route>
        <Route path={PathConfig.PaymentView} component={PaymentView}></Route>
        <Route path={PathConfig.TravelApplication} component={TravelApplication}></Route>
        <Route path={PathConfig.TravelAudit} component={TravelAudit}></Route>
        <Route path={PathConfig.TravelView} component={TravelView}></Route>
        <Route
            path={PathConfig.TravelExpenseApplication}
            component={TravelExpenseApplication}></Route>
        <Route path={PathConfig.TravelExpenseAudit} component={TravelExpenseAudit}></Route>
        <Route path={PathConfig.TravelExpenseView} component={TravelExpenseView}></Route>
        <Route path={PathConfig.ApplyProcess} component={LeaveRequest}></Route>
        <Route path={PathConfig.ApproveProcess} component={LeaveApproval}></Route>
        <Route path={PathConfig.ProcModelDesigner} component={ProcModelDesignerPage}></Route>
        <Route path="/test" component={UserPickerSample}></Route>
        <Route path="*" onEnter={checkAuth}></Route>
    </Router>
);
export default routerConfig;
