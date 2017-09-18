import * as React from 'react'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList, SpinnerBlock } from '../../../layout'

interface LatestProcessedBatchProps {
    isHeader?: boolean
    data?: CardPeak.Entities.BatchUpload[]
    batchUpload?: CardPeak.Entities.BatchUpload
}

const LatestProcessedBatchRowLayout = (props: LatestProcessedBatchProps) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">latest uploads</span>
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "batch id" : props.batchUpload.batchId}
            </Col>
            <Col sm={4} xsHidden={props.isHeader}>
                {props.isHeader ? "bank" : props.batchUpload.bank.description}
            </Col>
            <Col sm={3} xsHidden={props.isHeader}>
                {props.isHeader ? "rows" : props.batchUpload.processedRecords ? props.batchUpload.processedRecords : null}
            </Col>
            <Col sm={3} xsHidden={props.isHeader}>
                {props.isHeader ? "completed" : null}
                {!props.isHeader && props.batchUpload.hasErrors === true ? <span className="text-highlight text-danger">No</span> : null}
                {!props.isHeader && props.batchUpload.hasErrors === false ? <span className="text-highlight text-success">Yes</span> : null}
                {!props.isHeader && props.batchUpload.processStartDateTime && !props.batchUpload.processEndDateTime ? <span className="text-highlight">Processing</span> : null}
            </Col>
        </Row>
    )
}

export const LatestProcessedBatchList = (props: LatestProcessedBatchProps) => {
    return (
        <div>
            <Col sm={12} xsHidden={true} className="text-center"><label className="text-muted">Latest Uploads</label></Col>
            <GridList header={<LatestProcessedBatchRowLayout isHeader={true} />}>
                {
                    props.data && props.data.length > 0 ?
                        props.data.map((item) => {
                            return (
                                <Panel className="panel-row" key={item.batchId}>
                                    <LatestProcessedBatchRowLayout batchUpload={item} />
                                </Panel>
                            )
                        }) : <ListNoRecordsRow />
                }
            </GridList>
        </div>
    )
}