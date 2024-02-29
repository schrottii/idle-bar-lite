using System;
using System.Text.Json.Serialization;

namespace Idlebar.Shared
{
    public class UsedReward
    {
        public Guid Id { get; set; }
        public DateTimeOffset UsedAt { get; set; }

        public Guid StateId { get; set; }
        public long RewardId { get; set; }

        [JsonIgnore]
        public SaveState State { get; set; }

        [JsonIgnore]
        public CodeReward Reward { get; set; }

        public UsedReward(Guid stateId, long rewardId)
        {
            Id = Guid.NewGuid();
            UsedAt = DateTimeOffset.UtcNow;

            StateId = stateId;
            RewardId = rewardId;
        }

        public UsedReward()
        {
        }

        public UsedReward Clone(Guid stateId)
        {
            var clone = MemberwiseClone() as UsedReward;
            clone.Id = Guid.NewGuid();
            clone.StateId = stateId;
            return clone;
        }
    }
}