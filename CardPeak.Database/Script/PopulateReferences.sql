﻿SET IDENTITY_INSERT dbo.[Reference] ON
GO

DECLARE @bankReferenceType			INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Bank');
DECLARE @ccReferenceType			INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Card Category');
DECLARE @tranReferenceType			INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Transaction Type');
DECLARE @roleReferenceType			INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Role');
DECLARE @defaultRateReferenceType	INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Default Rate');
DECLARE @agentReferenceType			INT	= (SELECT ReferenceTypeId FROM ReferenceType t WHERE t.[Description] = 'Agent Type');

;WITH Bank_CTE(ReferenceId, [Description], ShortDescription)
AS
(
	SELECT 1, 'Metrobank', 'MB'
	UNION ALL SELECT 2, 'BPI', 'BPI'
	UNION ALL SELECT 3, 'Eastwest Bank', 'EWB' 
	UNION ALL SELECT 4, 'Security Bank', 'SB' 
	UNION ALL SELECT 5, 'RCBC', 'RCBC' 
	UNION ALL SELECT 6, 'Bank of Commerce', 'BoC'
	UNION ALL SELECT 16, 'PNB', 'PNB'
),
CardCategory_CTE(ReferenceId, [Description], ShortDescription)
AS
(
	SELECT 7, 'Classic', 'C'
	UNION ALL SELECT 8, 'Gold', 'G'
	UNION ALL SELECT 9, 'Platinum', 'P' 
	UNION ALL SELECT 22, 'Infinite', 'I' 
	UNION ALL SELECT 23, 'World', 'W' 
),
TransactionType_CTE(ReferenceId, [Description])
AS
(
	SELECT 10, 'Debit/Credit' 
	UNION ALL SELECT 11, 'Savings'
	UNION ALL SELECT 17, 'Incentives'
),
Role_CTE(ReferenceId, [Description])
AS
(
	SELECT 12, 'Admin' 
	UNION ALL SELECT 13, 'Uploader' 
	UNION ALL SELECT 14, 'Reporting'
	UNION ALL SELECT 15, 'User'
),
DefaultRate_CTE(ReferenceId, [Description], ShortDescription)
AS
(
	SELECT 18, 'Rookie Rate', 'RR'
	UNION ALL SELECT 19, 'Core Rate w/o Savings', 'CR'
	UNION ALL SELECT 20, 'Core Rate w/ Savings 2017', 'CRS'
	UNION ALL SELECT 21, 'Core Rate w/ Savings 2023', 'CRS2023'
),
AgentType_CTE(ReferenceId, [Description], ShortDescription)
AS
(
	SELECT 30, 'Rookie', 'RR'
	UNION ALL SELECT 31, 'Core', 'CRS'
	UNION ALL SELECT 32, 'Tie Up', 'CR'
),
Union_All_CTE([ReferenceId], [Description], ShortDescription, [ReferenceTypeId])
AS
(
	SELECT ReferenceId, [Description], ShortDescription, @bankReferenceType FROM Bank_CTE UNION ALL
	SELECT ReferenceId, [Description], ShortDescription, @ccReferenceType FROM CardCategory_CTE UNION ALL
	SELECT ReferenceId, [Description], NULL, @tranReferenceType FROM TransactionType_CTE UNION ALL
	SELECT ReferenceId, [Description], NULL, @roleReferenceType FROM Role_CTE UNION ALL
	SELECT ReferenceId, [Description], ShortDescription, @defaultRateReferenceType FROM DefaultRate_CTE UNION ALL
	SELECT ReferenceId, [Description], ShortDescription, @agentReferenceType FROM AgentType_CTE
)

MERGE dbo.Reference ref
USING Union_All_CTE cte
	ON ref.ReferenceId = cte.ReferenceId
WHEN MATCHED THEN
	UPDATE 
	SET ref.[Description] = cte.[Description], 
		ref.ShortDescription = cte.ShortDescription, 
		ref.[ReferenceTypeId] = cte.[ReferenceTypeId]
WHEN NOT MATCHED BY TARGET THEN
	INSERT (ReferenceId, ReferenceTypeId, [Description], ShortDescription)
	VALUES (cte.ReferenceId, cte.ReferenceTypeId, cte.[Description], cte.ShortDescription);

SET IDENTITY_INSERT dbo.[Reference] OFF
GO
