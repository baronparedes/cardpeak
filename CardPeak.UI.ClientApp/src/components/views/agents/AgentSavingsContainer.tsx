import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AgentsActions from '../../../services/actions/agentActions';
import { RootState } from '../../../services/reducers';
import { NavigationProps } from '../../layout';
import AgentSavingsView from './AgentSavingsView';
import SelectAgent from './SelectAgent';

interface AgentSavingsContainerProps {
    selectedAgent?: CardPeak.Entities.Agent;
    selectedAgentSavings?: CardPeak.Entities.AgentSavings;
    loadingAgentSavings?: boolean;
    refreshingAgentSavings?: boolean;
}

interface AgentSavingsContainerDispatchProps {
    actions?: typeof AgentsActions;
}

interface AgentSavingsContainerState {
    selectedYear?: number;
}

type Props = AgentSavingsContainerProps &
    AgentSavingsContainerDispatchProps &
    NavigationProps<any>;

class AgentSavingsContainer extends React.Component<Props, {}> {
    state = {
        selectedYear: new Date().getFullYear()
    };
    componentDidMount() {
        if (this.props.match.params.id) {
            if (this.props.selectedAgent) {
                if (
                    this.props.selectedAgent.agentId ==
                    this.props.match.params.id
                ) {
                    if (!this.props.selectedAgentSavings) {
                        this.props.actions.selectAgentSavingsStart();
                    }
                    return;
                }
            }
            this.props.actions.selectAgentById(
                parseInt(this.props.match.params.id),
                (agent: CardPeak.Entities.Agent) => {
                    this.props.actions.selectAgent(agent);
                    this.props.actions.selectAgentSavingsStart();
                },
                () => {
                    this.props.history.push('/404');
                }
            );
            return;
        }

        if (this.props.selectedAgent) {
            if (!this.props.selectedAgentSavings) {
                this.props.actions.selectAgentSavingsStart();
            }
            this.props.history.push(
                '/agents/savings/' + this.props.selectedAgent.agentId
            );
        }
    }
    handleOnAgentSelected = (agent: CardPeak.Entities.Agent) => {
        if (this.props.history) {
            this.props.history.push('/agents/savings/' + agent.agentId);
        }
        this.props.actions.selectAgent(agent);
        this.props.actions.selectAgentSavingsStart();
    };
    handleOnYearSelect = (year: number) => {
        this.setState(
            {
                selectedYear: year
            },
            () => {
                this.props.actions.getAgentSavingsStart(
                    this.props.selectedAgent.agentId,
                    year
                );
            }
        );
    };
    render() {
        return (
            <div>
                <h2>Manage Savings</h2>
                <div className="container-fluid no-padding">
                    <Panel>
                        <SelectAgent
                            onAgentSelected={this.handleOnAgentSelected}
                            agent={this.props.selectedAgent}
                        />
                    </Panel>
                    <AgentSavingsView
                        {...this.props}
                        onYearSelect={this.handleOnYearSelect}
                        selectedYear={this.state.selectedYear}
                        agent={this.props.selectedAgent}
                        agentSavings={this.props.selectedAgentSavings}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (
    state: RootState
): CardPeak.Models.AgentModel => ({
    selectedAgent: state.agentModel.selectedAgent,
    selectedAgentSavings: state.agentModel.selectedAgentSavings,
    loadingAgentSavings: state.agentModel.loadingAgentSavings,
    refreshingAgentSavings: state.agentModel.refreshingAgentSavings
});

const mapDispatchToProps = (
    dispatch: any
): AgentSavingsContainerDispatchProps => {
    return {
        actions: bindActionCreators(AgentsActions as any, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentSavingsContainer);
