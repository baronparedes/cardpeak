import * as React from 'react'
import RatesContainer from './RatesContainer'

const DefaultRatesView = () => {
    return (
        <div>
            <h2>Default Rates</h2>
            <RatesContainer selectedAgentId={0} />
        </div>
    )
}

export default DefaultRatesView;