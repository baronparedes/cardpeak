import * as React from 'react'
import * as concat from 'classnames'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { DataList, DataListProps, DataItemProps } from '../../layout'
import { dateFormat } from '../../../helpers/dateHelpers'
import { Currency } from '../../layout'
import { TransactionType } from '../../../constants/enums'

type AgentDashboardTransactionDataList = new () => DataList<CardPeak.Entities.AgentDashboardTransaction>;
const AgentDashboardTransactionDataList = DataList as AgentDashboardTransactionDataList;

const AgentDashboardTransactionListRowLayout = (props: DataItemProps<CardPeak.Entities.AgentDashboardTransaction>) => {
    return (
        <Row>
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Transactions</span>
            </Col>
            <Col sm={6} xsHidden={props.isHeader}>
                {props.isHeader ? "details" : props.item.details}
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "transaction date" : dateFormat(props.item.transactionDate)}
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "transaction amount" : <Currency className="row-amount" currency={props.item.transactionAmount}
                    noCurrencyColor={props.item.transactionType === TransactionType.ApprovalTransaction} />}
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "running balance" : <Currency className="row-amount" currency={props.item.runningBalance} />}
            </Col>
        </Row>
    )
}

const AgentDashboardTransactionList = (props: DataListProps<CardPeak.Entities.AgentDashboardTransaction>) => {
    return (
        <div>
            <AgentDashboardTransactionDataList
                pageSize={10}
                isLoading={props.isLoading}
                renderHeader={() => { return <AgentDashboardTransactionListRowLayout isHeader /> }}
                renderItem={(item, key) => { return <AgentDashboardTransactionListRowLayout item={item} key={key} /> }}
                data={props.data} />
        </div>
    )
}

export default AgentDashboardTransactionList