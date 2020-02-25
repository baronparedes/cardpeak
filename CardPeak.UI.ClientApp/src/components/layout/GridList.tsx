import * as React from 'react';
import { Grid, Panel } from 'react-bootstrap';

interface GridListProps {
    header: React.ReactNode;
}

export const GridList: React.StatelessComponent<GridListProps> = props => {
    return (
        <div>
            <Grid fluid className="grid-header text-muted no-padding">
                <Panel className="panel-row-header">
                    {props.header}
                </Panel>
            </Grid>
            <Grid fluid className="grid-rows spacer-top no-padding">
                {props.children}
            </Grid>
        </div>
    );
};
