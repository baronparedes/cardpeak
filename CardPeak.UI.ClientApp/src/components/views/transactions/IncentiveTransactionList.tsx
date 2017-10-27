import * as React from 'react'
import * as concat from 'classnames'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { DataList, DataListProps, DataItemProps } from '../../layout'
import { dateFormat } from '../../../helpers/dateHelpers'
import { Currency } from '../../layout'

type IncentiveTransactionDataList = new () => DataList<CardPeak.Entities.DebitCreditTransaction>;
const IncentiveTransactionDataList = DataList as IncentiveTransactionDataList;

const IncentiveTransactionListRowLayout = (props: DataItemProps<CardPeak.Entities.DebitCreditTransaction>) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Incentives Transactions</span>
            </Col>
            <Col md={8} lg={8} sm={8} xsHidden={props.isHeader}>
                {props.isHeader ? "incentives" : props.item.remarks}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "transaction date" : dateFormat(props.item.transactionDateTime)}
            </Col>
            <Col md={2} lg={2} sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "amount" : <Currency className="row-amount amount-incentive" currency={props.item.amount} noCurrencyColor />}
            </Col>
        </Row>
    )
}

const IncentiveTransactionList = (props: DataListProps<CardPeak.Entities.DebitCreditTransaction>) => {
    return (
        <div>
            <IncentiveTransactionDataList
                pageSize={10}
                isLoading={props.isLoading}
                renderHeader={() => { return <IncentiveTransactionListRowLayout isHeader /> }}
                renderItem={(item, key) => { return <IncentiveTransactionListRowLayout item={item} key={key} /> }}
                data={props.data} />
        </div>
    )
}

export default IncentiveTransactionList