import { handleActions } from 'redux-actions';
import { AGENT_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.AgentsModel = {
    selectedAgent: {
        agentId: 2,
        firstName: "Baron Patrick",
        middleName: "Tablan",
        lastName: "Paredes",
        gender: "M",
        email: "baronp@magenic.com",
        alias: undefined
    }
};

export default handleActions<CardPeak.Models.AgentsModel>({
    [AGENT_ACTIONS.SELECT_AGENT]: (state, action) => {
        return {
            selectedAgent: {
                agentId: 2,
                firstName: "Baron Patrick",
                middleName: "Tablan",
                lastName: "Paredes",
                gender: "M",
                email: "baronp@magenic.com"
            },
            ...action.payload,
            ...state
        };
    },
    [AGENT_ACTIONS.GET_ALL]: (state, action) => {
        return {
            ...action.payload,
            ...state
        };
    }
}, initialState);
