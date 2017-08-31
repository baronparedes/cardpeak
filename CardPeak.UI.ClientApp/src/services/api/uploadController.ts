import axios from 'axios'

const API = {
    UPLOAD_FILE: '/uploads/batchupload',
    PROCESS_BATCH: (id: number) => {
        return '/uploads/batchupload/' + id;
    }
}

export function uploadFile(data: FormData,
    successCallback: (data: CardPeak.Entities.BatchUpload) => void,
    errorCallback: (message: string) => void) {

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post(API.UPLOAD_FILE, data, config)
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.BatchUpload);
        })
        .catch((reason) => {
            errorCallback(reason.data.exceptionMessage);
        });
}

export function processBatch(id: number,
    successCallback: (data: CardPeak.Entities.BatchUpload) => void,
    errorCallback: (e: string) => void) {

    axios.post(API.PROCESS_BATCH(id))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.BatchUpload);
        })
        .catch((reason) => {
            errorCallback(reason.message);
        });
}