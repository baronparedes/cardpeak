import axios from 'axios'

const API = {
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
    UPDATE_AGENT: (agentId: number) => {
        return '/agents/' + agentId + '/update'
    },
    CREATE_AGENT: '/agents/create',
    GET_ACCOUNTS: (agentId: number) => {
        return '/agents/' + agentId + '/accounts';
    }
}

export function getAll(successCallback: (data: CardPeak.Entities.Agent[]) => void) {
    axios.get(API.GET_ALL)
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Agent[]);
        });
}

export function getAgentDashboard(agentId: number,
    successCallback: (data: CardPeak.Entities.AgentDashboard) => void) {

    axios.get(API.GET_AGENT_DASHBOARD(agentId))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.AgentDashboard);
        });
}

export function getAgentDashboardFiltered(agentId: number, startDate?: string, endDate?: string,
    successCallback?: (data: CardPeak.Entities.AgentDashboard) => void) {

    axios.get(API.GET_AGENT_DASHBOARD_FILTER(agentId), ({
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

    let url = (isDebit) ? API.DEBIT_AGENT(transaction.agentId) : API.CREDIT_AGENT(transaction.agentId);
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

export function updateAgent(agent: CardPeak.Entities.Agent,
    successCallback: (data: CardPeak.Entities.Agent) => void,
    errorCallback: (error: string) => void) {

    let url = API.UPDATE_AGENT(agent.agentId);
    axios.post(url, { ...agent })
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Agent);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        })
}

export function createAgent(agent: CardPeak.Entities.Agent,
    successCallback: (data: CardPeak.Entities.Agent) => void,
    errorCallback: (error: string) => void) {

    let url = API.CREATE_AGENT;
    axios.post(url, { ...agent })
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Agent);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        })
}

export async function getAccountsAsync(agentId: number) {
    let result = await axios(API.GET_ACCOUNTS(agentId));
    if (result.status != 200) {
        return [];
    }
    return result.data as CardPeak.Entities.Account[];
}