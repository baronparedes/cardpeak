import * as React from 'react'
import { Button } from 'react-bootstrap'
import { ModalConfirm, ButtonLoading } from '.'

interface ConfirmButtonProps {
    onToggleConfirm: () => void;
    onConfirm: () => void;
    confirmMessage: React.ReactNode;
    confirmTitle: React.ReactNode;
    bsStyle?: string;
    isLoading: boolean;
    buttonLabel: React.ReactNode;
    className?: string;
}

interface ConfirmButtonState {
    showConfirmModal: boolean
}

export class ConfirmButtonLoading extends React.Component<ConfirmButtonProps, ConfirmButtonState> {
    handleOnToggleModal = () => {
        this.setState({ showConfirmModal: !this.state.showConfirmModal });
        if (this.props.onToggleConfirm) {
            this.props.onToggleConfirm();
        }
    }
    handleOnConfirm = () => {
        this.handleOnToggleModal();
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }
    render() {
        return (
            <div>
                <ButtonLoading
                    className={this.props.className}
                    bsStyle={this.props.bsStyle}
                    isLoading={this.props.isLoading}
                    label={this.props.buttonLabel}
                    onClick={this.handleOnToggleModal} />
                <ModalConfirm
                    title={this.props.confirmTitle}
                    showModal={this.state.showConfirmModal}
                    onConfirm={this.handleOnConfirm}
                    onToggleModal={this.handleOnToggleModal}>
                    {this.props.confirmMessage}
                </ModalConfirm>
            </div>
        )
    }
}

export class ConfirmButton extends React.Component<ConfirmButtonProps, ConfirmButtonState> {
    handleOnToggleModal = () => {
        this.setState({ showConfirmModal: !this.state.showConfirmModal });
        if (this.props.onToggleConfirm) {
            this.props.onToggleConfirm();
        }
    }
    handleOnConfirm = () => {
        this.handleOnToggleModal();
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }
    render() {
        return (
            <div>
                <Button
                    className={this.props.className}
                    type="button"
                    bsStyle={this.props.bsStyle}
                    onClick={this.handleOnToggleModal}>
                    {this.props.buttonLabel}
                </Button>
                <ModalConfirm
                    title={this.props.confirmTitle}
                    showModal={this.state.showConfirmModal}
                    onConfirm={this.handleOnConfirm}
                    onToggleModal={this.handleOnToggleModal}>
                    {this.props.confirmMessage}
                </ModalConfirm>
            </div>
        )
    }
}
