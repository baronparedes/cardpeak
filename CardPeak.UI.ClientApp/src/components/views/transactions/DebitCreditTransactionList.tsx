import * as React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList } from '../../layout'

import DebitCreditTransactionDetail from './DebitCreditTransactionDetail'
import DebitCreditTransactionDetailRowLayout from './DebitCreditTransactionDetailRowLayout'

interface DebitCreditTransactionListProps {
    transactions?: CardPeak.Entities.DebitCreditTransaction[]
}

export default class DebitCreditTransactionList extends React.Component<DebitCreditTransactionListProps, undefined> {
    constructor(props: DebitCreditTransactionListProps) {
        super(props)
    }
    render() {
        return (
            <div>
                <GridList header={<DebitCreditTransactionDetailRowLayout isHeader={true} />}>
                    {
                        this.props.transactions && this.props.transactions.length > 0 ?
                            this.props.transactions.map((transaction) => {
                                return (
                                    <DebitCreditTransactionDetail transaction={transaction} key={transaction.id} />
                                )
                            }) : <ListNoRecordsRow />
                    }
                </GridList>
            </div>
        )
    }
}