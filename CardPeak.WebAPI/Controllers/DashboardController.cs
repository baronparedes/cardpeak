using CardPeak.Core.Service;
using CardPeak.Service;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
    [RoutePrefix("api/dashboard")]
    public class DashboardController : ApiController
    {
        private IDashboardService DashboardService;

        public DashboardController()
        {
            this.DashboardService = new DashboardService(new Repository.EF.CardPeakDbContext());
        }

        public IHttpActionResult Get()
        {
            var result = this.DashboardService.GetDashboard();
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }
    }
}
