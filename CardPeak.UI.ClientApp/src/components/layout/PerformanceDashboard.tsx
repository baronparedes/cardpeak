import * as React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

const Performance = (props: { perf: CardPeak.Entities.ApprovalPerformance, compareUnits: number }) => {
    let caret = null;
    if (props.compareUnits > props.perf.units) {
        caret = <i className="perf-down fa fa-caret-down spacer-left"></i>
    }
    else if (props.compareUnits < props.perf.units) {
        caret = <i className="perf-up fa fa-caret-up spacer-left"></i>
    }

    return (
        <div>
            <label className="text-label text-muted spacer-right">
                {props.perf.month}
            </label>
            <span className="text-highlight">
                {props.perf.units}
                {caret}
            </span>
        </div>
    )
}

export const PerformanceDashboard = (props: { performance: CardPeak.Entities.ApprovalPerformance[] }) => {
    return (
        <Grid fluid>
            <Row>
                <Col className="text-center">
                    <Performance perf={props.performance[0]} compareUnits={props.performance[1].units} />
                </Col>
            </Row>
            <Row>
                <Col xs={6} sm={4}>
                    <Performance perf={props.performance[1]} compareUnits={props.performance[2].units} />
                </Col>
                <Col xs={6} sm={4}>
                    <Performance perf={props.performance[2]} compareUnits={props.performance[3].units} />
                </Col>
                <Col xsHidden sm={4}>
                    <Performance perf={props.performance[3]} compareUnits={props.performance[3].units} />
                </Col>
            </Row>
        </Grid>
    )
}
