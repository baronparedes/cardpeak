import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { SpinnerBlock, RadioGroup, AgentDashboardLinkButton, NavigationProps } from '../../layout'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import RatesContainer from '../settings/RatesContainer'
import SelectAgent from './SelectAgent'
import AgentForm from './AgentForm'

interface AgentContainerProps {
    isNew: boolean;
}

interface AgentContainerPropsConnect {
    agents?: CardPeak.Entities.Agent[];
    loadingAgents?: boolean;
    updatingAgent?: boolean;
    creatingAgent?: boolean;
}

interface AgentContainerDispatchProps {
    actions?: typeof AgentsActions;
}

interface AgentContainerState {
    selectedAgent?: CardPeak.Entities.Agent;
    currentTab?: AgentTab;
    emptyAgent: CardPeak.Entities.Agent;
}

const emptyAgent: CardPeak.Entities.Agent = {
    agentId: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "M",
    email: "",
    birthDate: new Date(),
    accounts: []
};

class AgentContainer extends
    React.Component<AgentContainerProps & AgentContainerPropsConnect & AgentContainerDispatchProps & NavigationProps<any>, AgentContainerState> {
    constructor(props: AgentContainerProps & AgentContainerPropsConnect & AgentContainerDispatchProps & NavigationProps<any>) {
        super(props);
        this.state = {
            ...this.state,
            currentTab: "details",
            selectedAgent: props.isNew ? emptyAgent : undefined,
            emptyAgent: emptyAgent
        }
    }
    handleOnSelectAgent = () => {
        this.props.actions.getAllAgentsStart();
    }
    handleOnAgentSelected = (agent: CardPeak.Entities.Agent) => {
        this.props.actions.getAccounts(agent.agentId, (data: CardPeak.Entities.Account[]) => {
            agent.accounts = data;
            this.setState({ selectedAgent: agent });
        });
    }
    handleOnTabChange = (e: any) => {
        this.setState({ currentTab: e.target.value });
    }
    handleOnSaveAgent = (agent: CardPeak.Entities.Agent, errorCallback: (e: string) => void) => {
        if (this.props.isNew) {
            this.props.actions.postAgentStart(agent, () => {
                this.setState({
                    selectedAgent: {
                        ...this.state.selectedAgent,
                        ...this.state.emptyAgent
                    }
                });
                    
            }, errorCallback);
        }
        else {
            this.props.actions.putAgentStart(agent, () => {
                this.setState({ selectedAgent: agent });
            }, errorCallback);
        }
        
    }
    renderActions() {
        if (this.state.selectedAgent && !this.props.isNew) {
            return (
                <Grid fluid className="text-right spacer-bottom">
                    <RadioGroup
                        className="spacer-right-sm"
                        name="update-options"
                        value={this.state.currentTab}
                        options={[
                            ["details", "Details"],
                            ["rates", "Rates"]
                        ]}
                        onChange={this.handleOnTabChange} />
                    <AgentDashboardLinkButton id={this.state.selectedAgent.agentId} />
                </Grid>
            )
        }

        return null;
    }
    renderDetails() {
        if (this.state.selectedAgent) {
            return (
                <Panel hidden={this.state.currentTab !== "details"}>
                    <AgentForm
                        agent={this.state.selectedAgent}
                        isSaving={this.props.updatingAgent || this.props.creatingAgent}
                        onSave={this.handleOnSaveAgent} />
                </Panel>
            )
        }

        return null;
    }
    renderRates() {
        if (this.state.selectedAgent && !this.props.isNew) {
            return (
                <Panel hidden={this.state.currentTab !== "rates"}>
                    <RatesContainer selectedAgentId={this.state.selectedAgent.agentId} />
                </Panel>
            )
        }

        return null;
    }
    renderSelectAgent() {
        if (!this.props.isNew) {
            return (
                <Panel>
                    <SelectAgent
                        agent={this.state.selectedAgent}
                        agents={this.props.agents}
                        isLoading={this.props.loadingAgents}
                        onAgentSelected={this.handleOnAgentSelected}
                        onSelectAgent={this.handleOnSelectAgent} />
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
                {this.renderRates()}
                {this.renderDetails()}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): AgentContainerPropsConnect => ({
    agents: state.agentModel.agents,
    loadingAgents: state.agentModel.loadingAgents,
    updatingAgent: state.agentModel.updatingAgent,
    creatingAgent: state.agentModel.creatingAgent
});

const mapDispatchToProps = (dispatch: any): AgentContainerDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentContainer);