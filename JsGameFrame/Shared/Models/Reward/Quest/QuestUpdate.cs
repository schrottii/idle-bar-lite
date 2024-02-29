namespace Idlebar.Shared
{
    /// <summary>
    /// Represents the update to a <see cref="OpenQuest"/> object. 
    /// The <see cref="Progress"/> property value is replacing the <see cref="OpenQuest"/>'s Progress value.
    /// </summary>
    public class QuestUpdate
    {
        /// <summary>
        /// The id of the quest this update is referring to.
        /// </summary>
        public long QuestId { get; set; }

        /// <summary>
        /// The new progress value for the quest.
        /// </summary>
        public double Progress { get; set; }

        public QuestUpdate(long questId, double progress)
        {
            QuestId = questId;
            Progress = progress;
        }
    }
}
