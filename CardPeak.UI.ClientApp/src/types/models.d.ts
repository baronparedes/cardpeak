declare module CardPeak.Models {
    export interface AgentsModel {
        selectedAgent?: CardPeak.Entities.Agent,
        agents?: CardPeak.Entities.Agent[],
        loadingAgents?: boolean
    }
}