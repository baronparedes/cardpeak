SET IDENTITY_INSERT dbo.[User] ON
GO

;WITH User_CTE(UserId, Username, [Password], FirstName, MiddleName, LastName, Email)
AS
(
	SELECT 0, 'admin', 'admin', 'admin', NULL, 'admin', 'cardpeakmktg@gmail.com'
)

MERGE dbo.[User] ref
USING User_CTE cte
	ON ref.UserId = cte.UserId
WHEN MATCHED THEN
	UPDATE 
	SET
		ref.Username = cte.Username,
		ref.[Password] = cte.[Password],
		ref.FirstName = cte.FirstName,
		ref.MiddleName = cte.MiddleName,
		ref.LastName = cte.LastName,
		ref.Email = cte.Email
WHEN NOT MATCHED BY TARGET THEN
	INSERT (UserId, Username, [Password], FirstName, MiddleName, LastName, Email)
	VALUES (cte.UserId, cte.Username, cte.[Password], cte.FirstName, cte.MiddleName, cte.LastName, cte.Email);

SET IDENTITY_INSERT dbo.[User] OFF
GO