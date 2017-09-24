using CardPeak.Core.Service;
using CardPeak.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
    [RoutePrefix("api/metrics")]
    public sealed class MetricsController : ApiController
    {
        private IMetricsService MetricsService;

        public MetricsController()
        {
            this.MetricsService = new MetricsService(new Repository.EF.CardPeakDbContext());
        }

        [HttpGet]
        [Route("agents")]
        public IHttpActionResult GetAgentMetrics([FromUri]int? year = null, [FromUri]int? month = null)
        {
            var result = this.MetricsService.GetAgentApprovalMetrics(year, month);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }
    }
}
