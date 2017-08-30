import * as React from 'react'
import { Route } from 'react-router-dom'
import AgentDashboardContainer from './AgentDashboardContainer'
import UpdateAgentView from './UpdateAgentView'
import AddAgentView from './AddAgentView'

const AgentsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Route exact path={props.match.url} component={AgentDashboardContainer} />
            <Route path={props.match.url + "/update"} component={UpdateAgentView} />
            <Route path={props.match.url + "/create"} component={AddAgentView} />
        </div>
    )
}

export default AgentsView;