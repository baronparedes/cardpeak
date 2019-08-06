import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { AGENT_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as agentsController from '../api/agentsController'
import { getAgentPayoutStart } from '../actions/agentPayoutActions'

export const selectAgent = createAction<CardPeak.Entities.Agent>(AGENT_ACTIONS.SELECT_AGENT);
export const selectAgentDashboard = createAction(AGENT_ACTIONS.SELECT_AGENT_DASHBOARD);
export const selectAgentDashboardComplete = createAction<CardPeak.Entities.AgentDashboard>(AGENT_ACTIONS.SELECT_AGENT_DASHBOARD_COMPLETE);
export const getAllAgentsComplete = createAction<CardPeak.Entities.Agent[]>(AGENT_ACTIONS.GET_ALL_COMPLETE);
export const getAllAgents = createAction(AGENT_ACTIONS.GET_ALL);
export const postAgentTransaction = createAction(AGENT_ACTIONS.POST_AGENT_TRANSACTION);
export const postAgentTransactionComplete = createAction<CardPeak.Entities.DebitCreditTransaction>(AGENT_ACTIONS.POST_AGENT_TRANSACTION_COMPLETE);
export const postAgentTransactionError = createAction(AGENT_ACTIONS.POST_AGENT_TRANSACTION_ERROR);
export const refreshAgentDashboard = createAction(AGENT_ACTIONS.REFRESH_AGENT_DASHBOARD);
export const updateAgent = createAction(AGENT_ACTIONS.UPDATE_AGENT);
export const updateAgentComplete = createAction<CardPeak.Entities.Agent>(AGENT_ACTIONS.UPDATE_AGENT_COMPLETE);
export const updateAgentError = createAction(AGENT_ACTIONS.UPDATE_AGENT_ERROR);
export const createAgent = createAction(AGENT_ACTIONS.CREATE_AGENT);
export const createAgentComplete = createAction<CardPeak.Entities.Agent>(AGENT_ACTIONS.CREATE_AGENT_COMPLETE);
export const createAgentError = createAction(AGENT_ACTIONS.CREATE_AGENT_ERROR);
export const setDateFilters = createAction<CardPeak.Entities.DateFilters>(AGENT_ACTIONS.SET_DASHBOARD_DATE_FILTERS);
export const selectAgentSavings = createAction(AGENT_ACTIONS.SELECT_AGENT_SAVINGS);
export const selectAgentSavingsComplete = createAction<CardPeak.Entities.AgentSavings>(AGENT_ACTIONS.SELECT_AGENT_SAVINGS_COMPLETE);


function filterAgent(data: CardPeak.Entities.Agent[], id: number, agentFoundCallback: (agent: CardPeak.Entities.Agent) => void, notFoundCallback: () => void) {
    let agent: CardPeak.Entities.Agent = data.filter(_ => _.agentId == id)[0];
    if (agent) {
        agentFoundCallback(agent);
    }
    else {
        notFoundCallback();
    }
}

export function deactivateAgent(agentId: number, successCallback: () => void) {
    return (dispatch: (e: any) => void) => {
        agentsController.deactivateAgent(agentId, () => {
            dispatch(createAction(AGENT_ACTIONS.DEACTIVATE_AGENT)());
            dispatch(getAgentPayoutStart());
            if (successCallback) {
                successCallback();
            }
        });
    }
}

export function selectAgentById(id: number, agentFoundCallback: (agent: CardPeak.Entities.Agent) => void, notFoundCallback: () => void) {
    return (dispatch: (e: any) => void, getState: () => RootState) => {
        const agents = getState().agentModel.agents;
        if (!agents) {
            dispatch(getAllAgentsStart((data: CardPeak.Entities.Agent[]) => {
                filterAgent(data, id, agentFoundCallback, notFoundCallback);
            }));
        }
        else {
            filterAgent(agents, id, agentFoundCallback, notFoundCallback);
        }
    }
}

export function getAgentDetails(agentId: number, successCallback:(data: CardPeak.Entities.AgentDetails) => void) {
    return (dispatch: (e: any) => void) => {
        agentsController.getDetailsAsync(agentId).then((data: CardPeak.Entities.AgentDetails) => {
            if (successCallback) {
                successCallback(data);
            }
            dispatch(createAction<CardPeak.Entities.AgentDetails>(AGENT_ACTIONS.GET_DETAILS)(data));
        });
    }
}

export function createAgentStart(agent: CardPeak.Entities.Agent, successCallback?: () => void, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(createAgent());
        agentsController.createAgent(agent, (agent: CardPeak.Entities.Agent) => {
            dispatch(createAgentComplete(agent));
            if (successCallback) {
                successCallback();
            }
        }, (error: string) => {
            dispatch(createAgentError());
            if (errorCallback) {
                errorCallback(error);
            }
        });
    }
}

export function updateAgentStart(agent: CardPeak.Entities.Agent, successCallback?: () => void, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(updateAgent());
        agentsController.updateAgent(agent, (agent: CardPeak.Entities.Agent) => {
            dispatch(updateAgentComplete(agent));
            if (successCallback) {
                successCallback();
            }
        }, (error: string) => {
            dispatch(updateAgentError());
            if (errorCallback) {
                errorCallback(error);
            }
        });
    }
}

export function refreshAgentDashboardStart(startDate?: string, endDate?: string) {
    return (dispatch: (e: any) => void, getState: () => RootState) => {
        let agentId = getState().agentModel.selectedAgent.agentId;
        dispatch(refreshAgentDashboard());
        agentsController.getAgentDashboardFiltered(agentId, startDate, endDate, (data: CardPeak.Entities.AgentDashboard) => {
            dispatch(selectAgentDashboardComplete(data));
        });
    }
}

export function postAgentTransactionStart(transaction: CardPeak.Entities.DebitCreditTransaction, transactionType: Transaction,
    successCallback?: () => void, errorCallback?: (m: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(postAgentTransaction());
        agentsController.postAgentTransaction(transaction, transactionType, (data: CardPeak.Entities.DebitCreditTransaction) => {
            dispatch(postAgentTransactionComplete(data));
            dispatch(getAgentPayoutStart());
            if (successCallback) {
                successCallback();
            }
        }, (message: string) => {
            dispatch(postAgentTransactionError());
            if (errorCallback) {
                errorCallback(message);
            }
        });
    }
}

export function getAllAgentsStart(completedCallback?: (data: CardPeak.Entities.Agent[]) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(getAllAgents());
        agentsController.getAll((data: CardPeak.Entities.Agent[]) => {
            dispatch(getAllAgentsComplete(data));
            if (completedCallback) {
                completedCallback(data);
            }
        });
    }
}

export function selectAgentDashboardStart() {
    return (dispatch: (e: any) => void, getState: () => RootState) => {
        let agent = getState().agentModel.selectedAgent;
        dispatch(selectAgentDashboard());
        agentsController.getAgentDashboard(agent.agentId, (data: CardPeak.Entities.AgentDashboard) => {
            dispatch(selectAgentDashboardComplete(data));
        });
    }
}

export function selectAgentSavingsStart() {
    return (dispatch: (e: any) => void, getState: () => RootState) => {
        let agent = getState().agentModel.selectedAgent;
        dispatch(selectAgentSavings());
        agentsController.getAgentSavings(agent.agentId, (data: CardPeak.Entities.AgentSavings) => {
            dispatch(selectAgentSavingsComplete(data));
        });
    }
}

export function getAgentSavingsStart(agentId: number, year: number) {
    return (dispatch: (e: any) => void) => {
        dispatch(selectAgentSavings());
        agentsController.getAgentSavingsByYear(agentId, year, (data) => {
            dispatch(selectAgentSavingsComplete(data));
        });
    }
}