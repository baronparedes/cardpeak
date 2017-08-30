import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

interface ReferenceDetailRowLayoutProps {
    referenceTypeId?: number;
    reference?: CardPeak.Entities.Reference;
    onSaveReference?: (reference: CardPeak.Entities.Reference) => void;
    isLoading?: boolean;
    isHeader: boolean;
}

export default class ReferenceDetailRowLayout extends React.Component<ReferenceDetailRowLayoutProps, {}> {
    constructor(props: ReferenceDetailRowLayoutProps) {
        super(props);
    }
    handleOnClick = () => {
    }
    renderButton = () => {
        return (
            <Button onClick={this.handleOnClick} bsStyle="success" bsSize="sm">
                <i className="fa fa-lg fa-save"></i>
            </Button>
        )
    }
    render() {
        return (
            <Row className="agent-item">
                <Col md={2} lg={2} sm={3} xs={3}>
                    {this.props.isHeader ? "id" : this.props.reference.referenceId}
                </Col>
                <Col md={9} lg={9} sm={8} xs={8}>
                    {this.props.isHeader ? "description" : this.props.reference.description}
                </Col>
                <Col md={1} lg={1} sm={1} xs={1}>
                    {
                        this.props.isHeader ? "" : this.renderButton()
                    }
                </Col>
            </Row>
        )
    }
}
