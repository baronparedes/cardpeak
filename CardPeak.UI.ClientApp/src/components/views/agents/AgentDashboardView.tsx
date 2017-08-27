import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { SpinnerBlock } from '../../layout/Spinner'
import AgentDashboardSummary from './AgentDashboardSummary'
import AgentDashboardTransactions from './AgentDashboardTransactions'
import AgentDashboardActions from './AgentDashboardActions'

interface AgentDashboardViewProps {
    agentDashboard?: CardPeak.Entities.AgentDashboard,
    onRefresh?: (toDate?: string, fromDate?: string) => void,
    loadingAgentDashboard?: boolean,
    refreshingAgentDashboard?: boolean
}

const AgentDashboardView = (props: AgentDashboardViewProps) => {
    if (props.loadingAgentDashboard) {
        return (
            <SpinnerBlock />
        )
    }

    if (props.agentDashboard) {
        return (
            <div>
                <AgentDashboardSummary agentDashboard={props.agentDashboard} />
                <AgentDashboardActions agent={props.agentDashboard.agent} onRefresh={props.onRefresh} refreshingAgentDashboard={props.refreshingAgentDashboard} />
                {
                    props.refreshingAgentDashboard ? <SpinnerBlock /> :
                        <AgentDashboardTransactions agentDashboard={props.agentDashboard} />
                }
            </div>
        )
    }

    return null;
}

export default AgentDashboardView;