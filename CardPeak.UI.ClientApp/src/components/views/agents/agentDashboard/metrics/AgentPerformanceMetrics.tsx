import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { PerformanceDashboard } from '../../../../layout';

interface AgentPerformanceMetricsProps {
    performance: CardPeak.Entities.ApprovalMetric<string>[];
    hideValue?: boolean;
    header?: React.ReactNode;
}

export const AgentPerformanceMetrics = (
    props: AgentPerformanceMetricsProps
) => {
    return (
        <Panel className="text-center panel-label-dashboard hidden-print">
            <h2>{props.header}</h2>
            <PerformanceDashboard
                performance={props.performance}
                hideValue={props.hideValue}
            />
        </Panel>
    );
};
