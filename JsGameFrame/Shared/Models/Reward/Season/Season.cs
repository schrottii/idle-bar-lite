using System;

namespace Idlebar.Shared
{
    public class Season
    {
        public string Name { get; set; }
        public SeasonReward[] Rewards { get; set; }

        public Season(string name, SeasonReward[] rewards)
        {
            Name = name;
            Rewards = rewards;
        }
        public Season()
        {
            Name = "None";
            Rewards = Array.Empty<SeasonReward>();
        }

        public static Season FromIndex(int index)
            => index switch
            {
                0 => new Season("First", SeasonReward.FromRange(0, 30)),
                1 => new Season("Second", SeasonReward.FromRange(30, 70)),
                2 => new Season("Third", SeasonReward.FromRange(70, 110)),
                3 => new Season("Forth", SeasonReward.FromRange(110, 160)),
                4 => new Season("Fifth", SeasonReward.FromRange(160, 210)),
                5 => new Season("Sixth", SeasonReward.FromRange(210, 260)),
                6 => new Season("Seventh", SeasonReward.FromRange(260, 310)),
                7 => new Season("Eighth", SeasonReward.FromRange(310, 360)),
                _ => new Season()
            };
    }
}
