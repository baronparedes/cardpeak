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
    
    public partial class Rate
    {
        public int RateId { get; set; }
        public decimal Rate1 { get; set; }
        public int BankId { get; set; }
        public int CardCategoryId { get; set; }
        public int AgentId { get; set; }
    
        public virtual Agent Agent { get; set; }
        public virtual Reference Reference { get; set; }
        public virtual Reference Reference1 { get; set; }
    }
}
