import * as React from 'react'
import * as classNames from 'classNames'
import { currencyFormat } from '../../helpers/currencyHelper'

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
            {currencyFormat(props.currency)}
            {props.children}
        </span>
    )
}