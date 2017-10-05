import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound } from '../../layout'
import BatchUploadView from './BatchUploadView'
import BatchFileConfigurationView from './BatchFileConfigurationView'
import ManageUploadsView from './ManageUploadsView'

const SettingsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Switch>
                <Route exact path={props.match.url} component={BatchUploadView} />
                <Route path={props.match.url + "/config"} component={BatchFileConfigurationView} />
                <Route path={props.match.url + "/manage"} component={ManageUploadsView} />
                <Route component={NotFound} />
            </Switch>

        </div>
    )
}

export default SettingsView;