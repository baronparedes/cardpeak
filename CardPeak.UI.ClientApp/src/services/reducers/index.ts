import { combineReducers, Reducer } from 'redux';
import agentReducer from './agentReducer';
import settingsReducer from './settingsReducer'
import ratesReducer from './ratesReducer'

export interface RootState {
    agentDashboardModel: CardPeak.Models.AgentDashboardModel;
    ratesModel: CardPeak.Models.RatesModel;
    settingsModel: CardPeak.Models.SettingsModel;
}

export default combineReducers<RootState>({
    agentDashboardModel: agentReducer,
    ratesModel: ratesReducer,
    settingsModel: settingsReducer,
});
