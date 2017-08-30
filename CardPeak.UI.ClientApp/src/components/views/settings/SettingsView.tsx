import * as React from 'react'
import { Route } from 'react-router-dom'
import DefaultRatesView from './DefaultRatesView'
import ReferencesView from './ReferencesView'

const SettingsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Route path={props.match.url + "/references"} component={ReferencesView} />
            <Route path={props.match.url + "/rates"} component={DefaultRatesView} />
        </div>
    )
}

export default SettingsView;