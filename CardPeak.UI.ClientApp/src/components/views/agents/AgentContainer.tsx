﻿import * as React from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import { bindActionCreators } from 'redux';

import * as AgentsActions from '../../../services/actions/agentActions'
import { RootState } from '../../../services/reducers'
import AgentListModal from './AgentListModal'
import SelectedAgent from './SelectedAgent'
import AgentDashboard from './AgentDashboard'

interface AgentContainerDispatchProps {
    actions?: typeof AgentsActions
}

interface AgentContainerState {
    showModal: boolean;
}

class AgentContainer extends React.Component<CardPeak.Models.AgentsModel & AgentContainerDispatchProps, AgentContainerState>{
    constructor(props: CardPeak.Models.AgentsModel & AgentContainerDispatchProps) {
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
    handleSelectedAgentOnClick = () => {
        this.handleToggleModal();
        this.props.actions.getAllAgentsStart();
    }
    onAgentSelected = (agent: CardPeak.Types.Agent) => {
        this.handleToggleModal();
        this.props.actions.selectAgent(agent);
    }
    render() {
        return (
            <div className="container-fluid no-padding">
                <Panel>
                    <SelectedAgent agent={this.props.selectedAgent} handleOnClick={this.handleSelectedAgentOnClick} />
                    <AgentListModal
                        showModal={this.state.showModal}
                        agents={this.props.agents}
                        onToggleModal={this.handleToggleModal}
                        onAgentSelected={this.onAgentSelected} />
                </Panel>
                <div>
                    {this.props.selectedAgent ? <AgentDashboard /> : null}
                </div>
                <div>
                    No Transactions
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState):CardPeak.Models.AgentsModel  => ({
    selectedAgent: state.agents.selectedAgent,
    agents: state.agents.agents
});

const mapDispatchToProps = (dispatch: any): AgentContainerDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentContainer);