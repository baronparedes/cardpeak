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

export function getAllAgentsStart() {
    return getAllAgentsStartThunkAction;
}

export function selectAgentDashboardStart() {
    return getAgentDashboardThunkAction;
}

const getAllAgentsStartThunkAction: ThunkAction<void, RootState, void> = (dispatch) => {
    dispatch(getAllAgents());
    agentsController.getAll((data: CardPeak.Entities.Agent[]) => {
        dispatch(getAllAgentsComplete(data));
    });
}

const getAgentDashboardThunkAction: ThunkAction<void, RootState, CardPeak.Entities.Agent> = (dispatch, getState, payload) => {
    let agent = getState().agentsModel.selectedAgent;
    dispatch(selectAgentDashboard());
    agentsController.getAgentDashboard(agent.agentId, (data: CardPeak.Entities.AgentDashboard) => {
        dispatch(selectAgentDashboardComplete(data));
    });
}