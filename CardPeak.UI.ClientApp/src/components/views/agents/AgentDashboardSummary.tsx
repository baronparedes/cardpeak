import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'

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

const AgentDashboardSummary = (props: AgentDashboardSummaryProps) => {
    return (
        <div>
            <Grid fluid className="no-padding">
                <Row className="row-eq-height">
                    <Col lg={4} md={4} sm={6} xs={6}>
                        <Panel className="text-center panel-agent-dashboard">
                            <AgentDashboardLabel label="Total Approvals" metrics={props.agentDashboard.totalApprovals} />
                        </Panel>
                    </Col>
                    <Col lg={4} md={4} sm={6} xs={6}>
                        <Panel className="text-center panel-agent-dashboard">
                            <AgentDashboardLabel label="Some Statistics" />
                        </Panel>
                    </Col>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <Panel className="text-right panel-agent-dashboard">
                            <AgentDashboardLabel label="Account Balance" metrics={props.agentDashboard.accountBalance} isCurrency={true} />
                            <AgentDashboardLabel label="Savings" metrics={props.agentDashboard.savingsBalance} isCurrency={true} />
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

export default AgentDashboardSummary;