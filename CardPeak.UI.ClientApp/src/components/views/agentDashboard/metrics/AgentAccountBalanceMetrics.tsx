import * as React from 'react'
import { Panel } from 'react-bootstrap'
import { AgentDashboardLabel } from './'

export const AgentAccountBalanceMetrics = (props: { accountBalance: number, savingsBalance: number }) => {
    return (
        <Panel className="text-right panel-agent-dashboard">
            <AgentDashboardLabel
                label="Account Balance"
                metrics={props.accountBalance}
                className={props.accountBalance < 0 ? "amount-debit" : (props.accountBalance !== 0 ? "amount-credit" : "")}
                isCurrency={true} />
            <AgentDashboardLabel
                label="Savings"
                metrics={props.savingsBalance}
                isCurrency={true} />
        </Panel>
    )
}