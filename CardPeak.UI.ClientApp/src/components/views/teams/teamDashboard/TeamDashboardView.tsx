import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { SpinnerBlock, YearMonthAction } from '../../../layout'
import TeamDashboardSummary from './TeamDashboardSummary'
import TeamDashboardDetails from './TeamDashboardDetails'

interface TeamDashboardViewProps {
	teamDashboard?: CardPeak.Entities.TeamDashboard;
	loadingTeamDashboard?: boolean;
	refreshing?: boolean;
	onRefresh?: (year?: number, month?: number) => void,
	selectedYear?: number
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
							<TeamDashboardSummary teamDashboard={props.teamDashboard} selectedYear={props.selectedYear} />
							<TeamDashboardDetails details={props.teamDashboard.details} />
						</div>
				}
			</div>
		)
	}

	return null;
}

export default TeamDashboardView;