import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App } from './App'

import AgentsView from './views/agents/AgentView'
import UpdateAgentView from './views/agents/UpdateAgentView'
import AddAgentView from './views/agents/AddAgentView'

import DashboardView from './views/dashboard/DashboardView'

export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route exact path="/" component={DashboardView} />
                    <Route exact path="/agents" component={AgentsView} />
                    <Route exact path="/agents/update" component={UpdateAgentView} />
                    <Route exact path="/agents/add" component={AddAgentView} />
                </App>
            </Router>
        );
    }
}