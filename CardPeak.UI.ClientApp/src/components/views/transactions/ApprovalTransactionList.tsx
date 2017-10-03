import * as React from 'react'
import * as concat from 'classnames'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { DataList, DataListProps, DataItemProps } from '../../layout'
import { dateFormat } from '../../../helpers/dateHelpers'
import { Currency } from '../../layout'

type ApprovalTransactionDataList = new () => DataList<CardPeak.Entities.ApprovalTransaction>;
const ApprovalTransactionDataList = DataList as ApprovalTransactionDataList;

interface ApprovalTransactionListProps {
    showAgent?: boolean;
    hideAmount?: boolean;
}

const ApprovalTransactionListRowLayout = (props: DataItemProps<CardPeak.Entities.ApprovalTransaction> & ApprovalTransactionListProps) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Approval Transactions</span>
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "bank" : props.item.bank.description}
            </Col>
            <Col md={1} lg={1} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "card category" : props.item.cardCategory.description}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "product" : props.item.productType}
            </Col>
            <Col md={3} lg={3} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "client" : props.item.client}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "approval date" : dateFormat(props.item.approvalDate)}
            </Col>
            {
                props.hideAmount ? null :
                    <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                        {props.isHeader ? "amount" : <Currency className="row-amount" noCurrencyColor currency={props.item.amount} />}
                    </Col>
            }
            {
                !props.showAgent || props.isHeader ? null :
                    <Col md={12} lg={12} sm={12} xs={12}>
                        <label className="text-muted text-small spacer-right">credited to</label>
                        <span className="text-highlight text-small">{concat(props.item.agent.firstName, " ", props.item.agent.lastName)}</span>
                    </Col>
            }
        </Row>
    )
}

const ApprovalTransactionList = (props: DataListProps<CardPeak.Entities.ApprovalTransaction> & ApprovalTransactionListProps) => {
    return (
        <div>
            <ApprovalTransactionDataList
                paged
                isLoading={props.isLoading}
                renderHeader={() => { return <ApprovalTransactionListRowLayout isHeader hideAmount={props.hideAmount} /> }}
                renderItem={(item, key) => { return <ApprovalTransactionListRowLayout item={item} key={key} showAgent={props.showAgent} hideAmount={props.hideAmount} /> }}
                data={props.data} />
        </div>
    )
}

export default ApprovalTransactionList