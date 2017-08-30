import { handleActions } from 'redux-actions';
import { SETTING_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.RatesModel = {
    rates: [],
    agentId: 0,
    banks: [],
    cardCategories: []
};

function sortRates(rates: CardPeak.Entities.Rate[]) {
    rates.sort((a, b) => {
        return a.bank.description.localeCompare(b.bank.description) || a.cardCategory.description.localeCompare(b.cardCategory.description);
    })
}
function removeRate(state: CardPeak.Models.RatesModel, payload: CardPeak.Entities.Rate) {
    let rates: CardPeak.Entities.Rate[] = [];
    state.rates.forEach(_ => {
        if (_.bankId === payload.bankId) {
            if (_.cardCategoryId === payload.cardCategoryId) {
                return;
            }
        }
        rates.push(_);
    });
    return rates;
}

function deleteRate(state: CardPeak.Models.RatesModel, payload: CardPeak.Entities.Rate) {
    let rates = removeRate(state, payload);
    sortRates(rates);
    return rates;
}

function addRate(state: CardPeak.Models.RatesModel, payload: CardPeak.Entities.Rate) {
    let rates = removeRate(state, payload);
    rates.push(payload);
    sortRates(rates);
    return rates;
}

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
            rates: [
                {
                    agentId: 0,
                    bankId: 90,
                    cardCategoryId: 90,
                    amount: 500,
                    bank: {
                        referenceId: 90,
                        description: "BPI"
                    },
                    cardCategory: {
                        referenceId: 90,
                        description: "GOLD"
                    }
                },
                {
                    agentId: 0,
                    bankId: 90,
                    cardCategoryId: 99,
                    amount: 500,
                    bank: {
                        referenceId: 90,
                        description: "BPI"
                    },
                    cardCategory: {
                        referenceId: 99,
                        description: "CLASSIC"
                    }
                }
            ]
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
        let payload = action.payload as CardPeak.Entities.Rate;
        let rates = deleteRate(state, payload);
        return {
            ...state,
            rates
        }
    },
    [SETTING_ACTIONS.ADD_RATE]: (state, action) => {
        let payload = action.payload as CardPeak.Entities.Rate
        let rates = addRate(state, payload);
        return {
            ...state,
            rates
        }
    }
}, initialState);
