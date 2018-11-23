using CardPeak.Core.Service;
using CardPeak.Service;
using System;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
	[RoutePrefix("api/teams")]
	public sealed class TeamsController : ApiController
	{
		private ITeamDashboardService TeamPlacementService { get; set; }

		public TeamsController()
		{
			this.TeamPlacementService = new TeamDashboardService(new Repository.EF.CardPeakDbContext());
		}

		public IHttpActionResult Get()
		{
			var result = this.TeamPlacementService.GetTeams();
			return this.Ok(result);
		}

		[HttpPost]
		[Route("create")]
		public IHttpActionResult Create(string teamName, string description)
		{
			try
			{
				var result = this.TeamPlacementService.CreateTeam(teamName, description);
				return this.Ok(result);
			}
			catch (Exception e)
			{
				return this.InternalServerError(e);
			}
		}

		[HttpDelete]
		[Route("delete/{id}")]
		public IHttpActionResult Delete(int id)
		{
			try
			{
				var result = this.TeamPlacementService.RemoveTeam(id);
				if (result)
				{
					return this.Ok(id);
				}
				else
				{
					return this.NotFound();
				}
			}
			catch (Exception e)
			{
				return this.InternalServerError(e);
			}
		}

		[HttpGet]
		[Route("{id}/dashboard")]
		public IHttpActionResult GetDashboard(int id, int? year)
		{
			var result = this.TeamPlacementService.GetDashboard(id, year);
			return this.Ok(result);
		}

		[HttpDelete]
		[Route("{id}/delete")]
		public IHttpActionResult DeleteAgent(int id, int agentId)
		{
			try
			{
				var result = this.TeamPlacementService.RemoveAgent(id, agentId);
				if (result)
				{
					return this.Ok(id);
				}
				else
				{
					return this.NotFound();
				}
			}
			catch (Exception e)
			{
				return this.InternalServerError(e);
			}
		}

		[HttpPost]
		[Route("{id}/add")]
		public IHttpActionResult AddAgent(int id, int agentId, int performanceYear)
		{
			try
			{
				var result = this.TeamPlacementService.AddAgent(id, agentId, false, performanceYear);
				return this.Ok(result);
			}
			catch (Exception e)
			{
				return this.InternalServerError(e);
			}
		}

	}
}
