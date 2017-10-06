using CardPeak.Core.Service;
using CardPeak.Domain;
using CardPeak.Service;
using CardPeak.WebAPI.Core;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CardPeak.WebAPI.Controllers
{
    [RoutePrefix("api/uploads")]
    public class BatchUploadController : ApiController
    {
        private static readonly string Root = HttpContext.Current.Server.MapPath("~/App_Data/uploads");

        private IBatchService BatchService { get; set; }

        public BatchUploadController()
        {
            this.BatchService = new BatchService(new Repository.EF.CardPeakDbContext());
        }

        [HttpGet]
        [Route("config/{id}")]
        public IHttpActionResult GetBatchFileConfig(int id)
        {
            var result = this.BatchService.GetBatchFileConfiguration(id);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }

        [HttpPost]
        [Route("config")]
        public IHttpActionResult PostBatchFileConfig(BatchFileConfiguration batchFileConfiguration)
        {
            var result = this.BatchService.SaveBatchFileConfiguration(batchFileConfiguration);
            if (result == null)
            {
                return this.InternalServerError();
            }

            return this.Ok(result);
        }

        [HttpPost]
        [Route("delete/{id}")]
        public IHttpActionResult DeleteBatch(int id)
        {
            try
            {
                var result = this.BatchService.Delete(id);
                if (result)
                {
                    return this.Ok(result);
                }
                else
                {
                    throw new Exception(string.Format("Unable to delete batch: {0}", id));
                }
            }
            catch (Exception e)
            {
                return this.InternalServerError(e);
            }
        }

        [HttpPost]
        [Route("batch/{id}")]
        public IHttpActionResult ProcessBatch(int id)
        {
            try
            {
                var result = this.BatchService.Process(id);
                result.ProcessedApprovalTransactions = result.ProcessedApprovalTransactions.Where(_ => _.HasErrors);
                return this.Ok(result);
            }
            catch (Exception e)
            {
                return this.InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("manage")]
        public IHttpActionResult GetProcessedBatchUploads([FromUri]DateTime startDate, [FromUri]DateTime? endDate = null)
        {
            var result = this.BatchService.GetProcessedBatchUploads(startDate, endDate);
            if (result == null)
            {
                return this.NotFound();
            }
            return this.Ok(result);
        }

        [HttpPost]
        [Route("batch")]
        public async Task<IHttpActionResult> BatchUpload()
        {
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            try
            {
                var provider = new BatchUploadMultipartFormDataStreamProvider(BatchUploadController.Root);
                await Request.Content.ReadAsMultipartAsync(provider);
                var uploadedFile = new FileInfo(provider.FileData.First().LocalFileName);
                var result = this.BatchService.CreateBatch(uploadedFile);

                if (result == null)
                {
                    return this.NotFound();
                }
               
                return this.Ok(result);
            }
            catch (System.Exception e)
            {
                return this.InternalServerError(e);
            }
        }
    }
}
