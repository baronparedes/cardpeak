import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import PerformanceDashboard from '../../layout/PerformanceDashboard'

interface AgentDashboardSummaryProps {
    agentDashboard: CardPeak.Entities.AgentDashboard
}

const AgentDashboardLabel = (props: { label: string, metrics?: number, isCurrency?: boolean }) => {
    return (
        <div>
            <label className="text-label text-muted spacer-right">
                {props.label}
            </label>
            <span className={(props.isCurrency === true) ? "text-highlight currency" : "text-highlight"}>
                {props.metrics ? props.metrics : 0}
            </span>
        </div>
    )
}

const TotalApprovedMetrics = (props: { totalApprovals: number }) => {
    return (
        <Panel className="text-center panel-agent-dashboard">
            <Grid fluid>
                <Row>
                    <Col>
                        <label className="text-label text-muted spacer-right">
                            Total Approval Record
                        </label>
                    </Col>
                    <Col>
                        <span className="text-highlight">
                            {props.totalApprovals}
                        </span>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    )
}

const AgentPerformanceMetrics = (props: { performance: CardPeak.Entities.ApprovalPerformance[] }) => {
    return (
        <Panel className="text-center panel-agent-dashboard">
            <PerformanceDashboard performance={props.performance} />
        </Panel>
    )
}

const AgentAccountBalanceMetrics = (props: { accountBalance: number, savingsBalance: number }) => {
    return (
        <Panel className="text-right panel-agent-dashboard">
            <AgentDashboardLabel label="Account Balance" metrics={props.accountBalance} isCurrency={true} />
            <AgentDashboardLabel label="Savings" metrics={props.savingsBalance} isCurrency={true} />
        </Panel>
    )
}

const AgentDashboardSummary = (props: AgentDashboardSummaryProps) => {
    return (
        <div>
            <Grid fluid className="no-padding">
                <Row className="row-eq-height">
                    <Col lg={4} md={4} sm={6} xs={6}>
                        <TotalApprovedMetrics
                            totalApprovals={props.agentDashboard.totalApprovals} />
                    </Col>
                    <Col lg={4} md={4} sm={6} xs={6}>
                        <AgentPerformanceMetrics
                            performance={props.agentDashboard.performance} />
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <AgentAccountBalanceMetrics
                            accountBalance={props.agentDashboard.accountBalance}
                            savingsBalance={props.agentDashboard.savingsBalance} />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

export default AgentDashboardSummary;