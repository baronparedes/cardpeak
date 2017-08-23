import * as React from 'react'
import { Panel } from 'react-bootstrap'
import AgentRowLayout from './AgentRowLayout'

interface AgentDetailProps {
    agent: CardPeak.Types.Agent;
    handleOnSelectAgent: (agent: CardPeak.Types.Agent) => void;
}

const AgentDetail: React.StatelessComponent<AgentDetailProps> = (props) => {
    return (
    <Panel className="panel-row">
        <AgentRowLayout 
                agent={props.agent}
                handleOnSelectAgent={props.handleOnSelectAgent}
            isHeader={false} />
    </Panel>
    )
}

export default AgentDetail;