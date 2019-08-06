import * as React from 'react'
import { ModalPanel } from '../../layout'
import DebitCreditTransactionFormContainer from './DebitCreditTransactionFormContainer'

interface DebitCreditTransactionFormModalProps {
    onToggleModal: () => void;
    agent: CardPeak.Entities.Agent
    showModal: boolean;
    transaction: Transaction;
    showTransactionDate?: boolean
}

const DebitCreditTransactionFormModal = (props: DebitCreditTransactionFormModalProps) => {
    return (
        <ModalPanel showModal={props.showModal} onToggleModal={props.onToggleModal} title={props.transaction + " transaction"}>
            <DebitCreditTransactionFormContainer
                showTransactionDate={props.showTransactionDate}
                agent={props.agent}
                onTransactionSubmitted={props.onToggleModal}
                transaction={props.transaction} />
        </ModalPanel>
    )
}

export default DebitCreditTransactionFormModal;