import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

interface ReferenceDetailRowLayoutProps {
    reference?: CardPeak.Entities.Reference;
    isHeader: boolean;
}

export default class ReferenceDetailRowLayout extends React.Component<ReferenceDetailRowLayoutProps, {}> {
    constructor(props: ReferenceDetailRowLayoutProps) {
        super(props);
    }
    render() {
        return (
            <Row className="agent-item">
                <Col md={2} lg={2} sm={3} xs={3}>
                    {this.props.isHeader ? "id" : this.props.reference.referenceId}
                </Col>
                <Col md={8} lg={8} sm={7} xs={7}>
                    {this.props.isHeader ? "description" : this.props.reference.description}
                </Col>
            </Row>
        )
    }
}
