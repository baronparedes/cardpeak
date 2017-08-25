using CardPeak.Domain;
using CardPeak.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
    public sealed class AgentsController : ApiController
    {
        public AgentService AgentService { get; set; }

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
            return this.GetAgent(id, DateTime.Today, null);
        }

        [Route("agents/{id}/filter")]
        public IHttpActionResult GetAgent(int id, [FromUri]DateTime? startDate, [FromUri]DateTime? endDate)
        {
            var result = this.AgentService.GetAgentDashboard(
                id,
                startDate.HasValue ? startDate.GetValueOrDefault() :
                DateTime.Today, endDate);

            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        [Route("agents/{id}/credit")]
        public IHttpActionResult CreditAgent(int id, [FromUri]decimal amount, [FromUri]string remarks)
        {
            if (this.AgentService.AddDebitCreditTransaction(id, amount, remarks, false))
            {
                return this.Ok();
            }

            return this.InternalServerError();
        }

        [Route("agents/{id}/debit")]
        public IHttpActionResult DebitAgent(int id, [FromUri]decimal amount, [FromUri]string remarks)
        {
            if (this.AgentService.AddDebitCreditTransaction(id, amount, remarks, true))
            {
                return this.Ok();
            }

            return this.InternalServerError();
        }
    }
}
