using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain
{
    public sealed class AgentDetails
    {
        public IEnumerable<Account> Accounts { get; set; }
        public IEnumerable<TeamPlacement> TeamPlacements { get; set; }
    }
}
