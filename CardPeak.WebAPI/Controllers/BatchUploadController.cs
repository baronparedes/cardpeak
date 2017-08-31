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
        [HttpPost]
        [Route("batchupload")]
        public async Task<IHttpActionResult> BatchUpload()
        {
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var root = HttpContext.Current.Server.MapPath("~/App_Data/uploads");
            var provider = new BatchUploadMultipartFormDataStreamProvider(root);

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
                var uploadedFile = provider.FileData.First();
                Console.WriteLine(uploadedFile.LocalFileName);

                return this.Ok();
            }
            catch (System.Exception e)
            {
                return this.InternalServerError(e);
            }
        }
    }
}
