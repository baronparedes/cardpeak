import { handleActions } from 'redux-actions';
import { DASHBOARD_ACTIONS } from '../../constants/actions';

const initialState: CardPeak.Models.DashboardModel = {
    latestProcessedBatch: []
};

export default handleActions<CardPeak.Models.DashboardModel, any>(
    {
        [DASHBOARD_ACTIONS.GET_DASHBOARD]: (state, action) => {
            return {
                ...state,
                refreshing: true
            };
        },
        [DASHBOARD_ACTIONS.GET_DASHBOARD_COMPLETE]: (state, action) => {
            return {
                ...state,
                ...action.payload,
                refreshing: undefined
            };
        }
    },
    initialState
);
