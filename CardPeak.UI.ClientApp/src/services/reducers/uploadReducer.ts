import { handleActions } from 'redux-actions';
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
            selectedBatchUpload: action.payload
        }
    }
}, initialState);
