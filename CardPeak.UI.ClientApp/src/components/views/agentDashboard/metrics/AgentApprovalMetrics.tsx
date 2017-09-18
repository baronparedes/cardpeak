import * as React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { ApprovalMetricsBarChart, ApprovalMetricsPieChart } from '../../../layout'

interface AgentApprovalMetricsProps {
    approvalsByBank?: CardPeak.Entities.ApprovalMetric<string>[],
    approvalsByCategory?: CardPeak.Entities.ApprovalMetric<string>[],
}

export const AgentApprovalMetrics = (props: AgentApprovalMetricsProps) => {
    return (
        <Row>
            <Col sm={6}>
                <Panel>
                    <ApprovalMetricsBarChart metrics={props.approvalsByBank} label="approval by banks" />
                </Panel>
            </Col>
            <Col sm={6}>
                <Panel>
                    <ApprovalMetricsPieChart metrics={props.approvalsByCategory} label="approval by categories" />
                </Panel>
            </Col>
        </Row>
    )
}