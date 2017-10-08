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
export const putAgent = createAction(AGENT_ACTIONS.PUT_AGENT);
export const putAgentComplete = createAction<CardPeak.Entities.Agent>(AGENT_ACTIONS.PUT_AGENT_COMPLETE);
export const putAgentError = createAction(AGENT_ACTIONS.PUT_AGENT_ERROR);
export const postAgent = createAction(AGENT_ACTIONS.POST_AGENT);
export const postAgentComplete = createAction<CardPeak.Entities.Agent>(AGENT_ACTIONS.POST_AGENT_COMPLETE);
export const postAgentError = createAction(AGENT_ACTIONS.POST_AGENT_ERROR);

function filterAgent(data: CardPeak.Entities.Agent[], id: number, agentFoundCallback: (agent: CardPeak.Entities.Agent) => void, notFoundCallback: () => void) {
    let agent: CardPeak.Entities.Agent = data.filter(_ => _.agentId == id)[0];
    if (agent) {
        agentFoundCallback(agent);
    }
    else {
        notFoundCallback();
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

export function getAccounts(agentId: number, successCallback:(data: CardPeak.Entities.Account[]) => void) {
    return (dispatch: (e: any) => void) => {
        let selectAgentAction = createAction<CardPeak.Entities.Agent>(AGENT_ACTIONS.SELECT_AGENT);
        agentsController.getAccountsAsync(agentId).then((data: CardPeak.Entities.Account[]) => {
            if (successCallback) {
                successCallback(data);
            }
            dispatch(createAction<CardPeak.Entities.Account[]>(AGENT_ACTIONS.GET_ACCOUNTS)(data));
        });
    }
}

export function postAgentStart(agent: CardPeak.Entities.Agent, successCallback?: () => void, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(postAgent());
        agentsController.createAgent(agent, (agent: CardPeak.Entities.Agent) => {
            dispatch(postAgentComplete(agent));
            if (successCallback) {
                successCallback();
            }
        }, (error: string) => {
            dispatch(postAgentError());
            if (errorCallback) {
                errorCallback(error);
            }
        });
    }
}

export function putAgentStart(agent: CardPeak.Entities.Agent, successCallback?: () => void, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(putAgent());
        agentsController.updateAgent(agent, (agent: CardPeak.Entities.Agent) => {
            dispatch(putAgentComplete(agent));
            if (successCallback) {
                successCallback();
            }
        }, (error: string) => {
            dispatch(putAgentError());
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

export function postAgentTransactionStart(transaction: CardPeak.Entities.DebitCreditTransaction, isDebit: boolean,
    successCallback?: () => void, errorCallback?: (m: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(postAgentTransaction());
        agentsController.postAgentTransaction(transaction, isDebit, (data: CardPeak.Entities.DebitCreditTransaction) => {
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