import * as React from 'react'
import * as classNames from 'classnames'
import { currencyFormat, roundOff } from '../../helpers/currencyHelper'

interface CurrencyProps {
    currency: number;
    className?: string;
    noCurrencyColor?: boolean;
    children?: React.ReactNode;
}

export const Currency = (props: CurrencyProps) => {
    let currencyColor: string = "";
    if (props.currency) {
        currencyColor = props.noCurrencyColor ? "" : props.currency < 0 ? "amount-debit" : (props.currency > 0 ? "amount-credit" : "");
    }
    return (
        <span className={classNames("currency text-highlight", props.className, currencyColor)}>
            {currencyFormat(roundOff(props.currency))}
            {props.children}
        </span>
    )
}

export const ApprovalMetric = (props: { metric: number, className?: string }) => {
    return (
        <label className={classNames("text-highlight", props.className)}>{roundOff(props.metric)}</label>
    );
}