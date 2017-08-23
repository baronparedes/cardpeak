import * as React from 'react'
import { Panel } from 'react-bootstrap'
import DebitCreditTransactionDetailRowLayout from './DebitCreditTransactionDetailRowLayout'

interface DebitCreditTransactionDetailProps {
    transaction: CardPeak.Entities.DebitCreditTransaction
}

const DebitCreditTransactionDetail = (props: DebitCreditTransactionDetailProps) => {
    return (
        <Panel className={"panel-row " + ((props.transaction.amount < 0) ? "panel-debit" : "panel-credit")}>
            <DebitCreditTransactionDetailRowLayout
                transaction={props.transaction}
                isHeader={false} />
        </Panel>
    )
}

export default DebitCreditTransactionDetail;