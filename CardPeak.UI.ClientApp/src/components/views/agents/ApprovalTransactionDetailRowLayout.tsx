import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

interface ApprovalTransactionDetailRowLayoutProps {
    transaction?: CardPeak.Entities.ApprovalTransaction,
    isHeader: boolean
}

export default class ApprovalTransactionDetailRowLayout extends React.Component<ApprovalTransactionDetailRowLayoutProps, {}> {
    constructor(props: ApprovalTransactionDetailRowLayoutProps) {
        super(props);
    }
    handleOnClick = () => {
        console.log('search date range')
    }
    render() {
        return (
            <Row>
                <Col mdHidden
                    lgHidden
                    smHidden
                    xsHidden={!this.props.isHeader}>
                    <span className="text-center spacer-left">Approval Transactions</span>
                </Col>
                <Col md={2} lg={2} sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "bank" : "Metrobank"}
                </Col>
                <Col md={2} lg={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "card category" : "Classic"}
                </Col>
                <Col md={2} lg={2} sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "product" : this.props.transaction.productType}
                </Col>
                <Col md={2} lg={2} smHidden xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "client" : this.props.transaction.client}
                </Col>
                <Col md={2} lg={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "approval date" : this.props.transaction.approvalDate}
                </Col>
                <Col md={2} lg={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "amount" : <span className="currency text-highlight">{this.props.transaction.amount}</span>}
                </Col>
            </Row>
        )
    }
}