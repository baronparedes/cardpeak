namespace CardPeak.Domain.Metrics
{
	public class ApprovalMetric<TKey>
	{
		public TKey Key { get; set; }
		public decimal Value { get; set; }
		public decimal Amount { get; set; }
	}
}
