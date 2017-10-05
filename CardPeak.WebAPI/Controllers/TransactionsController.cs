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

        [HttpPost]
        [Route("delete/{id}")]
        public IHttpActionResult Delete(int id)
        {
            var result = this.TransactionService.DeleteTransaction(id);
            if (!result)
            {
                return this.NotFound();
            }

            return this.Ok(id);
        }

        [HttpGet]
        [Route("client/{clientName}")]
        public IHttpActionResult GetTransactionsByClient(string clientName)
        {
            var result = this.TransactionService.GetTransactionsByClient(clientName);
            if (result == null)
            {
                this.NotFound();
            }

            return this.Ok(result);
        }

        [HttpGet]
        [Route("batch/{id}")]
        public IHttpActionResult GetTransactionsByBatch(int batchId)
        {
            var result = this.TransactionService.GetTransactionsByBatch(batchId);
            if (result == null)
            {
                this.NotFound();
            }

            return this.Ok(result);
        }
    }
}
