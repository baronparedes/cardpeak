import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'
import { Row, Col, Grid } from 'react-bootstrap'

import { Button, ButtonGroup } from 'react-bootstrap'
import { ModalPanel } from '../../layout'
import SelectAgentList from './SelectAgentList'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

interface SelectAgentContainerPropsConnect {
	agents?: CardPeak.Entities.Agent[];
	isLoading?: boolean;
}

interface SelectAgentContainerProps {
	onAgentSelected?: (agent: CardPeak.Entities.Agent) => void;
	bsStyle?: string;
	bsSize?: ReactBootstrap.Sizes;
	buttonLabel?: React.ReactNode;
	disabled?: boolean;
}

interface SelectAgentContainerDispatchProps {
	actions?: typeof AgentsActions;
}

class SelectAgentContainer extends React.Component<SelectAgentContainerProps & SelectAgentContainerPropsConnect & SelectAgentContainerDispatchProps, { showModal: boolean }> {
	constructor(props: SelectAgentContainerProps & SelectAgentContainerPropsConnect & SelectAgentContainerDispatchProps) {
		super(props);
		this.state = { showModal: false };
	}
	handleOnSelectAgent = () => {
		this.props.actions.getAllAgentsStart();
		this.handleOnToggleModal();
	}
	handleOnToggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	}
	handleOnAgentSelected = (agent: CardPeak.Entities.Agent) => {
		this.handleOnToggleModal();
		if (this.props.onAgentSelected) {
			this.props.onAgentSelected(agent);
		}
	}
	render() {
		return (
			<ButtonGroup className="hidden-print">
				<Button
					disabled={this.props.disabled}
					bsStyle={this.props.bsStyle}
					bsSize={this.props.bsSize}
					onClick={this.handleOnSelectAgent}>
					{this.props.buttonLabel}
				</Button>
				<ModalPanel
					onToggleModal={this.handleOnToggleModal}
					showModal={this.state.showModal}
					title="select agent">
					<SelectAgentList
						data={this.props.agents}
						onAgentSelected={this.handleOnAgentSelected}
						isLoading={this.props.isLoading} />
				</ModalPanel>
			</ButtonGroup>
		);
	}
}

const mapStateToProps = (state: RootState): SelectAgentContainerPropsConnect => ({
	agents: state.agentModel.agents,
	isLoading: state.agentModel.loadingAgents
});

const mapDispatchToProps = (dispatch: any): SelectAgentContainerDispatchProps => {
	return {
		actions: bindActionCreators(AgentsActions as any, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAgentContainer);