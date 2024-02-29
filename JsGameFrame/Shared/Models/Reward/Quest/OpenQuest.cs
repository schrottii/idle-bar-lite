using System;
using System.Text.Json.Serialization;

namespace Idlebar.Shared
{
    //Stored per State, Generated per User
    public class OpenQuest
    {
        /// <summary>
        /// The Id of the open quest.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The time at which the quest was created.
        /// </summary>
        public DateTimeOffset CreatedAt { get; set; }

        /// <summary>
        /// The state that has to do the quest.
        /// </summary>
        public Guid StateId { get; set; }

        [JsonIgnore]
        public SaveState State { get; set; } //Nav Property

        /// <summary>
        /// The quest that has to be done.
        /// </summary>
        public int QuestId { get; set; }

        public Quest Quest { get; set; } //Nav Property

        /// <summary>
        /// The reward for completing the quest.
        /// </summary>
        public long RewardId { get; set; }

        public QuestReward Reward { get; set; } //Nav Property

        /// <summary>
        /// The progress the player achieved in this quest.
        /// </summary>
        public double Progress { get; set; }

        public OpenQuest()
        {
        }

        public OpenQuest(SaveState state, Quest quest, QuestReward reward)
        {
            CreatedAt = DateTimeOffset.UtcNow;
            StateId = state.Id;
            QuestId = quest.Id;
            RewardId = reward.Id;
        }

        public OpenQuest Clone(Guid newStateId)
        {
            var clone = MemberwiseClone() as OpenQuest;
            clone.Id = 0;
            clone.StateId = newStateId;
            clone.Progress = Progress;
            return clone;
        }

        public static OpenQuest CreateDummy(long id)
            => new OpenQuest()
            {
                Id = id
            };

        public static OpenQuest CreateDummy(long id, double progress)
            => new OpenQuest()
            {
                Id = id,
                Progress = progress
            };
    }
}