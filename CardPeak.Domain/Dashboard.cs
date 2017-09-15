using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class Dashboard
    {
        public IEnumerable<BatchUpload> LatestProcessedBatch { get; set; }
    }
}
