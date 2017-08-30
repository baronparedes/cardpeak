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
    [RoutePrefix("api/settings")]
    public sealed class SettingsController : ApiController
    {
        public SettingsService SettingsService { get; set; }

        public SettingsController()
        {
            this.SettingsService = new SettingsService(new Repository.EF.CardPeakDbContext());
        }

        [HttpGet]
        [Route("rates/{id}")]
        public IHttpActionResult GetRates(int id)
        {
            var result = this.SettingsService.GetSettings(id);
            if (result == null)
            {
                return this.NotFound();
            }

            return this.Ok(result);
        }

        [HttpPost]
        [Route("rates/{id}")]
        public IHttpActionResult SaveRates(int id, Settings settings)
        {
            return this.Ok(settings.Rates);
        }
    }
}
