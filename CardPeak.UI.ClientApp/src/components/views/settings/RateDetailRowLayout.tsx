import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { HighlightedSpan } from '../../layout'
import { currencyFormat } from '../../../helpers/currencyHelper'

interface RateDetailRowLayoutProps {
    rate?: CardPeak.Entities.Rate,
    onDeleteRate?: (rate: CardPeak.Entities.Rate) => void;
    isHeader: boolean
}

export default class RateDetailRowLayout extends React.Component<RateDetailRowLayoutProps, {}> {
    constructor(props: RateDetailRowLayoutProps) {
        super(props);
    }
    handleOnClick = () => {
        this.props.onDeleteRate(this.props.rate);
    }
    renderButton = () => {
        if (this.props.rate.agentId === 0) {
            return null;
        }
        return (
            <Button onClick={this.handleOnClick} bsStyle="danger" bsSize="sm">
                <i className="fa fa-lg fa-trash-o"></i>
            </Button>
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
                <Col sm={2}
                    lgHidden={!this.props.isHeader && this.props.rate.agentId === 0}
                    mdHidden={!this.props.isHeader && this.props.rate.agentId === 0}
                    smHidden={!this.props.isHeader && this.props.rate.agentId === 0}
                    xsHidden={this.props.isHeader || this.props.rate.agentId === 0}>
                    {
                        this.props.isHeader ? "" : this.renderButton()
                    }
                </Col>
            </Row>
        )
    }
}
