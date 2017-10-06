import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound } from '../../layout'
import BatchUploadView from './BatchUploadView'
import BatchFileConfigurationView from './BatchFileConfigurationView'
import ManageUploadsView from './ManageUploadsView'
import BatchListContainer from './BatchListContainer'
import FindTransactionsView from '../transactions/FindTransactionsView'

const TransactionsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path={props.match.url + "/upload"} component={BatchUploadView} />
                <Route exact path={props.match.url + "/upload/config"} component={BatchFileConfigurationView} />
                <Route exact path={props.match.url + "/batch"} component={ManageUploadsView} />
                <Route exact path={props.match.url + "/batch/:id"} component={BatchListContainer} />
                <Route exact path={props.match.url + "/history"} component={FindTransactionsView} />
                <Route component={NotFound} />
            </Switch>

        </div>
    )
}

export default TransactionsView;