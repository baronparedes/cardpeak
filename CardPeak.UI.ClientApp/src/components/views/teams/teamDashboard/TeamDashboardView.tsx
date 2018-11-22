import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { SpinnerBlock, YearMonthAction } from '../../../layout'
//import TeamDashboardSummary from './TeamDashboardSummary'

interface TeamDashboardViewProps {
	teamDashboard?: CardPeak.Entities.TeamDashboard;
	loadingTeamDashboard?: boolean;
	refreshing?: boolean;
	onRefresh?: (year?: number, month?: number) => void,
}

const TeamDashboardView = (props: TeamDashboardViewProps) => {
	if (props.loadingTeamDashboard) {
		return (
			<SpinnerBlock />
		)
	}

	if (props.teamDashboard) {
		return (
			<div className="no-padding">
				<YearMonthAction
					label="dashboard"
					availableYears={props.teamDashboard.availableYears}
					yearOnly
					hideHistorical
					refreshing={props.refreshing}
					onRefresh={props.onRefresh} />
			</div>
		)
	}

	return null;
}

export default TeamDashboardView;