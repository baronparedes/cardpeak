import * as React from 'react'
import { Panel } from 'react-bootstrap'
import RateDetailRowLayout from './RateDetailRowLayout'

interface RateDetailProps {
    rate: CardPeak.Entities.Rate;
    onDeleteRate: (rate: CardPeak.Entities.Rate) => void;
    onSelectRate: (rate: CardPeak.Entities.Rate) => void;
}

const RateDetail = (props: RateDetailProps) => {
    return (
        <Panel className="panel-row">
            <RateDetailRowLayout
                rate={props.rate}
                onDeleteRate={props.onDeleteRate}
                onSelectRate={props.onSelectRate}
                isHeader={false} />
        </Panel>
    )
}
export default RateDetail;