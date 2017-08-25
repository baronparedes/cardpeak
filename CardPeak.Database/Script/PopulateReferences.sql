SET IDENTITY_INSERT dbo.[Reference] ON
GO

DECLARE @bankReferenceType INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Bank');
DECLARE @ccReferenceType INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Card Category');
DECLARE @tranReferenceType INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Transaction Type');
DECLARE @roleReferenceType INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Role');

;WITH Bank_CTE(ReferenceId, [Description])
AS
(
	SELECT 1, 'Metrobank' 
	UNION ALL SELECT 2, 'BPI' 
	UNION ALL SELECT 3, 'Eastwest Bank' 
	UNION ALL SELECT 4, 'Security Bank' 
	UNION ALL SELECT 5, 'RCBC' 
	UNION ALL SELECT 6, 'Bank of Commerce'
),
CardCategory_CTE(ReferenceId, [Description])
AS
(
	SELECT 7, 'Classic' 
	UNION ALL SELECT 8, 'Gold' 
	UNION ALL SELECT 9, 'Platinum' 
),
TransactionType_CTE(ReferenceId, [Description])
AS
(
	SELECT 10, 'Debit/Credit' 
	UNION ALL SELECT 11, 'Retirement Incentive' 
),
Role_CTE(ReferenceId, [Description])
AS
(
	SELECT 12, 'Admin' 
	UNION ALL SELECT 13, 'Uploader' 
	UNION ALL SELECT 14, 'Reporting'
	UNION ALL SELECT 15, 'User'
),
Union_All_CTE([ReferenceId], [Description], [ReferenceTypeId])
AS
(
	SELECT ReferenceId, [Description], @bankReferenceType FROM Bank_CTE UNION ALL
	SELECT ReferenceId, [Description], @ccReferenceType FROM CardCategory_CTE UNION ALL
	SELECT ReferenceId, [Description], @tranReferenceType FROM TransactionType_CTE UNION ALL
	SELECT ReferenceId, [Description], @roleReferenceType FROM Role_CTE
)

MERGE dbo.Reference ref
USING Union_All_CTE cte
	ON ref.ReferenceId = cte.ReferenceId
WHEN MATCHED THEN
	UPDATE 
	SET ref.[Description] = cte.[Description], ref.[ReferenceTypeId] = cte.[ReferenceTypeId]
WHEN NOT MATCHED BY TARGET THEN
	INSERT (ReferenceId, ReferenceTypeId, [Description])
	VALUES (cte.ReferenceId, cte.ReferenceTypeId, cte.[Description]);

SET IDENTITY_INSERT dbo.[Reference] OFF
GO
