import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import {
    DataItemProps,
    DataListFiltered,
    DataListProps
} from '../../layout';

type AgentDataListFiltered = new () => DataListFiltered<
    CardPeak.Entities.Agent
>;
const AgentDataListFiltered = DataListFiltered as AgentDataListFiltered;

interface SelectAgentListProps {
    onAgentSelected?: (data: CardPeak.Entities.Agent) => void;
}

const SelectAgentListRowLayout = (
    props: DataItemProps<CardPeak.Entities.Agent> & SelectAgentListProps
) => {
    return (
        <Row className="agent-item">
            <Col sm={10}>
                {props.isHeader
                    ? 'agent'
                    : props.item.firstName + ' ' + props.item.lastName}
            </Col>
            <Col sm={2}>
                {props.isHeader ? (
                    ''
                ) : (
                    <Button
                        onClick={() => {
                            props.onAgentSelected(props.item);
                        }}
                        bsStyle="primary"
                        bsSize="sm">
                        Select
                    </Button>
                )}
            </Col>
        </Row>
    );
};

const SelectAgentList = (
    props: DataListProps<CardPeak.Entities.Agent> & SelectAgentListProps
) => {
    return (
        <div>
            <AgentDataListFiltered
                predicate={(agent, searchString) => {
                    const firstNameMatch =
                        agent.firstName
                            .toLowerCase()
                            .indexOf(searchString) >= 0;
                    const lastNameMatch =
                        agent.lastName
                            .toLowerCase()
                            .indexOf(searchString) >= 0;
                    const fullName =
                        agent.firstName + ' ' + agent.lastName;
                    const fullNameMatch =
                        fullName.toLowerCase().indexOf(searchString) >=
                        0;
                    return (
                        firstNameMatch || lastNameMatch || fullNameMatch
                    );
                }}
                pageSize={5}
                onGetKey={item => item.agentId}
                isLoading={props.isLoading}
                renderHeader={() => {
                    return <SelectAgentListRowLayout isHeader />;
                }}
                renderItem={(item, key) => {
                    return (
                        <SelectAgentListRowLayout
                            item={item}
                            key={key}
                            onAgentSelected={props.onAgentSelected}
                        />
                    );
                }}
                data={props.data}
            />
        </div>
    );
};

export default SelectAgentList;
