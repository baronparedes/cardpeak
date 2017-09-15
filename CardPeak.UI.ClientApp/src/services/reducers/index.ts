import { combineReducers, Reducer } from 'redux';
import agentReducer from './agentReducer';
import settingsReducer from './settingsReducer'
import ratesReducer from './ratesReducer'
import uploadReducer from './uploadReducer'
import dashboardReducer from './dashboardReducer'

export interface RootState {
    agentDashboardModel: CardPeak.Models.AgentDashboardModel;
    ratesModel: CardPeak.Models.RatesModel;
    settingsModel: CardPeak.Models.SettingsModel;
    batchUploadModel: CardPeak.Models.BatchUploadModel;
    dashboardModel: CardPeak.Models.DashboardModel;
}

export default combineReducers<RootState>({
    agentDashboardModel: agentReducer,
    ratesModel: ratesReducer,
    settingsModel: settingsReducer,
    batchUploadModel: uploadReducer,
    dashboardModel: dashboardReducer
});
