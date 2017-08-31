using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace CardPeak.WebAPI.Core
{
    public sealed class BatchUploadMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public BatchUploadMultipartFormDataStreamProvider(string path) : base(path)
        { }

        public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
        {
            var name = !string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName) ? 
                    headers.ContentDisposition.FileName : Guid.NewGuid().ToString();
            return name.Replace("\"", string.Empty);
        }
    }
}