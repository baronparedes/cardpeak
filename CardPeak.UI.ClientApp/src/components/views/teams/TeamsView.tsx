import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '../../layout';
import ManageTeamsView from './ManageTeamsView';
import TeamDashboardContainer from './TeamDashboardContainer';

const TeamsView: React.StatelessComponent<{ match: any }> = props => {
    return (
        <div>
            <Switch>
                <Route
                    exact
                    path={props.match.url}
                    component={TeamDashboardContainer}
                />
                <Route
                    exact
                    path={props.match.url + '/manage'}
                    component={ManageTeamsView}
                />
                <Route
                    exact
                    path={props.match.url + '/:id'}
                    component={TeamDashboardContainer}
                />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default TeamsView;
