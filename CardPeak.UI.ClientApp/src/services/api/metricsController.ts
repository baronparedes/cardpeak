import axios from 'axios'

const API = {
    GET_AGENT_METRICS: '/metrics/agents',
    GET_AGENT_RANKING_METRICS: '/metrics/agents/rankings',
    GET_AGENT_PERFORMANCE_METRICS: '/metrics/agents/performance',
}

export function getAgentPerformanceMetrics(year: number,
    successCallback?: (data: CardPeak.Entities.AgentPerformanceMetric[]) => void,
    errorCallback?: (error: string) => void) {

    axios.get(API.GET_AGENT_PERFORMANCE_METRICS, ({
        params: {
            year
        }
    })).then((r) => {
        if (successCallback) {
            successCallback(r.data as CardPeak.Entities.AgentPerformanceMetric[]);
        }
    }).catch((reason) => {
        if (errorCallback) {
            errorCallback(reason.message);
        }
    });
}

export function getAgentRankingMetrics(year: number, month?: number,
    successCallback?: (data: CardPeak.Entities.AgentRankMetric[]) => void,
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