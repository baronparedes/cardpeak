import * as React from 'react'
import * as Actions from '../../../services/actions/dashboardActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../services/reducers'

import { Panel, Grid, Row, Col } from 'react-bootstrap'
import {
	YearMonthAction,
	SpinnerBlock, PerformanceDashboard, DashboardLabel,
	ApprovalMetrics, ApprovalMetricsLineChart, TotalApprovedMetrics
} from '../../layout'

import { LatestProcessedBatchList, TopAgentList } from './metrics'

interface DashboardContainerDispatchProps {
	actions?: typeof Actions
}

class DashboardContainer extends React.Component<CardPeak.Models.DashboardModel & DashboardContainerDispatchProps, undefined> {
	constructor(props: CardPeak.Models.DashboardModel & DashboardContainerDispatchProps) {
		super(props);
	}
	componentDidMount() {
		this.props.actions.getDashboardStart();
	}
	renderMetrics() {
		return (
			<Grid className="no-padding">
				<Row>
					<Col sm={6}>

						<TotalApprovedMetrics
							totalApprovals={this.props.totalApprovals} />
					</Col>
					<Col sm={6}>
						<Panel className="panel-label-dashboard">
							<DashboardLabel className="pull-right" label="balance" metrics={this.props.accountBalance} isCurrency />
							<DashboardLabel className="pull-right" label="savings" metrics={this.props.savingsBalance} isCurrency noCurrencyColor />
						</Panel>
					</Col>
				</Row>
				{
					!this.props.performance ? null :
						<Row>
							<Col sm={12}>
								<Panel>
									<Col>
										<PerformanceDashboard performance={this.props.performance} />
									</Col>
									<Col xsHidden smHidden>
										<br />
										<ApprovalMetricsLineChart metrics={this.props.performance} label="yearly performance" />
									</Col>
								</Panel>
							</Col>
						</Row>
				}
				<ApprovalMetrics
					approvalsByBankDetails={this.props.approvalsByBankDetails}
					approvalsByBank={this.props.approvalsByBank}
					approvalsByCategory={this.props.approvalsByCategory} />
				<Row>
					<Col sm={6}>
						<Panel>
							<TopAgentList data={this.props.topAgents} />
						</Panel>
					</Col>
					<Col sm={6}>
						<Panel>
							<LatestProcessedBatchList data={this.props.latestProcessedBatch} />
						</Panel>
					</Col>
				</Row>
			</Grid>
		)
	}
	render() {
		return (
			<div>
				<YearMonthAction
					defaultYearValue={0}
					label="dashboard"
					availableYears={this.props.availableYears}
					refreshing={this.props.refreshing}
					onRefresh={this.props.actions.refreshDashboardStart} />
				<br/>
				{ this.props.refreshing ? <SpinnerBlock /> : this.renderMetrics() }
			</div>
		)
	}
}

const mapStateToProps = (state: RootState): CardPeak.Models.DashboardModel => ({
	...state.dashboardModel
})

const mapDispatchToProps = (dispatch: any): DashboardContainerDispatchProps => {
	return {
		actions: bindActionCreators(Actions as any, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);