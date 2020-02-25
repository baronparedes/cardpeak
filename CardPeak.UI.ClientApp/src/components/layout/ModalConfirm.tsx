import * as React from 'react';
import { Button } from 'react-bootstrap';
import { ModalPanel } from './';

interface ModalConfirmProps {
    onToggleModal: () => void;
    onConfirm: () => void;
    title: React.ReactNode;
    showModal: boolean;
}

const ModalConfirmActions = (props: {
    onToggleModal: () => void;
    onConfirm: () => void;
}) => {
    return (
        <div>
            <Button bsStyle="primary" onClick={props.onConfirm}>
                Continue
            </Button>
            <Button bsStyle="warning" onClick={props.onToggleModal}>
                Cancel
            </Button>
        </div>
    );
};

export const ModalConfirm: React.StatelessComponent<ModalConfirmProps> = props => {
    return (
        <ModalPanel
            title={props.title}
            onToggleModal={props.onToggleModal}
            showModal={props.showModal}
            footer={
                <ModalConfirmActions
                    onConfirm={props.onConfirm}
                    onToggleModal={props.onToggleModal}
                />
            }>
            {props.children}
        </ModalPanel>
    );
};
