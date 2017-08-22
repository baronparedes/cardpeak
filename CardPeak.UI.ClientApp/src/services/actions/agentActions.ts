import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { AGENT_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as agentsController from '../api/agentsController'

export const selectAgent = createAction<CardPeak.Types.Agent>(AGENT_ACTIONS.SELECT_AGENT);
export const getAllAgentsComplete = createAction<CardPeak.Types.Agent[]>(AGENT_ACTIONS.GET_ALL_COMPLETE);
export const getAllAgents = createAction(AGENT_ACTIONS.GET_ALL);

export function getAllAgentsStart() {
    return getAllAgentsStartThunkAction;
}

const getAllAgentsStartThunkAction: ThunkAction<void, RootState, void> = (dispatch) => {
    dispatch(getAllAgents());
    agentsController.GetAll((data: CardPeak.Types.Agent[]) => {
        dispatch(getAllAgentsComplete(data));
    });
}