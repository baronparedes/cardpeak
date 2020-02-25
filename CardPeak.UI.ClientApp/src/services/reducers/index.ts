import { combineReducers } from 'redux';
import agentPayoutReducer from './agentPayoutReducer';
import agentReducer from './agentReducer';
import dashboardReducer from './dashboardReducer';
import metricsReducer from './metricsReducer';
import ratesReducer from './ratesReducer';
import settingsReducer from './settingsReducer';
import teamsReducer from './teamsReducer';
import uploadReducer from './uploadReducer';

export interface RootState {
    agentModel: CardPeak.Models.AgentModel;
    agentPayoutModel: CardPeak.Models.AgentPayoutModel;
    ratesModel: CardPeak.Models.RatesModel;
    settingsModel: CardPeak.Models.SettingsModel;
    batchUploadModel: CardPeak.Models.BatchUploadModel;
    dashboardModel: CardPeak.Models.DashboardModel;
    metricsModel: CardPeak.Models.MetricsModel;
    teamsModel: CardPeak.Models.TeamsModel;
}

export default combineReducers<RootState>({
    agentModel: agentReducer,
    agentPayoutModel: agentPayoutReducer,
    ratesModel: ratesReducer,
    settingsModel: settingsReducer,
    batchUploadModel: uploadReducer,
    dashboardModel: dashboardReducer,
    metricsModel: metricsReducer,
    teamsModel: teamsReducer
});
