import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Panel } from 'react-bootstrap'

import AgentListModal from './AgentListModal'
import SelectedAgent from './SelectedAgent'
import AgentDashboardView from './AgentDashboardView'

interface AgentContainerDispatchProps {
    actions?: typeof AgentsActions
}

interface AgentContainerState {
    showModal: boolean;
}

class AgentContainer extends React.Component<CardPeak.Models.AgentDashboardModel & AgentContainerDispatchProps, AgentContainerState>{
    constructor(props: CardPeak.Models.AgentDashboardModel & AgentContainerDispatchProps) {
        super(props);
        this.state = {
            showModal: false
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
        this.props.actions.selectAgent(agent);
        this.props.actions.selectAgentDashboardStart();;
    }
    render() {
        return (
            <div className="container-fluid no-padding">
                <Panel>
                    <SelectedAgent
                        agent={this.props.selectedAgent}
                        onAgentSelectedClick={this.handleOnSelectedAgentClick} />
                    <AgentListModal
                        showModal={this.state.showModal}
                        agents={this.props.agents}
                        onToggleModal={this.handleToggleModal}
                        onAgentSelected={this.handleOnAgentSelected}
                        isLoading={this.props.loadingAgents} />
                </Panel>
                <AgentDashboardView
                    agentDashboard={this.props.selectedAgentDashboard}
                    onRefresh={this.props.actions.refreshAgentDashboardStart}
                    refreshingAgentDashboard={this.props.refreshingAgentDashboard}
                    loadingAgentDashboard={this.props.loadingAgentDashboard} />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.AgentDashboardModel  => ({
    selectedAgent: state.agentDashboardModel.selectedAgent,
    selectedAgentDashboard: state.agentDashboardModel.selectedAgentDashboard,
    agents: state.agentDashboardModel.agents,
    loadingAgents: state.agentDashboardModel.loadingAgents,
    loadingAgentDashboard: state.agentDashboardModel.loadingAgentDashboard,
    refreshingAgentDashboard: state.agentDashboardModel.refreshingAgentDashboard
});

const mapDispatchToProps = (dispatch: any): AgentContainerDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentContainer);