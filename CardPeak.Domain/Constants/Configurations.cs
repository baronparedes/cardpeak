namespace CardPeak.Domain.Constants
{
    public static class Configurations
    {
        public static int TopAgentCount
        {
            get
            {
                return 10;
            }
        }

        public static int LatestProcessedBatchCount
        {
            get
            {
                return 5;
            }
        }

        public static string MonthFormat
        {
            get
            {
                return "MMM";
            }
        }

        public static int MaxTransactionsQuery
        {
            get
            {
                return 200;
            }
        }

        public static string DateTimeFormat
        {
            get
            {
                return "MM/dd/yyyy";
            }
        }
    }
}
