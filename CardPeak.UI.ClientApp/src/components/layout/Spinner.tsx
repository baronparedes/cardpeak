import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

export const Spinner = () => {
    return <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>;
};

export const SpinnerRow = () => {
    return (
        <Row>
            <Col className="text-center">
                <Spinner />
            </Col>
        </Row>
    );
};

export const SpinnerBlock = () => {
    return (
        <div className="container-fluid text-center">
            <SpinnerRow />
        </div>
    );
};
