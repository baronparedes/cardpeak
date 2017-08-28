import { combineReducers, Reducer } from 'redux';
import agentReducer from './agentReducer';

export interface RootState {
    agentDashboardModel: CardPeak.Models.AgentDashboardModel;
}

export default combineReducers<RootState>({
    agentDashboardModel: agentReducer
});
