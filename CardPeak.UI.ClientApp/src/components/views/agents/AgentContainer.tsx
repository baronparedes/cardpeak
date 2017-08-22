import * as React from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import { bindActionCreators } from 'redux';

import * as AgentsActions from '../../../services/actions/agentActions'
import { RootState } from '../../../services/reducers'
import AgentList from './AgentList'
import SelectedAgent from './SelectedAgent'

interface AgentContainerDispatchProps {
    actions?: typeof AgentsActions
}

class AgentContainer extends React.Component<CardPeak.Models.AgentsModel & AgentContainerDispatchProps, undefined>{
    constructor(props: CardPeak.Models.AgentsModel & AgentContainerDispatchProps) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid no-padding">
                <Panel>
                    <SelectedAgent agent={this.props.selectedAgent} handleOnClick={this.props.actions.getAllAgentsStart} />
                </Panel>
                <Panel className="text-right">
                    <h4>
                        Account Balance
                        <span className="text-muted spacer-left">1000.00</span>
                    </h4>
                    <h4>
                        Savings Incentive
                        <span className="text-muted spacer-left">1000.00</span>
                    </h4>
                </Panel>
                {this.props.loadingAgents ? "Loading..." : <AgentList agents={this.props.agents} />}
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