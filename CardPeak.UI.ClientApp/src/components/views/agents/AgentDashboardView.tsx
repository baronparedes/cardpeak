import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { SpinnerGrid } from '../../layout/Spinner'
import AgentDashboardSummary from './AgentDashboardSummary'
import AgentDashboardTransactions from './AgentDashboardTransactions'
import AgentDashboardActions from './AgentDashboardActions'

interface AgentDashboardViewProps {
    agentDashboard?: CardPeak.Entities.AgentDashboard,
    loadingAgentDashboard?: boolean
}

const AgentDashboardView = (props: AgentDashboardViewProps) => {
    if (props.loadingAgentDashboard) {
        return (
            <Grid fluid className="text-center"><SpinnerGrid /></Grid>
        )
    }

    if (props.agentDashboard) {
        return (
            <div>
                <AgentDashboardSummary agentDashboard={props.agentDashboard} />
                <AgentDashboardActions agent={props.agentDashboard.agent} />
                <AgentDashboardTransactions agentDashboard={props.agentDashboard} />
            </div>
        )
    }

    return null;
}

export default AgentDashboardView;