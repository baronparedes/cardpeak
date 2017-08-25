import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api';

const AGENT_API = {
    GET_ALL: '/agents',
    GET_AGENT_DASHBOARD: (agentId: number) => {
        return '/agents/' + agentId;
    },
    GET_AGENT_DASHBOARD_FILTER: (agentId: number) => {
        return '/agents/' + agentId + "/filter/"
    }
}

export function getAll(callback: (data: CardPeak.Entities.Agent[]) => void) {
    axios.get(AGENT_API.GET_ALL)
        .then((r) => {
            let data = r.data as CardPeak.Entities.Agent[]
            callback(data);
        });
}

export function getAgentDashboard(agentId: number, callback: (data: CardPeak.Entities.AgentDashboard) => void) {
    axios.get(AGENT_API.GET_AGENT_DASHBOARD(agentId))
        .then((r) => {
            let data = r.data as CardPeak.Entities.AgentDashboard;
            callback(data);
        });
}

export function getAgentDashboardFiltered(agentId: number, to: Date, from: Date, callback: (data: CardPeak.Entities.AgentDashboard) => void) {
    axios.get(AGENT_API.GET_AGENT_DASHBOARD_FILTER(agentId), ({
            params: {
                startDate: to,
                endDate: from
            }
        }))
        .then((r) => {
            let data = r.data as CardPeak.Entities.AgentDashboard;
            callback(data);
        });
}