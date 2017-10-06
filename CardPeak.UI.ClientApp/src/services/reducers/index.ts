import { combineReducers, Reducer } from 'redux';
import agentReducer from './agentReducer';
import agentPayoutReducer from './agentPayoutReducer';
import settingsReducer from './settingsReducer'
import ratesReducer from './ratesReducer'
import uploadReducer from './uploadReducer'
import dashboardReducer from './dashboardReducer'
import metricsReducer from './metricsReducer'

export interface RootState {
    agentDashboardModel: CardPeak.Models.AgentDashboardModel;
    agentPayoutModel: CardPeak.Models.AgentPayoutModel;
    ratesModel: CardPeak.Models.RatesModel;
    settingsModel: CardPeak.Models.SettingsModel;
    batchUploadModel: CardPeak.Models.BatchUploadModel;
    dashboardModel: CardPeak.Models.DashboardModel;
    metricsModel: CardPeak.Models.MetricsModel;
}

export default combineReducers<RootState>({
    agentDashboardModel: agentReducer,
    agentPayoutModel: agentPayoutReducer,
    ratesModel: ratesReducer,
    settingsModel: settingsReducer,
    batchUploadModel: uploadReducer,
    dashboardModel: dashboardReducer,
    metricsModel: metricsReducer
});