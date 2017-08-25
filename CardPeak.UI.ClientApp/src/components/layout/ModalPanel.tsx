import * as React from 'react'
import { Button, Modal, Panel } from 'react-bootstrap'

interface ModalPanelProps {
    onToggleModal: () => void;
    showModal: boolean,
    title: React.ReactNode,
    footer?: React.ReactNode
}

const ModalPanel: React.StatelessComponent<ModalPanelProps> = (props) => {
    return (
        <Modal show={props.showModal} onHide={props.onToggleModal}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {props.footer ? props.footer : <Button bsStyle="warning" onClick={props.onToggleModal}>Close</Button>}
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPanel;