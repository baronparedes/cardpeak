import axios from 'axios'

const API = {
    GET_AGENT_METRICS: '/metrics/agents'
}

export function getAgentMetrics(year: number, month?: number,
    successCallback?: (data: CardPeak.Entities.AgentApprovalMetric[]) => void,
    errorCallback?: (error: string) => void) {

    axios.get(API.GET_AGENT_METRICS, ({
        params: {
            year,
            month
        }
    })).then((r) => {
        if (successCallback) {
            successCallback(r.data as CardPeak.Entities.AgentApprovalMetric[]);
        }
    }).catch((reason) => {
        if (errorCallback) {
            errorCallback(reason.message);
        }
    });
}