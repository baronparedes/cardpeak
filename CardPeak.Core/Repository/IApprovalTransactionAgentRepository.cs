﻿using CardPeak.Domain;
using CardPeak.Domain.Metrics;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
	public interface IApprovalTransactionAgentRepository : IApprovalTransactionRepository
	{
		IEnumerable<ApprovalTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate);
		decimal GetAgentAccountBalance(int agentId, DateTime? endDate = null);
		decimal GetAgentTotalApprovals(int agentId, DateTime startDate, DateTime? endDate);
		IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int agentId);
		IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int agentId, int year);
		IEnumerable<ApprovalMetric<string>> GetTeamPerformance(int teamId, int year);
		IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByBank(int agentId, DateTime startDate, DateTime? endDate);
		IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByCategory(int agentId, DateTime startDate, DateTime? endDate);
		IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetAgentApprovalsByBankDetails(int agentId, DateTime startDate, DateTime? endDate);
	}
}
