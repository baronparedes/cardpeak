import * as React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import AgentDetail from './AgentDetail'
import AgentRowLayout from './AgentRowLayout'

interface AgentListProps {
    agents?: CardPeak.Types.Agent[]
}

const AgentList: React.StatelessComponent<{}> = () => {
    return (
        <div>
            <Grid fluid className="grid-header text-muted">
                <Panel className="panel-row-header">
                    <AgentRowLayout isHeader={true} />
                </Panel>
            </Grid>    
            <Grid fluid className="grid-rows margin-top">
                <AgentDetail />
                <AgentDetail />
                <AgentDetail />
                <AgentDetail />
                <AgentDetail />
                <AgentDetail />
                <AgentDetail />
                <AgentDetail />
            </Grid>   
        </div>
    )
}

export default AgentList;