import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'

export const TotalApprovedMetrics = (props: { totalApprovals: number }) => {
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