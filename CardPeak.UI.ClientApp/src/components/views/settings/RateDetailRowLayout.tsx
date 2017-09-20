import * as React from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { HighlightedSpan } from '../../layout'
import { currencyFormat } from '../../../helpers/currencyHelper'

interface RateDetailRowLayoutProps {
    rate?: CardPeak.Entities.Rate,
    onDeleteRate?: (rate: CardPeak.Entities.Rate) => void;
    onSelectRate?: (rate: CardPeak.Entities.Rate) => void;
    isHeader: boolean
}

export default class RateDetailRowLayout extends React.Component<RateDetailRowLayoutProps, {}> {
    constructor(props: RateDetailRowLayoutProps) {
        super(props);
    }
    handleOnDeleteRate = () => {
        if (this.props.onDeleteRate) {
            this.props.onDeleteRate(this.props.rate);
        }
    }
    handleOnSelectRate = () => {
        console.log(this.props.rate);
        if (this.props.onSelectRate) {
            this.props.onSelectRate(this.props.rate);
        }
    }
    renderButton = () => {
        let deleteButton = (
            <Button onClick={this.handleOnDeleteRate} bsStyle="danger" bsSize="sm">
                <i className="fa fa-lg fa-trash-o"></i>
            </Button>
        );
        if (this.props.rate.agentId === 0) {
            deleteButton = null;
        }
        return (
            <ButtonGroup>
                <Button onClick={this.handleOnSelectRate} bsStyle="primary" bsSize="sm">
                    <i className="fa fa-lg fa-hand-pointer-o"></i>
                </Button>
                {deleteButton}
            </ButtonGroup>
        )
    }
    render() {
        return (
            <Row className="agent-item">
                <Col mdHidden
                    lgHidden
                    smHidden
                    xsHidden={!this.props.isHeader}>
                    <span className="grid-label text-center spacer-left">Rates</span>
                </Col>
                <Col sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "bank" : this.props.rate.bank.description}
                </Col>
                <Col sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "category" : this.props.rate.cardCategory.description}
                </Col>
                <Col sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "amount" : <HighlightedSpan className="currency" value={currencyFormat(this.props.rate.amount)} />}
                </Col>
                <Col sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "savings" : <HighlightedSpan className="currency" value={currencyFormat(this.props.rate.savingsAmount)} />}
                </Col>
                <Col sm={2}>
                    {
                        this.props.isHeader ? "" : this.renderButton()
                    }
                </Col>
            </Row>
        )
    }
}
