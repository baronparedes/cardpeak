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
        return 'agents/' + agentId + '/debit'
    },
    CREDIT_AGENT: (agentId: number) => {
        return 'agents/' + agentId + '/credit'
    }
}

export function getAll(callback: (data: CardPeak.Entities.Agent[]) => void) {
    axios.get(AGENT_API.GET_ALL)
        .then((r) => {
            callback(r.data as CardPeak.Entities.Agent[]);
        });
}

export function getAgentDashboard(agentId: number, callback: (data: CardPeak.Entities.AgentDashboard) => void) {
    axios.get(AGENT_API.GET_AGENT_DASHBOARD(agentId))
        .then((r) => {
            callback(r.data as CardPeak.Entities.AgentDashboard);
        });
}

export function getAgentDashboardFiltered(agentId: number, startDate?: string, endDate?: string,
    callback?: (data: CardPeak.Entities.AgentDashboard) => void) {

    axios.get(AGENT_API.GET_AGENT_DASHBOARD_FILTER(agentId), ({
            params: {
                startDate: startDate,
                endDate: endDate
            }
        }))
        .then((r) => {
            if (callback) {
                callback(r.data as CardPeak.Entities.AgentDashboard);
            }
        });
}

export function postAgentTransaction(
    transaction: CardPeak.Entities.DebitCreditTransaction,
    isDebit: boolean,
    callback: (data: CardPeak.Entities.DebitCreditTransaction) => void,
    errorCallback: (reason: any) => void) {

    let url = (isDebit) ? AGENT_API.DEBIT_AGENT(transaction.agentId) : AGENT_API.CREDIT_AGENT(transaction.agentId);
    axios.post(url, null, {
            params: {
                amount: transaction.amount, remarks: transaction.remarks
            }
        })
        .then((r) => {
            callback(r.data as CardPeak.Entities.DebitCreditTransaction);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        });
}