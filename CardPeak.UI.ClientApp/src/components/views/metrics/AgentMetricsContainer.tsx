import * as React from 'react'
import * as Actions from '../../../services/actions/metricActions'
import * as dateHelpers from '../../../helpers/dateHelpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Col, Row, Grid, Panel, Button, DropdownButton, MenuItem, Checkbox, FormGroup, InputGroup } from 'react-bootstrap'
import {
	YearMonthAction, DataListFiltered, DataListProps, DataItemProps, Currency,
	DashboardLabel, ApprovalMetric, TotalApprovedMetrics
} from '../../layout'

type AgentMetricsDataListFiltered = new () => DataListFiltered<CardPeak.Entities.AgentApprovalMetric>;
const AgentMetricsDataListFiltered = DataListFiltered as AgentMetricsDataListFiltered;

interface AgentMetricsContainerState {
	showNegativeBalance: boolean;
	showZeroBalance: boolean;
	showPayouts: boolean;
	showIncentives: boolean;
	agentApprovalMetrics?: CardPeak.Entities.AgentApprovalMetric[];
}

interface AgentMetricsContainerDispatchProps {
	actions?: typeof Actions
}

const AgentMetricsRowLayout: React.StatelessComponent<DataItemProps<CardPeak.Entities.AgentApprovalMetric>> = (props) => {
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
					{props.isHeader ? "balance" : <Currency currency={props.item.accountBalance} />}
				</Col>
				<Col sm={3} xs={4} xsHidden={props.isHeader} className="text-center">
					{props.isHeader ? "savings" : <Currency noCurrencyColor currency={props.item.savingsBalance} />}
				</Col>
			</Row>
		)
}

const AgentMetricsTotals: React.StatelessComponent<CardPeak.Models.MetricsModel> = (props) => {
	return (
		<Row>
			<Col sm={6}>
				<TotalApprovedMetrics totalApprovals={props.agentMetrics.totalApproved} />
			</Col>
			<Col sm={6}>
				<Panel className="panel-label-dashboard">
					<DashboardLabel className="pull-right" label="balance" metrics={props.agentMetrics.totalBalance} isCurrency />
					<DashboardLabel className="pull-right" label="savings" metrics={props.agentMetrics.totalSavings} isCurrency noCurrencyColor />
				</Panel>
			</Col>
		</Row>
	)
}

class AgentMetricsContainer extends React.Component<CardPeak.Models.MetricsModel & AgentMetricsContainerDispatchProps, AgentMetricsContainerState> {
	constructor(props: CardPeak.Models.MetricsModel & AgentMetricsContainerDispatchProps) {
		super(props);
		this.state = {
			showZeroBalance: true,
			showIncentives: false,
			showNegativeBalance: true,
			showPayouts: true
		}
	}
	handleOnChange = (e: any) => {
		this.setState({
			[e.target.name]: e.target.checked
		}, () => {
			this.filterMetrics(this.props.agentMetrics.agentApprovalMetrics);
		});
	}
	filterMetrics(data: CardPeak.Entities.AgentApprovalMetric[]) {
		let filteredData = data.filter((item) => {
			let showZeroBalance = false;
			let showIncentives = false;
			let showNegativeBalance = false;
			let showPayouts = false;

			if (this.state.showZeroBalance) {
				showZeroBalance = item.accountBalance === 0;
			}

			if (this.state.showNegativeBalance) {
				showNegativeBalance = item.accountBalance < 0;
			}

			if (this.state.showPayouts) {
				showPayouts = item.accountBalance > 0;
			}

			if (this.state.showIncentives) {
				showIncentives = item.incentivesBalance > 0;
			}

			const result = showZeroBalance || showIncentives || showNegativeBalance || showPayouts ||
				(
					this.state.showNegativeBalance && this.state.showPayouts && this.state.showIncentives && this.state.showZeroBalance
				);

			return result;
		});
		this.setState({
			agentApprovalMetrics: filteredData
		});
	}
	componentDidMount() {
		this.props.actions.getAvailableYears();
		this.props.actions.getAgentMetricsStart(dateHelpers.currentYear(), 0);
	}
	componentWillReceiveProps(nextProps: CardPeak.Models.MetricsModel) {
		if (this.props.agentMetrics.agentApprovalMetrics != nextProps.agentMetrics.agentApprovalMetrics) {
			this.filterMetrics(nextProps.agentMetrics.agentApprovalMetrics);
		}
	}
	render() {
		return (
			<div>
				<h2>Agents</h2>
				<div>
					<YearMonthAction
						label="metrics"
						availableYears={this.props.availableYears}
						refreshing={this.props.loadingMetrics}
						onRefresh={this.props.actions.getAgentMetricsStart} />
					<br />
					<Grid>
						<Row>
							<AgentMetricsTotals agentMetrics={this.props.agentMetrics} />
						</Row>
						<Row className="text-right">
							<FormGroup>
								<Checkbox name="showZeroBalance" checked={this.state.showZeroBalance} onChange={this.handleOnChange} inline>
									<span className="text-highlight money-zero-balance">zero balance</span>
								</Checkbox>
								<Checkbox name="showNegativeBalance" checked={this.state.showNegativeBalance} onChange={this.handleOnChange} inline>
									<span className="text-highlight money-debit">negative balance</span>
								</Checkbox>
								<Checkbox name="showPayouts" checked={this.state.showPayouts} onChange={this.handleOnChange} inline>
									<span className="text-highlight money-credit">payout</span>
								</Checkbox>
							</FormGroup>
						</Row>
						<Row>
							<AgentMetricsDataListFiltered
								predicate={(agent, searchString) => {
									const firstNameMatch = agent.key.firstName.toLowerCase().indexOf(searchString) >= 0;
									const lastNameMatch = agent.key.lastName.toLowerCase().indexOf(searchString) >= 0;
									return firstNameMatch || lastNameMatch;
								}}
								onGetKey={(item) => item.key.agentId}
								renderHeader={() => { return <AgentMetricsRowLayout isHeader /> }}
								renderItem={(item, key) => {
									return <AgentMetricsRowLayout item={item} key={key} />
								}}
								isLoading={this.props.loadingMetrics}
								data={this.state.agentApprovalMetrics} />
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

const mapDispatchToProps = (dispatch: any): AgentMetricsContainerDispatchProps => {
	return {
		actions: bindActionCreators(Actions as any, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentMetricsContainer);