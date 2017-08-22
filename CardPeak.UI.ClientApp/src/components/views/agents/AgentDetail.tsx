import * as React from 'react'
import { Panel } from 'react-bootstrap'
import AgentRowLayout from './AgentRowLayout'

const AgentDetail: React.StatelessComponent<{}> = () => {
    return (
    <Panel className="panel-row">
        <AgentRowLayout 
            isHeader={false} 
            firstName="Baron Patrick" 
            lastName="Paredes" 
            gender="M"
            alias="alias" />
    </Panel>
    )
}

export default AgentDetail;