import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Panel } from 'react-bootstrap'

import SelectAgent from './SelectAgent'
import AgentDashboardView from './agentDashboard/AgentDashboardView'

import { NavigationProps } from '../../layout'

interface AgentDashboardContainerDispatchProps {
    actions?: typeof AgentsActions
}

class AgentDashboardContainer extends React.Component<CardPeak.Models.AgentModel & AgentDashboardContainerDispatchProps & NavigationProps<any>, {}>{
    constructor(props: CardPeak.Models.AgentModel & AgentDashboardContainerDispatchProps & NavigationProps<any>) {
        super(props);
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            if (this.props.selectedAgent) {
                if (this.props.selectedAgent.agentId == this.props.match.params.id) {
                    if (!this.props.selectedAgentDashboard) {
                        this.props.actions.selectAgentDashboardStart();
                    }
                    return;
                }
            }
            this.props.actions.selectAgentById(parseInt(this.props.match.params.id), (agent: CardPeak.Entities.Agent) => {
                this.props.actions.selectAgent(agent);
                this.props.actions.selectAgentDashboardStart();
            }, () => {
                this.props.history.push("/404");
            });
            return;
        }

        if (this.props.selectedAgent) {
            if (!this.props.selectedAgentDashboard) {
                this.props.actions.selectAgentDashboardStart();
            }
            this.props.history.push("/agents/" + this.props.selectedAgent.agentId);
        }
    }
    handleOnAgentSelected = (agent: CardPeak.Entities.Agent) => {
        if (this.props.history) {
            this.props.history.push("/agents/" + agent.agentId);
        }
        this.props.actions.selectAgent(agent);
        this.props.actions.selectAgentDashboardStart();
    }
    render() {
        return (
            <div>
                <h2>Agent Dashboard</h2>
                <div className="container-fluid no-padding">
                    <Panel>
                        <SelectAgent
                            agent={this.props.selectedAgent}
                            onAgentSelected={this.handleOnAgentSelected} />
                    </Panel>
                    <AgentDashboardView
                        agentDashboard={this.props.selectedAgentDashboard}
                        onRefresh={this.props.actions.refreshAgentDashboardStart}
                        onSetDateFilters={this.props.actions.setDateFilters}
                        refreshingAgentDashboard={this.props.refreshingAgentDashboard}
                        loadingAgentDashboard={this.props.loadingAgentDashboard} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.AgentModel  => ({
    selectedAgent: state.agentModel.selectedAgent,
    selectedAgentDashboard: state.agentModel.selectedAgentDashboard,
    loadingAgentDashboard: state.agentModel.loadingAgentDashboard,
    refreshingAgentDashboard: state.agentModel.refreshingAgentDashboard
});

const mapDispatchToProps = (dispatch: any): AgentDashboardContainerDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentDashboardContainer);