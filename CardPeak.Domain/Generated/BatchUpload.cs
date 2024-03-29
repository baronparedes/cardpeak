
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace CardPeak.Domain
{

using System;
    using System.Collections.Generic;
    
public partial class BatchUpload
{

    public int BatchId { get; set; }

    public string FileName { get; set; }

    public int BankId { get; set; }

    public Nullable<bool> HasErrors { get; set; }

    public Nullable<System.DateTime> ProcessStartDateTime { get; set; }

    public Nullable<System.DateTime> ProcessEndDateTime { get; set; }

    public Nullable<int> ProcessedRecords { get; set; }

    public string CreatedBy { get; set; }

    public System.DateTime CreatedDate { get; set; }

    public bool IsDeleted { get; set; }



    public virtual Reference Bank { get; set; }

}

}
