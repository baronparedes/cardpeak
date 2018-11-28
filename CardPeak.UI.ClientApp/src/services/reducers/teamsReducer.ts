import { handleActions } from 'redux-actions';
import { TEAMS_ACTIONS } from '../../constants/actions'

import * as dateHelpers from '../../helpers/dateHelpers'

const initialState: CardPeak.Models.TeamsModel = {
};

function sortTeam(data: CardPeak.Entities.Team[]) {
	data.sort((a, b) => {
		return a.name.localeCompare(b.name);
	})
}

function sortDetails(data: CardPeak.Entities.TeamDashboardDetail[]) {
	data.sort((a, b) => {
		const one = a.teamPlacement.agent.firstName + ' ' + a.teamPlacement.agent.lastName;
		const two = b.teamPlacement.agent.firstName + ' ' + b.teamPlacement.agent.lastName;
		return one.localeCompare(two);
	})
}

function removeTeam(state: CardPeak.Models.TeamsModel, teamId: number) {
	return state.teams.filter(_ => _.teamId !== teamId);;
}

function saveTeam(state: CardPeak.Models.TeamsModel, payload: CardPeak.Entities.Team) {
	let data = removeTeam(state, payload.teamId);
	data.push(payload);
	sortTeam(data);
	return data;
}

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
	[TEAMS_ACTIONS.SAVE_TEAM_COMPLETE]: (state, action) => {
		const teams = saveTeam(state, action.payload);
		return {
			...state,
			removingAgentError: undefined,
			teams
		}
	},
	[TEAMS_ACTIONS.SAVE_TEAM_ERROR]: (state, action) => {
		return {
			...state,
			saveTeamError: `Save Failed: ${action.payload}`
		}
	},
	[TEAMS_ACTIONS.DELETE_TEAM_COMPLETE]: (state, action) => {
		const teams = removeTeam(state, action.payload);
		let selectedTeam = { ...state.selectedTeam };
		let selectedTeamDashboard = { ...state.selectedTeamDashboard };
		if (selectedTeam && selectedTeam.teamId === action.payload) {
			selectedTeam = undefined;
			selectedTeamDashboard = undefined;
		}
		return {
			...state,
			deleteTeamError: undefined,
			selectedTeam,
			selectedTeamDashboard,
			teams
		}
	},
	[TEAMS_ACTIONS.DELETE_TEAM_ERROR]: (state, action) => {
		return {
			...state,
			deleteTeamError: `Delete Failed: ${action.payload}`
		}
	},
	[TEAMS_ACTIONS.DELETE_AGENT_ERROR]: (state, action) => {
		return {
			...state,
			removingAgentError: `Delete Failed: ${action.payload}`
		}
	},
	[TEAMS_ACTIONS.DELETE_AGENT_COMPLETE]: (state, action) => {
		const payload = action.payload as CardPeak.Entities.TeamPlacement;
		const detail = state.selectedTeamDashboard.details.find(_ => _.teamPlacement.agentId === payload.agentId);
		const totalApprovals = state.selectedTeamDashboard.totalApprovals - detail.totalApprovals;
		const details = state.selectedTeamDashboard.details.filter(_ => _.teamPlacement.agentId !== payload.agentId);
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

	},
	[TEAMS_ACTIONS.ADD_AGENT_ERROR]: (state, action) => {
		return {
			...state,
			addingAgentError: `Add Failed:${action.payload}`
		}
	},
	[TEAMS_ACTIONS.ADD_AGENT_COMPLETE]: (state, action) => {
		if (action.payload === null) {
			return {
				...state,
				addingAgentError: undefined
			}
		}

		const detail = action.payload as CardPeak.Entities.TeamDashboardDetail;
		const totalApprovals = state.selectedTeamDashboard.totalApprovals + detail.totalApprovals;

		let details = state.selectedTeamDashboard.details.slice();
		details.push(detail);
		sortDetails(details);

		let performance = state.selectedTeamDashboard.performance.slice();
		performance.forEach(p => {
			const month = detail.performance.find(_ => _.key === p.key);
			p.value += month ? month.value : 0;
		});

		return {
			...state,
			addingAgentError: undefined,
			selectedTeamDashboard: {
				...state.selectedTeamDashboard,
				memberCount: state.selectedTeamDashboard.memberCount + 1,
				totalApprovals,
				performance,
				details
			}
		}

	}
}, initialState);
