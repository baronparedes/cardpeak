import { combineReducers, Reducer } from 'redux';
import agentReducer from './agentReducer';
import settingsReducer from './settingsReducer'

export interface RootState {
    agentDashboardModel: CardPeak.Models.AgentDashboardModel;
    ratesModel: CardPeak.Models.RatesModel;
}

export default combineReducers<RootState>({
    agentDashboardModel: agentReducer,
    ratesModel: settingsReducer
});
