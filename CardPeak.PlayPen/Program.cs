using CardPeak.Domain;
using CardPeak.Repository.EF;
using CardPeak.Service;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.PlayPen
{
    class Program
    {
        static void Main(string[] args)
        {
            var context = new CardPeakDbContext();
            var service = new ProcessorService(context);
            var batchUpload = new BatchUpload();
            batchUpload.BankId = 1;
            batchUpload.BatchId = 1;

            var batchConfig = new BatchUploadConfiguration();
            batchConfig.FirstRowIsHeader = true;
            batchConfig.Ref1Column = 0;
            batchConfig.ApprovalDateColumn = 2;
            batchConfig.ClientLastNameColumn = 3;
            batchConfig.ClientFirstNameColumn = 4;
            batchConfig.ClientMiddleNameColumn = 5;
            batchConfig.ProductColumn = 6;
            batchConfig.MultiplCardColumn = 8;
            batchConfig.AliasColumn = 9;
            batchConfig.AmountColumn = 10;
            batchConfig.CardCategoryColumn = 11;

            var fileName = @"D:\Metrobank.xlsx";
            var file = new FileInfo(fileName);
            var processor = new CardPeak.Processor.Excel.Processor(service);
            processor.Process(file, batchUpload, batchConfig);
        }
    }
}
