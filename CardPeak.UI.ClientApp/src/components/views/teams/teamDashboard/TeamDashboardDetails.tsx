import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import {
	PerformanceDashboard, TotalApprovedMetrics, DashboardLabel,
	DataListFiltered, DataItemProps, ApprovalMetric
} from '../../../layout'

type AgentPerformanceMetricsDataList = new () => DataListFiltered<CardPeak.Entities.TeamDashboardDetail>;
const AgentPerformanceMetricsDataList = DataListFiltered as AgentPerformanceMetricsDataList;

interface TeamDashboardDetailsProps {
	details: CardPeak.Entities.TeamDashboardDetail[]
}

const AgentPerformanceMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.TeamDashboardDetail>> = (props) => {
	return (
		<Row>
			<Col md={2} sm={2} xs={6} xsHidden={props.isHeader}>
				{props.isHeader ? "agent" : props.item.teamPlacement.agent.firstName + " " + props.item.teamPlacement.agent.lastName}
			</Col>
			<Col md={2} sm={2} xs={6} xsHidden={props.isHeader} className={props.isHeader ? "" : "text-center"}>
				{props.isHeader ? "approvals" : <ApprovalMetric metric={props.item.totalApprovals} className="text-larger" />}
			</Col>
			{
				props.isHeader ? null :
					<Col md={8} sm={8} xs={12}>
						<PerformanceDashboard performance={props.item.performance} hideAmount />
					</Col>

			}
		</Row>
	)
}

const TeamDashboardDetails = (props: TeamDashboardDetailsProps) => {
	return (
		<div>
			<Grid fluid className="no-padding">
				<AgentPerformanceMetricsDataList
					predicate={(metric, searchString) => {
						const firstNameMatch = metric.teamPlacement.agent.firstName.toLowerCase().indexOf(searchString) >= 0;
						const lastNameMatch = metric.teamPlacement.agent.lastName.toLowerCase().indexOf(searchString) >= 0;
						return firstNameMatch || lastNameMatch;
					}}
					onGetKey={(item) => item.teamPlacement.agent.agentId}
					renderHeader={() => { return <AgentPerformanceMetricsRowLayout isHeader /> }}
					renderItem={(item, key) => {
						return <AgentPerformanceMetricsRowLayout item={item} key={key} />
					}}
					data={props.details} />
			</Grid>
		</div>
	)
}

export default TeamDashboardDetails;