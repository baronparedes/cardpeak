using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Service;
using CardPeak.WebAPI.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
    [RoutePrefix("api/agents")]
    public sealed class AgentsController : ApiController
    {
        private static readonly string Root = HttpContext.Current.Server.MapPath("~/App_Data/profiles");
        private static readonly string Extension = ".png";
        private static readonly string ContentType = "image/png";

        private IAgentService AgentService { get; set; }

        public AgentsController()
        {
            this.AgentService = new AgentService(new Repository.EF.CardPeakDbContext());
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing)
            {
                this.AgentService.Dispose();
            }
        }

        public IEnumerable<Agent> GetAllAgents()
        {
            return this.AgentService.GetAllAgents();
        }

        public IHttpActionResult GetAgent(int id)
        {
            return this.GetAgent(id, null, null);
        }

        [HttpGet]
        [Route("{id}/details")]
        public IHttpActionResult GetDetails(int id)
        {
            var result = this.AgentService.GetAgentDetails(id);
            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        [HttpGet]
        [Route("{id}/filter")]
        public IHttpActionResult GetAgent(int id, [FromUri] DateTime? startDate = null, [FromUri] DateTime? endDate = null)
        {
            var result = this.AgentService.GetAgentDashboard(
                id,
                startDate ?? new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1),
                endDate);

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        [HttpPost]
        [Route("{id}/update")]
        public IHttpActionResult Update(Agent agent)
        {
            var result = this.AgentService.Update(agent);
            if (result == null)
            {
                return this.InternalServerError();
            }

            return this.Ok(result);
        }

        [HttpGet]
        [Route("payout")]
        public IHttpActionResult GetPayout()
        {
            try
            {
                var result = this.AgentService.GetAgentPayouts();
                return this.Ok(result);
            }
            catch (Exception e)
            {
                return this.InternalServerError(e);
            }
        }

        [HttpPost]
        [Route("create")]
        public IHttpActionResult Create(Agent agent)
        {
            var result = this.AgentService.Create(agent);
            if (result == null)
            {
                return this.InternalServerError();
            }

            return this.Ok(result);
        }

        [HttpPost]
        [Route("{id}/credit")]
        public IHttpActionResult CreditAgent(int id, decimal amount, string remarks)
        {
            return this.DebitCreditAgent(id, amount, remarks, false);
        }

        [HttpPost]
        [Route("{id}/debit")]
        public IHttpActionResult DebitAgent(int id, decimal amount, string remarks)
        {
            return this.DebitCreditAgent(id, amount, remarks, true);
        }

        private IHttpActionResult DebitCreditAgent(int id, decimal amount, string remarks, bool isDebit)
        {
            var result = this.AgentService.AddDebitCreditTransaction(id, amount, remarks, isDebit);
            if (result == null)
            {
                return this.InternalServerError();
            }

            return this.Ok(result);
        }

        [HttpPost]
        [Route("{id}/incentive")]
        public IHttpActionResult IncentiveAgent(int id, decimal amount, string remarks)
        {
            var result = this.AgentService.AddIncentiveTransaction(id, amount, remarks);
            if (result == null)
            {
                return this.InternalServerError();
            }

            return this.Ok(result);
        }

        [HttpGet]
        [Route("{id}/savings")]
        public IHttpActionResult GetAgentSavings(int id, [FromUri] int? year = null)
        {
            var result = this.AgentService.GetAgentSavings(id, year);
            if (result == null)
            {
                return this.InternalServerError();
            }

            return this.Ok(result);
        }

        [HttpPost]
        [Route("{id}/savings/credit")]
        public IHttpActionResult SavingsCreditAgent(int id, decimal amount, string remarks, DateTime? transactionDate)
        {
            return this.SavingsDebitCreditAgent(id, amount, remarks, transactionDate, false);
        }

        [HttpPost]
        [Route("{id}/savings/debit")]
        public IHttpActionResult SavingsDebitAgent(int id, decimal amount, string remarks, DateTime? transactionDate)
        {
            return this.SavingsDebitCreditAgent(id, amount, remarks, transactionDate, true);
        }


        private IHttpActionResult SavingsDebitCreditAgent(int id, decimal amount, string remarks, DateTime? transactionDate, bool isDebit)
        {
            var result = this.AgentService.AddDebitCreditSavingsTransaction(id, amount, remarks, transactionDate, isDebit);
            if (result == null)
            {
                return this.InternalServerError();
            }

            return this.Ok(result);
        }

        [HttpPost]
        [Route("deactivate/{id}")]
        public IHttpActionResult DeactivateAgent(int id)
        {
            try
            {
                this.AgentService.DeactivateAgent(id);
                return this.Ok(id);
            }
            catch (Exception e)
            {
                return this.InternalServerError(e);
            }
        }

        [HttpPost]
        [Route("{id}/photo")]
        public async Task<IHttpActionResult> UploadPhoto(int id)
        {
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            try
            {
                var provider = new AgentProfileMultipartFormDataStreamProvider(AgentsController.Root, id, AgentsController.Extension);
                await Request.Content.ReadAsMultipartAsync(provider);
                var uploadedFile = new FileInfo(provider.FileData.First().LocalFileName);

                return this.Ok();
            }
            catch (System.Exception e)
            {
                return this.InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("{id}/photo")]
        public IHttpActionResult GetPhoto(int id)
        {
            var filePath = string.Format("{0}\\{1}{2}", AgentsController.Root, id, AgentsController.Extension);

            if (!File.Exists(filePath))
            {
                return NotFound();
            }

            byte[] imageBytes = File.ReadAllBytes(filePath);
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new ByteArrayContent(imageBytes);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(AgentsController.ContentType);

            return ResponseMessage(response);
        }
    }
}
