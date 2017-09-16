using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IApprovalTransactionRepository : IRepository<ApprovalTransaction>
    {
        IEnumerable<ApprovalTransaction> FindByClient(string clientName);
        IEnumerable<ApprovalTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate);
        IEnumerable<Metric> GetAgentPerformance(int id);
        decimal GetAccountBalanceByAgent(int id);
        decimal GetTotalApprovalsByAgent(int agentId);
        decimal GetAccountBalance(int year, int month);
        decimal GetTotalApprovals(int year, int month);
        IEnumerable<Metric> GetApprovalsByBank(int year, int month);
        IEnumerable<Metric> GetApprovalsByCategory(int year, int month);
        IEnumerable<Metric> GetYearlyPerformance(int year);
    }
}
