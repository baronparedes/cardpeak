import axios from 'axios'

export const API = {
	GET_AGENT_METRICS: '/metrics/agents',
	GET_AGENT_RANKING_METRICS: '/metrics/agents/rankings',
	GET_AGENT_PERFORMANCE_METRICS: '/metrics/agents/performance',
	GET_AGENT_THRESHOLD_METRICS: '/metrics/agents/threshold',
	GET_AGENT_DISBURSEMENT_METRICS: '/metrics/agents/disbursement',
	GET_BANK_AMOUNT_DISTRIBUTION_METRICS: '/metrics/banks/amountdistribution',
	GET_BANK_AGENT_RANKINGS_METRICS: '/metrics/banks/rankings'
}

export function getMetricsWithParams<T>(api: string, params: any, successCallback?: (data: T) => void, errorCallback?: (error: string) => void) {

	axios.get(api, ({
		params
	})).then((r) => {
		if (successCallback) {
			successCallback(r.data as T);
		}
	}).catch((reason) => {
		if (errorCallback) {
			errorCallback(reason.message);
		}
	});

}

export function getMetricsByDateRange<T>(api: string, startDate: string, endDate?: string,
	successCallback?: (data: T) => void,
	errorCallback?: (error: string) => void) {

	let params = {
		startDate,
		endDate
	}
	getMetricsWithParams(api, params, successCallback, errorCallback);

}

export function getMetricsByYearMonth<T>(api: string, year: number, month?: number,
	successCallback?: (data: T) => void,
	errorCallback?: (error: string) => void) {

	let params = {
		year,
		month
	}
	getMetricsWithParams(api, params, successCallback, errorCallback);

}