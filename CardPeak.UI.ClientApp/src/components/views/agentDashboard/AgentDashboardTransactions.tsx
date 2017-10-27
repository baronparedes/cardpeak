import * as React from 'react'
import { Toggle } from '../../layout'
import ApprovalTransactionList from '../transactions/ApprovalTransactionList'
import DebitCreditTransactionList from '../transactions//DebitCreditTransactionList'
import IncentiveTransactionList from '../transactions//IncentiveTransactionList'
import AgentDashboardTransactionList from '../transactions/AgentDashboardTransactionList'

interface AgentDashboardTransactionsProps {
    agentDashboard: CardPeak.Entities.AgentDashboard
}

interface AgentDashboardTransactionsState {
    transactionView?: boolean
}

export default class AgentDashboardTransactions extends React.Component<AgentDashboardTransactionsProps, AgentDashboardTransactionsState> {
    constructor(props: AgentDashboardTransactionsProps) {
        super(props);
        this.state = {
            transactionView: true
        }
    }
    renderSplitView() {
        return (
            <div>
                <DebitCreditTransactionList data={this.props.agentDashboard.debitCreditTransactions} />
                <br />
                <IncentiveTransactionList data={this.props.agentDashboard.incentiveTransactions} />
                <br />
                <ApprovalTransactionList data={this.props.agentDashboard.approvalTransactions} hideSearchBar />
            </div>
        )
    }
    renderTransactionView() {
        return (
            <div>
                <AgentDashboardTransactionList data={this.props.agentDashboard.agentDashboardTransactions} />
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className="text-right spacer-bottom">
                    <Toggle
                        isToggled={this.state.transactionView}
                        toggleOnLabel="Transaction"
                        toggleOffLabel="Split"
                        onToggle={(on: boolean) => this.setState({ transactionView: on })} />
                </div>
                { this.state.transactionView ? this.renderTransactionView() : this.renderSplitView() }
            </div>
        )
    }
}
