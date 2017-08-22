import { createAction } from 'redux-actions';
import { AGENT_ACTIONS } from '../../constants/actions';

export const selectAgent = createAction<CardPeak.Types.Agent>(AGENT_ACTIONS.SELECT_AGENT);