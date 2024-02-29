namespace Idlebar.Shared
{
    public interface IReward
    {
        /// <summary>
        /// The Id of the <see cref="IReward"/>.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The Type of the <see cref="IReward"/>.
        /// </summary>
        public RewardType Type { get; set; }

        /// <summary>
        /// The amount of the reward the player gets.
        /// </summary>
        public int Value { get; set; }

        /// <summary>
        /// Information about the Index e.g. Upgrade index, Trophy Id.
        /// </summary>
        public int? Index { get; set; }
    }
}