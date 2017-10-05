import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound } from '../../layout'

import AgentMetricsView from './AgentMetricsView'

const MetricsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path={props.match.url + "/agents"} component={AgentMetricsView} />
                <Route component={NotFound} />
            </Switch>

        </div>
    )
}

export default MetricsView;