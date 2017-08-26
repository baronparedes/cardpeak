import * as React from 'react'
import { ModalPanel } from '../../layout'
import DebitCreditTransactionForm from './DebitCreditTransactionForm'

interface DebitCreditTransactionFormModalProps {
    onToggleModal: () => void;
    agent: CardPeak.Entities.Agent
    showModal: boolean;
    transaction: string;
}

const DebitCreditTransactionFormModal = (props: DebitCreditTransactionFormModalProps) => {
    return (
        <ModalPanel showModal={props.showModal} onToggleModal={props.onToggleModal} title={props.transaction + " transaction"}>
            <DebitCreditTransactionForm
                agent={props.agent}
                onTransactionSubmitted={props.onToggleModal}
                transaction={props.transaction} />
        </ModalPanel>
    )
}

export default DebitCreditTransactionFormModal;