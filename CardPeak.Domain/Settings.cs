using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class Settings
    {
        public IEnumerable<Reference> Banks { get; set; }
        public IEnumerable<Reference> CardCategories { get; set; }
        public IEnumerable<Rate> Rates { get; set; }
    }
}
