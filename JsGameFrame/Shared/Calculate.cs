using Idlebar.Shared;
using System;

namespace Idlebar.Server
{
    public static class Calculate
    {
        public static double EnergyPerSecond(SaveState dataState, double energySliderMulti = Constants.MaxSliderMultiplier)
            => (dataState.EnergyUpgrades[0] + 1) * ((dataState.PowerUpgrades[3] / 10d) + 1) * 8 * energySliderMulti;

        public static long PowerProduction(SaveState dataState)
            => dataState.PowerUpgrades[4] + 1;

        private static double EnergyUpgradeCostUntil(int upgradeIndex, long level)
            => 0.99 * upgradeIndex switch
            {
                0 => (7d / 29d * Math.Pow(level, 2.9)) +
                     (750d * Math.Pow(level, 2)) +
                     (4500000d * Math.Sin(level / 75d)) +
                     (68750000d * Math.Sin(level / 250d)) -
                     (60000d * level * Math.Cos(level / 75d)) -
                     (275000d * level * Math.Cos(level / 250d)),

                1 => (1500d * Math.Pow(level, 2)) +
                     (1000 * level),

                2 => (10000d * Math.Pow(level, 2)) +
                     (5000 * level),

                3 => (25000d * Math.Pow(level, 2)) +
                     (10000 * level),

                4 => (2000d / 7d * Math.Pow(level, 3.5)) +
                     (250000d * Math.Pow(level, 2)),

                _ => throw new InvalidOperationException(),
            };


        private static double PowerUpgradeCostUntil(int upgradeIndex, long level)
            => 0.99 * upgradeIndex switch
            {
                0 => (((Math.Pow(241d, 5d) * Math.Pow(241d, level)) / (Math.Pow(220d, 5d) * (Math.Log(241d) - Math.Log(220d))) * Math.Pow(220d, level)) + 10d * level),

                1 => (((Math.Pow(251d, 5d) * Math.Pow(251d, level)) / (Math.Pow(220d, 5d) * (Math.Log(251d) - Math.Log(220d))) * Math.Pow(220d, level)) + 20d * level),

                2 => (((Math.Pow(261d, 5d) * Math.Pow(261d, level)) / (Math.Pow(220d, 5d) * (Math.Log(261d) - Math.Log(220d))) * Math.Pow(220d, level)) + 100d * level),

                3 => (((Math.Pow(271d, 5d) * Math.Pow(271d, level)) / (Math.Pow(220d, 5d) * (Math.Log(271d) - Math.Log(220d))) * Math.Pow(220d, level)) + 100d * level),

                4 => (((Math.Pow(7d, 15d) * Math.Pow(7d, level)) / Math.Pow(5d, 15d) * (Math.Log(7d) - Math.Log(5d)) * Math.Pow(5d, level)) + 50d * Math.Pow(level, 2d) + 500d * level),

                _ => throw new InvalidOperationException(),
            };



        private static double PowerUpgradeLevelCostUntil(int upgradeIndex, long level)
            => 0.99 * upgradeIndex switch
            {
                0 => ((Math.Pow(level, 2d)) / 2d + 101d * level),

                1 => (2d * (Math.Pow(level, 2d)) + 100d * level),

                2 => (3d * (Math.Pow(level, 2d)) + 100d * level),

                3 => (4d * (Math.Pow(level, 2d)) + 100d * level),

                4 => (5d * (Math.Pow(level, 2d)) + 100d * level),

                _ => throw new InvalidOperationException(),
            };

        private static long LevelUpgradeCostUntil(int upgradeIndex, long level)
            => 10;

        public static double EnergyUpgradeCostRange(int upgradeIndex, long startLevel, long endLevel)

            => EnergyUpgradeCostUntil(upgradeIndex, endLevel) - EnergyUpgradeCostUntil(upgradeIndex, startLevel);

        public static long LevelUpgradeCostRange(int upgradeIndex, long startLevel, long endLevel)
            => LevelUpgradeCostUntil(upgradeIndex, endLevel) - LevelUpgradeCostUntil(upgradeIndex, startLevel);


        public static double AbsoluteRewardValue(SaveState dataState, IReward reward)
            => reward.Type switch
            {
                RewardType.Level => reward.Value,
                RewardType.Energy => EnergyPerSecond(dataState) * reward.Value,
                RewardType.Power => PowerProduction(dataState) * reward.Value,
                RewardType.LevelUpgrade => reward.Value,
                RewardType.EnergyUpgrade => reward.Value,
                RewardType.PowerUpgrade => reward.Value,
                RewardType.Trophy => 1,
                RewardType.RG => reward.Value,
                _ => 0,
            };

    }
}

