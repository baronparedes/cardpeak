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
        private static readonly string Staging = HttpContext.Current.Server.MapPath("~/App_Data/staging");
        private static readonly string Processed = HttpContext.Current.Server.MapPath("~/App_Data/Processed");

        public IBatchService BatchService { get; set; }

        public BatchUploadController()
        {
            this.BatchService = new BatchService(new Repository.EF.CardPeakDbContext());
        }

        [HttpPost]
        [Route("batchupload/{id}")]
        public async Task<IHttpActionResult> ProcessBatch(int id)
        {
            try
            {
                BatchUpload result = null;
                result = await this.BatchService.ProcessAsync(id);
                return this.Ok(result);
            }
            catch (Exception e)
            {
                return this.InternalServerError(e);
            }
        }

        [HttpPost]
        [Route("batchupload")]
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
