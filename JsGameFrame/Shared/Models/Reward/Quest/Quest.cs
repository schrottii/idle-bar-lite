using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Idlebar.Shared
{
    public class Quest
    {
        /// <summary>
        /// The Id of the quest.
        /// </summary>
        public int Id { get; set; }

        [JsonIgnore]
        public List<OpenQuest> OpenQuests { get; set; } //Nav Property

        /// <summary>
        /// The difficulty of the quest.
        /// </summary>
        public QuestDifficulty Difficulty { get; set; }

        /// <summary>
        /// The type of the quest.
        /// </summary>
        public QuestType Type { get; set; }

        /// <summary>
        /// The amount of <see cref="Type"/> needed to complete the quest.
        /// </summary>
        public int Value { get; set; }
    }
}