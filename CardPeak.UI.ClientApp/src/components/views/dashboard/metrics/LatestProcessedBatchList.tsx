﻿import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import {
    BatchLinkButton,
    DataItemProps,
    DataList,
    DataListProps,
    ManageBatchLinkButton
} from '../../../layout';

type LatestProcessedBatchDataList = new () => DataList<
    CardPeak.Entities.BatchUpload
>;
const LatestProcessedBatchDataList = DataList as LatestProcessedBatchDataList;

const LatestProcessedBatchRowLayout = (
    props: DataItemProps<CardPeak.Entities.BatchUpload>
) => {
    return (
        <Row>
            <Col mdHidden lgHidden smHidden xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">
                    latest uploads
                </span>
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? 'id' : props.item.batchId}
            </Col>
            <Col sm={6} xsHidden={props.isHeader}>
                {props.isHeader ? 'file' : props.item.originalFileName}
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? 'completed' : null}
                {!props.isHeader && props.item.hasErrors === true ? (
                    <span className="text-highlight text-danger">
                        No
                    </span>
                ) : null}
                {!props.isHeader && props.item.hasErrors === false ? (
                    <span className="text-highlight text-success">
                        Yes
                    </span>
                ) : null}
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? null : props.item.hasErrors ? null : (
                    <BatchLinkButton id={props.item.batchId} />
                )}
            </Col>
        </Row>
    );
};

export const LatestProcessedBatchList = (
    props: DataListProps<CardPeak.Entities.BatchUpload>
) => {
    return (
        <div>
            <LatestProcessedBatchDataList
                addOn={
                    <Col
                        sm={12}
                        xsHidden={true}
                        className="text-center spacer-top spacer-bottom">
                        <label className="text-muted">
                            Latest Uploads
                        </label>
                    </Col>
                }
                onGetKey={item => item.batchId}
                renderHeader={() => {
                    return <LatestProcessedBatchRowLayout isHeader />;
                }}
                renderItem={(item, key) => {
                    return (
                        <LatestProcessedBatchRowLayout
                            item={item}
                            key={key}
                        />
                    );
                }}
                data={props.data}
            />
            <div className="text-right spacer-top">
                <ManageBatchLinkButton />
            </div>
        </div>
    );
};
