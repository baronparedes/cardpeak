import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { dateFormat } from '../../../helpers/dateHelpers'
import { Currency } from '../../layout'

interface DebitCreditTransactionDetailRowLayoutProps {
    transaction?: CardPeak.Entities.DebitCreditTransaction,
    isHeader: boolean
}

const DebitCreditTransactionDetailRowLayout = (props: DebitCreditTransactionDetailRowLayoutProps) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Debit/Credit Transactions</span>
            </Col>
            <Col md={8} lg={8} sm={8} xsHidden={props.isHeader}>
                {props.isHeader ? "remarks" : props.transaction.remarks}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "transaction date" : dateFormat(props.transaction.transactionDateTime)}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "amount" : <Currency className="row-amount" currency={props.transaction.amount} />}
            </Col>
        </Row>
    )
}

export default DebitCreditTransactionDetailRowLayout;