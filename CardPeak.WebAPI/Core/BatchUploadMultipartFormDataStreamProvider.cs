using System;
using System.IO;
using System.Net.Http;

namespace CardPeak.WebAPI.Core
{
    public sealed class BatchUploadMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public string OriginalFileName { get; private set; }

        public BatchUploadMultipartFormDataStreamProvider(string path) : base(path)
        { }

        public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
        {
            if (string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName))
            {
                return Guid.NewGuid().ToString();
            }

            var fileName = headers.ContentDisposition.FileName.Replace("\"", string.Empty);
            var result = string.Format("{0}.{1}{2}", 
                Path.GetFileNameWithoutExtension(fileName), 
                Guid.NewGuid().ToString(),
                Path.GetExtension(fileName));
            this.OriginalFileName = fileName;
            return result;
        }
    }
}