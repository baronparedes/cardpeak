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
                <span className="text-center spacer-left">Latest Uploads</span>
            </Col>
            <Col md={2} lg={2} sm={2}>
                {props.isHeader ? "id" : props.batchUpload.batchId}
            </Col>
            <Col md={4} lg={4} sm={4}>
                {props.isHeader ? "bank" : props.batchUpload.bank.description}
            </Col>
            <Col md={3} lg={3} sm={3}>
                {props.isHeader ? "rows" : props.batchUpload.processedRecords ? props.batchUpload.processedRecords : null}
            </Col>
            <Col md={3} lg={3} sm={3}>
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