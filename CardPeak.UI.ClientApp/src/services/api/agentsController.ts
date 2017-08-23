import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api';

const AGENT_API = {
    GET_ALL: '/agents',
    GET_AGENT_DASHBOARD: '/agents/'
}


export function getAll(callback: (data: CardPeak.Entities.Agent[]) => void) {
    axios.get(AGENT_API.GET_ALL).then((r) => {
        console.log('GetAll - api/agents');
        let data = r.data as CardPeak.Entities.Agent[]
        callback(data);
    });
}

export function getAgentDashboard(id: number, callback: (data: CardPeak.Entities.AgentDashboard) => void) {
    axios.get(AGENT_API.GET_AGENT_DASHBOARD + id).then((r) => {
        console.log('GetAll - api/agents/' + id);
        let data = r.data as CardPeak.Entities.AgentDashboard;
        callback(data);
    });
}