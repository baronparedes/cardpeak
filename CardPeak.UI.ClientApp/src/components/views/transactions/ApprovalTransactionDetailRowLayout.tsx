import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { dateFormat } from '../../../helpers/dateHelpers'

interface ApprovalTransactionDetailRowLayoutProps {
    transaction?: CardPeak.Entities.ApprovalTransaction,
    isHeader: boolean
}

const ApprovalTransactionDetailRowLayout = (props: ApprovalTransactionDetailRowLayoutProps) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="text-center spacer-left">Approval Transactions</span>
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "bank" : props.transaction.bank.description}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "card category" : props.transaction.cardCategory.description}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "product" : props.transaction.productType}
            </Col>
            <Col md={3} lg={3} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "client" : props.transaction.client}
            </Col>
            <Col md={1} lg={1} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "approval date" : dateFormat(props.transaction.approvalDate)}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "amount" : <span className="row-amount currency text-highlight">{props.transaction.amount}</span>}
            </Col>
        </Row>
    )
}

export default ApprovalTransactionDetailRowLayout;