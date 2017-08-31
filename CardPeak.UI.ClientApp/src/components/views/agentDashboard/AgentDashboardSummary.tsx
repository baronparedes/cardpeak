import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { PerformanceDashboard } from '../../layout'
import { TotalApprovedMetrics, AgentPerformanceMetrics, AgentAccountBalanceMetrics } from './metrics'
import * as classNames from 'classnames'

interface AgentDashboardSummaryProps {
    agentDashboard: CardPeak.Entities.AgentDashboard
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