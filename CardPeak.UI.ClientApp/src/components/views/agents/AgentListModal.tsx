import * as React from 'react'
import { Button, Modal, Panel } from 'react-bootstrap'
import AgentList from './AgentList'

interface AgentListModalProps {
    onToggleModal: () => void;
    onAgentSelected: (agent: CardPeak.Entities.Agent) => void;
    agents: CardPeak.Entities.Agent[],
    showModal: boolean
}

export default class AgentListModal extends React.Component<AgentListModalProps, undefined> {
    constructor(props: AgentListModalProps) {
        super(props);
    }

    render () {
        return (
            <Modal show={this.props.showModal} onHide={this.props.onToggleModal}>
                <Modal.Header>
                    <Modal.Title><h3>Agents</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgentList agents={this.props.agents} handleOnSelectAgent={this.props.onAgentSelected} />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.props.onToggleModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}