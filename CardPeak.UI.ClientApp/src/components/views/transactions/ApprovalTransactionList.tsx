import * as React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { SpinnerGrid } from '../../layout/Spinner'
import ListNoRecordsRow from '../../layout/ListNoRecordsRow'

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
                <Grid fluid className="grid-header text-muted no-padding">
                    <Panel className="panel-row-header">
                        <ApprovalTransactionDetailRowLayout isHeader={true} />
                    </Panel>
                </Grid>
                <Grid fluid className="grid-rows margin-top no-padding">
                    {
                        this.props.transactions && this.props.transactions.length > 0 ?
                            this.props.transactions.map((transaction) => {
                                return (
                                    <ApprovalTransactionDetail transaction={transaction} key={transaction.id} />
                                )
                            }) : null
                    }
                    {
                        this.props.transactions.length === 0 ? 
                            <ListNoRecordsRow />
                            : null
                    }
                </Grid>
            </div>    
        )
    }
}