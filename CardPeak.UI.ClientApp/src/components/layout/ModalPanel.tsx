import * as React from 'react'
import { Button, Modal, Panel, ButtonGroup, ButtonProps } from 'react-bootstrap'

interface ModalPanelProps {
    onToggleModal: () => void;
    showModal: boolean;
    title: React.ReactNode;
    footer?: React.ReactNode;
}

interface ModalButtonState {
    showModal?: boolean;
}

interface ModalButtonProps {
    title: React.ReactNode;
    label: React.ReactNode;
}

export const ModalPanel: React.StatelessComponent<ModalPanelProps> = (props) => {
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

export class ModalButton extends React.Component<ButtonProps & ModalButtonProps, ModalButtonState> {
    constructor(props: ButtonProps & ModalButtonProps) {
        super(props);
        this.state = {
            showModal: false
        }
    }
    handleOnShowModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }
    render() {
        return (
            <ButtonGroup>
                <Button {...(this.props as ButtonProps)} onClick={this.handleOnShowModal}>
                    {this.props.label}
                </Button>
                <ModalPanel
                    title={this.props.title}
                    showModal={this.state.showModal}
                    onToggleModal={this.handleOnShowModal}>
                    {this.props.children}
                </ModalPanel>
            </ButtonGroup>
        )
    }
}