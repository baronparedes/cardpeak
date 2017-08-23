import * as React from 'react'
import { Panel } from 'react-bootstrap'
import ApprovalTransactionDetailRowLayout from './ApprovalTransactionDetailRowLayout'

interface ApprovalTransactionDetailProps {
    transaction: CardPeak.Entities.ApprovalTransaction
}

const ApprovalTransactionDetail = (props: ApprovalTransactionDetailProps) => {
    return (
        <Panel className="panel-row">
            <ApprovalTransactionDetailRowLayout
                transaction={props.transaction}
                isHeader={false} />
        </Panel>
    )
}

export default ApprovalTransactionDetail;