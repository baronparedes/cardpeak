using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Service;
using System;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
	[RoutePrefix("api/settings")]
	public sealed class SettingsController : ApiController
	{
		private ISettingsService SettingsService { get; set; }

		public SettingsController()
		{
			this.SettingsService = new SettingsService(new Repository.EF.CardPeakDbContext());
		}

		[Route("references")]
		public Settings GetSettings()
		{
			var result = this.SettingsService.GetSettings();
			return result;
		}

		[HttpGet]
		[Route("references/create/{id}")]
		public IHttpActionResult PostReference(int id, Reference reference)
		{
			return null;
		}

		[HttpGet]
		[Route("rates/{id}")]
		public IHttpActionResult GetRates(int id)
		{
			var result = this.SettingsService.GetRates(id);
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
			try
			{
				var result = this.SettingsService.SaveRates(id, settings);
				return this.Ok(result);
			}
			catch (Exception e)
			{
				return this.InternalServerError(e);
			}
		}

		[HttpGet]
		[Route("rates/default/{id}")]
		public IHttpActionResult GetDefaultRates(int id)
		{
			var result = this.SettingsService.GetDefaultRates(id);
			if (result == null)
			{
				return this.NotFound();
			}

			return this.Ok(result);
		}

		[HttpPost]
		[Route("rates/default/{id}")]
		public IHttpActionResult SaveDefaultRates(int id, Settings settings)
		{
			try
			{
				var result = this.SettingsService.SaveDefaultRates(id, settings);
				return this.Ok(result);
			}
			catch (Exception e)
			{
				return this.InternalServerError(e);
			}
		}
	}
}
