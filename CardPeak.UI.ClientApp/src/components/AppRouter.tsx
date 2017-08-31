import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App } from './App'

import DashboardView from './views/dashboard/DashboardView'
import TransactionsView from './views/transactions/TransactionsView'
import AgentsView from './views/agents/AgentsView'
import SettingsView from './views/settings/SettingsView'
import UploadsView from './views/uploads/UploadsView'

export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route exact path="/" component={DashboardView} />
                    <Route exact path="/transactions" component={TransactionsView} />
                    <Route path="/agents" component={AgentsView} />
                    <Route path="/uploads" component={UploadsView} />
                    <Route path="/settings" component={SettingsView} />
                </App>
            </Router>
        );
    }
}