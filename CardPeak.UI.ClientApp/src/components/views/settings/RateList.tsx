import * as React from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { DataList, DataListProps, DataItemProps, HighlightedSpan } from '../../layout'
import { currencyFormat } from '../../../helpers/currencyHelper'

type RateDataList = new () => DataList<CardPeak.Entities.Rate>;
const RateDataList = DataList as RateDataList;

interface RateListProps {
    agentId?: number
    onDeleteRate?: (rate: CardPeak.Entities.Rate) => void;
    onSelectRate?: (rate: CardPeak.Entities.Rate) => void;
}

const RateListRowActions = (props: { rate: CardPeak.Entities.Rate } & RateListProps) => {
    let deleteButton = (
        <Button onClick={() => { props.onDeleteRate(props.rate) }} bsStyle="danger" bsSize="sm">
            <i className="fa fa-lg fa-trash-o"></i>
        </Button>
    );
    if (props.rate.agentId === 0) {
        deleteButton = null;
    }
    return (
        <ButtonGroup>
            <Button onClick={() => { props.onSelectRate(props.rate) }} bsStyle="primary" bsSize="sm">
                <i className="fa fa-lg fa-hand-pointer-o"></i>
            </Button>
            {deleteButton}
        </ButtonGroup>
    )
}

const RateListRowLayout = (props: DataItemProps<CardPeak.Entities.Rate> & RateListProps) => {
    return (
        <Row className="agent-item">
            <Col mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}>
                <span className="grid-label text-center spacer-left">Rates</span>
            </Col>
            <Col sm={3} xsHidden={props.isHeader}>
                {props.isHeader ? "bank" : props.item.bank.description}
            </Col>
            <Col sm={3} xsHidden={props.isHeader}>
                {props.isHeader ? "category" : props.item.cardCategory.description}
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "amount" : <HighlightedSpan className="currency" value={currencyFormat(props.item.amount)} />}
            </Col>
            <Col sm={2} xsHidden={props.isHeader}>
                {props.isHeader ? "savings" : <HighlightedSpan className="currency" value={currencyFormat(props.item.savingsAmount)} />}
            </Col>
            <Col sm={2}>
                {
                    props.isHeader ? "" : <RateListRowActions rate={props.item} onDeleteRate={props.onDeleteRate} onSelectRate={props.onSelectRate} />
                }
            </Col>
        </Row>
    )
}

const RateList = (props: DataListProps<CardPeak.Entities.Rate> & RateListProps) => {
    return (
        <div>
            <RateDataList
                isLoading={props.isLoading}
                renderHeader={() => { return <RateListRowLayout isHeader /> }}
                renderItem={(item, key) => {
                    return (
                        <RateListRowLayout
                            {...props as RateListProps}
                            item={item}
                            key={key} />
                    )
                }}
                data={props.data} />
        </div>
    )
}

export default RateList