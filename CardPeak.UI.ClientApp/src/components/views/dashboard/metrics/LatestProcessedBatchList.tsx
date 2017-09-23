import * as React from 'react'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import { DataList, DataListProps, DataItemProps } from '../../../layout'

type LatestProcessedBatchDataList = new () => DataList<CardPeak.Entities.BatchUpload>;
const LatestProcessedBatchDataList = DataList as LatestProcessedBatchDataList;

const LatestProcessedBatchRowLayout = (props: DataItemProps<CardPeak.Entities.BatchUpload>) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">latest uploads</span>
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "batch id" : props.item.batchId}
            </Col>
            <Col sm={4} xsHidden={props.isHeader}>
                {props.isHeader ? "bank" : props.item.bank.description}
            </Col>
            <Col sm={3} xsHidden={props.isHeader}>
                {props.isHeader ? "rows" : props.item.processedRecords ? props.item.processedRecords : null}
            </Col>
            <Col sm={3} xsHidden={props.isHeader}>
                {props.isHeader ? "completed" : null}
                {!props.isHeader && props.item.hasErrors === true ? <span className="text-highlight text-danger">No</span> : null}
                {!props.isHeader && props.item.hasErrors === false ? <span className="text-highlight text-success">Yes</span> : null}
            </Col>
        </Row>
    )
}

export const LatestProcessedBatchList = (props: DataListProps<CardPeak.Entities.BatchUpload>) => {
    return (
        <div>
            <LatestProcessedBatchDataList
                addOn={
                    <Col sm={12} xsHidden={true} className="text-center spacer-top spacer-bottom">
                        <label className="text-muted">Latest Uploads</label>
                    </Col>
                }
                onGetKey={(item) => item.batchId}
                rowLayout={LatestProcessedBatchRowLayout}
                data={props.data} />
        </div>
    )
}