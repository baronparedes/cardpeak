import * as React from 'react'
import { Panel } from 'react-bootstrap'
import AgentRowLayout from './AgentRowLayout'

interface AgentDetailProps {
    agent: CardPeak.Types.Agent
}

const AgentDetail: React.StatelessComponent<AgentDetailProps> = (props) => {
    return (
    <Panel className="panel-row">
        <AgentRowLayout 
            isHeader={false} 
            firstName={props.agent.firstName} 
            lastName={props.agent.lastName} 
            gender={props.agent.gender}
            alias={props.agent.alias} />
    </Panel>
    )
}

export default AgentDetail;