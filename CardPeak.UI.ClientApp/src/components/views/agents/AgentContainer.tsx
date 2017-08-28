import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'
import { SpinnerBlock, RadioGroup } from '../../layout'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Panel, Grid, Row, Col } from 'react-bootstrap'

import SelectedAgent from './SelectedAgent'
import AgentListModal from './AgentListModal'
import AgentForm from './AgentForm'

interface AgentContainerProps {
    isNew: boolean;
}

interface AgentContainerPropsConnect {
    agents?: CardPeak.Entities.Agent[];
    loadingAgents?: boolean;
    savingAgent?: boolean;
}

interface AgentContainerDispatchProps {
    actions?: typeof AgentsActions;
}

interface AgentContainerState {
    selectedAgent?: CardPeak.Entities.Agent;
    showModal?: boolean;
    showWindow?: string;
}

class AgentContainer extends
    React.Component<AgentContainerProps & AgentContainerPropsConnect & AgentContainerDispatchProps, AgentContainerState> {
    constructor(props: AgentContainerProps & AgentContainerPropsConnect & AgentContainerDispatchProps) {
        super(props);
        let defaultAgent: CardPeak.Entities.Agent;
        defaultAgent = props.isNew ? new CardPeak.Entities.Agent() : undefined;
        this.state = {
            selectedAgent: defaultAgent,
            showWindow: 'details'
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
    handleOnWindowChange = (e: any) => {
        this.setState({ showWindow: e.target.value });
    }
    handleOnSaveAgent = (agent: CardPeak.Entities.Agent, errorCallback: (e: string) => void) => {
        if (this.props.isNew) {
            this.props.actions.postAgentStart(agent, () => {
                this.setState({ selectedAgent: agent });
            }, errorCallback);
        }
        else {
            this.props.actions.putAgentStart(agent, () => {
                this.setState({ selectedAgent: agent });
            }, errorCallback);
        }
        
    }
    renderActions() {
        if (this.state.selectedAgent) {
            return (
                <Grid fluid className="text-right spacer-bottom">
                    <RadioGroup
                        name="update-options"
                        value={this.state.showWindow}
                        options={[
                            ['details', 'Details'],
                            ['rates', 'Rates']
                        ]}
                        onChange={this.handleOnWindowChange} />
                </Grid>
            )
        }

        return null;
    }
    renderDetails() {
        if (this.state.selectedAgent) {
            return (
                <Panel hidden={this.state.showWindow !== 'details'}>
                    <AgentForm
                        agent={this.state.selectedAgent}
                        isSaving={this.props.savingAgent}
                        onSave={this.handleOnSaveAgent} />
                </Panel>
            )
        }

        return null;
    }
    renderRates() {
        if (this.state.selectedAgent) {
            return (
                <Panel hidden={this.state.showWindow !== 'rates'}>
                    Rates
                </Panel>
            )
        }

        return null;
    }
    renderSelectAgent() {
        if (!this.props.isNew) {
            return (
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
            )
        }

        return null;
    }
    render() {
        return (
            <div className="container-fluid no-padding">
                {this.renderSelectAgent()}
                {this.renderActions()}
                {this.renderDetails()}
                {this.renderRates()}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): AgentContainerPropsConnect => ({
    agents: state.agentDashboardModel.agents,
    loadingAgents: state.agentDashboardModel.loadingAgents,
    savingAgent: state.agentDashboardModel.puttingAgent
});

const mapDispatchToProps = (dispatch: any): AgentContainerDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentContainer);