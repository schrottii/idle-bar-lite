using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Idlebar.Shared
{
    public class CodeReward : IReward
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public RewardType Type { get; set; }
        public int Value { get; set; }
        public int? Index { get; set; }

        [JsonIgnore]
        public List<UsedReward> UsedRewards { get; set; }

        public CodeReward()
        {
        }
    }
}