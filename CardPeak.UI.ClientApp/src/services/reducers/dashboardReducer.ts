import { handleActions } from 'redux-actions';
import { AGENT_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.DashboardModel = {
    selectedAgent: null
};

export default handleActions<CardPeak.Models.DashboardModel>({
    [AGENT_ACTIONS.SELECT_AGENT]: (state, action) => {
        return {
            selectedAgent: {
                agentId: 2,
                firstName: "Baron Patrick",
                middleName: "Tablan",
                lastName: "Paredes",
                gender: "M",
                email: "baronp@magenic.com",
                birthDate: "09/01/1986"
            },
            ...action.payload,
            ...state
        }
    }
}, initialState);
