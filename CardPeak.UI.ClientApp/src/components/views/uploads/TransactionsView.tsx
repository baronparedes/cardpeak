import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavigationProps, NotFound } from '../../layout';
import FindTransactionsView from '../transactions/FindTransactionsView';
import BatchFileConfigurationView from './BatchFileConfigurationView';
import BatchListContainer from './BatchListContainer';
import BatchUploadView from './BatchUploadView';
import ManageUploadsView from './ManageUploadsView';

const TransactionsView: React.StatelessComponent<NavigationProps<
    any
>> = props => {
    return (
        <div>
            <Switch>
                <Route
                    exact
                    path={props.match.url + '/upload'}
                    component={BatchUploadView}
                />
                <Route
                    exact
                    path={props.match.url + '/upload/config'}
                    component={BatchFileConfigurationView}
                />
                <Route
                    exact
                    path={props.match.url + '/batch'}
                    component={ManageUploadsView}
                />
                <Route
                    exact
                    path={props.match.url + '/batch/:id'}
                    component={BatchListContainer}
                />
                <Route
                    exact
                    path={props.match.url + '/history'}
                    component={FindTransactionsView}
                />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default TransactionsView;
