using CardPeak.Domain;
using System;
using System.Collections.Generic;

namespace CardPeak.Core.Repository
{
    public interface IApprovalTransactionRepository : IRepository<ApprovalTransaction>
    {
        IEnumerable<ApprovalTransaction> FindByClient(string clientName);
        IEnumerable<ApprovalTransaction> FindByAgent(int agentId, DateTime startDate, DateTime? endDate);
        IEnumerable<ApprovalMetric<string>> GetAgentPerformance(int agentId);
        IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByBank(int agentId, DateTime startDate, DateTime? endDate);
        IEnumerable<ApprovalMetric<string>> GetAgentApprovalsByCategory(int agentId, DateTime startDate, DateTime? endDate);
        decimal GetAgentAccountBalance(int agentId);
        decimal GetAgentTotalApprovals(int agentId);
        decimal GetAccountBalance(int year, int month);
        decimal GetTotalApprovals(int year, int month);
        IEnumerable<ApprovalMetric<string>> GetApprovalsByBank(int year, int month);
        IEnumerable<ApprovalMetric<string>> GetApprovalsByCategory(int year, int month);
        IEnumerable<ApprovalMetric<string>> GetYearlyPerformance(int year);
        IEnumerable<ApprovalMetric<Agent>> GetTopAgents(int year, int month);
        IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetApprovalsByBankDetails(int year, int month);
        IDictionary<string, IEnumerable<ApprovalMetric<string>>> GetAgentApprovalsByBankDetails(int agentId, DateTime startDate, DateTime? endDate);
    }
}
