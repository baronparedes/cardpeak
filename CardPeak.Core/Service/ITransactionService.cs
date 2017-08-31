using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Service
{
    public interface ITransactionService : IUnitOfWork
    {
        IEnumerable<CardPeak.Domain.ApprovalTransaction> GetTransactions(string clientName);
    }
}
