import * as React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const NotFound = () => {
    return (
        <div className="container-fluid text-center">
            <span className="text-highlight not-found">
                Sorry, that page doesn't exists!
            </span>
            <br />
            <label className="text-muted">404</label>
            <br />
            <p>
                The page you are trying to access has not been created
                yet.
            </p>
            <LinkContainer exact to="/">
                <Button bsSize="lg" bsStyle="primary">
                    <i className="fa fa-home fa-lg spacer-right"></i>
                    Take Me Home
                </Button>
            </LinkContainer>
        </div>
    );
};
