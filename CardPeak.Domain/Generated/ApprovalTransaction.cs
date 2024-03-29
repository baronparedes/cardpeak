
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
    
public partial class ApprovalTransaction
{

    public long Id { get; set; }

    public int BankId { get; set; }

    public int CardCategoryId { get; set; }

    public int AgentId { get; set; }

    public decimal Units { get; set; }

    public decimal Amount { get; set; }

    public string ProductType { get; set; }

    public string ReferenceNumber1 { get; set; }

    public string ReferenceNumber2 { get; set; }

    public string Client { get; set; }

    public System.DateTime ApprovalDate { get; set; }

    public Nullable<int> BatchId { get; set; }

    public bool IsDeleted { get; set; }

    public string CreatedBy { get; set; }

    public System.DateTime CreatedDate { get; set; }

    public Nullable<System.Guid> TransactionId { get; set; }



    public virtual Agent Agent { get; set; }

    public virtual Reference Bank { get; set; }

    public virtual Reference CardCategory { get; set; }

}

}
