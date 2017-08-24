import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { dateFormat } from '../../../helpers/dateHelpers'

interface DebitCreditTransactionDetailRowLayoutProps {
    transaction?: CardPeak.Entities.DebitCreditTransaction,
    isHeader: boolean
}

export default class DebitCreditTransactionDetailRowLayout extends React.Component<DebitCreditTransactionDetailRowLayoutProps, {}> {
    constructor(props: DebitCreditTransactionDetailRowLayoutProps) {
        super(props);
    }
    handleOnClick = () => {
        console.log('search date range')
    }
    render() {
        let amountClassNames = "currency text-highlight";
        if (!this.props.isHeader) {
            amountClassNames += (this.props.transaction.amount > 0) ? " amount-credit" : " amount-debit";
        }
        return (
            <Row>
                <Col mdHidden
                    lgHidden
                    smHidden
                    xsHidden={!this.props.isHeader}>
                    <span className="text-center spacer-left">Debit/Credit Transactions</span>
                </Col>
                <Col md={8} lg={8} sm={8} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "remarks" : this.props.transaction.remarks}
                </Col>
                <Col md={2} lg={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "transaction date" : dateFormat(this.props.transaction.transactionDateTime)}
                </Col>
                <Col md={2} lg={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "amount" : <span className={amountClassNames}>{this.props.transaction.amount}</span>}
                </Col>
            </Row>
        )
    }
}