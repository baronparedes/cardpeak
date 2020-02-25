import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavigationProps } from '../../layout';
import AgentContainer from './AgentContainer';

const UpdateAgentView: React.StatelessComponent<NavigationProps<
    any
>> = props => {
    return (
        <div>
            <h2>Update Agent Details</h2>
            <Switch>
                <Route
                    exact
                    path={props.match.url + '/:id'}
                    component={AgentContainer}
                />
                <Route component={AgentContainer} />
            </Switch>
        </div>
    );
};

export default UpdateAgentView;
