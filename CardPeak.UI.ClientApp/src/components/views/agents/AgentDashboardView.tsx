import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { Spinner } from '../../layout/Spinner'
import AgentDashboardSummary from './AgentDashboardSummary'
import AgentDashboardTransactions from './AgentDashboardTransactions'

interface AgentDashboardViewProps {
    agentDashboard?: CardPeak.Entities.AgentDashboard,
    loadingAgentDashboard?: boolean
}

const AgentDashboardView = (props: AgentDashboardViewProps) => {
    if (props.loadingAgentDashboard) {
        return (
            <div className="text-center"><Spinner /></div>
        )
    }

    if (props.agentDashboard) {
        return (
            <div>
                <AgentDashboardSummary agentDashboard={props.agentDashboard} />
                <AgentDashboardTransactions agentDashboard={props.agentDashboard} />
            </div>
        )
    }

    return null;
}

export default AgentDashboardView;