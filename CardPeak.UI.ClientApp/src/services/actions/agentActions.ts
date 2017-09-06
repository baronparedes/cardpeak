import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { AGENT_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as agentsController from '../api/agentsController'

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
        agentsController.postAgent(agent, (agent: CardPeak.Entities.Agent) => {
            dispatch(postAgentComplete(agent));
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

export function putAgentStart(agent: CardPeak.Entities.Agent, successCallback?: () => void, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(putAgent());
        agentsController.putAgent(agent, (agent: CardPeak.Entities.Agent) => {
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
        let agentId = getState().agentDashboardModel.selectedAgent.agentId;
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

export function getAllAgentsStart() {
    return (dispatch: (e: any) => void) => {
        dispatch(getAllAgents());
        agentsController.getAll((data: CardPeak.Entities.Agent[]) => {
            dispatch(getAllAgentsComplete(data));
        });
    }
}

export function selectAgentDashboardStart() {
    return (dispatch: (e: any) => void, getState: () => RootState) => {
        let agent = getState().agentDashboardModel.selectedAgent;
        dispatch(selectAgentDashboard());
        agentsController.getAgentDashboard(agent.agentId, (data: CardPeak.Entities.AgentDashboard) => {
            dispatch(selectAgentDashboardComplete(data));
        });
    }
}