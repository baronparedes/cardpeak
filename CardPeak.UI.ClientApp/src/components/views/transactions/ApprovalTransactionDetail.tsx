import * as React from 'react'
import { Panel } from 'react-bootstrap'
import ApprovalTransactionDetailRowLayout from './ApprovalTransactionDetailRowLayout'

interface ApprovalTransactionDetailProps {
    transaction: CardPeak.Entities.ApprovalTransaction,
    showAgent?: boolean
}

const ApprovalTransactionDetail = (props: ApprovalTransactionDetailProps) => {
    return (
        <Panel className="panel-row">
            <ApprovalTransactionDetailRowLayout
                showAgent={props.showAgent}
                transaction={props.transaction}
                isHeader={false} />
        </Panel>
    )
}

export default ApprovalTransactionDetail;