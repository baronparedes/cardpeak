import axios from 'axios'

const API = {
    LOAD_REFERENCES: "/settings"
}

export function getReferences(successCallback: (data: CardPeak.Entities.Settings) => void,
    errorCallback: (message: string) => void) {

    axios.get(API.LOAD_REFERENCES)
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.Settings);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        });
}