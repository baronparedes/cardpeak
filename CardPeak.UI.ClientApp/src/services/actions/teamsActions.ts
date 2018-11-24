import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { TEAMS_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as teamsController from '../api/teamsController'

export const getTeams = createAction(TEAMS_ACTIONS.GET_TEAMS);
export const getTeamsComplete = createAction<CardPeak.Entities.Team[]>(TEAMS_ACTIONS.GET_TEAMS_COMPLETE);

export const selectTeamDashboard = createAction<CardPeak.Entities.Team>(TEAMS_ACTIONS.SELECT_TEAM_DASHBOARD);
export const selectTeamDashboardComplete = createAction<CardPeak.Entities.TeamDashboard>(TEAMS_ACTIONS.SELECT_TEAM_DASHBOARD_COMPLETE);

export const refreshTeamDashboard = createAction<number>(TEAMS_ACTIONS.REFRESH_TEAM_DASHBOARD);
export const refreshTeamDashboardComplete = createAction<CardPeak.Entities.TeamDashboard>(TEAMS_ACTIONS.REFRESH_TEAM_DASHBOARD_COMPLETE);

export const removeAgentComplete = createAction<CardPeak.Entities.TeamPlacement>(TEAMS_ACTIONS.DELETE_AGENT_COMPLETE);
export const removeAgentError = createAction<string>(TEAMS_ACTIONS.DELETE_AGENT_ERROR);

export const addAgentComplete = createAction<CardPeak.Entities.TeamDashboardDetail>(TEAMS_ACTIONS.ADD_AGENT_COMPLETE);
export const addAgentError = createAction<string>(TEAMS_ACTIONS.ADD_AGENT_ERROR);

export const saveTeamComplete = createAction<CardPeak.Entities.Team>(TEAMS_ACTIONS.SAVE_TEAM_COMPLETE);
export const saveTeamError = createAction<string>(TEAMS_ACTIONS.SAVE_TEAM_ERROR);

function filterTeam(data: CardPeak.Entities.Team[], id: number, teamFoundCallback: (agent: CardPeak.Entities.Team) => void, notFoundCallback: () => void) {
	let team: CardPeak.Entities.Team = data.filter(_ => _.teamId == id)[0];
	if (team) {
		teamFoundCallback(team);
	}
	else {
		notFoundCallback();
	}
}

export function addAgentStart(teamId: number, agentId: number, performanceYear: number) {
	return (dispatch: (e: any) => void) => {
		teamsController.addAgent(teamId, agentId, performanceYear, (data: CardPeak.Entities.TeamDashboardDetail) => {
			dispatch(addAgentComplete(data));
		}, (error: string) => {
			dispatch(addAgentError(error));
		});
	} 
}

export function removeAgentStart(teamPlacement: CardPeak.Entities.TeamPlacement, errorCallback: () => void) {
	return (dispatch: (e: any) => void) => {
		teamsController.deleteAgent(teamPlacement.teamId, teamPlacement.agentId, () => {
			dispatch(removeAgentComplete(teamPlacement));
		}, (error: string) => {
			dispatch(removeAgentError(error));
			errorCallback(); 
		});
	} 
}

export function getTeamsStart(completedCallback?: (data: CardPeak.Entities.Team[]) => void, errorCallback?: (error: string) => void) {
	return (dispatch: (e: any) => void) => {
		dispatch(getTeams());
		teamsController.getTeams((data: CardPeak.Entities.Team[]) => {
			dispatch(getTeamsComplete(data));
			if (completedCallback) {
				completedCallback(data);
			}
		}, errorCallback);
	}
}

export function selectTeamById(id: number, teamFoundCallback: (team: CardPeak.Entities.Team) => void, notFoundCallback: () => void) {
	return (dispatch: (e: any) => void, getState: () => RootState) => {
		const teams = getState().teamsModel.teams;
		if (!teams) {
			dispatch(getTeamsStart((data: CardPeak.Entities.Team[]) => {
				filterTeam(data, id, teamFoundCallback, notFoundCallback);
			}));
		}
		else {
			filterTeam(teams, id, teamFoundCallback, notFoundCallback);
		}
	}
}

export function selectTeamDashboardStart(year: number, errorCallback?: (error: string) => void) {
	return (dispatch: (e: any) => void, getState: () => RootState) => {
		let team = getState().teamsModel.selectedTeam;
		dispatch(selectTeamDashboard(team));
		dispatch(createAction(TEAMS_ACTIONS.SELECT_TEAM_DASHBOARD_START)());
		teamsController.getTeamDashboard(team.teamId, year, (data: CardPeak.Entities.TeamDashboard) => {
			dispatch(selectTeamDashboardComplete(data));
		}, errorCallback);
	}
}

export function refreshTeamDashboardStart(year: number) {
	return (dispatch: (e: any) => void, getState: () => RootState) => {
		let teamId = getState().teamsModel.selectedTeam.teamId;
		dispatch(refreshTeamDashboard(year));
		teamsController.getTeamDashboard(teamId, year, (data: CardPeak.Entities.TeamDashboard) => {
			dispatch(refreshTeamDashboardComplete(data));
		});
	}
}

export function saveTeamStart(
	team: CardPeak.Entities.Team,
	saveCompleteCallback: () => void, errorCallback: (error: string) => void) {
	return (dispatch: (e: any) => void) => {
		teamsController.saveTeam(team, (data: CardPeak.Entities.Team) => {
			dispatch(saveTeamComplete(data));
			saveCompleteCallback();
			getTeamsStart();
		}, (error: string) => {
			dispatch(saveTeamError(error));
			errorCallback(error);
		});
	}
}