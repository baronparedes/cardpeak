import * as React from 'react';
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'
import { Row, Col, Grid, Panel, FormGroup, Checkbox } from 'react-bootstrap'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import {
	DateRangeAction, DataListFiltered, TotalApprovedMetrics,
	DataItemProps, ApprovalMetric, Currency, DashboardLabel
} from '../../layout'

type AgentDisbursementMetricsDataListFiltered = new () => DataListFiltered<CardPeak.Entities.AgentDisbursementMetrics>;
const AgentDisbursementMetricsDataListFiltered = DataListFiltered as AgentDisbursementMetricsDataListFiltered;

interface AgentDisbursementMetricsContainerDispatchProps {
	actions?: typeof Actions
}

interface AgentDisbursementMetricsContainerState {
	displayAll?: boolean;
	agentDisbursementMetrics?: CardPeak.Entities.AgentDisbursementMetrics[];
}

const AgentDisbursementMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AgentDisbursementMetrics>> = (props) => {
	return (
		<Row>
			<Col mdHidden
				lgHidden
				smHidden
				xsHidden={!props.isHeader} className="text-center">
				<span className="grid-label spacer-left">agent metrics</span>
			</Col>
			<Col sm={3} xs={12} xsHidden={props.isHeader}>
				{props.isHeader ? "agent" : props.item.key.firstName + " " + props.item.key.lastName}
			</Col>
			<Col sm={3} xs={4} xsHidden={props.isHeader} className="text-center">
				{props.isHeader ? "approvals" : <ApprovalMetric metric={props.item.value} />}
			</Col>
			<Col sm={3} xs={4} xsHidden={props.isHeader} className="text-center">
				{props.isHeader ? "amount" : <Currency currency={props.item.amount} noCurrencyColor />}
			</Col>
			<Col sm={3} xs={4} xsHidden={props.isHeader} className="text-center">
				{props.isHeader ? "disbursement" : <Currency currency={props.item.disbursement} />}
			</Col>
		</Row>
	)
}

class AgentDisbursementMetricsContainer extends
	React.Component<CardPeak.Models.MetricsModel & AgentDisbursementMetricsContainerDispatchProps, AgentDisbursementMetricsContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			displayAll: false
		}
	}
	componentDidMount() {
		this.props.actions.getAgentDisbursementMetricsStart(dateHelpers.currentDay());
	}
	componentWillReceiveProps(nextProps: CardPeak.Models.MetricsModel) {
		if (this.props.agentDisbursementMetrics !== nextProps.agentDisbursementMetrics) {
			this.filterMetrics(nextProps.agentDisbursementMetrics);
		}
	}
	handleOnChange = (e: any) => {
		this.setState({
			[e.target.name]: e.target.checked
		}, () => {
			this.filterMetrics(this.props.agentDisbursementMetrics);
		});
	}
	filterMetrics(data: CardPeak.Entities.AgentDisbursementMetrics[]) {
		let filteredData = data.filter((item) => {
			return item.disbursement < 0 || this.state.displayAll;
		});
		this.setState({
			agentDisbursementMetrics: filteredData
		});
	}
	render() {
		let summary = {
			totalApprovals: 0,
			totalCredited: 0,
			totalDisbursed: 0
		};

		if (this.state.agentDisbursementMetrics) {
			this.state.agentDisbursementMetrics.forEach(_ => {
				summary.totalApprovals += _.value;
				summary.totalCredited += _.amount;
				summary.totalDisbursed += _.disbursement;
			});
		}

		return (
			<div>
				<h2>Agent Disbursement</h2>
				<div>
					<DateRangeAction
						refreshing={this.props.loadingMetrics}
						onRefresh={this.props.actions.getAgentDisbursementMetricsStart}
						label="metrics"
						startDateLabel="target date"
						hideEndDate />
					<br />
					<Grid fluid>
						<Row>
							<Row>
								<Col sm={6}>
									<TotalApprovedMetrics totalApprovals={summary.totalApprovals} />
								</Col>
								<Col sm={6}>
									<Panel className="panel-label-dashboard">
										<DashboardLabel className="pull-right" label="approvals credited" metrics={summary.totalCredited} isCurrency noCurrencyColor />
										<DashboardLabel className="pull-right" label="disbursed" metrics={summary.totalDisbursed} isCurrency />
									</Panel>
								</Col>
							</Row>
						</Row>
						<Row className="text-right">
							<FormGroup>
								<Checkbox name="displayAll" checked={this.state.displayAll} onChange={this.handleOnChange} inline>
									<span className="text-highlight text-muted">display all</span>
								</Checkbox>
							</FormGroup>
						</Row>
						<Row>
							<AgentDisbursementMetricsDataListFiltered
								predicate={(agent, searchString) => {
									const firstNameMatch = agent.key.firstName.toLowerCase().indexOf(searchString) >= 0;
									const lastNameMatch = agent.key.lastName.toLowerCase().indexOf(searchString) >= 0;
									return firstNameMatch || lastNameMatch;
								}}
								onGetKey={(item) => item.key.agentId}
								renderHeader={() => { return <AgentDisbursementMetricsRowLayout isHeader /> }}
								renderItem={(item, key) => {
									return <AgentDisbursementMetricsRowLayout item={item} key={key} />
								}}
								isLoading={this.props.loadingMetrics}
								data={this.state.agentDisbursementMetrics} />
						</Row>
					</Grid>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState): CardPeak.Models.MetricsModel => ({
	...state.metricsModel,
})

const mapDispatchToProps = (dispatch: any): AgentDisbursementMetricsContainerDispatchProps => {
	return {
		actions: bindActionCreators(Actions as any, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentDisbursementMetricsContainer);
