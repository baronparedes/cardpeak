declare module CardPeak.Models {
    export interface AgentsModel {
        selectedAgent?: CardPeak.Entities.Agent,
        selectedAgentDashboard?: CardPeak.Entities.AgentDashboard,
        agents?: CardPeak.Entities.Agent[],
        loadingAgents?: boolean,
        loadingAgentDashboard?: boolean,
        postingTransaction?: boolean,
    }
}