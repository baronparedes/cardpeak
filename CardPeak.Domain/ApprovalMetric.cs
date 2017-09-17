namespace CardPeak.Domain
{
    public sealed class ApprovalMetric<TKey>
    {
        public TKey Key { get; set; }
        public decimal Value { get; set; }
    }
}
