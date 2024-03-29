﻿declare module CardPeak.Models {
    export interface AgentModel {
        selectedAgent?: CardPeak.Entities.Agent;
        selectedAgentDashboard?: CardPeak.Entities.AgentDashboard;
        selectedAgentSavings?: CardPeak.Entities.AgentSavings;
        agents?: CardPeak.Entities.Agent[];
        loadingAgents?: boolean;
        loadingAgentDashboard?: boolean;
        loadingAgentSavings?: boolean;
        postingTransaction?: boolean;
        refreshingAgentDashboard?: boolean;
        refreshingAgentSavings?: boolean;
        updatingAgent?: boolean;
        creatingAgent?: boolean;
        dateFilters?: CardPeak.Entities.DateFilters;
        uploadingAgentPhoto?: boolean;
    }

    export interface RatesModel {
        agentId?: number;
        typeId?: number;
        rates?: CardPeak.Entities.Rate[];
        loadingRates?: boolean;
        postingRates?: boolean;
    }

    export interface SettingsModel {
        initialized?: boolean;
        banks?: CardPeak.Entities.Reference[];
        cardCategories?: CardPeak.Entities.Reference[];
        defaultRateTypes?: CardPeak.Entities.Reference[];
        agentTypes?: CardPeak.Entities.Reference[];
        loading?: boolean;
        cardCategoryReferenceTypeId?: number;
        bankReferenceTypeId?: number;
        defaultRateReferenceTypeId?: number;
        agentTypeReferenceTypeId?: number;
    }

    export interface BatchUploadModel {
        selectedBatchUpload?: CardPeak.Entities.BatchUpload;
        uploadingFile?: boolean;
        processing?: boolean;
        processingCompleted?: boolean;
        processedApprovalTransactions?: CardPeak.Entities.ProcessedApprovalTransaction[];
        selectedBatchFileConfiguration?: CardPeak.Entities.BatchFileConfiguration;
        loadingBatchFileConfiguration?: boolean;
        postingBatchFileConfiguration?: boolean;
        batchUploads?: CardPeak.Entities.BatchUpload[];
        loadingBatchUploads?: boolean;
        deletingBatch?: boolean;
    }

    export interface DashboardModel {
        latestProcessedBatch?: CardPeak.Entities.BatchUpload[];
        accountBalance?: number;
        savingsBalance?: number;
        incentivesBalance?: number;
        totalApprovals?: number;
        approvalsByBank?: CardPeak.Entities.ApprovalMetric<string>[];
        approvalsByCategory?: CardPeak.Entities.ApprovalMetric<
            string
        >[];
        performance?: CardPeak.Entities.ApprovalMetric<string>[];
        topAgents?: CardPeak.Entities.ApprovalMetric<
            CardPeak.Entities.Agent
        >[];
        approvalsByBankDetails?: any;
        availableYears?: CardPeak.Entities.ApprovalMetric<number>[];
        refreshing?: boolean;
    }

    export interface MetricsModel {
        availableYears?: CardPeak.Entities.ApprovalMetric<number>[];
        loadingMetrics?: boolean;
        loadingMetricsError?: string;
        agentMetrics?: CardPeak.Entities.AgentMetrics;
        agentRankingMetrics?: CardPeak.Entities.AgentRankMetric[];
        agentPerformanceMetrics?: CardPeak.Entities.AgentPerformanceMetric[];
        agentThresholdMetrics?: CardPeak.Entities.AgentThresholdMetric[];
        agentDisbursementMetrics?: CardPeak.Entities.AgentDisbursementMetrics[];
        bankAmountDistributionMetrics?: CardPeak.Entities.BankAmountDistribution[];
    }

    export interface AgentPayoutModel {
        initialized?: boolean;
        count?: number;
        total?: number;
        payouts?: CardPeak.Entities.ApprovalMetric<
            CardPeak.Entities.Agent
        >[];
        loadingPayouts?: boolean;
        loadingPayoutsError?: string;
    }

    export interface TeamsModel {
        teams?: CardPeak.Entities.Team[];
        selectedTeam?: CardPeak.Entities.Team;
        selectedTeamDashboard?: CardPeak.Entities.TeamDashboard;
        loadingTeams?: boolean;
        loadingTeamDashboard?: boolean;
        refreshingTeamDashboard?: boolean;
        selectedYear?: number;
        removingAgentError?: string;
        addingAgentError?: string;
        saveTeamError?: string;
        deleteTeamError?: string;
    }
}
