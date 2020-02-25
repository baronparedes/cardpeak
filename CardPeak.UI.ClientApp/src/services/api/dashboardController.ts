import axios from 'axios';

const API = {
    GET_DASHBOARD: '/dashboard',
    REFRESH_DASHBOARD: '/dashboard/refresh',
    GET_YEARS: '/dashboard/years'
};

export function getDashboard(
    successCallback: (data: CardPeak.Models.DashboardModel) => void,
    errorCallback?: (error: string) => void
) {
    axios
        .get(API.GET_DASHBOARD)
        .then(r => {
            successCallback(r.data as CardPeak.Models.DashboardModel);
        })
        .catch(reason => {
            if (errorCallback) {
                errorCallback(reason.message);
            }
        });
}

export function refreshDashboard(
    year: number,
    month: number,
    successCallback: (data: CardPeak.Models.DashboardModel) => void,
    errorCallback?: (error: string) => void
) {
    axios
        .get(API.REFRESH_DASHBOARD, {
            params: {
                year,
                month
            }
        })
        .then(r => {
            if (successCallback) {
                successCallback(
                    r.data as CardPeak.Models.DashboardModel
                );
            }
        })
        .catch(reason => {
            if (errorCallback) {
                errorCallback(reason.message);
            }
        });
}

export function getAvailableYears(
    successCallback: (
        data: CardPeak.Entities.ApprovalMetric<number>[]
    ) => void
) {
    axios.get(API.GET_YEARS, {}).then(r => {
        if (successCallback) {
            successCallback(
                r.data as CardPeak.Entities.ApprovalMetric<number>[]
            );
        }
    });
}
