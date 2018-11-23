import * as React from 'react'
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap'
import { SpinnerBlock, YearMonthAction } from '../../../layout'
import TeamDashboardSummary from './TeamDashboardSummary'
import TeamDashboardDetails from './TeamDashboardDetails'

interface TeamDashboardViewProps {
	teamDashboard?: CardPeak.Entities.TeamDashboard;
	loadingTeamDashboard?: boolean;
	refreshing?: boolean;
	onRefresh?: (year?: number, month?: number) => void;
	selectedYear?: number;
	onRemoveAgent: (teamPlacement: CardPeak.Entities.TeamPlacement, errorCallback: () => void) => void;
	removingAgentError?: string;
}

const TeamDashboardView = (props: TeamDashboardViewProps) => {
	if (props.loadingTeamDashboard) {
		return (
			<SpinnerBlock />
		)
	}
	if (props.teamDashboard) {
		return (
			<div>
				<YearMonthAction
					addOnActions={
						<Button
							bsStyle="success"
							disabled={props.refreshing}>
							<i className="fa fa-user-plus" title="Add Agent"></i>
						</Button>
					}
					label="dashboard"
					availableYears={props.teamDashboard.availableYears}
					yearOnly
					hideHistorical
					hideValue
					defaultYearValue={props.selectedYear}
					refreshing={props.refreshing}
					onRefresh={props.onRefresh} />
				<br />
				{
					props.refreshing ? <SpinnerBlock /> :
						<div>
							<TeamDashboardSummary teamDashboard={props.teamDashboard} />
							<TeamDashboardDetails details={props.teamDashboard.details}
								onRemoveAgent={props.onRemoveAgent} removingAgentError={props.removingAgentError} />
						</div>
				}
			</div>
		)
	}

	return null;
}

export default TeamDashboardView;