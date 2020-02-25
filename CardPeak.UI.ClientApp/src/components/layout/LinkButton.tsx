import * as H from 'history';
import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

export interface NavigationProps<P> {
    match?: match<P>;
    history?: H.History;
}

export const LinkButton: React.StatelessComponent<{
    to: string;
    button: React.ReactNode;
}> = props => {
    return (
        <ButtonGroup>
            <Link to={props.to}>{props.button}</Link>
        </ButtonGroup>
    );
};

export const BatchLinkButton: React.StatelessComponent<{
    id: number;
}> = props => {
    return (
        <LinkButton
            to={'/transactions/batch/' + props.id}
            button={
                <Button bsStyle="primary">
                    <i className="fa fa-table"></i>
                </Button>
            }
        />
    );
};

export const UpdateAgentLinkButton: React.StatelessComponent<{
    id: number;
}> = props => {
    return (
        <LinkButton
            to={'/agents/update/' + props.id}
            button={
                <Button bsStyle="primary">
                    <i className="fa fa-pencil"></i>
                </Button>
            }
        />
    );
};

export const AgentDashboardLinkButton: React.StatelessComponent<{
    id: number;
}> = props => {
    return (
        <LinkButton
            to={'/agents/' + props.id}
            button={
                <Button bsStyle="primary">
                    <i className="fa fa-tachometer"></i>
                </Button>
            }
        />
    );
};

export const TeamDashboardLinkButton: React.StatelessComponent<{
    id: number;
}> = props => {
    return (
        <LinkButton
            to={'/teams/' + props.id}
            button={
                <Button bsStyle="primary">
                    <i className="fa fa-tachometer"></i>
                </Button>
            }
        />
    );
};

export const ManageBatchLinkButton = () => {
    return (
        <Link to="/transactions/batch">
            <Button bsStyle="primary">Manage Batch Uploads</Button>
        </Link>
    );
};

export const AgentRankingsLinkButton = () => {
    return (
        <Link to="/metrics/agents/rankings">
            <Button bsStyle="primary">View Agent Rankings</Button>
        </Link>
    );
};
