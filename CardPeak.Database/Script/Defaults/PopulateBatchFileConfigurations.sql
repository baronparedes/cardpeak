SET IDENTITY_INSERT dbo.BatchFileConfiguration ON
GO

;WITH BatchFileConfiguration_CTE(
	BatchFileConfigurationId,
	BankId,
	HasHeader,
	SkipNumberOfRows,
	AliasColumn,
	ProductTypeColumn,
	Ref1Column,
	Ref2Column,
	ClientFullNameColumn,
	ClientFirstNameColumn,
	ClientMiddleNameColumn,
	ClientLastNameColumn,
	ApprovalDateColumn,
	CardCategoryColumn,
	CardCountColumn)
AS
(
	SELECT 1, 1, 1, NULL,	11,		7,		0,	NULL,	NULL,	4,		5,		3,		2,		13,		10		UNION ALL
	SELECT 2, 2, 1, 5,		6,		9,		2,	NULL,	3,		NULL,	NULL,	NULL,	5,		8,		NULL	UNION ALL
	SELECT 3, 3, 1, 5,		9,		5,		2,	4,		3,		NULL,	NULL,	NULL,	7,		11,		NULL	UNION ALL
	SELECT 4, 4, 1, NULL,	9,		7,		5,	1,		NULL,	3,		4,		2,		8,		11,		NULL	UNION ALL	
	SELECT 5, 5, 1, 2,		10,		4,		1,	2,		3,		NULL,	NULL,	NULL,	8,		12,		NULL	UNION ALL
	SELECT 6, 6, 1, NULL,	5,		3,		1,	NULL,	0,		NULL,	NULL,	NULL,	3,		7,		NULL
)

MERGE dbo.BatchFileConfiguration ref
USING BatchFileConfiguration_CTE cte
	ON ref.BatchFileConfigurationId = cte.BatchFileConfigurationId
WHEN MATCHED THEN
	UPDATE 
	SET
		ref.BankId					= cte.BankId,					
		ref.HasHeader				= cte.HasHeader,				
		ref.SkipNumberOfRows		= cte.SkipNumberOfRows,		
		ref.AliasColumn				= cte.AliasColumn,				
		ref.ProductTypeColumn		= cte.ProductTypeColumn,		
		ref.Ref1Column				= cte.Ref1Column,				
		ref.Ref2Column				= cte.Ref2Column,				
		ref.ClientFullNameColumn	= cte.ClientFullNameColumn,	
		ref.ClientFirstNameColumn	= cte.ClientFirstNameColumn,	
		ref.ClientMiddleNameColumn	= cte.ClientMiddleNameColumn,	
		ref.ClientLastNameColumn	= cte.ClientLastNameColumn,	
		ref.ApprovalDateColumn		= cte.ApprovalDateColumn,		
		ref.CardCategoryColumn		= cte.CardCategoryColumn,		
		ref.CardCountColumn			= cte.CardCountColumn			
WHEN NOT MATCHED BY TARGET THEN
	INSERT (
		BatchFileConfigurationId,
		BankId,
		HasHeader,
		SkipNumberOfRows,
		AliasColumn,
		ProductTypeColumn,
		Ref1Column,
		Ref2Column,
		ClientFullNameColumn,
		ClientFirstNameColumn,
		ClientMiddleNameColumn,
		ClientLastNameColumn,
		ApprovalDateColumn,
		CardCategoryColumn,
		CardCountColumn)
	VALUES (
		cte.BatchFileConfigurationId,
		cte.BankId,
		cte.HasHeader,
		cte.SkipNumberOfRows,
		cte.AliasColumn,
		cte.ProductTypeColumn,
		cte.Ref1Column,
		cte.Ref2Column,
		cte.ClientFullNameColumn,
		cte.ClientFirstNameColumn,
		cte.ClientMiddleNameColumn,
		cte.ClientLastNameColumn,
		cte.ApprovalDateColumn,
		cte.CardCategoryColumn,
		cte.CardCountColumn);

SET IDENTITY_INSERT dbo.BatchFileConfiguration OFF
GO