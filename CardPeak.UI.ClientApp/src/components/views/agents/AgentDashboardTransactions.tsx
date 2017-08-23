import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import ApprovalTransactionList from './ApprovalTransactionList'
import DebitCreditTransactionList from './DebitCreditTransactionList'


interface AgentDashboardTransactionsProps {
    agentDashboard: CardPeak.Entities.AgentDashboard
}

export default class AgentDashboardTransactions extends React.Component<AgentDashboardTransactionsProps, {}> {
    constructor(props: AgentDashboardTransactionsProps) {
        super(props);
    }
    render() {
        return (
            <div>
                <ApprovalTransactionList transactions={this.props.agentDashboard.approvalTransactions} />
                <br />
                <DebitCreditTransactionList transactions={this.props.agentDashboard.debitCreditTransactions} />
            </div>
        )
    }
}
