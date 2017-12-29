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
        [Route("agents/threshold")]
        public IHttpActionResult GetAgentThreshold([FromUri]int? year = null, [FromUri]int? month = null)
        {
            var result = this.MetricsService.GetAgentThresholdMetrics(year, month);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }

        [HttpGet]
        [Route("banks/amountdistribution")]
        public IHttpActionResult GetBankDistribution([FromUri]int? year = null, [FromUri]int? month = null)
        {
            var result = this.MetricsService.GetBankAmountDistributionMetrics(year, month);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }
    }
}
