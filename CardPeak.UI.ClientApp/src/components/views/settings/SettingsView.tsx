import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound, NavigationProps } from '../../layout'
import DefaultRatesContainer from './DefaultRatesContainer'
import ReferencesView from './ReferencesView'

const SettingsView: React.StatelessComponent<NavigationProps<any>> = (props) => {
	return (
		<div>
			<Switch>
				<Route exact path={props.match.url} component={ReferencesView} />
				<Route path={props.match.url + "/rates"} component={DefaultRatesContainer} />
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}

export default SettingsView;