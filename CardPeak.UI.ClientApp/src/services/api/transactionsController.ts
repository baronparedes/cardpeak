import axios from 'axios'

const API = {
    GET_TRANSACTIONS: (clientName: string) => {
        return "/transactions/" + clientName
    },
}

export function getReferences(clientName: string,
    successCallback: (data: CardPeak.Entities.ApprovalTransaction[]) => void,
    errorCallback: (message: string) => void) {

    axios.get(API.GET_TRANSACTIONS(clientName))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.ApprovalTransaction[]);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        });
}