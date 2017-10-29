import * as React from 'react'
import { Panel } from 'react-bootstrap'
import { PerformanceDashboard } from '../../../layout'

export const AgentPerformanceMetrics = (props: { performance: CardPeak.Entities.ApprovalMetric<string>[] }) => {
    return (
        <Panel className="text-center panel-label-dashboard hidden-print">
            <PerformanceDashboard performance={props.performance} />
        </Panel>
    )
}