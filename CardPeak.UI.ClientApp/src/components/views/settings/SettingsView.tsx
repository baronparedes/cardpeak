import * as React from 'react'
import { Route } from 'react-router-dom'
import DefaultRatesView from './DefaultRatesView'

const SettingsView: React.StatelessComponent<{ match: any }> = (props) => {
    return (
        <div>
            <Route exact path={props.match.url} component={DefaultRatesView} />
            <Route path={props.match.url + "/rates"} component={DefaultRatesView} />
        </div>
    )
}

export default SettingsView;