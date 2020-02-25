import axios from 'axios';

const API = {
    GET_TRANSACTIONS_BY_CLIENT: (clientName: string) => {
        return '/transactions/client/' + clientName;
    },
    GET_TRANSACTIONS_BY_BATCH: (batchId: number) => {
        return '/transactions/batch/' + batchId;
    },
    DELETE_TRANSACTION: (transactionId: number) => {
        return '/transactions/delete/' + transactionId;
    }
};

export function deleteTransaciton(
    id: number,
    deleteComplete: (id: number) => void,
    deleteError: (error: string) => void
) {
    axios
        .post(API.DELETE_TRANSACTION(id))
        .then(r => {
            deleteComplete(id);
        })
        .catch(reason => {
            deleteError(reason.message);
        });
}

export function getTransactionsByClient(
    clientName: string,
    successCallback: (
        data: CardPeak.Entities.ApprovalTransaction[]
    ) => void,
    errorCallback: (message: string) => void
) {
    axios
        .get(API.GET_TRANSACTIONS_BY_CLIENT(clientName))
        .then(r => {
            successCallback(
                r.data as CardPeak.Entities.ApprovalTransaction[]
            );
        })
        .catch(reason => {
            errorCallback(reason.message);
        });
}

export function getTransactionsByBatch(
    batchId: number,
    successCallback: (
        data: CardPeak.Entities.ApprovalTransaction[]
    ) => void,
    errorCallback: (message: string) => void
) {
    axios
        .get(API.GET_TRANSACTIONS_BY_BATCH(batchId))
        .then(r => {
            successCallback(
                r.data as CardPeak.Entities.ApprovalTransaction[]
            );
        })
        .catch(reason => {
            errorCallback(reason.message);
        });
}
