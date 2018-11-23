import { handleActions } from 'redux-actions';
import { TEAMS_ACTIONS } from '../../constants/actions'

import * as dateHelpers from '../../helpers/dateHelpers'

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
			selectedYear: dateHelpers.currentYear(),
			loadingTeamDashboard: undefined,
		}
	},
	[TEAMS_ACTIONS.REFRESH_TEAM_DASHBOARD]: (state, action) => {
		return {
			...state,
			refreshingTeamDashboard: true,
			selectedYear: action.payload
		}
	},
	[TEAMS_ACTIONS.REFRESH_TEAM_DASHBOARD_COMPLETE]: (state, action) => {
		return {
			...state,
			refreshingTeamDashboard: undefined,
			selectedTeamDashboard: action.payload,
		}
	},
	[TEAMS_ACTIONS.DELETE_AGENT_ERROR]: (state, action) => {
		return {
			...state,
			removingAgentError: action.payload
		}
	},
	[TEAMS_ACTIONS.DELETE_AGENT_COMPLETE]: (state, action) => {
		const payload = action.payload as CardPeak.Entities.TeamPlacement;
		const detail = state.selectedTeamDashboard.details.find(_ => _.teamPlacement.agentId === payload.agentId);
		const details = state.selectedTeamDashboard.details.filter(_ => _.teamPlacement.agentId !== payload.agentId);
		const totalApprovals = state.selectedTeamDashboard.totalApprovals - detail.totalApprovals;
		let performance = state.selectedTeamDashboard.performance.slice();
		performance.forEach(p => {
			const month = detail.performance.find(_ => _.key === p.key);
			p.value -= month ? month.value : 0;
		});
		return {
			...state,
			removingAgentError: undefined,
			selectedTeamDashboard: {
				...state.selectedTeamDashboard,
				memberCount: state.selectedTeamDashboard.memberCount - 1,
				totalApprovals,
				performance,
				details
			}
		}
	}
}, initialState);
