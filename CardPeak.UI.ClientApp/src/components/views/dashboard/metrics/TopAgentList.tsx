import * as React from 'react'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList, SpinnerBlock } from '../../../layout'

interface TopAgentListProps {
    isHeader?: boolean;
    data?: CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>[];
    metric?: CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>;
    rank?: number;
}

const TopAgentListRowLayout = (props: TopAgentListProps) => {
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
                {props.isHeader ? "agent" : props.metric.key.firstName + " " + props.metric.key.lastName}
            </Col>
            <Col sm={3} xsHidden={props.isHeader}>
                {props.isHeader ? "approvals" : props.metric.value}
            </Col>
        </Row>
    )
}

export const TopAgentList = (props: TopAgentListProps) => {
    let rank: number = 0;
    return (
        <div>
            <Col sm={12} xsHidden={true} className="text-center"><label className="text-muted">Top Agents</label></Col>
            <GridList header={<TopAgentListRowLayout isHeader={true} />}>
                {
                    props.data && props.data.length > 0 ?
                        props.data.map((item) => {
                            rank++;
                            return (
                                <Panel className="panel-row" key={item.key.agentId}>
                                    <TopAgentListRowLayout metric={item} rank={rank} />
                                </Panel>
                            )
                        }) : <ListNoRecordsRow />
                }
            </GridList>
        </div>
    )
}