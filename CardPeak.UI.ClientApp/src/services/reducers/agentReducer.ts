import { handleActions } from 'redux-actions';
import { AGENT_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.AgentsModel = {
};

export default handleActions<CardPeak.Models.AgentsModel, any>({
    [AGENT_ACTIONS.SELECT_AGENT]: (state, action) => {
        return {
            ...action.payload,
            ...state,
            selectedAgent: action.payload,
            selectedAgentDashboard: undefined,
            loadingAgentDashboard: undefined
        };
    },
    [AGENT_ACTIONS.SELECT_AGENT_DASHBOARD]: (state, action) => {
        return {
            ...action.payload,
            ...state,
            loadingAgentDashboard: true,
            selectedAgentDashboard: undefined,
        }
    },
    [AGENT_ACTIONS.SELECT_AGENT_DASHBOARD_COMPLETE]: (state, action) => {
        return {
            ...action.payload,
            ...state,
            loadingAgentDashboard: undefined,
            selectedAgentDashboard: action.payload
        }
    },
    [AGENT_ACTIONS.GET_ALL]: (state, action) => {
        return {
            ...action.payload,
            ...state,
            loadingAgents: true,
            agents: undefined
        };
    },
    [AGENT_ACTIONS.GET_ALL_COMPLETE]: (state, action) => {
        return {
            ...action.payload,
            ...state,
            loadingAgents: undefined,
            agents: action.payload
        };
    },
    [AGENT_ACTIONS.POST_AGENT_TRANSACTION]: (state, action) => {
        return {
            ...action.payload,
            ...state,
            postingTransaction: true,
            postingTransactionError: undefined
        };
    },
    [AGENT_ACTIONS.POST_AGENT_TRANSACTION_COMPLETE]: (state, action) => {
        let agentDashboard = state.selectedAgentDashboard;
        agentDashboard.debitCreditTransactions.push(action.payload);
        return {
            ...action.payload,
            ...state,
            postingTransaction: undefined,
            postingTransactionError: undefined,
            selectedAgentDashboard: agentDashboard
        };
    },
    [AGENT_ACTIONS.POST_AGENT_TRANSACTION_ERROR]: (state, action) => {
        return {
            ...action.payload,
            ...state,
            postingTransaction: undefined,
            postingTransactionError: action.payload
        };
    },
}, initialState);
