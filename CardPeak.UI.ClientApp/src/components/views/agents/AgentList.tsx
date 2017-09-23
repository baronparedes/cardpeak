import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { DataListFiltered, DataListProps, DataItemProps, InjectProps } from '../../layout'

type AgentDataList = new () => DataListFiltered<CardPeak.Entities.Agent>;
const AgentDataList = DataListFiltered as AgentDataList;

interface AgentListProps {
    onSelectAgent: (data: CardPeak.Entities.Agent) => void;
}

const AgentListRowLayout = (props: DataItemProps<CardPeak.Entities.Agent> & AgentListProps) => {
    return (
        <Row className="agent-item">
            <Col md={5} lg={5} sm={5} xs={4}>
                {props.isHeader ? "first name" : props.item.firstName}
            </Col>
            <Col md={5} lg={5} sm={5} xs={4}>
                {props.isHeader ? "last name" : props.item.lastName}
            </Col>
            <Col md={2} lg={2} sm={2} xs={1}>
                {props.isHeader ? "" : <Button onClick={() => { props.onSelectAgent(props.item) }} bsStyle="primary" bsSize="sm">Select</Button>}
            </Col>
        </Row>
    )
}

const AgentList = (props: DataListProps<CardPeak.Entities.Agent> & AgentListProps) => {
    return (
        <div>
            <AgentDataList
                predicate={(agent, searchString) => {
                    const firstNameMatch = agent.firstName.toLowerCase().indexOf(searchString) >= 0;
                    const lastNameMatch = agent.lastName.toLowerCase().indexOf(searchString) >= 0;
                    return firstNameMatch || lastNameMatch;
                }}
                onGetKey={(item) => item.agentId}
                isLoading={props.isLoading}
                rowLayout={InjectProps(AgentListRowLayout, props as AgentListProps)}
                data={props.data} />
        </div>
    )
}

export default AgentList;