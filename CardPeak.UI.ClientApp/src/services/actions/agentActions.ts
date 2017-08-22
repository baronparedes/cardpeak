import { createAction } from 'redux-actions';
import { AGENT_ACTIONS } from '../../constants/actions';

export const selectAgent = createAction<CardPeak.Types.Agent>(AGENT_ACTIONS.SELECT_AGENT);
export const getAllAgents = createAction(AGENT_ACTIONS.GET_ALL);