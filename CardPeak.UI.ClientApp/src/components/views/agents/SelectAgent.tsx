import * as React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { ModalPanel } from '../../layout'
import AgentList from './AgentList'

interface SelectAgentProps {
    agent: CardPeak.Entities.Agent;
    agents: CardPeak.Entities.Agent[];
    onSelectAgent?: () => void;
    onAgentSelected: (agent: CardPeak.Entities.Agent) => void;
    isLoading?: boolean;
}

export default class SelectAgent extends React.Component<SelectAgentProps, { showModal: boolean }> {
    constructor(props: SelectAgentProps) {
        super(props);
        this.state = { showModal: false };
    }
    handleOnAgentSelected = (agent: CardPeak.Entities.Agent) => {
        if (this.props.onAgentSelected) {
            this.props.onAgentSelected(agent);
        }
        this.handleOnToggleModal();
    }
    handleOnSelectAgent = () => {
        if (this.props.onSelectAgent) {
            this.props.onSelectAgent();
        }
        this.handleOnToggleModal();
    }
    handleOnToggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    renderModalButton() {
        return (
            <ButtonGroup className="hidden-print">
                <Button bsStyle="primary" onClick={this.handleOnSelectAgent}>
                    <i className="fa fa-sm fa-users"></i>
                </Button>
                <ModalPanel
                    onToggleModal={this.handleOnToggleModal}
                    showModal={this.state.showModal}
                    title="select agent">
                    <AgentList
                        data={this.props.agents}
                        onAgentSelected={this.handleOnAgentSelected}
                        isLoading={this.props.isLoading} />
                </ModalPanel>
            </ButtonGroup>
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
