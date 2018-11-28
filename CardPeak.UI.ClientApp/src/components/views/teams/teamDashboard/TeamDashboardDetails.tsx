import * as React from 'react'
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap'
import {
	PerformanceDashboard, TotalApprovedMetrics, DashboardLabel,
	DataListFiltered, DataItemProps, ApprovalMetric, ConfirmButton
} from '../../../layout'

type AgentPerformanceMetricsDataList = new () => DataListFiltered<CardPeak.Entities.TeamDashboardDetail>;
const AgentPerformanceMetricsDataList = DataListFiltered as AgentPerformanceMetricsDataList;

interface TeamDashboardDetailsProps {
	details?: CardPeak.Entities.TeamDashboardDetail[];
	onRemoveAgent?: (teamPlacement: CardPeak.Entities.TeamPlacement, errorCallback: () => void) => void;
	removingAgentError?: string;
}

interface AgentPerformanceMetricsRowLayoutState {
	removingAgent?: boolean;
}

class AgentPerformanceMetricsRowLayout extends React.Component<DataItemProps<CardPeak.Entities.TeamDashboardDetail> & TeamDashboardDetailsProps, AgentPerformanceMetricsRowLayoutState> {
	constructor(props: DataItemProps<CardPeak.Entities.TeamDashboardDetail> & TeamDashboardDetailsProps) {
		super(props);
		this.state = {
			removingAgent: undefined
		}
	}
	handleOnConfirm = () => {
		if (this.props.onRemoveAgent) {
			this.setState({ removingAgent: true }, () => {
				this.props.onRemoveAgent(this.props.item.teamPlacement, () => {
					this.setState({ removingAgent: undefined });
				});
			});
		}
	}
	render() {
		return (
			<Row>
				<Col md={12} xs={12} xsHidden={this.props.isHeader}>
					{
						this.props.isHeader ? "agent performance" :
							<div className="spacer-bottom">
								<span className="text-highlight text-large">
									{this.props.item.teamPlacement.agent.firstName + " " + this.props.item.teamPlacement.agent.lastName}
								</span>
								<span className="float-right">
									<ConfirmButton
										useButtonLoading
										bsSize="small"
										bsStyle="danger"
										onConfirm={this.handleOnConfirm}
										confirmTitle="confirm"
										isLoading={this.state.removingAgent}
										disabled={this.state.removingAgent}
										buttonLabel={<i className="fa fa-remove"></i>}>

										<p>
											<strong>Remove from {this.props.item.teamPlacement.team.name}</strong>
											<br />
											<span className="text-muted spacer-right">agent:</span>
											<strong className="text-highlight">
												{this.props.item.teamPlacement.agent.firstName + " " + this.props.item.teamPlacement.agent.lastName}
											</strong>
										</p>
										<p className="text-right">Do you wish to continue?</p>
									</ConfirmButton>
								</span>
							</div>
					}
				</Col>
				<Col md={2} xs={2}>
					{
						this.props.isHeader ? null :
							<div className={"text-right align-center"}>
								<small className="text-muted spacer-right">total</small>
								<ApprovalMetric metric={this.props.item.totalApprovals} className="text-larger" />
							</div>
					}
				</Col>
				<Col md={10} xs={10}>
					{
						this.props.isHeader ? null :
							<PerformanceDashboard performance={this.props.item.performance} hideAmount />
					}
				</Col>
			</Row>
		);
	}
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