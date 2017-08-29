import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App } from './App'

import AgentsView from './views/agents/AgentView'
import DashboardView from './views/dashboard/DashboardView'

export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route exact path="/" component={DashboardView} />
                    <Route path="/agents" component={AgentsView}>
                    </Route>
                </App>
            </Router>
        );
    }
}