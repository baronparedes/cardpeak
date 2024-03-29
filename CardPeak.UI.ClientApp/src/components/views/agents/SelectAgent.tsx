﻿import * as React from 'react';
import SelectAgentContainer from './SelectAgentContainer';
import AgentProfileImageContainer from './AgentProfileImageContainer'
import { Grid, Row, Col } from "react-bootstrap";

interface SelectAgentProps {
    agent: CardPeak.Entities.Agent;
    onAgentSelected: (agent: CardPeak.Entities.Agent) => void;
}

export default class SelectAgent extends React.Component<
    SelectAgentProps,
    {}
> {
    constructor(props: SelectAgentProps) {
        super(props);
    }
    renderSelectAgent() {
        return (
            <SelectAgentContainer
                bsStyle="primary"
                buttonLabel={<i className="fa fa-users"></i>}
                onAgentSelected={this.props.onAgentSelected}
            />
        );
    }
    render() {
        if (!!!this.props.agent) {
            return (
                <div>
                    <label className="text-muted spacer-right text-highlight">
                        select an agent
                    </label>
                    {this.renderSelectAgent()}
                </div>
            );
        }
        return (
            <Grid fluid>
                <Row>
                    <Col md={6}>
                        <h5 className="spacer-right">
                            <span className="spacer-right text-highlight">
                                {this.props.agent.firstName +
                                    ' ' +
                                    this.props.agent.lastName}
                            </span>
                            {this.renderSelectAgent()}
                            <br />
                            <span className="text-muted">
                                {this.props.agent.agentType.description}
                            </span>
                        </h5>
                    </Col>
                    <Col md={6} smHidden xsHidden>
                        <AgentProfileImageContainer />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
