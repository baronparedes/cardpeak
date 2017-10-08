import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { DataListFiltered, DataListProps, DataItemProps } from '../../layout'

type AgentDataListFiltered = new () => DataListFiltered<CardPeak.Entities.Agent>;
const AgentDataListFiltered = DataListFiltered as AgentDataListFiltered;

interface AgentListProps {
    onAgentSelected?: (data: CardPeak.Entities.Agent) => void;
}

const AgentListRowLayout = (props: DataItemProps<CardPeak.Entities.Agent> & AgentListProps) => {
    return (
        <Row className="agent-item">
            <Col sm={10}>
                {props.isHeader ? "agent" : props.item.firstName + " " + props.item.lastName}
            </Col>
            <Col sm={2}>
                {props.isHeader ? "" : <Button onClick={() => { props.onAgentSelected(props.item) }} bsStyle="primary" bsSize="sm">Select</Button>}
            </Col>
        </Row>
    )
}

const AgentList = (props: DataListProps<CardPeak.Entities.Agent> & AgentListProps) => {
    return (
        <div>
            <AgentDataListFiltered
                predicate={(agent, searchString) => {
                    const firstNameMatch = agent.firstName.toLowerCase().indexOf(searchString) >= 0;
                    const lastNameMatch = agent.lastName.toLowerCase().indexOf(searchString) >= 0;
                    return firstNameMatch || lastNameMatch;
                }}
                pageSize={5}
                onGetKey={(item) => item.agentId}
                isLoading={props.isLoading}
                renderHeader={() => { return <AgentListRowLayout isHeader/> }}
                renderItem={(item, key) => { return <AgentListRowLayout item={item} key={key} onAgentSelected={props.onAgentSelected} /> }}
                data={props.data} />
        </div>
    )
}

export default AgentList;