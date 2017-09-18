import * as React from 'react'
import * as classNames from 'classnames'

interface DashboardLabelProps {
    label: string;
    addOn?: React.ReactNode
    metrics?: number;
    isCurrency?: boolean;
    className?: string;
    noCurrencyColor?: boolean;
}

export const DashboardLabel: React.StatelessComponent<DashboardLabelProps> = (props) => {
    let currencyColor = props.isCurrency && props.metrics < 0 ? "amount-debit" : (props.isCurrency && props.metrics !== 0 ? "amount-credit" : "");
    const currency = props.isCurrency ? "currency" : "";
    if (props.noCurrencyColor) {
        currencyColor = "";
    }
    return (
        <div>
            <label className="text-label text-muted spacer-right dashboard-label">
                {props.label}
            </label>
            <span className={classNames("text-highlight", currency, currencyColor, props.className)}>
                {props.metrics ? props.metrics : 0}
                {props.addOn}
            </span>
        </div>
    )
}