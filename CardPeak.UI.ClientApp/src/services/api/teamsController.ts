import axios from 'axios'

const API = {
	GET_TEAMS: '/teams',
	GET_TEAM_DASHBOARD: (id: number, year: number) => {
		return `/teams/${id}/dashboard?year=${year}`;
	}
}

export function getTeams(
	successCallback: (data: CardPeak.Entities.Team[]) => void,
	errorCallback?: (error: string) => void) {

	axios.get(API.GET_TEAMS)
		.then((r) => {
			successCallback(r.data as CardPeak.Entities.Team[]);
		}).catch((reason) => {
			if (errorCallback) {
				errorCallback(reason.message);
			}
		});
}

export function getTeamDashboard(
	teamId: number,
	year: number,
	successCallback: (data: CardPeak.Entities.TeamDashboard) => void,
	errorCallback?: (error: string) => void) {

	axios.get(API.GET_TEAM_DASHBOARD(teamId, year))
		.then((r) => {
			successCallback(r.data as CardPeak.Entities.TeamDashboard);
		}).catch((reason) => {
			if (errorCallback) {
				errorCallback(reason.message);
			}
		});
}