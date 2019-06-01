CREATE VIEW dbo.AgentPayout
AS
( SELECT	A.AgentId ,
			A.FirstName ,
			A.MiddleName ,
			A.LastName ,
			A.Gender ,
			A.BirthDate ,
			A.Email ,
			A.IsDeleted ,
			COALESCE(ATS_1.TotalApprovalAmount, 0) + COALESCE(DBT_1.TotalDebitCreditAmount, 0) AS Payout
	FROM	dbo.Agent AS A
	LEFT OUTER JOIN ( SELECT	A.AgentId ,
								SUM(DBT.Amount) AS TotalDebitCreditAmount
						FROM	dbo.Agent AS A
						LEFT OUTER JOIN dbo.DebitCreditTransaction AS DBT ON DBT.AgentId = A.AgentId
						WHERE	( A.IsDeleted = 0 ) AND
								( DBT.IsDeleted = 0 ) AND
								( DBT.TransactionTypeId = 10 )
						GROUP BY A.AgentId
					) AS DBT_1 ON DBT_1.AgentId = A.AgentId
	LEFT OUTER JOIN ( SELECT	A.AgentId ,
								SUM(ATS.Amount) AS TotalApprovalAmount
						FROM	dbo.Agent AS A
						LEFT OUTER JOIN dbo.ApprovalTransaction AS ATS ON ATS.AgentId = A.AgentId
						WHERE	( A.IsDeleted = 0 ) AND
								( ATS.IsDeleted = 0 )
						GROUP BY A.AgentId
					) AS ATS_1 ON ATS_1.AgentId = A.AgentId
	WHERE	( A.IsDeleted = 0 ) AND
			( COALESCE(DBT_1.TotalDebitCreditAmount, 0) + COALESCE(ATS_1.TotalApprovalAmount, 0) > 1 )
);
GO