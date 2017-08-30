import { handleActions } from 'redux-actions';
import { RATE_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.SettingsModel = {
    banks: [],
    cardCategories: []
};

export default handleActions<CardPeak.Models.SettingsModel, any>({

}, initialState);
