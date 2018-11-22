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
	onAddAgent: (target: CardPeak.Entities.TeamDashboard) => void;
	onRemoveAgent: (teamPlacement: CardPeak.Entities.TeamPlacement) => void;
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
							onClick={() => {
								if (props.onAddAgent) {
									props.onAddAgent(props.teamDashboard);
								}
							}}
							bsStyle="success"
							disabled={props.refreshing}>
							<i className="fa fa-user-plus" title="Add Agent"></i>
						</Button>
					}
					label="dashboard"
					availableYears={props.teamDashboard.availableYears}
					yearOnly
					hideHistorical
					defaultYearValue={props.selectedYear}
					refreshing={props.refreshing}
					onRefresh={props.onRefresh} />
				<br />
				{
					props.refreshing ? <SpinnerBlock /> :
						<div>
							<TeamDashboardSummary teamDashboard={props.teamDashboard} />
							<TeamDashboardDetails details={props.teamDashboard.details} onRemoveAgent={props.onRemoveAgent} />
						</div>
				}
			</div>
		)
	}

	return null;
}

export default TeamDashboardView;