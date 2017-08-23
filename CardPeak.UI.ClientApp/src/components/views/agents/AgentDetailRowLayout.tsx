import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

interface AgentRowLayoutProps {
    agent?: CardPeak.Entities.Agent,
    handleOnSelectAgent?: (agent: CardPeak.Entities.Agent) => void;
    isHeader: boolean
}

export default class AgentRowLayout extends React.Component<AgentRowLayoutProps, {}> {
    constructor(props: AgentRowLayoutProps) {
        super(props);
    }
    handleOnClick = () => {
        this.props.handleOnSelectAgent(this.props.agent);
    }
    render() {
        return (
            <Row>
                <Col md={5} lg={5} sm={5} xs={4}>
                    {this.props.isHeader ? "first name" : this.props.agent.firstName}
                </Col>
                <Col md={5} lg={5} sm={5} xs={4}>
                    {this.props.isHeader ? "last name" : this.props.agent.lastName}
                </Col>
                <Col md={2} lg={2} sm={2} xs={2}>
                    {this.props.isHeader ? "" : <Button onClick={this.handleOnClick} bsStyle="primary">Select</Button>}
                </Col>
            </Row>
        )
    }
}
