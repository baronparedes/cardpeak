declare module CardPeak.Entities {

    export class Agent {
        public agentId: number;
        public firstName: string;
        public middleName: string;
        public lastName: string;
        public gender: string;
        public birthDate?: Date;
        public email: string;
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

    export class Reference 
    {
        public referenceId: number;
        public referenceTypeId: number;
        public description: string;
    }

    export class Rate {
        public rateId: number;
        public amount: number;
        public bankId: number;
        public cardCategoryId: number;
        public agentId: number;
        public agent?: Agent;
        public bank?: Reference;
        public cardCategory?: Reference;
    }

    export class Settings {
        public banks: CardPeak.Entities.Reference[];
        public cardCategories: CardPeak.Entities.Reference[];
        public rates: CardPeak.Entities.Rate[];
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
        public bank?: Reference;
    }

    export class ProcessedApprovalTransaction {
        public transaction: ApprovalTransaction;
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
}