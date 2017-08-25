import * as React from 'react'
import ModalPanel from '../../layout/ModalPanel'
import DebitCreditTransactionForm from './DebitCreditTransactionForm'

interface DebitCreditTransactionFormModalProps {
    onToggleModal: () => void;
    onSubmitTransaction: (transaction: CardPeak.Entities.DebitCreditTransaction) => void,
    agent: CardPeak.Entities.Agent
    showModal: boolean;
    transaction: string;
}

const DebitCreditTransactionFormModal = (props: DebitCreditTransactionFormModalProps) => {
    return (
        <ModalPanel showModal={props.showModal} onToggleModal={props.onToggleModal} title={props.transaction + " transaction"}>
            <DebitCreditTransactionForm
                agent={props.agent}
                onSubmitTransaction={props.onSubmitTransaction}
                transaction={props.transaction} />
        </ModalPanel>
    )
}

export default DebitCreditTransactionFormModal;