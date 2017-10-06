import axios from 'axios'

const API = {
    GET_AGENT_METRICS: '/metrics/agents',
    GET_AGENT_RANKING_METRICS: '/metrics/rankings',
}

export function getAgentRankingMetrics(year: number, month?: number,
    successCallback?: (data: CardPeak.Entities.AgentMetrics) => void,
    errorCallback?: (error: string) => void) {

    axios.get(API.GET_AGENT_RANKING_METRICS, ({
        params: {
            year,
            month
        }
    })).then((r) => {
        if (successCallback) {
            successCallback(r.data as CardPeak.Entities.AgentRankMetric[]);
        }
    }).catch((reason) => {
        if (errorCallback) {
            errorCallback(reason.message);
        }
    });
}
export function getAgentMetrics(year: number, month?: number,
    successCallback?: (data: CardPeak.Entities.AgentMetrics) => void,
    errorCallback?: (error: string) => void) {

    axios.get(API.GET_AGENT_METRICS, ({
        params: {
            year,
            month
        }
    })).then((r) => {
        if (successCallback) {
            successCallback(r.data as CardPeak.Entities.AgentMetrics);
        }
    }).catch((reason) => {
        if (errorCallback) {
            errorCallback(reason.message);
        }
    });
}