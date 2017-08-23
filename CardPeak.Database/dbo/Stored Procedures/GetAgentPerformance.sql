CREATE PROCEDURE [dbo].[GetAgentPerformance]
	@targetAgentId INT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @targetDate DATE = GETDATE()

	;WITH Quarter_CTE([Year], [Month], [MonthName])
	AS
	(
		SELECT YEAR(@targetDate), MONTH(@targetDate), DATENAME(mm, @targetDate) UNION ALL
		SELECT YEAR(DATEADD(mm, -1, @targetDate)), MONTH(DATEADD(mm, -1, @targetDate)), DATENAME(mm, DATEADD(mm, -1, @targetDate)) UNION ALL
		SELECT YEAR(DATEADD(mm, -2, @targetDate)), MONTH(DATEADD(mm, -2, @targetDate)), DATENAME(mm, DATEADD(mm, -2, @targetDate)) UNION ALL
		SELECT YEAR(DATEADD(mm, -3, @targetDate)), MONTH(DATEADD(mm, -3, @targetDate)), DATENAME(mm, DATEADD(mm, -3, @targetDate))
	), 
	Approvals_CTE([Year], [Month], Units)
	AS
	(
		SELECT
			YEAR(t.ApprovalDate) AS [Year],
			MONTH(t.ApprovalDate) AS [Month],
			SUM(t.Units) AS Units
		FROM dbo.ApprovalTransaction t
		WHERE t.AgentId = @targetAgentId AND t.IsDeleted = 0
		GROUP BY YEAR(t.ApprovalDate), MONTH(t.ApprovalDate)
	)

	SELECT
		q.[MonthName],
		COALESCE(t.Units, 0) AS Units
	FROM Quarter_CTE q
	LEFT JOIN Approvals_CTE t
		ON t.[Year] = q.[Year]
		AND t.[Month] = q.[Month]

END

GO