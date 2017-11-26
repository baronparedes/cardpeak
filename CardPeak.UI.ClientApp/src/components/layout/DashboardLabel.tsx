import * as React from 'react'
import * as concat from 'classnames'
import { Currency } from './'

interface DashboardLabelProps {
    label: string;
    addOn?: React.ReactNode
    metrics?: number;
    isCurrency?: boolean;
    className?: string;
    noCurrencyColor?: boolean;
}

export const DashboardLabel: React.StatelessComponent<DashboardLabelProps> = (props) => {
    return (
        <div>
            <label className="text-label text-muted dashboard-label">
                {props.label}
            </label>
            {
                props.isCurrency ?
                    <Currency noCurrencyColor={props.noCurrencyColor} className={props.className} currency={props.metrics}>
                        {props.addOn}
                    </Currency> :
                    <span className={concat("text-highlight", props.className)}>
                        {props.metrics ? (Math.round(props.metrics * 100) / 100) : 0}
                        {props.addOn}
                    </span>
            }
        </div>
    )
}