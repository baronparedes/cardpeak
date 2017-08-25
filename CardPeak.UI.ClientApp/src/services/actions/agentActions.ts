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

export function postAgentTransactionStart(transaction: CardPeak.Entities.DebitCreditTransaction, isDebit: boolean, success?: () => void, error?: (m: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(postAgentTransaction());
        agentsController.postAgentTransaction(transaction, isDebit, (data: CardPeak.Entities.DebitCreditTransaction) => {
            dispatch(postAgentTransactionComplete(data));
            if (success) {
                success();
            }
        }, (message: string) => {
            dispatch(postAgentTransactionError());
            if (error) {
                error(message);
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
        let agent = getState().agentsModel.selectedAgent;
        dispatch(selectAgentDashboard());
        agentsController.getAgentDashboard(agent.agentId, (data: CardPeak.Entities.AgentDashboard) => {
            dispatch(selectAgentDashboardComplete(data));
        });
    }
}