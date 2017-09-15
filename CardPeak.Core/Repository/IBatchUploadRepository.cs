﻿using CardPeak.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardPeak.Core.Repository
{
    public interface IBatchUploadRepository : IRepository<BatchUpload>
    {
        void StartBatchProcess(BatchUpload batch);
        void EndBatchProcess(BatchUpload batch);
    }
}
