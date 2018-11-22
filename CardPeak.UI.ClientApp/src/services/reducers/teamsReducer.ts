import { handleActions } from 'redux-actions';
import { TEAMS_ACTIONS } from '../../constants/actions'

const initialState: CardPeak.Models.TeamsModel = {
};

export default handleActions<CardPeak.Models.TeamsModel, any>({
	[TEAMS_ACTIONS.GET_TEAMS]: (state, action) => {
		return {
			...state,
			teams: undefined,
			loadingTeams: true
		}
	},
	[TEAMS_ACTIONS.GET_TEAMS_COMPLETE]: (state, action) => {
		return {
			...state,
			teams: action.payload,
			loadingTeams: undefined,
		}
	},
	[TEAMS_ACTIONS.SELECT_TEAM_DASHBOARD_START]: (state, action) => {
		return {
			...state,
			loadingTeamDashboard: true
		}
	},
	[TEAMS_ACTIONS.SELECT_TEAM_DASHBOARD]: (state, action) => {
		return {
			...state,
			selectedTeam: action.payload
		}
	},
	[TEAMS_ACTIONS.SELECT_TEAM_DASHBOARD_COMPLETE]: (state, action) => {
		return {
			...state,
			selectedTeamDashboard: action.payload,
			loadingTeamDashboard: undefined
		}
	}
}, initialState);
