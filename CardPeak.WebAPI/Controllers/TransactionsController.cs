using CardPeak.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
    [RoutePrefix("api/transactions")]
    public sealed class TransactionsController : ApiController
    {
        public TransactionService TransactionService { get; set; }

        public TransactionsController()
        {
            this.TransactionService = new TransactionService(new Repository.EF.CardPeakDbContext());
        }

        [HttpGet]
        [Route("{clientName}")]
        public IHttpActionResult GetTransactions(string clientName)
        {
            var result = this.TransactionService.GetTransactions(clientName);
            if (result == null)
            {
                this.NotFound();
            }

            return this.Ok(result);
        }
    }
}
