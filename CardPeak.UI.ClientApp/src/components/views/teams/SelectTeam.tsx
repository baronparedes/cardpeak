import * as React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { ModalPanel } from '../../layout'
import SelectTeamList from './SelectTeamList'

interface SelectTeamProps {
	team: CardPeak.Entities.Team;
	teams: CardPeak.Entities.Team[];
	onSelectTeam?: () => void;
	onTeamSelected: (team: CardPeak.Entities.Team) => void;
	isLoading?: boolean;
}

export default class SelectTeam extends React.Component<SelectTeamProps, { showModal: boolean }> {
	constructor(props: SelectTeamProps) {
		super(props);
		this.state = { showModal: false };
	}
	handleOnTeamSelected = (team: CardPeak.Entities.Team) => {
		if (this.props.onTeamSelected) {
			this.props.onTeamSelected(team);
		}
		this.handleOnToggleModal();
	}
	handleOnSelectTeam = () => {
		if (this.props.onSelectTeam) {
			this.props.onSelectTeam();
		}
		this.handleOnToggleModal();
	}
	handleOnToggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	}
	renderModalButton() {
		return (
			<ButtonGroup className="hidden-print">
				<Button bsStyle="primary" onClick={this.handleOnSelectTeam}>
					<i className="fa fa-sm fa-users"></i>
				</Button>
				<ModalPanel
					onToggleModal={this.handleOnToggleModal}
					showModal={this.state.showModal}
					title="select team">
					<SelectTeamList
						data={this.props.teams}
						onTeamSelected={this.handleOnTeamSelected}
						isLoading={this.props.isLoading} />
				</ModalPanel>
			</ButtonGroup>
		)
	}
	render() {
		if (!!!this.props.team) {
			return (
				<div>
					<label className="text-muted spacer-right text-highlight">select a team</label>
					{this.renderModalButton()}
				</div>
			);
		}
		return (
			<div>
				<h5 className="spacer-right">
					<span className="spacer-right text-highlight">
						{this.props.team.name}
					</span>
					{this.renderModalButton()}
				</h5>
				<label className="text-muted spacer-right">
					{this.props.team.description}
				</label>
			</div>
		);
	}
}
