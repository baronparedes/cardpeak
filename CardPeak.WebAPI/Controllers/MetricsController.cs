using CardPeak.Core.Service;
using CardPeak.Service;
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

        [HttpGet]
        [Route("agents/rankings")]
        public IHttpActionResult GetAgentRankMetrics([FromUri]int? year = null, [FromUri]int? month = null)
        {
            var result = this.MetricsService.GetAgentRankMetrics(year, month);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }

        [HttpGet]
        [Route("agents/performance")]
        public IHttpActionResult GetAgentPerformance([FromUri]int? year = null)
        {
            var result = this.MetricsService.GetAgentPerformanceMetrics(year);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }

        [HttpGet]
        [Route("agents/treshold")]
        public IHttpActionResult GetAgentTreshold([FromUri]int? year = null, [FromUri]int? month = null)
        {
            var result = this.MetricsService.GetAgentTresholdMetrics(year, month);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }

        [HttpGet]
        [Route("banks/amountbreakdown")]
        public IHttpActionResult GetBankBreakdown([FromUri]int? year = null, [FromUri]int? month = null)
        {
            var result = this.MetricsService.GetBankAmountBreakdownMetrics(year, month);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }
    }
}
