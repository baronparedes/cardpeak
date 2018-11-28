import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound, NavigationProps } from '../../layout'

import AgentMetricsContainer from './AgentMetricsContainer'
import AgentRankingMetricsContainer from './AgentRankingMetricsContainer'
import AgentPerformanceMetricsContainer from './AgentPerformanceMetricsContainer'
import AgentThresholdMetricsContainer from './AgentThresholdMetricsContainer'
import AgentDisbursementMetricsContainer from './AgentDisbursementMetricsContainer'
import BankAmountDistributionMetricsContainer from './BankAmountDistributionMetricsContainer'

const MetricsView: React.StatelessComponent<NavigationProps<any>> = (props) => {
	return (
		<div>
			<Switch>
				<Route exact path={props.match.url + "/agents"} component={AgentMetricsContainer} />
				<Route exact path={props.match.url + "/agents/rankings"} component={AgentRankingMetricsContainer} />
				<Route exact path={props.match.url + "/agents/performance"} component={AgentPerformanceMetricsContainer} />
				<Route exact path={props.match.url + "/agents/threshold"} component={AgentThresholdMetricsContainer} />
				<Route exact path={props.match.url + "/agents/disbursement"} component={AgentDisbursementMetricsContainer} />
				<Route exact path={props.match.url + "/banks/amountdistribution"} component={BankAmountDistributionMetricsContainer} />
				<Route component={NotFound} />
			</Switch>

		</div>
	)
}

export default MetricsView;