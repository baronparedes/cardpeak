import * as React from 'react'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList, SpinnerBlock } from '../../../layout'
import { DataList, DataListProps, DataItemProps, InjectProps } from '../../../layout'

type TopAgentDataList = new () => DataList<CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>>;
const TopAgentDataList = DataList as TopAgentDataList;

interface TopAgentListProps {
    data: CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>[];
}

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

export const TopAgentList = (props: TopAgentListProps) => {
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
                rowLayout={TopAgentRowLayout}
                data={props.data} />
        </div>
    )
}