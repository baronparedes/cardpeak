declare module CardPeak.Entities {

    export class Agent {
        public agentId: number;
        public firstName: string;
        public middleName: string;
        public lastName: string;
        public gender: string;
        public birthDate?: Date;
        public email: string;
    }

    export class Account {
        public agentId: number;
        public alias: string;
    }

    export class ApprovalTransaction {
        public id: number;
        public bankId: number;
        public cardCategoryId: number;
        public agentId: number;
        public units: number;
        public amount: number;
        public productType: string;
        public referenceNumber1: string;
        public referenceNumber2?: string;
        public client: string;
        public approvalDate: Date;
        public batchId?: number;
        public isDeleted: boolean;
        public bank?: string;
        public cardCategory?: string;
    }

    export class DebitCreditTransaction {
        public id?: number;
        public agentId: number;
        public amount: number;
        public remarks: string;
        public transactionTypeId?: number;
        public transactionDateTime?: Date;
        public isDeleted?: boolean;
    }

    export class ApprovalPerformance {
        public month: string;
        public units: number;
    }

    export class AgentDashboard {
        public agent: Agent;
        public accountBalance: number;
        public savingsBalance: number;
        public totalApprovals: number;
        public accounts?: Account[];
        public approvalTransactions?: ApprovalTransaction[];
        public debitCreditTransactions?: DebitCreditTransaction[];
        public performance?: ApprovalPerformance[];
    }
}