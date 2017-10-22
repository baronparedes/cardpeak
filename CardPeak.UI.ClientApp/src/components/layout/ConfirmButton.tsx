import * as React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { ModalConfirm, ButtonLoading } from '.'

interface ConfirmButtonProps {
    onToggleConfirm?: () => void;
    onConfirm: () => void;
    onPreventToggle?: () => boolean;
    confirmTitle: React.ReactNode;
    confirmMessage?: React.ReactNode;
    buttonLabel: React.ReactNode;
    bsStyle?: string;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    useButtonLoading?: boolean;
    noButtonLoadingText?: boolean;
}

interface ConfirmButtonState {
    showConfirmModal?: boolean
}

export class ConfirmButton extends React.Component<ConfirmButtonProps, ConfirmButtonState> {
    constructor(props: ConfirmButtonProps) {
        super(props);
        this.state = {
            showConfirmModal: undefined
        }
    }
    handleOnToggleModal = () => {
        if (this.props.onPreventToggle) {
            if (this.props.onPreventToggle()) {
                return;
            }
        }
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
        let button = null;
        if (this.props.useButtonLoading) {
            button = <ButtonLoading
                className={this.props.className}
                noText={this.props.noButtonLoadingText}
                bsStyle={this.props.bsStyle}
                disabled={this.props.disabled}
                isLoading={this.props.isLoading}
                label={this.props.buttonLabel}
                onClick={this.handleOnToggleModal}>
            </ButtonLoading>;
        }
        else {
            button = <Button
                disabled={this.props.disabled}
                className={this.props.className}
                type="button"
                bsStyle={this.props.bsStyle}
                onClick={this.handleOnToggleModal}>
                {this.props.buttonLabel}
            </Button>;
        }

        return (
            <ButtonGroup>
                {button}
                <ModalConfirm
                    title={this.props.confirmTitle}
                    showModal={this.state.showConfirmModal}
                    onConfirm={this.handleOnConfirm}
                    onToggleModal={this.handleOnToggleModal}>

                    {this.props.confirmMessage ? this.props.confirmMessage : this.props.children}
                </ModalConfirm>
            </ButtonGroup>
        );
    }
}