﻿import { handleActions } from 'redux-actions';
import { UPLOAD_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.BatchUploadModel = {
}

export default handleActions<CardPeak.Models.BatchUploadModel, any>({
    [UPLOAD_ACTIONS.UPLOAD_FILE]: (state, action) => {
        return {
            ...state,
            uploadingFile: true
        }
    },
    [UPLOAD_ACTIONS.UPLOAD_FILE_ERROR]: (state, action) => {
        return {
            ...state,
            uploadingFile: undefined
        }
    },
    [UPLOAD_ACTIONS.UPLOAD_FILE_COMPLETE]: (state, action) => {
        return {
            ...state,
            uploadingFile: undefined,
            selectedBatchUpload: action.payload,
            processingCompleted: undefined
        }
    },
    [UPLOAD_ACTIONS.PROCESS_BATCH]: (state, action) => {
        return {
            ...state,
            processing: true,
            processingCompleted: undefined,
            processedApprovalTransactions: undefined
        }
    },
    [UPLOAD_ACTIONS.PROCESS_BATCH_ERROR]: (state, action) => {
        return {
            ...state,
            processing: undefined,
            processingCompleted: undefined,
            processedApprovalTransactions: undefined
        }
    },
    [UPLOAD_ACTIONS.PROCESS_BATCH_COMPLETE]: (state, action) => {
        let payload = action.payload as CardPeak.Entities.ProcessedBatchUpload;
        return {
            ...state,
            processing: undefined,
            processingCompleted: true,
            selectedBatchUpload: payload.batch,
            processedApprovalTransactions: payload.processedApprovalTransactions
        }
    },
    [UPLOAD_ACTIONS.CLEAR_BATCH]: (state, action) => {
        return {
            ...state,
            processing: undefined,
            processingCompleted: undefined,
            selectedBatchUpload: undefined,
            processedApprovalTransactions: undefined,
            uploadingFile: undefined
        }
    },
    [UPLOAD_ACTIONS.GET_BATCH_FILE_CONFIG]: (state, action) => {
        return {
            ...state,
            selectedBatchFileConfiguration: undefined,
            loadingBatchFileConfiguration: true
        }
    },
    [UPLOAD_ACTIONS.GET_BATCH_FILE_CONFIG_ERROR]: (state, action) => {
        return {
            ...state,
            loadingBatchFileConfiguration: undefined
        }
    },
    [UPLOAD_ACTIONS.GET_BATCH_FILE_CONFIG_COMPLETED]: (state, action) => {
        return {
            ...state,
            selectedBatchFileConfiguration: action.payload,
            loadingBatchFileConfiguration: undefined
        }
    },
    [UPLOAD_ACTIONS.CLEAR_BATCH_FILE_CONFIG]: (state, action) => {
        return {
            ...state,
            selectedBatchFileConfiguration: undefined,
            loadingBatchFileConfiguration: undefined
        }
    }
}, initialState);
