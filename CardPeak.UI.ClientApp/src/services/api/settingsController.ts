import axios from 'axios';

const API = {
    LOAD_REFERENCES: '/settings/references',
    POST_REFERENCES: '/settings/references/create'
};

export function getReferences(
    successCallback: (data: CardPeak.Entities.Settings) => void,
    errorCallback: (message: string) => void
) {
    axios
        .get(API.LOAD_REFERENCES)
        .then(r => {
            successCallback(r.data as CardPeak.Entities.Settings);
        })
        .catch(reason => {
            errorCallback(reason.message);
        });
}

export function postReference(
    reference: CardPeak.Entities.Reference,
    type: number,
    successCallback?: (
        r: CardPeak.Entities.Reference,
        type: number
    ) => void,
    errorCallback?: (e: string) => void
) {
    axios
        .post(API.POST_REFERENCES, {})
        .then(r => {
            if (successCallback) {
                successCallback(
                    r.data as CardPeak.Entities.Reference,
                    type
                );
            }
        })
        .catch(reason => {
            if (errorCallback) {
                errorCallback(reason.message);
            }
        });
}
