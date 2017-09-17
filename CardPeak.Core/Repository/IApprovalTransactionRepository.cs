using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IApprovalTransactionRepository : IRepository<ApprovalTransaction>
    {
        IEnumerable<ApprovalTransaction> FindByClient(string clientName);
        IEnumerable<ApprovalTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate);
        IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int id);
        decimal GetAccountBalanceByAgent(int id);
        decimal GetTotalApprovalsByAgent(int agentId);
        decimal GetAccountBalance(int year, int month);
        decimal GetTotalApprovals(int year, int month);
        IEnumerable<ApprovalMetric<string>> GetApprovalsByBank(int year, int month);
        IEnumerable<ApprovalMetric<string>> GetApprovalsByCategory(int year, int month);
        IEnumerable<ApprovalMetric<string>> GetYearlyPerformance(int year);
        IEnumerable<ApprovalMetric<Agent>> GetTopAgents(int year, int month);
    }
}
