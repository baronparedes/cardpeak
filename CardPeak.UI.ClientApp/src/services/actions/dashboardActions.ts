import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { DASHBOARD_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as dashboardController from '../api/dashboardController'

export const getDashboard = createAction(DASHBOARD_ACTIONS.GET_DASHBOARD);
export const getDashboardComplete = createAction<CardPeak.Models.DashboardModel>(DASHBOARD_ACTIONS.GET_DASHBOARD_COMPLETE);

export function refreshDashboardStart(year: number, month: number, errorCallback?: (error: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(getDashboard());
        dashboardController.refreshDashboard(year, month, (data: CardPeak.Models.DashboardModel) => {
            dispatch(getDashboardComplete(data));
        }, errorCallback);
    }
}

export function getDashboardStart(errorCallback?: (error: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(getDashboard());
        dashboardController.getDashboard((data: CardPeak.Models.DashboardModel) => {
            dispatch(getDashboardComplete(data));
        }, errorCallback);
    }
}