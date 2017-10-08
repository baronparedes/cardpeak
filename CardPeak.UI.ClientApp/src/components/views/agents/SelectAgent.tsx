import * as React from 'react'
import { Button } from 'react-bootstrap'
import { ModalButton } from '../../layout'

import AgentList from './AgentList'

interface SelectAgentProps {
    agent: CardPeak.Entities.Agent;
    agents: CardPeak.Entities.Agent[];
    onSelectAgent?: () => void;
    onAgentSelected: (agent: CardPeak.Entities.Agent) => void;
    isLoading?: boolean;
}

export default class SelectAgent extends React.Component<SelectAgentProps, undefined> {
    renderModalButton() {
        return (
            <ModalButton
                bsStyle="primary"
                title="agents"
                onTogglingModal={this.props.onSelectAgent}
                buttonLabel={<i className="fa fa-sm fa-users"></i>}>
                <AgentList
                    data={this.props.agents}
                    onSelectAgent={this.props.onAgentSelected}
                    isLoading={this.props.isLoading} />
            </ModalButton>
        )
    }
    render() {
        if (!!!this.props.agent) {
            return (
                <div>
                    <label className="text-muted spacer-right text-highlight">select an agent</label>
                    {this.renderModalButton()}
                </div>
            );
        }
        return (
            <h5 className="spacer-right">
                <span className="spacer-right text-highlight">
                    {this.props.agent.firstName + " " + this.props.agent.lastName}    
                </span>
                {this.renderModalButton()}
            </h5>
        );
    }
}
