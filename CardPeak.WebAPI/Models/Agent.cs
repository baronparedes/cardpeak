using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CardPeak.WebAPI.Models
{
    public sealed class Agent
    {
        public int AgentId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Alias { get; set; }
    }
}