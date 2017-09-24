import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers'
import { METRIC_ACTIONS } from '../../constants/actions'
import * as metricsController from '../api/metricsController'
import * as dashboardController from '../api/dashboardController'

export const getYears = createAction<CardPeak.Entities.ApprovalMetric<number>[]>(METRIC_ACTIONS.GET_YEARS);
export const getAgentMetrics = createAction(METRIC_ACTIONS.GET_AGENT_METRICS);
export const getAgentMetricsComplete = createAction<CardPeak.Entities.AgentApprovalMetric[]>(METRIC_ACTIONS.GET_AGENT_METRICS_COMPLETE);
export const getAgentMetricsError = createAction(METRIC_ACTIONS.GET_AGENT_METRICS_ERROR);

export function getAgentMetricsStart(year: number, month: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getAgentMetrics());
        metricsController.getAgentMetrics(year, month, (data: CardPeak.Entities.AgentApprovalMetric[]) => {
            dispatch(getAgentMetricsComplete(data));
        }, (error: string) => {
            dispatch(getAgentMetricsError());
            if (errorCallback) {
                errorCallback(error);
            }
        });
    }
}

export function getAvailableYears() {
    return (dispatch: (e: any) => void, getState: () => RootState) => {
        if (!getState().metricsModel.availableYears) {
            dashboardController.getAvailableYears((data) => {
                dispatch(getYears(data));
            });
        }
    }
}