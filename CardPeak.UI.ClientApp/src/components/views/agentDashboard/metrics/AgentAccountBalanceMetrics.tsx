import * as React from 'react'
import { Panel } from 'react-bootstrap'
import { DashboardLabel } from '../../../layout'

export const AgentAccountBalanceMetrics = (props: { accountBalance: number, savingsBalance: number, incentivesBalance: number }) => {
    return (
        <Panel className="panel-label-dashboard">
            <DashboardLabel
                className="pull-right"
                label="Account Balance"
                metrics={props.accountBalance}
                isCurrency />
            <DashboardLabel
                className="pull-right"
                label="Savings"
                metrics={props.savingsBalance}
                noCurrencyColor
                isCurrency />
            <DashboardLabel
                className="pull-right amount-incentive"
                label="incentives"
                metrics={props.incentivesBalance}
                noCurrencyColor
                isCurrency />
        </Panel>
    )
}