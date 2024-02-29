namespace Idlebar.Shared
{
    public class RewardInfo
    {
        public long RewardId { get; set; }
        public RewardSource Source { get; set; }

        public RewardInfo(RewardSource source, long rewardId)
        {
            RewardId = rewardId;
            Source = source;
        }
        public RewardInfo()
        {
        }
    }
}
