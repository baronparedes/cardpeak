import * as React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { SpinnerGrid } from '../../layout/Spinner'

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
                <Grid fluid className="grid-header text-muted no-padding">
                    <Panel className="panel-row-header">
                        <DebitCreditTransactionDetailRowLayout isHeader={true} />
                    </Panel>
                </Grid>
                <Grid fluid className="grid-rows margin-top no-padding">
                    {
                        this.props.transactions && this.props.transactions.length > 0 ?
                            this.props.transactions.map((transaction) => {
                                return (
                                    <DebitCreditTransactionDetail transaction={transaction} key={transaction.id} />
                                )
                            }) : null
                    }
                </Grid>
            </div>
        )
    }
}