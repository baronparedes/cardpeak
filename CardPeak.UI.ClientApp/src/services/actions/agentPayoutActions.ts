import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { AGENT_PAYOUT_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as agentsController from '../api/agentsController'

export const initialize = createAction(AGENT_PAYOUT_ACTIONS.INIT_PAYOUTS);
export const getAgentPayout = createAction(AGENT_PAYOUT_ACTIONS.GET_AGENT_PAYOUT);
export const getAgentPayoutComplete = createAction<CardPeak.Models.AgentPayoutModel>(AGENT_PAYOUT_ACTIONS.GET_AGENT_PAYOUT_COMPLETE);
export const getAgentPayoutError = createAction<string>(AGENT_PAYOUT_ACTIONS.GET_AGENT_PAYOUT_ERROR);

export function getAgentPayoutStart() {
    return (dispatch: (e: any) => void) => {
        dispatch(getAgentPayout());
        agentsController.getAgentPayout((data: CardPeak.Models.AgentPayoutModel) => {
            dispatch(getAgentPayoutComplete(data));
        }, (e: string) => {
            dispatch(getAgentPayoutError(e));
        });
    }
}

export function initializeStart() {
    return (dispatch: (e: any) => void, getState: () => RootState) => {
        const init = getState().agentPayoutModel.initialized;
        if (!init) {
            dispatch(initialize());
            dispatch(getAgentPayoutStart());
        }
    }
}