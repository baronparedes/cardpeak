import * as React from 'react'
import * as concat from 'classnames'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { DataList, DataListProps, DataItemProps } from '../../layout'
import { dateFormat } from '../../../helpers/dateHelpers'
import { Currency } from '../../layout'

type DebitCreditTransactionDataList = new () => DataList<CardPeak.Entities.DebitCreditTransaction>;
const DebitCreditTransactionDataList = DataList as DebitCreditTransactionDataList;

const DebitCreditTransactionListRowLayout = (props: DataItemProps<CardPeak.Entities.DebitCreditTransaction>) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Debit/Credit Transactions</span>
            </Col>
            <Col md={8} lg={8} sm={8} xsHidden={props.isHeader}>
                {props.isHeader ? "debit/credit" : props.item.remarks}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "transaction date" : dateFormat(props.item.transactionDateTime)}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "amount" : <Currency className="row-amount" currency={props.item.amount} />}
            </Col>
        </Row>
    )
}

const DebitCreditTransactionList = (props: DataListProps<CardPeak.Entities.DebitCreditTransaction>) => {
    return (
        <div>
            <DebitCreditTransactionDataList
                pageSize={props.pageSize}
                isLoading={props.isLoading}
                renderHeader={() => { return <DebitCreditTransactionListRowLayout isHeader /> }}
                renderItem={(item, key) => { return <DebitCreditTransactionListRowLayout item={item} key={key} /> }}
                data={props.data} />
        </div>
    )
}

export default DebitCreditTransactionList