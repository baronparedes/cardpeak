import * as React from 'react'
import { Route } from 'react-router-dom'
import BatchUploadView from './BatchUploadView'
import BatchFileConfigurationView from './BatchFileConfigurationView'

const SettingsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Route path={props.match.url + "/batch"} component={BatchUploadView} />
            <Route path={props.match.url + "/config"} component={BatchFileConfigurationView} />
        </div>
    )
}

export default SettingsView;