import * as React from 'react'
import { Panel } from 'react-bootstrap'
import { DashboardLabel } from '../../../layout'

export const AgentAccountBalanceMetrics = (props: { accountBalance: number, savingsBalance: number }) => {
    return (
        <Panel className="text-right panel-agent-dashboard">
            <DashboardLabel
                label="Savings"
                metrics={props.savingsBalance}
                noCurrencyColor
                isCurrency={true} />
            <DashboardLabel
                label="Account Balance"
                metrics={props.accountBalance}
                isCurrency={true} />
        </Panel>
    )
}