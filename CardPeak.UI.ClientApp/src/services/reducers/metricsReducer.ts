import { handleActions } from 'redux-actions';
import { METRIC_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.MetricsModel = {
    agentRankingMetrics: [],
    agentPerformanceMetrics: [],
    agentMetrics: {
        agentApprovalMetrics: []
    }
};

export default handleActions<CardPeak.Models.MetricsModel, any>({
    [METRIC_ACTIONS.GET_YEARS]: (state, action) => {
        return {
            ...state,
            availableYears: action.payload
        }
    },
    [METRIC_ACTIONS.GET_METRICS]: (state, action) => {
        return {
            ...state,
            loadingMetrics: true,
            loadingMetricsError: undefined
        }
    },
    [METRIC_ACTIONS.GET_METRICS_ERROR]: (state, action) => {
        return {
            ...state,
            loadingMetrics: undefined,
            loadingMetricsError: action.payload
        }
    },
    [METRIC_ACTIONS.GET_AGENT_METRICS_COMPLETE]: (state, action) => {
        return {
            ...state,
            loadingMetrics: undefined,
            loadingMetricsError: undefined,
            agentMetrics: action.payload
        }
    },
    [METRIC_ACTIONS.GET_AGENT_RANKING_METRICS_COMPLETE]: (state, action) => {
        return {
            ...state,
            loadingMetrics: undefined,
            loadingMetricsError: undefined,
            agentRankingMetrics: action.payload
        }
    },
    [METRIC_ACTIONS.GET_AGENT_PERFORMANCE_METRICS_COMPLETE]: (state, action) => {
        return {
            ...state,
            loadingMetrics: undefined,
            loadingMetricsError: undefined,
            agentPerformanceMetrics: action.payload
        }
    },
    [METRIC_ACTIONS.GET_AGENT_TRESHOLD_METRICS_COMPLETE]: (state, action) => {
        return {
            ...state,
            loadingMetrics: undefined,
            loadingMetricsError: undefined,
            agentTresholdMetrics: action.payload
        }
    },
    [METRIC_ACTIONS.GET_BANK_AMOUNT_BREAKDOWN_METRICS_COMPLETE]: (state, action) => {
        return {
            ...state,
            loadingMetrics: undefined,
            loadingMetricsError: undefined,
            bankAmountBreakdown: action.payload
        }
    }
}, initialState);
