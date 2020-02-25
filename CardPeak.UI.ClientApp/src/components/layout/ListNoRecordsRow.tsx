import * as React from 'react';
import { Row } from 'react-bootstrap';

export const ListNoRecordsRow = () => {
    return (
        <Row className="text-center">
            <label className="text-muted">No Records</label>
        </Row>
    );
};
