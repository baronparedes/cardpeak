import { handleActions } from 'redux-actions';
import { AGENT_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.AgentDashboardModel = {
};

export default handleActions<CardPeak.Models.AgentDashboardModel, any>({
    [AGENT_ACTIONS.SELECT_AGENT]: (state, action) => {
        return {
            ...state,
            selectedAgent: action.payload,
            selectedAgentDashboard: undefined,
            loadingAgentDashboard: undefined,
            refreshingAgentDashboard: undefined
        };
    },
    [AGENT_ACTIONS.SELECT_AGENT_DASHBOARD]: (state, action) => {
        return {
            ...state,
            loadingAgentDashboard: true,
            selectedAgentDashboard: undefined,
            refreshingAgentDashboard: undefined
        }
    },
    [AGENT_ACTIONS.SELECT_AGENT_DASHBOARD_COMPLETE]: (state, action) => {
        return {
            ...state,
            loadingAgentDashboard: undefined,
            selectedAgentDashboard: action.payload,
            refreshingAgentDashboard: undefined
        }
    },
    [AGENT_ACTIONS.GET_ALL]: (state, action) => {
        return {
            ...state,
            loadingAgents: true,
            agents: undefined,
        };
    },
    [AGENT_ACTIONS.GET_ALL_COMPLETE]: (state, action) => {
        return {
            ...state,
            loadingAgents: undefined,
            agents: action.payload,
        };
    },
    [AGENT_ACTIONS.POST_AGENT_TRANSACTION]: (state, action) => {
        return {
            ...state,
            postingTransaction: true,
        };
    },
    [AGENT_ACTIONS.POST_AGENT_TRANSACTION_COMPLETE]: (state, action) => {
        let transaction = action.payload as CardPeak.Entities.DebitCreditTransaction;
        let transactions = state.selectedAgentDashboard.debitCreditTransactions.slice();
        transactions.push(transaction);
        return {
            ...state,
            postingTransaction: undefined,
            selectedAgentDashboard: {
                ...state.selectedAgentDashboard,
                accountBalance: state.selectedAgentDashboard.accountBalance + transaction.amount,
                debitCreditTransactions: transactions
            },
        };
    },
    [AGENT_ACTIONS.POST_AGENT_TRANSACTION_ERROR]: (state, action) => {
        return {
            ...state,
            postingTransaction: undefined,
        };
    },
    [AGENT_ACTIONS.REFRESH_AGENT_DASHBOARD]: (state, action) => {
        return {
            ...state,
            refreshingAgentDashboard: true
        }
    },
    [AGENT_ACTIONS.REFRESH_AGENT_DASHBOARD_COMPLETE]: (state, action) => {
        return {
            ...state,
            refreshingAgentDashboard: undefined,
            selectedAgentDashboard: action.payload
        }
    },
    [AGENT_ACTIONS.PUT_AGENT]: (state, action) => {
        return {
            ...state,
            puttingAgent: true
        }
    },
    [AGENT_ACTIONS.PUT_AGENT_ERROR]: (state, action) => {
        return {
            ...state,
            puttingAgent: undefined
        }
    },
    [AGENT_ACTIONS.PUT_AGENT_COMPLETE]: (state, action) => {
        let agent = action.payload as CardPeak.Entities.Agent;
        let agents = state.agents.slice();
        agents.push(agent);

        if (state.selectedAgent && state.selectedAgent.agentId === agent.agentId) {
            return {
                ...state,
                puttingAgent: undefined,
                agents,
                selectedAgent: agent
            }
        }

        return {
            ...state,
            puttingAgent: undefined,
            agents
        }
    }
}, initialState);
