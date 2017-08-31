﻿using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Repository
{
    public interface IApprovalTransactionRepository : IRepository<ApprovalTransaction>
    {
        IEnumerable<ApprovalTransaction> FindByClient(string clientName);
        IEnumerable<ApprovalTransaction> FindByAgent(int id, DateTime startDate, DateTime? endDate);
        IEnumerable<ApprovalPerformance> GetAgentPerformance(int id);
        decimal AccountBalanceByAgent(int id);
        decimal TotalApprovalsByAgent(int agentId);
    }
}