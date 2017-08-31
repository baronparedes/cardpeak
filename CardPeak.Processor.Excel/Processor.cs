using CardPeak.Core.Processor;
using System;
using System.IO;

namespace CardPeak.Processor.Excel
{
    public sealed class Processor : IProcessor
    {
        public void Process(FileInfo file)
        {
            System.Threading.Thread.Sleep(5000);
        }
    }
}
