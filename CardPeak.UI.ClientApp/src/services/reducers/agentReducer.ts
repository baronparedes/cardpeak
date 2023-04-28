import { handleActions } from 'redux-actions';
import { AGENT_ACTIONS } from '../../constants/actions';
import { TransactionType } from '../../constants/enums';

const initialState: CardPeak.Models.AgentModel = {
    agents: undefined
};

function isBetween(
    dateFilters: CardPeak.Entities.DateFilters,
    transactionDate: Date
): boolean {
    const from = new Date(dateFilters.startDate);
    const target = new Date(transactionDate.toString());
    if (dateFilters.endDate) {
        const to = new Date(dateFilters.endDate);
        return from <= target && target <= to;
    } else {
        return from <= target;
    }
}

function updateSelectedAgentDashboard(
    state: CardPeak.Models.AgentModel,
    action: any
) {
    if (!state.selectedAgentDashboard) {
        return undefined;
    }

    let debitCreditTransactions = state.selectedAgentDashboard.debitCreditTransactions.slice();
    let agentDashboardTransactions = state.selectedAgentDashboard.agentDashboardTransactions.slice();
    let incentiveTransactions = state.selectedAgentDashboard.incentiveTransactions.slice();
    let accountBalance = state.selectedAgentDashboard.accountBalance;
    let incentivesBalance =
        state.selectedAgentDashboard.incentivesBalance;
    let savingsBalance = state.selectedAgentDashboard.savingsBalance;

    const transaction = action.payload as CardPeak.Entities.DebitCreditTransaction;
    const agentDashboardTransaction: CardPeak.Entities.AgentDashboardTransaction = {
        details: transaction.remarks,
        transactionAmount: transaction.amount,
        transactionId: transaction.id,
        transactionType: transaction.transactionTypeId,
        transactionDate: transaction.transactionDateTime,
        runningBalance:
            agentDashboardTransactions.length === 0
                ? transaction.amount
                : agentDashboardTransactions[0].runningBalance +
                  transaction.amount
    };

    if (
        transaction.transactionTypeId ===
        TransactionType.DebitCreditTransaction
    ) {
        accountBalance += transaction.amount;
        if (
            isBetween(
                state.dateFilters,
                transaction.transactionDateTime
            )
        ) {
            debitCreditTransactions.unshift(transaction);
            agentDashboardTransactions.unshift(
                agentDashboardTransaction
            );
        }
    }

    if (
        transaction.transactionTypeId ===
        TransactionType.IncentivesTransaction
    ) {
        incentivesBalance += transaction.amount;
        if (
            isBetween(
                state.dateFilters,
                transaction.transactionDateTime
            )
        ) {
            incentiveTransactions.unshift(transaction);
        }
    }

    if (
        transaction.transactionTypeId ===
        TransactionType.SavingsTransaction
    ) {
        savingsBalance += transaction.amount;
    }

    return {
        ...state.selectedAgentDashboard,
        accountBalance,
        incentivesBalance,
        debitCreditTransactions,
        incentiveTransactions,
        agentDashboardTransactions
    };
}

export default handleActions<CardPeak.Models.AgentModel, any>(
    {
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
            };
        },
        [AGENT_ACTIONS.SELECT_AGENT_DASHBOARD_COMPLETE]: (
            state,
            action
        ) => {
            return {
                ...state,
                loadingAgentDashboard: undefined,
                selectedAgentDashboard: action.payload,
                refreshingAgentDashboard: undefined
            };
        },
        [AGENT_ACTIONS.GET_ALL]: (state, action) => {
            return {
                ...state,
                loadingAgents: true,
                agents: undefined
            };
        },
        [AGENT_ACTIONS.GET_ALL_COMPLETE]: (state, action) => {
            return {
                ...state,
                loadingAgents: undefined,
                agents: action.payload
            };
        },
        [AGENT_ACTIONS.POST_AGENT_TRANSACTION]: (state, action) => {
            return {
                ...state,
                postingTransaction: true
            };
        },
        [AGENT_ACTIONS.POST_AGENT_TRANSACTION_COMPLETE]: (
            state,
            action
        ) => {
            return {
                ...state,
                postingTransaction: undefined,
                selectedAgentDashboard: updateSelectedAgentDashboard(
                    state,
                    action
                )
            };
        },
        [AGENT_ACTIONS.POST_AGENT_TRANSACTION_ERROR]: (
            state,
            action
        ) => {
            return {
                ...state,
                postingTransaction: undefined
            };
        },
        [AGENT_ACTIONS.REFRESH_AGENT_DASHBOARD]: (state, action) => {
            return {
                ...state,
                refreshingAgentDashboard: true
            };
        },
        [AGENT_ACTIONS.REFRESH_AGENT_DASHBOARD_COMPLETE]: (
            state,
            action
        ) => {
            return {
                ...state,
                refreshingAgentDashboard: undefined,
                selectedAgentDashboard: action.payload
            };
        },
        [AGENT_ACTIONS.UPDATE_AGENT]: (state, action) => {
            return {
                ...state,
                updatingAgent: true
            };
        },
        [AGENT_ACTIONS.UPDATE_AGENT_ERROR]: (state, action) => {
            return {
                ...state,
                updatingAgent: undefined
            };
        },
        [AGENT_ACTIONS.UPDATE_AGENT_COMPLETE]: (state, action) => {
            const agent = action.payload as CardPeak.Entities.Agent;
            let agents = state.agents.slice();
            agents.push(agent);

            if (
                state.selectedAgent &&
                state.selectedAgent.agentId === agent.agentId
            ) {
                return {
                    ...state,
                    updatingAgent: undefined,
                    agents,
                    selectedAgent: agent
                };
            }

            return {
                ...state,
                updatingAgent: undefined,
                agents
            };
        },
        [AGENT_ACTIONS.CREATE_AGENT]: (state, action) => {
            return {
                ...state,
                creatingAgent: true
            };
        },
        [AGENT_ACTIONS.CREATE_AGENT_ERROR]: (state, action) => {
            return {
                ...state,
                creatingAgent: undefined
            };
        },
        [AGENT_ACTIONS.CREATE_AGENT_COMPLETE]: (state, action) => {
            let agent = action.payload as CardPeak.Entities.Agent;
            let agents = state.agents ? state.agents.slice() : [];
            agents.push(agent);

            return {
                ...state,
                creatingAgent: undefined,
                agents
            };
        },
        [AGENT_ACTIONS.SET_DASHBOARD_DATE_FILTERS]: (state, action) => {
            return {
                ...state,
                dateFilters: action.payload
            };
        },
        [AGENT_ACTIONS.SELECT_AGENT_SAVINGS]: (state, action) => {
            return {
                ...state,
                loadingAgentSavings: true,
                selectedAgentSavings: undefined,
                refreshingAgentSavings: undefined
            };
        },
        [AGENT_ACTIONS.SELECT_AGENT_SAVINGS_COMPLETE]: (
            state,
            action
        ) => {
            return {
                ...state,
                loadingAgentSavings: undefined,
                selectedAgentSavings: action.payload,
                refreshingAgentSavings: undefined
            };
        },
        [AGENT_ACTIONS.UPLOAD_PHOTO]: (state, action) => {
            return {
                ...state,
                uploadingFile: true
            };
        },
        [AGENT_ACTIONS.UPLOAD_PHOTO_ERROR]: (state, action) => {
            return {
                ...state,
                uploadingFile: undefined
            };
        },
        [AGENT_ACTIONS.UPLOAD_PHOTO_COMPLETE]: (state, action) => {
            return {
                ...state,
                uploadingFile: undefined,
            };
        },
    },
    initialState
);
