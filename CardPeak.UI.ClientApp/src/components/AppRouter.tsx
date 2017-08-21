import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App } from './App'

export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    Main App within Router
                </App>
            </Router>
        );
    }
}