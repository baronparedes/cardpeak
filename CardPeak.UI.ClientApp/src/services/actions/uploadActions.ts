import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { UPLOAD_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as uploadController from '../api/uploadController'

export const uploadFile = createAction(UPLOAD_ACTIONS.UPLOAD_FILE);
export const uploadFileComplete = createAction<CardPeak.Entities.BatchUpload>(UPLOAD_ACTIONS.UPLOAD_FILE_COMPLETE);
export const uploadFileError = createAction(UPLOAD_ACTIONS.UPLOAD_FILE_ERROR);

export const processBatch = createAction(UPLOAD_ACTIONS.PROCESS_BATCH);
export const processBatchComplete = createAction(UPLOAD_ACTIONS.PROCESS_BATCH_COMPLETE);
export const processBatchError = createAction(UPLOAD_ACTIONS.PROCESS_BATCH_ERROR);

export function uploadFileStart(data: FormData, errorCallback?: (e: string) => void) {
    return (dispatch: (e: any) => void) => {
        dispatch(uploadFile());
        uploadController.uploadFile(data, (uploadBatch: CardPeak.Entities.BatchUpload) => {
            dispatch(uploadFileComplete(uploadBatch));
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
        setTimeout(() => {
            dispatch(processBatchComplete());
            dispatch(processBatchError());
            if (errorCallback) {
                errorCallback('');
            }
        }, 3000);
    }
}