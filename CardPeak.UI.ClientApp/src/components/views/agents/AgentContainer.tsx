import * as React from 'react'
import * as AgentsActions from '../../../services/actions/agentActions'
import { connect } from 'react-redux'
import { Panel, Button } from 'react-bootstrap'
import { RootState } from '../../../services/reducers'

import AgentList from './AgentList'

interface AgentContainerProps {
    selectedAgent?: CardPeak.Types.Agent;
}

const SelectedAgent = (props: { agent: CardPeak.Types.Agent }) => {
    if (!!!props.agent) {
        return (
            <div>
                <span className="text-muted spacer-right">Select an Agent</span>
                <Button>
                    <i className="fa fa-sm fa-users"></i>
                </Button>    
            </div>
        );
    }
    return (
        <h5 className="spacer-right">
            <span className="spacer-right">
                {props.agent.firstName + " " + props.agent.lastName}    
            </span>
            <Button>
                <i className="fa fa-sm fa-users"></i>
            </Button>
        </h5>
    );
}

class AgentContainer extends React.Component<AgentContainerProps, undefined>{
    constructor(props: AgentContainerProps) {
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

const mapStateToProps = (state: RootState):AgentContainerProps  => ({
    selectedAgent: state.agents.selectedAgent
});

export default connect(mapStateToProps)(AgentContainer);