import * as React from 'react'
import * as classNames from 'classnames'

interface AgentDashboardLabel {
    label: string,
    metrics?: number,
    isCurrency?: boolean,
    className?: string
}

export const AgentDashboardLabel: React.StatelessComponent<AgentDashboardLabel> = (props) => {
    return (
        <div>
            <label className="text-label text-muted spacer-right">
                {props.label}
            </label>
            <span className={classNames("text-highlight", (props.isCurrency ? "currency" : ""), props.className)}>
                {props.metrics ? props.metrics : 0}
            </span>
        </div>
    )
}