import * as React from 'react'
import RatesContainer from './RatesContainer'
import { Panel } from 'react-bootstrap'

const DefaultRatesView = () => {
	return (
		<div>
			<h2>Default Rates</h2>
			<Panel>
				<RatesContainer selectedAgentId={0} selectedTypeId={20} defaultRate />
			</Panel>
		</div>
	)
}

export default DefaultRatesView;