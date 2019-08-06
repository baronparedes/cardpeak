import axios from 'axios'

const API = {
    GET_ALL: '/agents',
    GET_AGENT_DASHBOARD: (agentId: number) => {
        return '/agents/' + agentId;
    },
    GET_AGENT_SAVINGS: (agentId: number) => {
        return '/agents/' + agentId + '/savings'
    },
    GET_AGENT_SAVINGS_BY_YEAR: (agentId: number, year: number) => {
        return '/agents/' + agentId + '/savings?year=' + year
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
    INCENTIVE_AGENT: (agentId: number) => {
        return '/agents/' + agentId + '/incentive'
    },
    SAVINGS_CREDIT_AGENT: (agentId: number) => {
        return '/agents/' + agentId + '/savings/credit'
    },
    SAVINGS_DEBIT_AGENT: (agentId: number) => {
        return '/agents/' + agentId + '/savings/debit'
    },
    UPDATE_AGENT: (agentId: number) => {
        return '/agents/' + agentId + '/update'
    },
    CREATE_AGENT: '/agents/create',
    GET_DETAILS: (agentId: number) => {
        return '/agents/' + agentId + '/details';
    },
    GET_AGENT_PAYOUT: '/agents/payout',
    DEACTIVATE_AGENT: (agentId: number) => {
        return "/agents/deactivate/" + agentId
    }
}

export function deactivateAgent(agentId: number, successCallback: () => void, errorCallback?: (e: string) => void) {
    axios.post(API.DEACTIVATE_AGENT(agentId))
        .then((r) => {
            successCallback();
        })
        .catch((reason) => {
            if (errorCallback) {
                errorCallback(reason.message);
            }
        })
}

export function getAgentPayout(successCallback: (data: CardPeak.Models.AgentPayoutModel) => void, errorCallback: (e: string) => void) {
    axios.get(API.GET_AGENT_PAYOUT)
        .then((r) => {
            successCallback(r.data as CardPeak.Models.AgentPayoutModel);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        });
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

export function getAgentSavings(agentId: number,
    successCallback: (data: CardPeak.Entities.AgentSavings) => void) {

    axios.get(API.GET_AGENT_SAVINGS(agentId))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.AgentSavings);
        });
}

export function getAgentSavingsByYear(agentId: number, year: number,
    successCallback: (data: CardPeak.Entities.AgentSavings) => void) {

    axios.get(API.GET_AGENT_SAVINGS_BY_YEAR(agentId, year))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.AgentSavings);
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
    transactionType: Transaction,
    successCallback: (data: CardPeak.Entities.DebitCreditTransaction) => void,
    errorCallback: (error: string) => void) {

    let url: string;
    switch (transactionType.toLowerCase()) {
        case "credit":
            url = API.CREDIT_AGENT(transaction.agentId);
            break;
        case "debit":
            url = API.DEBIT_AGENT(transaction.agentId);
            break;
        case "incentive":
            url = API.INCENTIVE_AGENT(transaction.agentId);
            break;
        case "savings-credit":
            url = API.SAVINGS_CREDIT_AGENT(transaction.agentId);
            break;
        case "savings-debit":
            url = API.SAVINGS_DEBIT_AGENT(transaction.agentId);
            break;
    }

    axios.post(url, null, {
            params: {
                amount: transaction.amount, remarks: transaction.remarks, transactionDate: transaction.transactionDateTime
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

export async function getDetailsAsync(agentId: number) {
    let result = await axios(API.GET_DETAILS(agentId));
    if (result.status != 200) {
        return undefined;
    }
    return result.data as CardPeak.Entities.AgentDetails;
}