import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

interface AgentDetailRowLayoutProps {
    agent?: CardPeak.Entities.Agent,
    onSelectAgent?: (agent: CardPeak.Entities.Agent) => void;
    isHeader: boolean
}

export default class AgentDetailRowLayout extends React.Component<AgentDetailRowLayoutProps, {}> {
    constructor(props: AgentDetailRowLayoutProps) {
        super(props);
    }
    handleOnClick = () => {
        this.props.onSelectAgent(this.props.agent);
    }
    render() {
        return (
            <Row className="agent-item">
                <Col md={5} lg={5} sm={5} xs={4}>
                    {this.props.isHeader ? "first name" : this.props.agent.firstName}
                </Col>
                <Col md={5} lg={5} sm={5} xs={4}>
                    {this.props.isHeader ? "last name" : this.props.agent.lastName}
                </Col>
                <Col md={2} lg={2} sm={2} xs={1}>
                    {this.props.isHeader ? "" : <Button onClick={this.handleOnClick} bsStyle="primary" bsSize="sm">Select</Button>}
                </Col>
            </Row>
        )
    }
}
