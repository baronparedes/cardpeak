import { combineReducers, Reducer } from 'redux';
import agents from './agentReducer';

export interface RootState {
    agentsModel: CardPeak.Models.AgentsModel;
}

export default combineReducers<RootState>({
    agentsModel: agents
});
