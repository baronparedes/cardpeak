import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import { DashboardLabel } from '../../../layout'

export const TotalApprovedMetrics = (props: { totalApprovals: number }) => {
    return (
        <Panel className="panel-label-dashboard">
            <DashboardLabel className="pull-right" label="approvals" metrics={props.totalApprovals} />
        </Panel>
    )
}