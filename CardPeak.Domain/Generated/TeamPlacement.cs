
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
    
public partial class TeamPlacement
{

    public int TeamPlacementId { get; set; }

    public int TeamId { get; set; }

    public int AgentId { get; set; }

    public bool IsUnitManager { get; set; }



    public virtual Agent Agent { get; set; }

    public virtual Team Team { get; set; }

}

}
