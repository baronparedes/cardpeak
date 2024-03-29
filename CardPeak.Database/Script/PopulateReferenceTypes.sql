﻿;WITH ReferenceType_CTE(ReferenceTypeId, [Description])
AS
(
	SELECT 1, 'Bank' 
	UNION ALL SELECT 2, 'Card Category' 
	UNION ALL SELECT 3, 'Sub Card Category' 
	UNION ALL SELECT 4, 'Transaction Type'
	UNION ALL SELECT 5, 'Role'
	UNION ALL SELECT 6, 'Default Rate'
	UNION ALL SELECT 7, 'Agent Type'
)

MERGE dbo.ReferenceType ref
USING ReferenceType_CTE cte
	ON ref.ReferenceTypeId = cte.ReferenceTypeId
WHEN MATCHED THEN
	UPDATE 
	SET ref.[Description] = cte.[Description]
WHEN NOT MATCHED BY TARGET THEN
	INSERT (ReferenceTypeId, [Description])
	VALUES (cte.ReferenceTypeId, cte.[Description]);