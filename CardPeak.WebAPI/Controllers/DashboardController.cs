﻿using CardPeak.Core.Service;
using CardPeak.Service;
using System;
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
			return this.RefreshDashboard(DateTime.Now.Year, null);
		}

		[HttpGet]
		[Route("refresh")]
		public IHttpActionResult RefreshDashboard([FromUri]int? year = null, [FromUri]int? month = null)
		{
			var result = this.DashboardService.GetDashboard(year, month);
			if (result == null)
			{
				return this.NotFound();
			}
			return this.Ok(result);
		}

		[HttpGet]
		[Route("years")]
		public IHttpActionResult GetAvailableYears()
		{
			var result = this.DashboardService.GetAvailableYears();
			if (result == null)
			{
				return this.NotFound();
			}
			return this.Ok(result);
		}
	}
}
