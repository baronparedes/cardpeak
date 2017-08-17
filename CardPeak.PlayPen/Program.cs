using CardPeak.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.PlayPen
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new CardPeakDbContext())
            {
                var repo = new UserRepository(context);
                var user = repo.Get(0);

                Console.WriteLine(user.Email);
                Console.ReadLine();
            }
        }
    }
}
