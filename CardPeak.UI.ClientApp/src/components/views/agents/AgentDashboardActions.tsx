import * as React from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap'

const AgentDashboardActions = () => {
    return (
        <Grid fluid className="spacer-bottom">
            <Row>
                <Col lg={6} md={6}>
                    Date Picker here
                </Col>
                <Col lg={6} md={6} className="text-right">
                    <Button bsStyle="success">Refresh Transactions</Button>
                    <Button bsStyle="primary">New Debit Credit</Button>
                </Col>
            </Row>
        </Grid>
    )
}

export default AgentDashboardActions;