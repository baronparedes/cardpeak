﻿import axios from 'axios'

const API = {
    UPLOAD_FILE: '/uploads/batch',
    PROCESS_BATCH: (id: number) => {
        return '/uploads/batch/' + id;
    },
    GET_BATCH_FILE_CONFIG: (bankId: number) => {
        return '/uploads/config/' + bankId;
    },
    POST_BATCH_FILE_CONFIG: '/uploads/config'
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
            try {
                errorCallback(reason.response.data.exceptionMessage)
            }
            catch (e) {
                errorCallback(reason.message);
            }
        });
}

export function processBatch(id: number,
    successCallback: (data: CardPeak.Entities.ProcessedBatchUpload) => void,
    errorCallback: (e: string) => void) {

    axios.post(API.PROCESS_BATCH(id))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.ProcessedBatchUpload);
        })
        .catch((reason) => {
            try {
                errorCallback(reason.response.data.exceptionMessage)
            }
            catch (e) {
                errorCallback(reason.message);
            }
        });
}

export function getBatchFileConfig(bankId: number,
    successCallback: (data: CardPeak.Entities.BatchFileConfiguration) => void,
    errorCallback?: (e: string) => void) {
    axios.get(API.GET_BATCH_FILE_CONFIG(bankId))
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.BatchFileConfiguration);
        })
        .catch((reason) => {
            if (errorCallback) {
                try {
                    errorCallback(reason.response.data.exceptionMessage)
                }
                catch (e) {
                    errorCallback(reason.message);
                }
            }
        });
}

export function postBatchFileConfig(batchFileConfiguration: CardPeak.Entities.BatchFileConfiguration,
    successCallback: (data: CardPeak.Entities.BatchFileConfiguration) => void,
    errorCallback: (error: string) => void) {
    let url = API.POST_BATCH_FILE_CONFIG;
    axios.post(url, { ...batchFileConfiguration })
        .then((r) => {
            successCallback(r.data as CardPeak.Entities.BatchFileConfiguration);
        })
        .catch((reason) => {
            try {
                errorCallback(reason.response.data.exceptionMessage)
            }
            catch (e) {
                errorCallback(reason.message);
            }
        })
}