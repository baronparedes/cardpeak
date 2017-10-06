﻿import * as React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import {
    ListNoRecordsRow, GridList, SpinnerBlock,
    DataList, DataListProps, DataItemProps
} from '../../../layout'

type TopAgentDataList = new () => DataList<CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>>;
const TopAgentDataList = DataList as TopAgentDataList;

interface TopAgentRowLayoutProps {
    rank?: number;
}

const TopAgentRowLayout: React.StatelessComponent<DataItemProps<
    CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>> &
    TopAgentRowLayoutProps> = (props) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">top agents</span>
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "rank" : props.rank}
            </Col>
            <Col sm={7} xsHidden={props.isHeader}>
                {props.isHeader ? "agent" : props.item.key.firstName + " " + props.item.key.lastName}
            </Col>
            <Col sm={3} xsHidden={props.isHeader}>
                {props.isHeader ? "approvals" : props.item.value}
            </Col>
        </Row>
    )
}

export const TopAgentList = (props: DataListProps<CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>>) => {
    let rank: number = 0;
    return (
        <div>
            <TopAgentDataList
                addOn={
                    <Col sm={12} xsHidden={true} className="text-center spacer-top spacer-bottom">
                        <label className="text-muted">Top Agents</label>
                    </Col>
                }
                onGetKey={(item) => item.key.agentId}
                renderHeader={() => { return <TopAgentRowLayout isHeader /> }}
                renderItem={(item, key) => {
                    rank++;
                    return <TopAgentRowLayout item={item} key={key} rank={rank} />
                }}
                data={props.data} />
            <div className="text-right spacer-top">
                <Link to="/metrics/rankings">
                    <Button bsStyle="primary">
                        View Rankings
                    </Button>
                </Link>
            </div>
        </div>
    )
}