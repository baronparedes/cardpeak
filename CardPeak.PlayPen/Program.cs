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

            var batchConfig = new BatchFileConfiguration();
            batchConfig.HasHeader = true;
            batchConfig.Ref1Column = 0;
            batchConfig.ApprovalDateColumn = 2;
            batchConfig.ClientLastNameColumn = 3;
            batchConfig.ClientFirstNameColumn = 4;
            batchConfig.ClientMiddleNameColumn = 5;
            batchConfig.ProductTypeColumn = 7;
            batchConfig.CardCountColumn = 10;
            batchConfig.AliasColumn = 11;
            batchConfig.CardCategoryColumn = 13;

            var fileName = @"D:\Metrobank.xlsx";
            var file = new FileInfo(fileName);
            var processor = new CardPeak.Processor.Excel.Processor(service);
            var result = processor.Process(file, batchUpload, batchConfig);

            Console.WriteLine("Errors");
            foreach (var item in result.Where(_ => _.HasErrors))
            {
                Console.WriteLine(item.ApprovalTransaction.ReferenceNumber1);
            }

            Console.WriteLine("Processed");
            foreach (var item in result.Where(_ => !_.HasErrors))
            {
                Console.WriteLine(item.ApprovalTransaction.ReferenceNumber1);
            }

            Console.ReadLine();
        }
    }
}
