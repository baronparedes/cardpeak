import * as React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList } from '../../layout'

import ApprovalTransactionDetail from './ApprovalTransactionDetail'
import ApprovalTransactionDetailRowLayout from './ApprovalTransactionDetailRowLayout'

interface ApprovalTransactionListProps {
    transactions?: CardPeak.Entities.ApprovalTransaction[]
}

export default class ApprovalTransactionList extends React.Component<ApprovalTransactionListProps, undefined> {
    constructor(props: ApprovalTransactionListProps) {
        super(props)
    }
    render() {
        return (
            <div>
                <GridList header={<ApprovalTransactionDetailRowLayout isHeader={true} />}>
                    {
                        this.props.transactions && this.props.transactions.length > 0 ?
                            this.props.transactions.map((transaction) => {
                                return (
                                    <ApprovalTransactionDetail transaction={transaction} key={transaction.id} />
                                )
                            }) : <ListNoRecordsRow />
                    }
                </GridList>
            </div>    
        )
    }
}