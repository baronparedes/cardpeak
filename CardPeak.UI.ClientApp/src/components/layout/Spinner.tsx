import * as React from 'react'
import { Row, Col } from 'react-bootstrap'

export const Spinner = () => {
    return <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>;
}

export const SpinnerGrid = () => {
    return (
        <Row>
            <Col className="text-center">
                <Spinner />
            </Col>
        </Row>
    );
}