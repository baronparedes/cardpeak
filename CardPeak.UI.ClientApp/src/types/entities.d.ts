declare module CardPeak.Entities {

	export class Agent {
		public agentId: number;
		public firstName: string;
		public middleName?: string;
		public lastName: string;
		public gender: string;
		public birthDate?: Date;
		public email?: string;
        public accounts?: CardPeak.Entities.Account[];
        public teamPlacements?: CardPeak.Entities.TeamPlacement[];
    }

    export class AgentDetails {
        public accounts?: CardPeak.Entities.Account[];
        public teamPlacements?: CardPeak.Entities.TeamPlacement[];
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
		public createdBy?: string;
		public createdDate?: Date;
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
		public createdBy?: string;
		public createdDate?: Date;
	}

	export class AgentDashboard {
		public agent: Agent;
		public accountBalance: number;
		public savingsBalance: number;
		public incentivesBalance: number;
		public totalApprovals: number;
		public accounts?: Account[];
		public approvalTransactions?: ApprovalTransaction[];
		public debitCreditTransactions?: DebitCreditTransaction[];
		public incentiveTransactions?: DebitCreditTransaction[];
		public agentDashboardTransactions?: AgentDashboardTransaction[];
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
		public typeId?: number;
	}

	export class Settings {
		public banks: Reference[];
		public cardCategories: Reference[];
		public defaultRateTypes: Reference[];
		public rates: Rate[];
		public bankReferenceTypeId: number;
		public cardCategoryReferenceTypeId: number;
		public defaultRateReferenceTypeId: number;
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

	export class AgentDashboardTransaction {
		public transactionId: number;
		public transactionType: number;
		public details: string;
		public transactionDate: Date;
		public transactionAmount: number;
		public runningBalance: number;
	}

	export class YearFilters {
		public year?: number;
	}

	export class DateFilters {
		public startDate?: string;
		public endDate?: string;
	}

	export class Team {
		public teamId: number;
		public name?: string;
		public description?: string;
	}

	export class TeamPlacement {
		public teamPlacementId: number;
		public teamId: number;
		public agentId: number;
		public isUnitManager?: boolean;
		public agent?: Agent;
		public team?: Team;
	}

	export class TeamDashboardDetail {
		public teamPlacement: TeamPlacement;
		public performance: ApprovalMetric<string>[];
		public totalApprovals: number;
	}

	export class TeamDashboard {
		public team: Team;
		public totalApprovals: number;
		public availableYears: ApprovalMetric<number>[];
		public details: TeamDashboardDetail[];
		public performance: ApprovalMetric<string>[];
		public memberCount: number;
	}
}