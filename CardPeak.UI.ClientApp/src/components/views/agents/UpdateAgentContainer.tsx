import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'
import { SpinnerBlock } from '../../layout'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Panel, Grid, Row, Col } from 'react-bootstrap'

import SelectedAgent from './SelectedAgent'
import AgentListModal from './AgentListModal'
import AgentForm from './AgentForm'

interface UpdateAgentContainerProps {
    agents?: CardPeak.Entities.Agent[],
    loadingAgents?: boolean
}

interface UpdateAgentContainerDispatchProps {
    actions?: typeof AgentsActions
}

interface UpdateAgentContainerState {
    selectedAgent?: CardPeak.Entities.Agent;
    showModal?: boolean
}

class UpdateAgentContainer extends
    React.Component<UpdateAgentContainerProps & UpdateAgentContainerDispatchProps, UpdateAgentContainerState> {
    constructor(props: UpdateAgentContainerProps & UpdateAgentContainerDispatchProps) {
        super(props);
        this.state = {
            selectedAgent: undefined
        }
    }
    handleToggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }
    handleOnSelectedAgentClick = () => {
        this.handleToggleModal();
        this.props.actions.getAllAgentsStart();
    }
    handleOnAgentSelected = (agent: CardPeak.Entities.Agent) => {
        this.handleToggleModal();
        this.setState({ selectedAgent: agent });
    }
    renderDetails() {
        if (this.state.selectedAgent) {
            return (
                <Panel>
                    <AgentForm agent={this.state.selectedAgent} isSaving={false} />
                </Panel>
            )
        }

        return null;
    }
    render() {
        return (
            <div className="container-fluid no-padding">
                <Panel>
                    <SelectedAgent
                        agent={this.state.selectedAgent}
                        onAgentSelectedClick={this.handleOnSelectedAgentClick} />
                    <AgentListModal
                        showModal={this.state.showModal}
                        agents={this.props.agents}
                        onToggleModal={this.handleToggleModal}
                        onAgentSelected={this.handleOnAgentSelected}
                        isLoading={this.props.loadingAgents} />
                </Panel>
                {this.renderDetails()}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): UpdateAgentContainerProps => ({
    agents: state.agentDashboardModel.agents,
    loadingAgents: state.agentDashboardModel.loadingAgents
});

const mapDispatchToProps = (dispatch: any): UpdateAgentContainerDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAgentContainer);