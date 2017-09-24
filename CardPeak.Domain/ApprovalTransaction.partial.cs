namespace CardPeak.Domain
{
    public partial class ApprovalTransaction
	{
		public override int GetHashCode()
		{
			return base.GetHashCode();
		}

		public override bool Equals(object obj)
		{
			var compare = obj as ApprovalTransaction;
			if (compare == null)
			{
				return base.Equals(obj);
			}

			return this.Id == compare.Id &&
				this.AgentId == compare.AgentId &&
				this.BankId == compare.BankId &&
				this.CardCategoryId == compare.CardCategoryId &&
				this.ProductType == compare.ProductType &&
				this.ReferenceNumber1 == compare.ReferenceNumber1 &&
				this.ReferenceNumber2 == compare.ReferenceNumber2 &&
				this.Client == compare.Client &&
				this.IsDeleted == compare.IsDeleted;
		}
	}
}
