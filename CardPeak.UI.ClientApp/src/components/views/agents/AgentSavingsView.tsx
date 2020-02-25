import * as React from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import { MetricsBarChart } from '../../layout/Charts';
import { DashboardLabel } from '../../layout/DashboardLabel';
import { SpinnerBlock } from '../../layout/Spinner';
import DebitCreditTransactionList from '../transactions//DebitCreditTransactionList';
import { AgentPerformanceMetrics } from './agentDashboard/metrics/AgentPerformanceMetrics';
import AgentSavingsActions from './AgentSavingsActions';

interface AgentSavingsViewProps {
    loadingAgentSavings?: boolean;
    refreshingAgentSavings?: boolean;
    agentSavings?: CardPeak.Entities.AgentSavings;
    agent?: CardPeak.Entities.Agent;
    selectedYear?: number;
    onYearSelect?: (year: number) => void;
}

const AgentSavingsView = (props: AgentSavingsViewProps) => {
    const handleOnYearSelect = (e: any) => {
        const label: string = e[0]._view.label;
        let target: string = new Date().getFullYear().toString();
        props.agentSavings.savingsByYear.forEach(_ => {
            if (label.startsWith(_.key)) {
                target = _.key;
                return;
            }
        });
        if (props.selectedYear !== parseInt(target)) {
            props.onYearSelect(parseInt(target));
        }
    };

    if (props.loadingAgentSavings) {
        return <SpinnerBlock />;
    }
    if (props.agentSavings) {
        return (
            <div>
                {props.refreshingAgentSavings ? (
                    <SpinnerBlock />
                ) : (
                    <div>
                        <Grid fluid className="no-padding">
                            <Row className="row-eq-height">
                                <Col lg={12}>
                                    <AgentSavingsActions
                                        agent={props.agent}
                                        onRefresh={() => {
                                            props.onYearSelect(
                                                props.selectedYear
                                            );
                                        }}
                                        refreshingAgentSavings={
                                            props.refreshingAgentSavings
                                        }
                                    />
                                </Col>
                                <Col md={12}>
                                    <Panel className="panel-label-dashboard">
                                        <DashboardLabel
                                            className="pull-right"
                                            label="Savings"
                                            metrics={
                                                props.agentSavings
                                                    .savingsBalance
                                            }
                                            noCurrencyColor
                                            isCurrency
                                        />
                                    </Panel>
                                </Col>
                                <Col md={12}>
                                    <Panel>
                                        <MetricsBarChart
                                            metrics={
                                                props.agentSavings
                                                    .savingsByYear
                                            }
                                            label="Savings By Year"
                                            onClick={handleOnYearSelect}
                                        />
                                    </Panel>
                                    <AgentPerformanceMetrics
                                        hideValue
                                        header={props.selectedYear}
                                        performance={
                                            props.agentSavings
                                                .savingsByMonth
                                        }
                                    />
                                    <Panel>
                                        <DebitCreditTransactionList
                                            pageSize={10}
                                            data={
                                                props.agentSavings
                                                    .savingsTransactions
                                            }
                                        />
                                    </Panel>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                )}
            </div>
        );
    }

    return null;
};

export default AgentSavingsView;
