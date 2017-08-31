import * as React from 'react'
import { Route } from 'react-router-dom'
import BatchUploadView from './BatchUploadView'

const SettingsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Route path={props.match.url + "/batch"} component={BatchUploadView} />
        </div>
    )
}

export default SettingsView;