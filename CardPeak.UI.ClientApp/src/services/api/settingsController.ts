import axios from 'axios'

const API = {
    GET_RATES: (agentId: number) => {
        return '/settings/rates/' + agentId ;
    },
    POST_RATES: (agentId: number) => {
        return '/settings/rates/' + agentId ;
    }
}

export function postRates(agentId: number,
    rates: CardPeak.Entities.Rate[],
    successCallback: (data: CardPeak.Entities.Rate[]) => void,
    errorCallback: (message: string) => void) {

    axios.post(API.POST_RATES(agentId), {
            ...rates
        })
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Rate[]);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        });
}

export function getRates(agentId: number,
    successCallback: (data: CardPeak.Entities.Settings) => void,
    errorCallback: (message: string) => void) {

    axios.get(API.GET_RATES(agentId))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Settings);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        });
}