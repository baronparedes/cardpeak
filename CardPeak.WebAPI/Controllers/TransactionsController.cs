using CardPeak.Core.Service;
using CardPeak.Service;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
    [RoutePrefix("api/transactions")]
    public sealed class TransactionsController : ApiController
    {
        private ITransactionService TransactionService { get; set; }

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
