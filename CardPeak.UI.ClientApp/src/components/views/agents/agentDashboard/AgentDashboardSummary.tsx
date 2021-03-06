﻿import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { ApprovalMetrics, TotalApprovedMetrics } from '../../../layout';
import {
    AgentAccountBalanceMetrics,
    AgentPerformanceMetrics
} from './metrics';

interface AgentDashboardSummaryProps {
    agentDashboard: CardPeak.Entities.AgentDashboard;
}

const AgentDashboardSummary = (props: AgentDashboardSummaryProps) => {
    return (
        <div>
            <Grid fluid className="no-padding">
                <Row className="row-eq-height">
                    <Col md={6}>
                        <TotalApprovedMetrics
                            totalApprovals={
                                props.agentDashboard.totalApprovals
                            }
                        />
                    </Col>
                    <Col md={6}>
                        <AgentAccountBalanceMetrics
                            accountBalance={
                                props.agentDashboard.accountBalance
                            }
                            savingsBalance={
                                props.agentDashboard.savingsBalance
                            }
                        />
                    </Col>
                    <Col md={12}>
                        <AgentPerformanceMetrics
                            performance={
                                props.agentDashboard.performance
                            }
                        />
                    </Col>
                </Row>
                <ApprovalMetrics
                    approvalsByBankDetails={
                        props.agentDashboard.approvalsByBankDetails
                    }
                    approvalsByBank={
                        props.agentDashboard.approvalsByBank
                    }
                    approvalsByCategory={
                        props.agentDashboard.approvalsByCategory
                    }
                />
            </Grid>
        </div>
    );
};

export default AgentDashboardSummary;
