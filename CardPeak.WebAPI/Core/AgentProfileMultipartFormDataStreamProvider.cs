using System.Net.Http;

namespace CardPeak.WebAPI.Core
{
    public sealed class AgentProfileMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public string OriginalFileName { get; private set; }
        private int AgentId { get; set; }
        private string Extension { get; set; }

        public AgentProfileMultipartFormDataStreamProvider(string path, int agentId, string extension) : base(path)
        {
            AgentId = agentId;
            Extension = extension;
        }

        public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
        {
            if (string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName))
            {
                return this.AgentId.ToString();
            }

            var fileName = headers.ContentDisposition.FileName.Replace("\"", string.Empty);
            var result = string.Format("{0}{1}",
                this.AgentId.ToString(),
                this.Extension);
            this.OriginalFileName = fileName;
            return result;
        }
    }
}