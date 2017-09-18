﻿import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { dateTimeFormat } from '../../../helpers/dateHelpers'

interface BatchUploadDetailRowLayoutProps {
    batchUpload?: CardPeak.Entities.BatchUpload,
    isHeader: boolean
}

const BatchUploadDetailRowLayout = (props: BatchUploadDetailRowLayoutProps) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Batch Details</span>
            </Col>
            <Col md={1} lg={1} sm={1} xsHidden={props.isHeader}>
                {props.isHeader ? "id" : props.batchUpload.batchId}
            </Col>
            <Col md={3} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "bank" : props.batchUpload.bank.description}
            </Col>
            <Col md={4} lg={4} sm={5} xsHidden={props.isHeader}>
                {props.isHeader ? "file" : props.batchUpload.fileName.split('\\').pop().split('/').pop()}
            </Col>
            <Col mdHidden lg={1} smHidden xsHidden={props.isHeader}>
                {props.isHeader ? "start" : props.batchUpload.processStartDateTime ? dateTimeFormat(props.batchUpload.processStartDateTime) : null}
            </Col>
            <Col mdHidden lg={1} smHidden xsHidden={props.isHeader}>
                {props.isHeader ? "end" : props.batchUpload.processEndDateTime ? dateTimeFormat(props.batchUpload.processEndDateTime) : null}
            </Col>
            <Col md={1} lg={1} sm={1} xsHidden={props.isHeader}>
                {props.isHeader ? "rows" : props.batchUpload.processedRecords ? props.batchUpload.processedRecords : null}
            </Col>
            <Col md={1} lg={1} sm={1} xsHidden={props.isHeader}>
                {props.isHeader ? "completed" : null}
                {!props.isHeader && props.batchUpload.hasErrors === true ? <span className="text-highlight text-danger">No</span> : null}
                {!props.isHeader && props.batchUpload.hasErrors === false ? <span className="text-highlight text-success">Yes</span> : null}
            </Col>
        </Row>
    )
}

export default BatchUploadDetailRowLayout;