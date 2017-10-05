import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { UPLOAD_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as uploadController from '../api/uploadController'

export const uploadFile = createAction(UPLOAD_ACTIONS.UPLOAD_FILE);
export const uploadFileComplete = createAction<CardPeak.Entities.BatchUpload>(UPLOAD_ACTIONS.UPLOAD_FILE_COMPLETE);
export const uploadFileError = createAction(UPLOAD_ACTIONS.UPLOAD_FILE_ERROR);

export const processBatch = createAction(UPLOAD_ACTIONS.PROCESS_BATCH);
export const processBatchComplete = createAction<CardPeak.Entities.ProcessedBatchUpload>(UPLOAD_ACTIONS.PROCESS_BATCH_COMPLETE);
export const processBatchError = createAction(UPLOAD_ACTIONS.PROCESS_BATCH_ERROR);

export const clearBatch = createAction(UPLOAD_ACTIONS.CLEAR_BATCH);

export const getBatchFileConfig = createAction(UPLOAD_ACTIONS.GET_BATCH_FILE_CONFIG);
export const getBatchFileConfigComplete = createAction<CardPeak.Entities.BatchFileConfiguration>(UPLOAD_ACTIONS.GET_BATCH_FILE_CONFIG_COMPLETED);
export const getBatchFileConfigError = createAction(UPLOAD_ACTIONS.GET_BATCH_FILE_CONFIG_ERROR);

export const clearBatchFileConfig = createAction(UPLOAD_ACTIONS.CLEAR_BATCH_FILE_CONFIG);

export const postBatchFileConfig = createAction(UPLOAD_ACTIONS.POST_BATCH_FILE_CONFIG);
export const postBatchFileConfigComplete = createAction<CardPeak.Entities.BatchFileConfiguration>(UPLOAD_ACTIONS.POST_BATCH_FILE_CONFIG_COMPLETE);
export const postBatchFileConfigError = createAction(UPLOAD_ACTIONS.POST_BATCH_FILE_CONFIG_ERROR);

export const manageUploads = createAction(UPLOAD_ACTIONS.MANAGE_UPLOADS);
export const manageUploadsComplete = createAction<CardPeak.Entities.BatchUpload[]>(UPLOAD_ACTIONS.MANAGE_UPLOADS_COMPLETE);
export const manageUploadsError = createAction<string>(UPLOAD_ACTIONS.MANAGE_UPLOADS_ERROR);

export const deleteBatch = createAction(UPLOAD_ACTIONS.DELETE_BATCH);
export const deleteBatchComplete = createAction<number>(UPLOAD_ACTIONS.DELETE_BATCH_COMPLETE);
export const deleteBatchError = createAction(UPLOAD_ACTIONS.DELETE_BATCH_ERROR);

export function deleteBatchStart(id: number, deleteComplete: () => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(deleteBatch());
        uploadController.deleteBatch(id,
            (data: number) => {
                dispatch(deleteBatchComplete(data));
                deleteComplete();
            },
            (e: string) => {
                dispatch(deleteBatchError());
                deleteComplete();
            });
    }
}

export function manageUploadsStart(startDate: string, endDate?: string) {
    return (dispatch: (e: any) => void) => {
        dispatch(manageUploads());
        uploadController.manageUploads(startDate, endDate,
        (data: CardPeak.Entities.BatchUpload[]) => {
            dispatch(manageUploadsComplete(data));
        },
        (e: string) => {
            dispatch(manageUploadsError(e));
        });
    }
}

export function postBatchFileConfigStart(data: CardPeak.Entities.BatchFileConfiguration, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(postBatchFileConfig());
        uploadController.postBatchFileConfig(data, (data: CardPeak.Entities.BatchFileConfiguration) => {
            dispatch(postBatchFileConfigComplete(data));
        }, (e: string) => {
            dispatch(postBatchFileConfigError());
            if (errorCallback) {
                errorCallback(e);
            }
        });
    }
}

export function getBatchFileConfigStart(bankId: number, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(getBatchFileConfig());
        uploadController.getBatchFileConfig(bankId, (data: CardPeak.Entities.BatchFileConfiguration) => {
            dispatch(getBatchFileConfigComplete(data));
        }, (e: string) => {
            dispatch(getBatchFileConfigError());
            if (errorCallback) {
                errorCallback(e);
            }
        });
    }
}

export function uploadFileStart(data: FormData, successCallback?: () => void, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(uploadFile());
        uploadController.uploadFile(data, (uploadBatch: CardPeak.Entities.BatchUpload) => {
            dispatch(uploadFileComplete(uploadBatch));
            if (successCallback) {
                successCallback();
            }
        }, (e: string) => {
            dispatch(uploadFileError());
            if (errorCallback) {
                errorCallback(e);
            }
        })
    }
}

export function processBatchStart(batchId: number, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(processBatch());
        uploadController.processBatch(batchId, (data: CardPeak.Entities.ProcessedBatchUpload) => {
            dispatch(processBatchComplete(data));
        }, (e: string) => {
            dispatch(processBatchError());
            if (errorCallback) {
                errorCallback(e);
            }
        })
    }
}