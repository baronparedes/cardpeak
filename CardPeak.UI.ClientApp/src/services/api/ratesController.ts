import axios from 'axios'

const API = {
	GET_RATES: (agentId: number) => {
		return '/settings/rates/' + agentId ;
	},
	POST_RATES: (agentId: number) => {
		return '/settings/rates/' + agentId ;
	},
	GET_DEFAULT_RATES: (typeId: number) => {
		return '/settings/rates/default/' + typeId;
	},
	POST_DEFAULT_RATES: (typeId: number) => {
		return '/settings/rates/default/' + typeId;
	}
}

export function postRates(agentId: number,
	rates: CardPeak.Entities.Rate[],
	successCallback: (data: CardPeak.Entities.Rate[]) => void,
	errorCallback: (message: string) => void) {

	post(API.POST_RATES(agentId), rates, successCallback, errorCallback);
}

export function getRates(agentId: number,
	successCallback: (data: CardPeak.Entities.Rate[]) => void,
	errorCallback: (message: string) => void) {

	get(API.GET_RATES(agentId), successCallback, errorCallback);
}

export function postDefaultRates(typeId: number,
	rates: CardPeak.Entities.Rate[],
	successCallback: (data: CardPeak.Entities.Rate[]) => void,
	errorCallback: (message: string) => void) {

	post(API.POST_DEFAULT_RATES(typeId), rates, successCallback, errorCallback);
}

export function getDefaultRates(typeId: number,
	successCallback: (data: CardPeak.Entities.Rate[]) => void,
	errorCallback: (message: string) => void) {

	get(API.GET_DEFAULT_RATES(typeId), successCallback, errorCallback);
}

function post(api: string,
	rates: CardPeak.Entities.Rate[],
	successCallback: (data: CardPeak.Entities.Rate[]) => void,
	errorCallback: (message: string) => void) {

	axios.post(api, {
			rates
		})
		.then((r) => {
			successCallback(r.data as CardPeak.Entities.Rate[]);
		})
		.catch((reason) => {
			errorCallback(reason.message);
		});
}

function get(api: string,
	successCallback: (data: CardPeak.Entities.Rate[]) => void,
	errorCallback: (message: string) => void) {

	axios.get(api)
		.then((r) => {
			successCallback(r.data as CardPeak.Entities.Rate[]);
		})
		.catch((reason) => {
			errorCallback(reason.message);
		});
}