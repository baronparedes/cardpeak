declare module CardPeak.Models {
    export interface AgentsModel {
        selectedAgent?: CardPeak.Types.Agent,
        agents?: CardPeak.Types.Agent[],
        loadingAgents?: boolean
    }
}