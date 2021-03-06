﻿import { handleActions } from 'redux-actions';
import { AGENT_PAYOUT_ACTIONS } from '../../constants/actions';

const initialState: CardPeak.Models.AgentPayoutModel = {
    initialized: undefined,
    loadingPayouts: undefined,
    loadingPayoutsError: undefined,
    count: 0,
    payouts: []
};

export default handleActions<CardPeak.Models.AgentPayoutModel, any>(
    {
        [AGENT_PAYOUT_ACTIONS.INIT_PAYOUTS]: (state, action) => {
            return {
                ...state,
                initialized: true
            };
        },
        [AGENT_PAYOUT_ACTIONS.GET_AGENT_PAYOUT]: (state, action) => {
            return {
                ...state,
                loadingPayouts: true,
                loadingPayoutsError: undefined
            };
        },
        [AGENT_PAYOUT_ACTIONS.GET_AGENT_PAYOUT_ERROR]: (
            state,
            action
        ) => {
            return {
                ...state,
                loadingPayouts: undefined,
                loadingPayoutsError: action.payload
            };
        },
        [AGENT_PAYOUT_ACTIONS.GET_AGENT_PAYOUT_COMPLETE]: (
            state,
            action
        ) => {
            const payload = action.payload as CardPeak.Models.AgentPayoutModel;
            const getTotal = (
                p: CardPeak.Entities.ApprovalMetric<
                    CardPeak.Entities.Agent
                >[]
            ): number | undefined => {
                if (payload.payouts) {
                    let total = 0;
                    payload.payouts.forEach(_ => {
                        total += _.value;
                    });
                    return total;
                }
                return undefined;
            };
            return {
                ...state,
                loadingPayouts: undefined,
                loadingPayoutsError: undefined,
                payouts: payload.payouts,
                count: payload.count,
                total: getTotal(payload.payouts)
            };
        }
    },
    initialState
);
