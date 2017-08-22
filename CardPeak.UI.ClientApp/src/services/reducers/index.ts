import { combineReducers, Reducer } from 'redux';
import agents from './agentReducer';

export interface RootState {
    agents: CardPeak.Models.AgentsModel;
}

export default combineReducers<RootState>({
    agents
});
