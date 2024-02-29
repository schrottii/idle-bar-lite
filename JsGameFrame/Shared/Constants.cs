namespace Idlebar.Shared
{
    //Increadibly bad code style
    //Grammer be do be bad too increadibilis!
    public static class Constants
    {
        public static readonly double[] LevelUpgradeMultiplicators = new double[]
        {
            0.1,
            0.3,
            1.0,
            0.2,
            3.0,
        };

        public const double EnergyUpgradeMultiplicator
            = 1.0;

        public const int MaxNameLenght = 18;

        public const int CurrentSeasonIndex = 7;

        public const double MaxSliderMultiplier = 2.5;

        public const int QuestSlots = 5;

        public const int EnergyUpgradeCount = 5;
        public const int LevelUpgradeCount = 5;

        public static Season CurrentSeason => GetSeason(CurrentSeasonIndex);

        public static Season GetSeason(int index)
            => Season.FromIndex(index);
    }
}