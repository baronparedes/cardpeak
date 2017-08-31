import * as React from 'react'
import TransactionsContainer from './TransactionsContainer'

const TransactionsView = () => {
    return (
        <div>
            <h2>Transaction History</h2>
            <TransactionsContainer />
        </div>
    )
}

export default TransactionsView;