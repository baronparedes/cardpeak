using CardPeak.Service;
using CardPeak.WebAPI.Models;
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
            return this.AgentService.GetAllAgents().Select(_ => new Agent {
                AgentId = _.AgentId,
                FirstName = _.FirstName,
                MiddleName = _.MiddleName,
                LastName = _.LastName,
                Gender = _.Gender,
                BirthDate = _.BirthDate,
                Alias = _.Accounts.Select(a => a.Alias)
            });
        }
    }
}
