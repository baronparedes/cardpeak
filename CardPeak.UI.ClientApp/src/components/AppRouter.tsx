import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { App } from './App'
import { NotFound } from './layout'

import DashboardView from './views/dashboard/DashboardView'
import MetricsView from './views/metrics/MetricsView'
import AgentsView from './views/agents/AgentsView'
import SettingsView from './views/settings/SettingsView'
import TransactionsView from './views/uploads/TransactionsView'

export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/" component={DashboardView} />
                        <Route path="/metrics" component={MetricsView} />
                        <Route path="/agents" component={AgentsView} />
                        <Route path="/transactions" component={TransactionsView} />
                        <Route path="/settings" component={SettingsView} />
                        <Route component={NotFound} />
                    </Switch>
                </App>
            </Router>
        );
    }
}