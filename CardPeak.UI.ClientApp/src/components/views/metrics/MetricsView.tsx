import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound, NavigationProps } from '../../layout'

import AgentMetricsView from './AgentMetricsView'
import AgentRankingMetricsView from './AgentRankingMetricsView'
import AgentPerformanceMetricsView from './AgentPerformanceMetricsView'
import AgentTresholdMetricsView from './AgentTresholdMetricsView'
import BankAmountBreakdownMetricsView from './BankAmountBreakdownMetricsView'

const MetricsView: React.StatelessComponent<NavigationProps<any>> = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path={props.match.url + "/agents"} component={AgentMetricsView} />
                <Route exact path={props.match.url + "/agents/rankings"} component={AgentRankingMetricsView} />
                <Route exact path={props.match.url + "/agents/performance"} component={AgentPerformanceMetricsView} />
                <Route exact path={props.match.url + "/agents/treshold"} component={AgentTresholdMetricsView} />
                <Route exact path={props.match.url + "/banks/amountbreakdown"} component={BankAmountBreakdownMetricsView} />
                <Route component={NotFound} />
            </Switch>

        </div>
    )
}

export default MetricsView;