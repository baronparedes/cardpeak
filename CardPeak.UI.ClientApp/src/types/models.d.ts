declare module CardPeak.Models {
    export interface AgentDashboardModel {
        selectedAgent?: CardPeak.Entities.Agent;
        selectedAgentDashboard?: CardPeak.Entities.AgentDashboard;
        agents?: CardPeak.Entities.Agent[];
        loadingAgents?: boolean;
        loadingAgentDashboard?: boolean;
        postingTransaction?: boolean;
        refreshingAgentDashboard?: boolean;
        puttingAgent?: boolean;
        postingAgent?: boolean;
    }

    export interface RatesModel {
        agentId?: number;
        rates?: CardPeak.Entities.Rate[];
        loadingRates?: boolean;
        postingRates?: boolean;
        banks?: CardPeak.Entities.Reference[];
        cardCategories?: CardPeak.Entities.Reference[];
    }

    export interface SettingsModel {
        banks?: CardPeak.Entities.Reference[];
        cardCategories?: CardPeak.Entities.Reference[];
        postingBank?: boolean;
        postingCardCategory?: boolean;
        loadingBanks?: boolean;
        loadingCardCategories?: boolean;
        cardCategoryReferenceTypeId?: number;
        bankReferenceTypeId?: number;
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
        totalApprovals?: number;
        approvalsByBank?: CardPeak.Entities.ApprovalMetric<string>[];
        approvalsByCategory?: CardPeak.Entities.ApprovalMetric<string>[];
        performance?: CardPeak.Entities.ApprovalMetric<string>[];
        topAgents?: CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>[];
        approvalsByBankDetails?: any;
        availableYears?: CardPeak.Entities.ApprovalMetric<number>[];
        refreshing?: boolean;
    }

    export interface MetricsModel {
        availableYears?: CardPeak.Entities.ApprovalMetric<number>[];
        loadingMetrics?: boolean;
        agentMetrics?: CardPeak.Entities.AgentMetrics;
        agentRankingMetrics?: CardPeak.Entities.AgentRankMetric[];
    }
}