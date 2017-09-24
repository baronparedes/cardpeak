import { handleActions } from 'redux-actions';
import { METRIC_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.MetricsModel = {
    agentMetrics: []
};

export default handleActions<CardPeak.Models.MetricsModel, any>({
    [METRIC_ACTIONS.GET_YEARS]: (state, action) => {
        return {
            ...state,
            availableYears: action.payload
        }
    },
    [METRIC_ACTIONS.GET_AGENT_METRICS]: (state, action) => {
        return {
            ...state,
            loadingAgentMetrics: true
        }
    },
    [METRIC_ACTIONS.GET_AGENT_METRICS_ERROR]: (state, action) => {
        return {
            ...state,
            loadingAgentMetrics: undefined
        }
    },
    [METRIC_ACTIONS.GET_AGENT_METRICS_COMPLETE]: (state, action) => {
        return {
            ...state,
            loadingAgentMetrics: undefined,
            agentMetrics: action.payload
        }
    }
}, initialState);
