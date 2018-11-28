﻿import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'
import * as dateHelper from '../../../helpers/dateHelpers'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { SpinnerBlock, RadioGroup, AgentDashboardLinkButton, NavigationProps, ConfirmButton } from '../../layout'

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
    componentDidMount() {
        if (!this.props.isNew) {
            if (this.props.match.params.id) {
                this.props.actions.selectAgentById(parseInt(this.props.match.params.id), (agent: CardPeak.Entities.Agent) => {
                    this.handleOnAgentSelected(agent);
                }, () => {
                    this.props.history.push("/404");
                });
            }
        }
    }
    handleOnAgentSelected = (agent: CardPeak.Entities.Agent) => {
        if (this.props.history) {
            this.props.history.push("/agents/update/" + agent.agentId);
        }
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
            this.props.actions.createAgentStart(agent, () => {
                this.setState({ selectedAgent: agent });
            }, errorCallback);
        }
        else {
            this.props.actions.updateAgentStart(agent, () => {
                this.setState({ selectedAgent: agent });
            }, errorCallback);
        }

    }
    handleOnDeactivateAgent = () => {
        this.props.actions.deactivateAgent(this.state.selectedAgent.agentId, () => {
            this.setState({ selectedAgent: undefined }, () => {
                this.props.history.push("/agents/update")
            });
        });
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
                    <span className="spacer-left-sm"></span>
                    <ConfirmButton
                        confirmTitle="Deactive Agent"
                        confirmMessage="Do you wish to continue?"
                        buttonLabel={
                            <i className="fa fa-trash-o"></i>
                        }
                        bsStyle="danger"
                        onConfirm={this.handleOnDeactivateAgent} />
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
                    <RatesContainer selectedAgentId={this.state.selectedAgent.agentId} applyDefaults />
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
                        onAgentSelected={this.handleOnAgentSelected} />
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
    updatingAgent: state.agentModel.updatingAgent,
    creatingAgent: state.agentModel.creatingAgent
});

const mapDispatchToProps = (dispatch: any): AgentContainerDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentContainer);