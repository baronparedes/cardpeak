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
        rates?: CardPeak.Entities.Rate[],
        loadingRates?: boolean,
        postingRates?: boolean,
        banks?: CardPeak.Entities.Reference[],
        cardCategories?: CardPeak.Entities.Reference[]
    }

    export interface SettingsModel {
        banks?: CardPeak.Entities.Reference[],
        cardCategories?: CardPeak.Entities.Reference[],
        postingBank?: boolean;
        postingCardCategory?: boolean;
        loadingBanks?: boolean,
        loadingCardCategories?: boolean;
        cardCategoryReferenceTypeId?: number,
        bankReferenceTypeId?: number
    }

    export interface BatchUploadModel {
        selectedBatchUpload?: CardPeak.Entities.BatchUpload;
        uploadingFile?: boolean;
        processing?: boolean;
    }
}