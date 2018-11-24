import * as React from 'react'
import { ButtonGroup, Button, Form, FormGroup, Col } from 'react-bootstrap'

import { ModalPanel, FormFieldInput, ErrorLabel } from '../../layout'

interface TeamModalFormProps {
	refreshing?: boolean;
	team?: CardPeak.Entities.Team;
	onSaveTeam?: (
		team: CardPeak.Entities.Team,
		saveCompleteCallback: () => void,
		errorCallback: (error: string) => void
	) => void;
}

interface TeamModalFormState {
	showModal: boolean;
	team?: CardPeak.Entities.Team;
	saveError?: string;
	isSaving?: boolean;
	errors: {
		[error: string]: string,
	};
}

class TeamModalForm extends React.Component<TeamModalFormProps, TeamModalFormState> {
	constructor(props: TeamModalFormProps) {
		super(props);
		this.state = {
			showModal: false,
			team: props.team,
			errors: {
				name: '',
			}
		};
	}
	componentWillReceiveProps(nextProps: TeamModalFormProps) {
		if (this.state.team.teamId != nextProps.team.teamId || nextProps.team.teamId === 0) {
			this.setState({
				team: nextProps.team
			});
		}
	}
	handleOnToggleModal = () => {
		this.setState({
			showModal: !this.state.showModal,
			isSaving: false,
			saveError: undefined
		});
	}
	handleOnSaveError = (error: string) => {
		this.setState({ isSaving: false, saveError: error });
	}
	handleOnSave = () => {
		if (!this.hasErrors() && this.props.onSaveTeam) {
			this.setState({
				isSaving: true,
				saveError: undefined
			}, () => {
				this.props.onSaveTeam(this.state.team, this.handleOnToggleModal, this.handleOnSaveError);
			})
		}
	}
	hasErrors = () => {
		this.handleErrors();
		if (!!this.state.errors.name) {
			return true;
		}
		return false;
	}
	handleErrors = () => {
		let errors = this.state.errors;
		if (this.state.team.name === "") errors.name = "*";
		this.setState({ errors });
		return errors;
	}
	handleFocus = (e: any) => {
		e.target.select();
	}
	handleChange = (e: any) => {
		let errors = this.state.errors;
		errors[e.target.name] = '';
		this.setState({
			team: {
				...this.state.team,
				[e.target.name]: e.target.value,
			},
			errors
		});
	}
	renderActions() {
		return (
			<div>
				<Button disabled={this.state.isSaving} bsStyle="success" onClick={this.handleOnSave}>
					{this.props.team.teamId === 0 ? "create" : "update"}
				</Button>
				<Button disabled={this.state.isSaving} bsStyle="warning" onClick={this.handleOnToggleModal}>
					Close
				</Button>
			</div>
		);
	}
	render() {
		return (
			<ButtonGroup className="hidden-print">
				<Button
					disabled={this.props.refreshing}
					bsStyle="success"
					onClick={this.handleOnToggleModal}>
					<i className="fa fa-plus" />
				</Button>
				<ModalPanel
					footer={this.renderActions()}
					onToggleModal={this.handleOnToggleModal}
					showModal={this.state.showModal}
					title="team details">

					<div className="container-fluid">
						<Form horizontal onSubmit={(e) => { e.preventDefault(); }}>
							<fieldset disabled={this.state.isSaving}>
								<FormGroup>
									<FormFieldInput
										controlId="form-name"
										type="text"
										name="name"
										label="name"
										error={this.state.errors.name}
										value={this.state.team.name}
										isRequired
										onFocus={this.handleFocus}
										onChange={this.handleChange} />
									<FormFieldInput
										controlId="form-description"
										type="text"
										name="description"
										label="description"
										value={this.state.team.description}
										onFocus={this.handleFocus}
										onChange={this.handleChange} />
								</FormGroup>
								<ErrorLabel error={this.state.saveError} />
							</fieldset>
						</Form>
					</div>

				</ModalPanel>
			</ButtonGroup>
		);
	}
}

export default TeamModalForm;