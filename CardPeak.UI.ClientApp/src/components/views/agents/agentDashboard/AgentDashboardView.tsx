﻿import * as React from 'react';
import { SpinnerBlock } from '../../../layout';
import AgentDashboardActions from './AgentDashboardActions';
import AgentDashboardSummary from './AgentDashboardSummary';
import AgentDashboardTransactions from './AgentDashboardTransactions';

interface AgentDashboardViewProps {
    agentDashboard?: CardPeak.Entities.AgentDashboard;
    onRefresh?: (toDate?: string, fromDate?: string) => void;
    onSetDateFilters?: (
        dateFilters: CardPeak.Entities.DateFilters
    ) => void;
    loadingAgentDashboard?: boolean;
    refreshingAgentDashboard?: boolean;
}

const AgentDashboardView = (props: AgentDashboardViewProps) => {
    if (props.loadingAgentDashboard) {
        return <SpinnerBlock />;
    }

    if (props.agentDashboard) {
        return (
            <div>
                <AgentDashboardActions
                    agent={props.agentDashboard.agent}
                    onRefresh={props.onRefresh}
                    refreshingAgentDashboard={
                        props.refreshingAgentDashboard
                    }
                    onSetDateFilters={props.onSetDateFilters}
                />
                <AgentDashboardSummary
                    agentDashboard={props.agentDashboard}
                />
                {props.refreshingAgentDashboard ? (
                    <SpinnerBlock />
                ) : (
                    <AgentDashboardTransactions
                        agentDashboard={props.agentDashboard}
                    />
                )}
            </div>
        );
    }

    return null;
};

export default AgentDashboardView;
