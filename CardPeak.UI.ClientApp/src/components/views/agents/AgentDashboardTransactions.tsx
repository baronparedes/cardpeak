import * as React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import ApprovalTransactionList from './ApprovalTransactionList'

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
            </div>
        )
    }
}
