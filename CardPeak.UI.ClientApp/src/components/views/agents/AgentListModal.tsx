import * as React from 'react'
import { Button, Modal, Panel } from 'react-bootstrap'
import AgentList from './AgentList'

interface AgentListModalProps {
    onToggleModal: () => void;
    onAgentSelected: (agent: CardPeak.Entities.Agent) => void;
    agents: CardPeak.Entities.Agent[],
    showModal: boolean,
    isLoading?: boolean
}

const AgentListModal = (props: AgentListModalProps) => {
    return (
        <Modal show={props.showModal} onHide={props.onToggleModal}>
            <Modal.Header>
                <Modal.Title>Agents</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AgentList
                    agents={props.agents}
                    handleOnSelectAgent={props.onAgentSelected}
                    isLoading={props.isLoading} />
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="danger" onClick={props.onToggleModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AgentListModal;