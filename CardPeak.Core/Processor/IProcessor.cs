using System.IO;

namespace CardPeak.Core.Processor
{
    public interface IProcessor
    {
        void Process(FileInfo file);
    }
}
