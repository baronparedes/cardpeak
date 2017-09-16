import * as React from 'react'
import { Panel } from 'react-bootstrap'
import { PerformanceDashboard } from '../../../layout'

export const AgentPerformanceMetrics = (props: { performance: CardPeak.Entities.Metric[] }) => {
    return (
        <Panel className="text-center panel-agent-dashboard">
            <PerformanceDashboard performance={props.performance} />
        </Panel>
    )
}