import * as React from 'react'
import { Panel } from 'react-bootstrap'
import AgentDetailRowLayout from './AgentDetailRowLayout'

interface AgentDetailProps {
    agent: CardPeak.Entities.Agent;
    onSelectAgent: (agent: CardPeak.Entities.Agent) => void;
}

const AgentDetail = (props: AgentDetailProps) => {
    return (
        <Panel className="panel-row">
            <AgentDetailRowLayout 
                    agent={props.agent}
                    onSelectAgent={props.onSelectAgent}
                    isHeader={false} />
        </Panel>
    )
}

export default AgentDetail;