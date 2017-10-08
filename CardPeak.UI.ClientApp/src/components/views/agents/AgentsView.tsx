import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound, NavigationProps } from '../../layout'
import AgentDashboardContainer from './AgentDashboardContainer'
import UpdateAgentView from './UpdateAgentView'
import AddAgentView from './AddAgentView'
import AgentPayoutContainer from './AgentPayoutContainer'

const AgentsView: React.StatelessComponent<NavigationProps<any>> = (props) => {
    return (
        <div>
            <Switch>
                <Route path={props.match.url + "/update"} component={UpdateAgentView} />
                <Route exact path={props.match.url + "/create"} component={AddAgentView} />
                <Route exact path={props.match.url + "/payout"} component={AgentPayoutContainer} />
                <Route exact path={props.match.url} component={AgentDashboardContainer} />
                <Route exact path={props.match.url + "/:id"} component={AgentDashboardContainer} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default AgentsView;