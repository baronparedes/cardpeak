import * as React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { DashboardLabel } from './'

const Performance = (props: { perf: CardPeak.Entities.ApprovalMetric<string>, compareUnits: number }) => {
    let caret = null;
    if (props.compareUnits > props.perf.value && props.perf.value !== 0) {
        caret = <i className="perf-down fa fa-caret-down spacer-left"></i>
    }
    else if (props.compareUnits < props.perf.value) {
        caret = <i className="perf-up fa fa-caret-up spacer-left"></i>
    }

    return (
        <DashboardLabel label={props.perf.key} metrics={props.perf.value} addOn={caret} />
    )
}

export const PerformanceDashboard = (props: { performance?: CardPeak.Entities.ApprovalMetric<string>[] }) => {
    let row = 0;
    if (!props.performance) {
        return null;
    }
    return (
        <Grid fluid>
            <Row>
                {
                    props.performance.map(_ => {
                        const compareRow = row === 0 ? 0 : row - 1;
                        let perf = <Performance perf={props.performance[row]} compareUnits={props.performance[compareRow].value} />
                        row++
                        return (
                            <Col sm={4} key={row} className="no-padding">{perf}</Col>    
                        );
                    })
                }
            </Row>
        </Grid>
    )
}
