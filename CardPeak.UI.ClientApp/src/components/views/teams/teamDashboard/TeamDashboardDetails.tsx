import * as React from 'react'
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap'
import {
	PerformanceDashboard, TotalApprovedMetrics, DashboardLabel,
	DataListFiltered, DataItemProps, ApprovalMetric
} from '../../../layout'

type AgentPerformanceMetricsDataList = new () => DataListFiltered<CardPeak.Entities.TeamDashboardDetail>;
const AgentPerformanceMetricsDataList = DataListFiltered as AgentPerformanceMetricsDataList;

interface TeamDashboardDetailsProps {
	details?: CardPeak.Entities.TeamDashboardDetail[];
	onRemoveAgent?: (teamPlacement: CardPeak.Entities.TeamPlacement) => void;
}

const AgentPerformanceMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.TeamDashboardDetail> & TeamDashboardDetailsProps> = (props) => {
	return (
		<Row>
			<Col md={3} xs={6} xsHidden={props.isHeader}>
				{
					props.isHeader ? "agent" :
						<div className="block">
							<Button
								onClick={() => {
									if (props.onRemoveAgent) {
										props.onRemoveAgent(props.item.teamPlacement)
									}
								}}
								className="spacer-right"
								bsSize="xs"
								bsStyle="danger">
								<i className="fa fa-remove" title="Remove Agent"></i>
							</Button>
							{props.item.teamPlacement.agent.firstName + " " + props.item.teamPlacement.agent.lastName}
						</div>
				}
			</Col>
			<Col md={1} xs={6} xsHidden={props.isHeader} className={"text-left"}>
				{props.isHeader ? "approvals" : <ApprovalMetric metric={props.item.totalApprovals} className="text-larger" />}
			</Col>
			{
				props.isHeader ? null :
					<Col md={8} xs={12}>
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
						return <AgentPerformanceMetricsRowLayout item={item} key={key} onRemoveAgent={props.onRemoveAgent} />
					}}
					data={props.details} />
			</Grid>
		</div>
	)
}

export default TeamDashboardDetails;