import * as React from 'react'
import AgentContainer from './AgentContainer'

const AddAgentView = () => {
    return (
        <div>
            <h2>Create Agent Details</h2>
            <AgentContainer isNew={true} />
        </div>
    )
}

export default AddAgentView;