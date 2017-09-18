import * as React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

const Performance = (props: { perf: CardPeak.Entities.ApprovalMetric<string>, compareUnits: number }) => {
    let caret = null;
    if (props.compareUnits > props.perf.value) {
        caret = <i className="perf-down fa fa-caret-down spacer-left"></i>
    }
    else if (props.compareUnits < props.perf.value) {
        caret = <i className="perf-up fa fa-caret-up spacer-left"></i>
    }

    return (
        <div>
            <label className="text-label text-muted spacer-right">
                {props.perf.key}
            </label>
            <span className="text-highlight">
                {props.perf.value}
                {caret}
            </span>
        </div>
    )
}

export const PerformanceDashboard = (props: { performance: CardPeak.Entities.ApprovalMetric<string>[] }) => {
    return (
        <Grid fluid>
            <Row>
                <Col className="text-center">
                    <Performance perf={props.performance[0]} compareUnits={props.performance[1].value} />
                </Col>
            </Row>
            <Row>
                <Col xs={6} sm={4}>
                    <Performance perf={props.performance[1]} compareUnits={props.performance[2].value} />
                </Col>
                <Col xs={6} sm={4}>
                    <Performance perf={props.performance[2]} compareUnits={props.performance[3].value} />
                </Col>
                <Col xsHidden sm={4}>
                    <Performance perf={props.performance[3]} compareUnits={props.performance[3].value} />
                </Col>
            </Row>
        </Grid>
    )
}
