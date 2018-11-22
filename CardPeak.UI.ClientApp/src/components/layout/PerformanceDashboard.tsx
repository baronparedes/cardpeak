import * as React from 'react'
import * as concat from 'classnames'
import { currencyFormat, roundOff } from '../../helpers/currencyHelper'
import { Grid, Row, Col } from 'react-bootstrap'
import { DashboardLabel } from './'

const Performance = (props: { perf: CardPeak.Entities.ApprovalMetric<string>, compareUnits: number, hideAmount?: boolean}) => {
	let caret = null;
	if (props.compareUnits > props.perf.value && props.perf.value !== 0) {
		caret = <i className="perf-down fa fa-caret-down spacer-left"></i>
	}
	else if (props.compareUnits < props.perf.value) {
		caret = <i className="perf-up fa fa-caret-up spacer-left"></i>
	}

	return (
		<div className="spacer-bottom-2x">
			<label className={concat("text-label text-muted dashboard-label")}>
				{props.perf.key}
			</label>
			<span className="text-highlight">
				{props.perf.value ? roundOff(props.perf.value) : 0}
				{caret}
			</span>
			<span className="block">
			{
				props.hideAmount ? null :
					props.perf.amount === 0 ? <span>-</span> :
						<span className="currency text-highlight text-medium">{currencyFormat(roundOff(props.perf.amount))}</span>
			}
			</span>
		</div>
	)
}

export const PerformanceDashboard = (props: { performance?: CardPeak.Entities.ApprovalMetric<string>[], hideAmount?: boolean }) => {
	let row = 0;
	if (!props.performance) {
		return null;
	}
	return (
		<Grid fluid>
			<Row>
				{
					props.performance.map(_ => {
						const compareRow = row === 0 ? 0 : row - 1;
						let perf = <Performance perf={props.performance[row]} compareUnits={props.performance[compareRow].value} hideAmount={props.hideAmount} />
						row++
						return (
							<Col sm={2} xs={4} key={row} className="no-padding">
								{perf}
							</Col>
						);
					})
				}
			</Row>
		</Grid>
	)
}
