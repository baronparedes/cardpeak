import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound } from '../../layout'

import AgentMetricsView from './AgentMetricsView'
import FindTransactionsView from './FindTransactionsView'

const MetricsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path={props.match.url + "/agents"} component={AgentMetricsView} />
                <Route exact path={props.match.url + "/history"} component={FindTransactionsView} />
                <Route component={NotFound} />
            </Switch>

        </div>
    )
}

export default MetricsView;