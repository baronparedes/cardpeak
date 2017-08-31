import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { SETTINGS_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as settingsController from '../api/settingsController'

export const loadReference = createAction(SETTINGS_ACTIONS.LOAD_REFERENCES);
export const loadReferenceComplete = createAction<CardPeak.Entities.Settings>(SETTINGS_ACTIONS.LOAD_REFERENCES_COMPLETE);
export const loadReferenceError = createAction<string>(SETTINGS_ACTIONS.LOAD_REFERENCES_ERROR);

export const postReference = createAction(SETTINGS_ACTIONS.POST_REFERENCE);
export const postReferenceComplete = createAction<{ reference: CardPeak.Entities.Reference, type: number }>(SETTINGS_ACTIONS.POST_REFERENCE_COMPLETE);
export const postReferenceError = createAction(SETTINGS_ACTIONS.POST_REFERENCE_ERROR);

export function loadReferencesStart() {
    return (dispatch: (e: any) => void) => {
        dispatch(loadReference());
        settingsController.getReferences((data: CardPeak.Entities.Settings) => {
            dispatch(loadReferenceComplete(data));
        }, (e: string) => {
            dispatch(loadReferenceError(e));
        });
    }
}

export function postReferenceStart(reference: CardPeak.Entities.Reference, type: number) {
    return (dispatch: (e: any) => void) => {
        dispatch(postReference());
        settingsController.postReference(reference, type, null, null);
    }
}