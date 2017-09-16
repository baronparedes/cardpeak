using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Domain.Constants
{
    public sealed class CardCategory
    {
        private CardCategory() { }
        private static Dictionary<string, string> CodesInstance = null;
        public static Dictionary<string, string> Codes
        {
            get
            {
                if (CardCategory.CodesInstance == null)
                {
                    CardCategory.CodesInstance = new Dictionary<string, string>
                    {
                        { "C", "Classic" },
                        { "G", "Gold" },
                        { "P", "Platinum" }
                    };
                }
                return CardCategory.CodesInstance;
            }
        }
    }
}
