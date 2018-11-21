import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { PerformanceDashboard, ApprovalMetrics } from '../../layout'
import { TotalApprovedMetrics, AgentPerformanceMetrics, AgentAccountBalanceMetrics } from './metrics'

interface AgentDashboardSummaryProps {
    agentDashboard: CardPeak.Entities.AgentDashboard
}

const AgentDashboardSummary = (props: AgentDashboardSummaryProps) => {
    return (
        <div>
            <Grid fluid className="no-padding">
                <Row className="row-eq-height">
                    <Col md={4}>
                        <TotalApprovedMetrics
                            totalApprovals={props.agentDashboard.totalApprovals} />
                    </Col>
                    <Col md={4}>
                        <AgentPerformanceMetrics
                            performance={props.agentDashboard.performance} />
                    </Col>
                    <Col md={4}>
                        <AgentAccountBalanceMetrics
                            accountBalance={props.agentDashboard.accountBalance}
                            savingsBalance={props.agentDashboard.savingsBalance} />
                    </Col>
                </Row>
                <ApprovalMetrics
                    approvalsByBankDetails={props.agentDashboard.approvalsByBankDetails}
                    approvalsByBank={props.agentDashboard.approvalsByBank}
                    approvalsByCategory={props.agentDashboard.approvalsByCategory} />
            </Grid>
        </div>
    )
}

export default AgentDashboardSummary;