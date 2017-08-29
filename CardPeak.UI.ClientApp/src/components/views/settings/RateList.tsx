import * as React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { GridList, SpinnerRow, ListNoRecordsRow } from '../../layout'
import RateDetail from './RateDetail'
import RateDetailRowLayout from './RateDetailRowLayout'

interface RateListProps {
    agentId?: number,
    isLoading?: boolean,
    rates?: CardPeak.Entities.Rate[],
    onDeleteRate?: (rate: CardPeak.Entities.Rate) => void
}

const RateListItems = (props: RateListProps) => {
    return (
        <GridList header={<RateDetailRowLayout isHeader={true} />}>
            {
                props.isLoading ?
                    <SpinnerRow /> :
                    props.rates && props.rates.length > 0 ?
                        props.rates.map((rate) => {
                            return (
                                <RateDetail rate={rate} key={rate.rateId} onDeleteRate={props.onDeleteRate} />
                            )
                        }) : <ListNoRecordsRow />
            }
        </GridList>
    )
}

const RateList = (props: RateListProps) => {
    return (
        <div>
            <RateListItems
                isLoading={props.isLoading}
                rates={props.rates}
                onDeleteRate={props.onDeleteRate} />
        </div>
    )
}

export default RateList