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
export const getAgentThresholdMetricsComplete = createAction<CardPeak.Entities.AgentThresholdMetric[]>(METRIC_ACTIONS.GET_AGENT_THRESHOLD_METRICS_COMPLETE);
export const getBankAmountDistributionMetricsComplete = createAction<CardPeak.Entities.BankAmountDistribution[]>(METRIC_ACTIONS.GET_BANK_AMOUNT_DISTRIBUTION_METRICS_COMPLETE);

export function getAgentThresholdMetricsStart(year: number, month?: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getMetrics());
        metricsController.getMetrics<CardPeak.Entities.AgentThresholdMetric[]>(metricsController.API.GET_AGENT_THRESHOLD_METRICS, year, month,
            (data: CardPeak.Entities.AgentThresholdMetric[]) => {
                dispatch(getAgentThresholdMetricsComplete(data));
            }, (error: string) => {
                dispatch(getMetricsError(error));
                if (errorCallback) {
                    errorCallback(error);
                }
            });
    }

}

export function getBankAmountDistributionMetricsStart(year: number, month?: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getMetrics());
        metricsController.getMetrics<CardPeak.Entities.BankAmountDistribution[]>(metricsController.API.GET_BANK_AMOUNT_DISTRIBUTION_METRICS, year, month,
            (data: CardPeak.Entities.BankAmountDistribution[]) => {
                dispatch(getBankAmountDistributionMetricsComplete(data));
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

export function getAgentRankingMetricsStart(year: number, month: number, bankId: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getMetrics());

        let params = {
            year,
            month,
            bankId
        };

        metricsController.getMetricsWithParams<CardPeak.Entities.AgentRankMetric[]>(metricsController.API.GET_AGENT_RANKING_METRICS, params,
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
                if (completeCallback) {
                    completeCallback();
                }
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