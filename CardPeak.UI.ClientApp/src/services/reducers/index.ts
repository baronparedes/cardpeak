import { combineReducers, Reducer } from 'redux';
import agentReducer from './agentReducer';
import agentPayoutReducer from './agentPayoutReducer';
import settingsReducer from './settingsReducer'
import ratesReducer from './ratesReducer'
import uploadReducer from './uploadReducer'
import dashboardReducer from './dashboardReducer'
import metricsReducer from './metricsReducer'

export interface RootState {
    agentModel: CardPeak.Models.AgentModel;
    agentPayoutModel: CardPeak.Models.AgentPayoutModel;
    ratesModel: CardPeak.Models.RatesModel;
    settingsModel: CardPeak.Models.SettingsModel;
    batchUploadModel: CardPeak.Models.BatchUploadModel;
    dashboardModel: CardPeak.Models.DashboardModel;
    metricsModel: CardPeak.Models.MetricsModel;
}

export default combineReducers<RootState>({
    agentModel: agentReducer,
    agentPayoutModel: agentPayoutReducer,
    ratesModel: ratesReducer,
    settingsModel: settingsReducer,
    batchUploadModel: uploadReducer,
    dashboardModel: dashboardReducer,
    metricsModel: metricsReducer
});