namespace CardPeak.Domain
{
    public class ApprovalMetric<TKey>
    {
        public TKey Key { get; set; }
        public decimal Value { get; set; }
    }
}
