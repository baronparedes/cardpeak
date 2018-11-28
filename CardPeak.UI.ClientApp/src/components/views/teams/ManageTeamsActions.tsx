import * as React from 'react'
import { Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import { ButtonLoadingText } from '../../layout'

import TeamModalForm from './TeamModalForm'

const newTeam: CardPeak.Entities.Team = {
	teamId: 0,
	name: '',
	description: ''
};

interface ManageTeamsActionsProps {
	refreshing: boolean;
	teams: CardPeak.Entities.Team[];
	onRefresh: () => void;
	onSaveTeam?: (
		team: CardPeak.Entities.Team,
		saveCompleteCallback: () => void,
		errorCallback: (error: string) => void
	) => void;
}

class ManageTeamsActions extends React.Component<ManageTeamsActionsProps, {}> {
	constructor(props: ManageTeamsActionsProps) {
		super(props);
	}
	render() {
		return (
			<div>
				<Grid fluid>
					<Row>
						<Col md={12} className="text-right">
							<ButtonGroup disabled={this.props.refreshing}>
								<Button
									onClick={this.props.onRefresh}
									bsStyle="primary"
									disabled={this.props.refreshing}>
									<ButtonLoadingText isLoading={this.props.refreshing} label="refresh" />
								</Button>
								<TeamModalForm bsStyle="success" buttonLabel={<i className="fa fa-plus" />}
									refreshing={this.props.refreshing} team={newTeam} onSaveTeam={this.props.onSaveTeam} />
							</ButtonGroup>
						</Col >
					</Row>
				</Grid>
			</div>
		)
	}
}

export default ManageTeamsActions;