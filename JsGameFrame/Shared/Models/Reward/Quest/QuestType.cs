namespace Idlebar.Shared
{
    /// <summary>
    /// Used to determite the type of a given <see cref="Quest"/>.
    /// </summary>
    public enum QuestType
    {
        /// <summary>
        /// Obtain TotalEnergy Quest Type.
        /// </summary>
        TotalEnergy = 1,
        TotalTiers = 2,
        TotalPower = 3,
        RewardRoadProgress = 4,
        RGTime = 5,
        FunButtonClicks = 6,
        UpgradeLevels = 7,
        //Add more to have more types of quests
    }
}
