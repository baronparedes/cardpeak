import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers'
import { METRIC_ACTIONS } from '../../constants/actions'
import * as metricsController from '../api/metricsController'
import * as dashboardController from '../api/dashboardController'

export const getYears = createAction<CardPeak.Entities.ApprovalMetric<number>[]>(METRIC_ACTIONS.GET_YEARS);
export const getMetrics = createAction(METRIC_ACTIONS.GET_METRICS);
export const getMetricsError = createAction<string>(METRIC_ACTIONS.GET_METRICS_ERROR);

export const getAgentMetricsComplete = createAction<CardPeak.Entities.AgentMetrics>(METRIC_ACTIONS.GET_AGENT_METRICS_COMPLETE);
export const getAgentRankingMetricsComplete = createAction<CardPeak.Entities.AgentRankMetric[]>(METRIC_ACTIONS.GET_AGENT_RANKING_METRICS_COMPLETE);
export const getAgentPerformanceMetricsComplete = createAction<CardPeak.Entities.AgentPerformanceMetric[]>(METRIC_ACTIONS.GET_AGENT_PERFORMANCE_METRICS_COMPLETE);
export const getAgentTresholdMetricsComplete = createAction<CardPeak.Entities.AgentTresholdMetric[]>(METRIC_ACTIONS.GET_AGENT_TRESHOLD_METRICS_COMPLETE);
export const getBankAmountBreakdownMetricsComplete = createAction<CardPeak.Entities.BankAmountBreakdown[]>(METRIC_ACTIONS.GET_BANK_AMOUNT_BREAKDOWN_METRICS_COMPLETE);

export function getAgentTresholdMetricsStart(year: number, month?: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getMetrics());
        metricsController.getMetrics<CardPeak.Entities.AgentTresholdMetric[]>(metricsController.API.GET_AGENT_TRESHOLD_METRICS, year, month,
            (data: CardPeak.Entities.AgentTresholdMetric[]) => {
                dispatch(getAgentTresholdMetricsComplete(data));
            }, (error: string) => {
                dispatch(getMetricsError(error));
                if (errorCallback) {
                    errorCallback(error);
                }
            });
    }

}

export function getBankAmountBreakdownMetricsStart(year: number, month?: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getMetrics());
        metricsController.getMetrics<CardPeak.Entities.BankAmountBreakdown[]>(metricsController.API.GET_BANK_AMOUNT_BREAKDOWN_METRICS, year, month,
            (data: CardPeak.Entities.BankAmountBreakdown[]) => {
                dispatch(getBankAmountBreakdownMetricsComplete(data));
            }, (error: string) => {
                dispatch(getMetricsError(error));
                if (errorCallback) {
                    errorCallback(error);
                }
            });
    }
}

export function getAgentPerformanceMetricsStart(year: number, month?: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getMetrics());
        metricsController.getMetrics<CardPeak.Entities.AgentPerformanceMetric[]>(metricsController.API.GET_AGENT_PERFORMANCE_METRICS, year, month,
            (data: CardPeak.Entities.AgentPerformanceMetric[]) => {
                dispatch(getAgentPerformanceMetricsComplete(data));
            }, (error: string) => {
                dispatch(getMetricsError(error));
                if (errorCallback) {
                    errorCallback(error);
                }
            });
    }
}

export function getAgentRankingMetricsStart(year: number, month: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getMetrics());
        metricsController.getMetrics<CardPeak.Entities.AgentRankMetric[]>(metricsController.API.GET_AGENT_RANKING_METRICS, year, month,
            (data: CardPeak.Entities.AgentRankMetric[]) => {
                dispatch(getAgentRankingMetricsComplete(data));
            }, (error: string) => {
                dispatch(getMetricsError(error));
                if (errorCallback) {
                    errorCallback(error);
                }
            });
    }
}

export function getAgentMetricsStart(year: number, month: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getMetrics());
        metricsController.getMetrics(metricsController.API.GET_AGENT_METRICS, year, month,
            (data: CardPeak.Entities.AgentMetrics) => {
                dispatch(getAgentMetricsComplete(data));
            }, (error: string) => {
                dispatch(getMetricsError(error));
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