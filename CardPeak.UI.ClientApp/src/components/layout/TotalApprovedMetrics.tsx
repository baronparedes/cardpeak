import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { DashboardLabel } from './';

export const TotalApprovedMetrics = (props: {
    totalApprovals: number;
}) => {
    return (
        <Panel className="panel-label-dashboard">
            <DashboardLabel
                className="pull-right total-approved-metric"
                label="approvals"
                metrics={props.totalApprovals}
            />
        </Panel>
    );
};
