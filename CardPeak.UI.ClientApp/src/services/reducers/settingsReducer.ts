import { handleActions } from 'redux-actions';
import { SETTINGS_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.SettingsModel = {
	banks: [],
	cardCategories: []
};

export default handleActions<CardPeak.Models.SettingsModel, any>({
	[SETTINGS_ACTIONS.LOAD_REFERENCES]: (state, action) => {
		return {
			...state,
			loadingBanks: true,
			loadingCardCategories: true
		}
	},
	[SETTINGS_ACTIONS.LOAD_REFERENCES_ERROR]: (state, action) => {
		return {
			...state,
			loadingBanks: undefined,
			loadingCardCategories: undefined
		}
	},
	[SETTINGS_ACTIONS.LOAD_REFERENCES_COMPLETE]: (state, action) => {
		let payload = action.payload as CardPeak.Entities.Settings;
		return {
			...state,
			...payload,
			loadingBanks: undefined,
			loadingCardCategories: undefined,
		}
	}
}, initialState);
