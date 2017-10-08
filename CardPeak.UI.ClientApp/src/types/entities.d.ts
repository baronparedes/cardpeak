declare module CardPeak.Entities {

    export class Agent {
        public agentId: number;
        public firstName: string;
        public middleName?: string;
        public lastName: string;
        public gender: string;
        public birthDate?: Date;
        public email?: string;
        public accounts?: CardPeak.Entities.Account[]
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
        public bank?: Reference;
        public cardCategory?: Reference;
        public agent?: Agent;
    }

    export class DebitCreditTransaction {
        public id?: number;
        public agentId: number;
        public amount: number;
        public remarks: string;
        public transactionTypeId?: number;
        public transactionDateTime?: Date;
        public isDeleted?: boolean;
        public transactionType?: Reference;
    }

    export class AgentDashboard {
        public agent: Agent;
        public accountBalance: number;
        public savingsBalance: number;
        public totalApprovals: number;
        public accounts?: Account[];
        public approvalTransactions?: ApprovalTransaction[];
        public debitCreditTransactions?: DebitCreditTransaction[];
        public performance?: ApprovalMetric<string>[];
        public approvalsByBank?: ApprovalMetric<string>[];
        public approvalsByCategory?: ApprovalMetric<string>[];
        public approvalsByBankDetails?: any;
    }

    export class Reference 
    {
        public referenceId: number;
        public referenceTypeId: number;
        public description: string;
        public shortDescription: string;
    }

    export class Rate {
        public rateId: number;
        public amount: number;
        public bankId: number;
        public cardCategoryId: number;
        public agentId: number;
        public savingsAmount: number;
        public agent?: Agent;
        public bank?: Reference;
        public cardCategory?: Reference;
    }

    export class Settings {
        public banks: Reference[];
        public cardCategories: Reference[];
        public rates: Rate[];
        public bankReferenceTypeId: number;
        public cardCategoryReferenceTypeId: number;
    }

    export class BatchUpload {
        public batchId: number;
        public fileName: string;
        public bankId: number;
        public hasErrors?: boolean;
        public processStartDateTime?: Date;
        public processEndDateTime?: Date;
        public processedRecords?: number;
        public bank?: Reference;
        public originalFileName?: string;
    }

    export class ProcessedApprovalTransaction {
        public approvalTransaction: ApprovalTransaction;
        public row: number;
        public alias: string;
        public hasErrors: boolean ;
        public errorMessages: string[];
        public validApproval: boolean  
    }

    export class ProcessedBatchUpload {
        public batch: BatchUpload;
        public processedApprovalTransactions: ProcessedApprovalTransaction[];
    }

    export class BatchFileConfiguration {
        public batchFileConfigurationId: number;
        public bankId: number;
        public hasHeader: boolean;
        public skipNumberOfRows?: number;
        public aliasColumn: number;
        public productTypeColumn: number;
        public ref1Column?: number;
        public ref2Column?: number;
        public clientFullNameColumn?: number;
        public clientFirstNameColumn?: number;
        public clientMiddleNameColumn?: number;
        public clientLastNameColumn?: number;
        public approvalDateColumn: number;
        public cardCategoryColumn: number;
        public cardCountColumn?: number;
        public bank?: Reference;
        public approvalDateFormat?: string;
    }

    export class ApprovalMetric<TKey> {
        public key: TKey;
        public value: number;
    }

    export class AgentApprovalMetric {
        public key: Agent;
        public value: number;
        public accountBalance: number;
        public savingsBalance: number;
    }

    export class AgentRankMetric {
        public rank: number;
        public key: Agent;
        public value: number;
        public approvalsByBank: CardPeak.Entities.ApprovalMetric<string>[];
    }

    export class AgentPerformanceMetric {
        public rank: number;
        public key: Agent;
        public value: number;
        public performance: CardPeak.Entities.ApprovalMetric<string>[];
    }

    export class AgentMetrics {
        public agentApprovalMetrics?: CardPeak.Entities.AgentApprovalMetric[];
        public totalApproved?: number;
        public totalBalance?: number;
        public totalSavings?: number;
    }
}