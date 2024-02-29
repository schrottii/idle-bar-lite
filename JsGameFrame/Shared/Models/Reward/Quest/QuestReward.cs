using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Idlebar.Shared
{
    /// <summary>
    /// A reward which is obtained by completing quests.
    /// </summary>
    public class QuestReward : IReward
    {
        public long Id { get; set; }

        /// <summary>
        /// The difficulty of <see cref="Quest"/> needed to obtain the reward.
        /// </summary>
        public QuestDifficulty Difficulty { get; set; }

        public RewardType Type { get; set; }
        public int Value { get; set; }
        public int? Index { get; set; }

        [JsonIgnore]
        public List<OpenQuest> OpenQuests { get; set; }

        public QuestReward()
        {
        }
    }
}