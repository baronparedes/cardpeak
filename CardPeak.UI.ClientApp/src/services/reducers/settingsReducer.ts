import { handleActions } from 'redux-actions';
import { SETTINGS_ACTIONS } from '../../constants/actions';

const initialState: CardPeak.Models.SettingsModel = {
    banks: [],
    cardCategories: [],
    defaultRateTypes: [],
    initialized: undefined
};

export default handleActions<CardPeak.Models.SettingsModel, any>(
    {
        [SETTINGS_ACTIONS.LOAD_REFERENCES]: (state, action) => {
            return {
                ...state,
                loading: true
            };
        },
        [SETTINGS_ACTIONS.LOAD_REFERENCES_ERROR]: (state, action) => {
            return {
                ...state,
                loading: undefined,
                initialized: undefined
            };
        },
        [SETTINGS_ACTIONS.LOAD_REFERENCES_COMPLETE]: (
            state,
            action
        ) => {
            let payload = action.payload as CardPeak.Entities.Settings;
            return {
                ...state,
                ...payload,
                loading: undefined,
                initialized: true
            };
        }
    },
    initialState
);
