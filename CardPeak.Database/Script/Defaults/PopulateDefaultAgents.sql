SET IDENTITY_INSERT dbo.Agent ON
GO

;WITH Agent_CTE(AgentId, FirstName, MiddleName, LastName, Gender, BirthDate, Email, IsDeleted)
AS
(
	SELECT 0, 'admin', 'admin', 'admin', 'M', NULL, 'cardpeakmktg@gmail.com', 1
)

MERGE dbo.Agent ref
USING Agent_CTE cte
	ON ref.AgentId = cte.AgentId
WHEN MATCHED THEN
	UPDATE 
	SET
		ref.FirstName = cte.FirstName,
		ref.MiddleName = cte.MiddleName,
		ref.LastName = cte.LastName,
		ref.Email = cte.Email,
		ref.Gender = cte.Gender,
		ref.BirthDate = cte.BirthDate,
		ref.IsDeleted = cte.IsDeleted
WHEN NOT MATCHED BY TARGET THEN
	INSERT (AgentId, FirstName, MiddleName, LastName, Gender, BirthDate, Email, IsDeleted)
	VALUES (cte.AgentId, cte.FirstName, cte.MiddleName, cte.LastName, cte.Gender, cte.BirthDate, cte.Email, cte.IsDeleted);

SET IDENTITY_INSERT dbo.Agent OFF
GO