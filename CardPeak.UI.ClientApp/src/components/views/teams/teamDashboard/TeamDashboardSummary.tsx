import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { PerformanceDashboard, TotalApprovedMetrics, DashboardLabel } from '../../../layout'

interface TeamDashboardSummaryProps {
	teamDashboard: CardPeak.Entities.TeamDashboard,
	selectedYear: number
}

const TeamDashboardSummary = (props: TeamDashboardSummaryProps) => {
	return (
		<div>
			<Grid fluid className="no-padding">
				<Row className="row-eq-height">
					<Col md={6}>
						<TotalApprovedMetrics
							totalApprovals={props.teamDashboard.totalApprovals} />
					</Col>
					<Col md={6}>
						<Panel className="panel-label-dashboard">
							<DashboardLabel
								className="pull-right total-approved-metric"
								label="members"
								metrics={props.teamDashboard.memberCount} />
						</Panel>
					</Col>
					<Col md={12}>
						<Panel className="text-center panel-label-dashboard hidden-print">
							<PerformanceDashboard performance={props.teamDashboard.performance} hideAmount />
						</Panel>
					</Col>
				</Row>
			</Grid>
		</div>
	)
}

export default TeamDashboardSummary;