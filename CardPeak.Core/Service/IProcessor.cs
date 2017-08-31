using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Service
{
    public interface IProcessor
    {
        void Process(FileInfo file);
    }
}
