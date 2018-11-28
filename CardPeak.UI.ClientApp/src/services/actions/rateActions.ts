import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { RATE_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as ratesController from '../api/ratesController'

export const selectAgentRate = createAction<number>(RATE_ACTIONS.SELECT_AGENT_RATE);
export const selectAgentRateComplete = createAction<CardPeak.Entities.Rate[]>(RATE_ACTIONS.SELECT_AGENT_RATE_COMPLETE);

export const selectDefaultRate = createAction<number>(RATE_ACTIONS.SELECT_DEFAULT_RATE);
export const selectDefaultRateComplete = createAction<CardPeak.Entities.Rate[]>(RATE_ACTIONS.SELECT_DEFAULT_RATE_COMPLETE);

export const applyDefaultRate = createAction<number>(RATE_ACTIONS.APPLY_DEFAULT_RATE);
export const applyDefaultRateComplete = createAction<CardPeak.Entities.Rate[]>(RATE_ACTIONS.APPLY_DEFAULT_RATE_COMPLETE);
export const applyDefaultRateNotFound = createAction(RATE_ACTIONS.APPLY_DEFAULT_RATE_NOT_FOUND);

export const postRates = createAction(RATE_ACTIONS.POST_RATES);
export const postRatesComplete = createAction<CardPeak.Entities.Rate[]>(RATE_ACTIONS.POST_RATES_COMPLETE);
export const postRatesError = createAction(RATE_ACTIONS.POST_RATES_ERROR);

export const deleteRate = createAction<CardPeak.Entities.Rate>(RATE_ACTIONS.DELETE_RATE);
export const addRate = createAction<CardPeak.Entities.Rate>(RATE_ACTIONS.ADD_RATE);

export function selectAgentStart(agentId: number,
	errorCallback?: (e: string) => void) {

	return (dispatch: (e: any) => void) => {
		dispatch(selectAgentRate(agentId));
		ratesController.getRates(agentId, (data: CardPeak.Entities.Rate[]) => {
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
		ratesController.postRates(agentId, rates, (data: CardPeak.Entities.Rate[]) => {
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

export function applyDefaultRateStart(defaultRate: CardPeak.Entities.Reference, agentId: number,
	errorCallback?: (e: string) => void) {

	return (dispatch: (e: any) => void) => {
		dispatch(applyDefaultRate(defaultRate.referenceId));
		ratesController.getDefaultRates(defaultRate.referenceId, (data: CardPeak.Entities.Rate[]) => {
			if (data) {
				const rates = data.slice();
				rates.forEach(r => {
					r.agentId = agentId
				});
				dispatch(applyDefaultRateComplete(rates));
			}
			else
			{
				dispatch(applyDefaultRateNotFound());
			}
		}, (message: string) => {
			if (errorCallback) {
				errorCallback(message);
			}
		});
	}
}

export function selectDefaultRateStart(typeId: number,
	errorCallback?: (e: string) => void) {

	return (dispatch: (e: any) => void) => {
		dispatch(selectDefaultRate(typeId));
		ratesController.getDefaultRates(typeId, (data: CardPeak.Entities.Rate[]) => {
			dispatch(selectDefaultRateComplete(data));
		}, (message: string) => {
			if (errorCallback) {
				errorCallback(message);
			}
		});
	}
}

export function postDefaultRatesStart(typeId: number, rates: CardPeak.Entities.Rate[],
	successCallback?: (data: CardPeak.Entities.Rate[]) => void, errorCallback?: (message: string) => void) {

	return (dispatch: (e: any) => void) => {
		dispatch(postRates());
		ratesController.postDefaultRates(typeId, rates, (data: CardPeak.Entities.Rate[]) => {
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
