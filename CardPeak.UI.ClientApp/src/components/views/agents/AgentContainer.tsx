import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import { RootState } from '../../../services/reducers'

import AgentList from './AgentList'
import SelectedAgent from './SelectedAgent'



class AgentContainer extends React.Component<CardPeak.Models.AgentsModel, undefined>{
    constructor(props: CardPeak.Models.AgentsModel) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid no-padding">
                <Panel>
                    <SelectedAgent agent={this.props.selectedAgent} />
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
                <AgentList />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState):CardPeak.Models.AgentsModel  => ({
    selectedAgent: state.agents.selectedAgent,
    agents: state.agents.agents
});

export default connect(mapStateToProps)(AgentContainer);