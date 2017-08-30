import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App } from './App'

import AgentsView from './views/agents/AgentsView'
import DashboardView from './views/dashboard/DashboardView'
import SettingsView from './views/settings/SettingsView'

export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route exact path="/" component={DashboardView} />
                    <Route path="/agents" component={AgentsView} />
                    <Route path="/settings" component={SettingsView} />
                </App>
            </Router>
        );
    }
}