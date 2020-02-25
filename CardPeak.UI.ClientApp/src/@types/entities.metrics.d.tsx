declare module CardPeak.Entities {
    export class ApprovalMetric<TKey> {
        public key: TKey;
        public value: number;
        public amount?: number;
    }

    export class AgentApprovalMetric extends ApprovalMetric<Agent> {
        public accountBalance: number;
        public savingsBalance: number;
        public incentivesBalance: number;
    }

    export class AgentRankMetric extends ApprovalMetric<Agent> {
        public rank: number;
        public approvalsByBank: CardPeak.Entities.ApprovalMetric<
            string
        >[];
    }

    export class AgentThresholdMetric extends ApprovalMetric<Agent> {
        public rank: number;
        public approvalsByBank: CardPeak.Entities.ApprovalMetric<
            string
        >[];
    }

    export class AgentPerformanceMetric extends ApprovalMetric<Agent> {
        public rank: number;
        public performance: CardPeak.Entities.ApprovalMetric<string>[];
    }

    export class AgentMetrics {
        public agentApprovalMetrics?: CardPeak.Entities.AgentApprovalMetric[];
        public totalApproved?: number;
        public totalBalance?: number;
        public totalSavings?: number;
        public totalIncentives?: number;
    }

    export class AmountDistribution {
        public description?: string;
        public approvalsByAmount?: CardPeak.Entities.ApprovalMetric<
            number
        >[];
        public totalApproved?: number;
    }

    export class BankAmountDistribution {
        public description?: string;
        public cardCategoryAmountDistribution?: CardPeak.Entities.AmountDistribution[];
        public totalApproved?: number;
    }

    export class AgentDisbursementMetrics extends ApprovalMetric<
        Agent
    > {
        public totalDisbursed?: number;
        public details?: CardPeak.Entities.DebitCreditTransaction[];
    }
}
