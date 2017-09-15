import axios from 'axios'

const API = {
    GET_DASHBOARD: '/dashboard',
}

export function getDashboard(
    successCallback: (data: CardPeak.Models.DashboardModel) => void,
    errorCallback?: (error: string) => void) {

    axios.get(API.GET_DASHBOARD)
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.AgentDashboard);
        }).catch((reason) => {
            if (errorCallback) {
                errorCallback(reason.message);
            }
        });
}