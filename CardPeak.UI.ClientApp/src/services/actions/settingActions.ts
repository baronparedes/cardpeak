import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { SETTING_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as settingsController from '../api/settingsController'

export const selectAgentRate = createAction<number>(SETTING_ACTIONS.SELECT_AGENT_RATE);
export const selectAgentRateComplete = createAction<CardPeak.Entities.Settings>(SETTING_ACTIONS.SELECT_AGENT_RATE_COMPLETE);

export const postRates = createAction(SETTING_ACTIONS.POST_RATES);
export const postRatesComplete = createAction<CardPeak.Entities.Rate[]>(SETTING_ACTIONS.POST_RATES_COMPLETE);
export const postRatesError = createAction(SETTING_ACTIONS.POST_RATES_ERROR);

export const deleteRate = createAction<CardPeak.Entities.Rate>(SETTING_ACTIONS.DELETE_RATE);
export const addRate = createAction<CardPeak.Entities.Rate>(SETTING_ACTIONS.ADD_RATE);

export function selectAgentStart(agentId: number,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(selectAgentRate(agentId));
        settingsController.getRates(agentId, (data: CardPeak.Entities.Settings) => {
            dispatch(selectAgentRateComplete(data));
        }, (message: string) => {
            if (errorCallback) {
                errorCallback(message);
            }
        });
    }
}

export function postRatesStart(agentId: number, rates: CardPeak.Entities.Rate[],
    successCallback?: (data: CardPeak.Entities.Rate[]) => void, errorCallback?: (message: string) => void){

    return (dispatch: (e: any) => void) => {
        dispatch(postRates());
        settingsController.postRates(agentId, rates, (data: CardPeak.Entities.Rate[]) => {
            dispatch(postRatesComplete(data));
            if (successCallback) {
                successCallback(data);
            }
        }, (message: string) => {
            dispatch(postRatesError());
            if (errorCallback) {
                errorCallback(message);
            }
        });
    }
}
