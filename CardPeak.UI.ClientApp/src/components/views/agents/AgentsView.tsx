import * as React from 'react'
import AgentContainer from './AgentContainer'


const AgentView: React.StatelessComponent<{}> = () => {
    return (
        <div>
            <h2>Agent Dashboard</h2>
            <AgentContainer />
        </div>
    )
}

export default AgentView;