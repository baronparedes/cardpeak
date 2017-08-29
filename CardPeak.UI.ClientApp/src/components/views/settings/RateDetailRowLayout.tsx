﻿import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

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
    render() {
        return (
            <Row className="agent-item">
                <Col md={4} lg={4} sm={4} xs={4}>
                    {this.props.isHeader ? "bank" : this.props.rate.bank.description}
                </Col>
                <Col md={4} lg={4} sm={3} xs={3}>
                    {this.props.isHeader ? "category" : this.props.rate.cardCategory.description}
                </Col>
                <Col md={3} lg={3} sm={3} xs={3}>
                    {this.props.isHeader ? "amount" : <span className="currency">{this.props.rate.amount}</span>}
                </Col>
                <Col md={1} lg={1} sm={1} xs={1}>
                    {
                        this.props.isHeader ? "" :
                            <Button onClick={this.handleOnClick} bsStyle="danger" bsSize="sm">
                                <i className="fa fa-lg fa-trash-o"></i>
                            </Button>
                    }
                </Col>
            </Row>
        )
    }
}
