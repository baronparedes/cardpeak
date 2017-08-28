import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api';

const AGENT_API = {
    GET_ALL: '/agents',
    GET_AGENT_DASHBOARD: (agentId: number) => {
        return '/agents/' + agentId;
    },
    GET_AGENT_DASHBOARD_FILTER: (agentId: number) => {
        return '/agents/' + agentId + "/filter"
    },
    DEBIT_AGENT: (agentId: number) => {
        return '/agents/' + agentId + '/debit'
    },
    CREDIT_AGENT: (agentId: number) => {
        return '/agents/' + agentId + '/credit'
    },
    PUT_AGENT: (agentId: number) => {
        return '/agents/' + agentId + '/update'
    },
    POST_AGENT: '/agents/create'
}

export function getAll(successCallback: (data: CardPeak.Entities.Agent[]) => void) {
    axios.get(AGENT_API.GET_ALL)
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Agent[]);
        });
}

export function getAgentDashboard(agentId: number,
    successCallback: (data: CardPeak.Entities.AgentDashboard) => void) {

    axios.get(AGENT_API.GET_AGENT_DASHBOARD(agentId))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.AgentDashboard);
        });
}

export function getAgentDashboardFiltered(agentId: number, startDate?: string, endDate?: string,
    successCallback?: (data: CardPeak.Entities.AgentDashboard) => void) {

    axios.get(AGENT_API.GET_AGENT_DASHBOARD_FILTER(agentId), ({
            params: {
                startDate: startDate,
                endDate: endDate
            }
        }))
        .then((r) => {
            if (successCallback) {
                successCallback(r.data as CardPeak.Entities.AgentDashboard);
            }
        });
}

export function postAgentTransaction(
    transaction: CardPeak.Entities.DebitCreditTransaction,
    isDebit: boolean,
    successCallback: (data: CardPeak.Entities.DebitCreditTransaction) => void,
    errorCallback: (error: string) => void) {

    let url = (isDebit) ? AGENT_API.DEBIT_AGENT(transaction.agentId) : AGENT_API.CREDIT_AGENT(transaction.agentId);
    axios.post(url, null, {
            params: {
                amount: transaction.amount, remarks: transaction.remarks
            }
        })
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.DebitCreditTransaction);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        });
}

export function putAgent(agent: CardPeak.Entities.Agent,
    successCallback: (data: CardPeak.Entities.Agent) => void,
    errorCallback: (error: string) => void) {

    let url = AGENT_API.PUT_AGENT(agent.agentId);
    axios.put(url, { ...agent })
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Agent);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        })
}

export function postAgent(agent: CardPeak.Entities.Agent,
    successCallback: (data: CardPeak.Entities.Agent) => void,
    errorCallback: (error: string) => void) {

    let url = AGENT_API.POST_AGENT;
    axios.post(url, { ...agent })
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Agent);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        })
}