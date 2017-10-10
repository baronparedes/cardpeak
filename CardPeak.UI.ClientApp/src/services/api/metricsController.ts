import axios from 'axios'

export const API = {
    GET_AGENT_METRICS: '/metrics/agents',
    GET_AGENT_RANKING_METRICS: '/metrics/agents/rankings',
    GET_AGENT_PERFORMANCE_METRICS: '/metrics/agents/performance',
    GET_BANK_AMOUNT_BREAKDOWN_METRICS: '/metrics/banks/amountbreakdown'
}

export function getMetrics<T>(api: string, year: number, month?: number,
    successCallback?: (data: T) => void,
    errorCallback?: (error: string) => void) {

    axios.get(api, ({
        params: {
            year,
            month
        }
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