import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { dateFormat } from '../../../helpers/dateHelpers'
import * as concat from 'classnames'
import { Currency } from '../../layout'

interface ApprovalTransactionDetailRowLayoutProps {
    transaction?: CardPeak.Entities.ApprovalTransaction,
    isHeader: boolean,
    showAgent?: boolean
}

const ApprovalTransactionDetailRowLayout = (props: ApprovalTransactionDetailRowLayoutProps) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Approval Transactions</span>
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "bank" : props.transaction.bank.description}
            </Col>
            <Col md={1} lg={1} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "card category" : props.transaction.cardCategory.description}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "product" : props.transaction.productType}
            </Col>
            <Col md={3} lg={3} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "client" : props.transaction.client}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "approval date" : dateFormat(props.transaction.approvalDate)}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "amount" : <Currency className="row-amount" noCurrencyColor currency={props.transaction.amount} />}
            </Col>
            {
                !props.showAgent || props.isHeader ? null :
                    <Col md={12} lg={12} sm={12} xs={12}>
                        <label className="text-muted text-small spacer-right">credited to</label>
                        <span className="text-highlight text-small">{concat(props.transaction.agent.lastName, ", ", props.transaction.agent.firstName)}</span>
                    </Col>
            }
        </Row>
    )
}

export default ApprovalTransactionDetailRowLayout;