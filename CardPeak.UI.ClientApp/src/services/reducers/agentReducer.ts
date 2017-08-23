import { handleActions } from 'redux-actions';
import { AGENT_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.AgentsModel = {
};

export default handleActions<CardPeak.Models.AgentsModel, CardPeak.Entities.Agent | CardPeak.Entities.Agent[]>({
    [AGENT_ACTIONS.SELECT_AGENT]: (state, action) => {
        return {
            selectedAgent: action.payload,
            ...action.payload,
            ...state
        };
    },
    [AGENT_ACTIONS.GET_ALL]: (state, action) => {
        return {
            loadingAgents: true,
            ...action.payload,
            ...state
        };
    },
    [AGENT_ACTIONS.GET_ALL_COMPLETE]: (state, action) => {
        return {
            loadingAgents: false,
            agents: action.payload,
            ...action.payload,
            ...state,
        };
    }
}, initialState);
