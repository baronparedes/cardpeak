import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { TEAMS_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as teamsController from '../api/teamsController'

export const getTeams = createAction(TEAMS_ACTIONS.GET_TEAMS);
export const getTeamsComplete = createAction<CardPeak.Entities.Team[]>(TEAMS_ACTIONS.GET_TEAMS_COMPLETE);

export const selectTeamDashboard = createAction<CardPeak.Entities.Team>(TEAMS_ACTIONS.SELECT_TEAM_DASHBOARD);
export const selectTeamDashboardComplete = createAction<CardPeak.Entities.TeamDashboard>(TEAMS_ACTIONS.SELECT_TEAM_DASHBOARD_COMPLETE);

function filterTeam(data: CardPeak.Entities.Team[], id: number, teamFoundCallback: (agent: CardPeak.Entities.Team) => void, notFoundCallback: () => void) {
	let team: CardPeak.Entities.Team = data.filter(_ => _.teamId == id)[0];
	if (team) {
		teamFoundCallback(team);
	}
	else {
		notFoundCallback();
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