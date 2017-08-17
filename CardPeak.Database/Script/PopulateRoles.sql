DECLARE @roleReferenceType INT = 5;

;WITH Role_CTE(Id, [Description])
AS
(
	SELECT 1, 'Admin' 
	UNION ALL SELECT 2, 'Uploader' 
	UNION ALL SELECT 3, 'Reporting'
	UNION ALL SELECT 4, 'User'
)

MERGE dbo.Reference ref
USING Role_CTE cte
	ON ref.[Type] = @roleReferenceType AND ref.Id = cte.Id
WHEN MATCHED THEN
	UPDATE 
	SET ref.[Description] = cte.[Description]
WHEN NOT MATCHED BY TARGET THEN
	INSERT (Id, [Type], [Description])
	VALUES (cte.Id, @roleReferenceType, cte.[Description]);