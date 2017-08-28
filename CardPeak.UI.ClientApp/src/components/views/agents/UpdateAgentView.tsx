import * as React from 'react'
import AgentContainer from './AgentContainer'

const UpdateAgentView = () => {
    return (
        <div>
            <h2>Update Agent Details</h2>
            <AgentContainer isNew={false} />
        </div>
    )
}

export default UpdateAgentView;