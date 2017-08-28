declare module CardPeak.Models {
    export interface AgentDashboardModel {
        selectedAgent?: CardPeak.Entities.Agent,
        selectedAgentDashboard?: CardPeak.Entities.AgentDashboard,
        agents?: CardPeak.Entities.Agent[],
        loadingAgents?: boolean,
        loadingAgentDashboard?: boolean,
        postingTransaction?: boolean,
        refreshingAgentDashboard?: boolean,
        puttingAgent?: boolean,
        postingAgent?: boolean,
    }
}