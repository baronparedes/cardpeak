import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound, NavigationProps } from '../../layout'
import TeamDashboardContainer from './TeamDashboardContainer'

const TeamsView: React.StatelessComponent<{ match: any }> = (props) => {
	return (
		<div>
			<Switch>
				<Route exact path={props.match.url} component={TeamDashboardContainer} />
				<Route exact path={props.match.url + "/:id"} component={TeamDashboardContainer} />
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}

export default TeamsView;