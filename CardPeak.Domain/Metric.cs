using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class Metric
    {
        public string Key { get; set; }
        public decimal Value { get; set; }
    }
}
