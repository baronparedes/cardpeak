import { handleActions } from 'redux-actions';
import { SETTING_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.RatesModel = {
    rates: [],
    agentId: 0,
    banks: [],
    cardCategories: []
};

export default handleActions<CardPeak.Models.RatesModel, any>({
    [SETTING_ACTIONS.SELECT_AGENT_RATE]: (state, action) => {
        return {
            ...state,
            agentId: action.payload,
            loadingRates: true
        }
    },
    [SETTING_ACTIONS.SELECT_AGENT_RATE_COMPLETE]: (state, action) => {
        let payload = action.payload as CardPeak.Entities.Settings;
        return {
            ...state,
            ...payload,
            loadingRates: undefined,
        }
    },
    [SETTING_ACTIONS.POST_RATES]: (state, action) => {
        return {
            ...state,
            postingRates: true
        }
    },
    [SETTING_ACTIONS.POST_RATES_ERROR]: (state, action) => {
        return {
            ...state,
            postingRates: undefined
        }
    },
    [SETTING_ACTIONS.POST_RATES_COMPLETE]: (state, action) => {
        return {
            ...state,
            postingRates: undefined,
            rates: action.payload
        }
    },
    [SETTING_ACTIONS.DELETE_RATE]: (state, action) => {
        let payload = action.payload as CardPeak.Entities.Rate
        let rates = state.rates.slice();
        rates= state.rates.filter((rate) => {
            let result = rate.bankId != payload.bankId &&
                rate.cardCategoryId != payload.cardCategoryId &&
                rate.agentId != payload.agentId;

            console.log(rate);

            return result;
        });
        return {
            ...state,
            rates
        }
    },
    [SETTING_ACTIONS.ADD_RATE]: (state, action) => {
        let payload = action.payload as CardPeak.Entities.Rate
        let rates = state.rates.slice();
        rates = state.rates.filter((rate) => {
            let result = rate.bankId != payload.bankId &&
                rate.cardCategoryId != payload.cardCategoryId &&
                rate.agentId != payload.agentId;

            console.log(rate);

            return result;
        });
        rates.push(payload);
        return {
            ...state,
            rates
        }
    }
}, initialState);
