import * as React from 'react'
import ApprovalTransactionList from '../transactions/ApprovalTransactionList'
import DebitCreditTransactionList from '../transactions//DebitCreditTransactionList'


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
                <DebitCreditTransactionList transactions={this.props.agentDashboard.debitCreditTransactions} />
                <br />
                <ApprovalTransactionList transactions={this.props.agentDashboard.approvalTransactions} />
            </div>
        )
    }
}
