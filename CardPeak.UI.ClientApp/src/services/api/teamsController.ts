import axios from 'axios'

const API = {
	GET_TEAMS: '/teams',
	GET_TEAM_DASHBOARD: (id: number, year: number) => {
		return `/teams/${id}/dashboard?year=${year}`;
	},
	DELETE_AGENT: (teamId: number, agentId: number) => {
		return `/teams/${teamId}/delete?agentId=${agentId}`;
	},
	ADD_AGENT: (teamId: number) => {
		return `/teams/${teamId}/add`;
	},
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

export function deleteAgent(
	teamId: number, agentId: number,
	successCallback: () => void, errorCallback?: (error: string) => void) {


	axios.delete(API.DELETE_AGENT(teamId, agentId))
		.then((r) => {
			if (r.status === 200) {
				successCallback();
			}
			else {
				errorCallback(r.statusText);
			}
		})
		.catch((reason) => {
			if (errorCallback) {
				errorCallback(reason.message);
			}
		});
}

export function addAgent(teamId: number, agentId: number, performanceYear: number,
	successCallback: (data: CardPeak.Entities.TeamDashboardDetail) => void,
	errorCallback?: (error: string) => void) {

	const config = {
		params: {
			agentId,
			performanceYear
		}
	};

	axios.post(API.ADD_AGENT(teamId), null, config)
		.then((r) => {
			successCallback(r.data);
		})
		.catch((reason) => {
			errorCallback(reason);
		});
}