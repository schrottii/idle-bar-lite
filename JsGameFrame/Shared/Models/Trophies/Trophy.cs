using System.Linq;

namespace Idlebar.Shared
{
    public class Trophy
    {
        public int Id { get; set; }
        public int Season { get; set; }
        public TrophyRarity Rarity { get; set; }
        public string ImageSrc { get; set; }
        public string Description { get; set; }
        public bool Obtainable { get; set; }

        public Trophy(int id, int season, TrophyRarity rarity, string imageSrc, string description, bool obtainable)
        {
            Id = id;
            Season = season;
            Rarity = rarity;
            ImageSrc = imageSrc;
            Description = description;
            Obtainable = obtainable;
        }

        public static Trophy GetById(int id)
            => id switch
            {
                0 => new Trophy(0, 0, TrophyRarity.Rare, "001-legacyicon", "The old favicon of the game before 1.0.", true),
                1 => new Trophy(1, 0, TrophyRarity.Common, "002-unlocks", "Congratulations, you've unlocked the collection!", true),
                2 => new Trophy(2, 0, TrophyRarity.Rare, "003-browsers", "The game looks differently in other browsers.", true),
                3 => new Trophy(3, 0, TrophyRarity.Common, "004-legacybars", "Progress and milestone bars used to have the same length.", true),
                4 => new Trophy(4, 0, TrophyRarity.Legendary, "005-thesquare", "The perfect Idle bar square.", true),

                // Season 2/  TrophyRarity.Common,1.1  10 new / 15 total / 8 available / 13 total
                5 => new Trophy(5, 1, TrophyRarity.Common, "006-energyorigin", "The energy is supposed to be a lightning thing like this with some energy...", true),
                6 => new Trophy(6, 1, TrophyRarity.Rare, "007-energyicon", "...but somehow it's pizza.", true),
                7 => new Trophy(7, 1, TrophyRarity.Common, "008-zn", "If you draw a Z and then a N over it, you have a box. Better than drawing a square and then a X. I think.", true),
                8 => new Trophy(8, 1, TrophyRarity.Common, "009-releaseevent", "There was a x10 Progress and x2 Energy boost for update 1.0.", true),
                9 => new Trophy(9, 1, TrophyRarity.Common, "010-rrrg", "RR and RG have very similiar abbreviations.", true),
                10 => new Trophy(10, 1, TrophyRarity.Rare, "011-oldreseticon", "This was the old icon for reset, before 1.0.3.", true),
                11 => new Trophy(11, 1, TrophyRarity.Legendary, "012-energybar", "I put a long rod on my table. But then some energy found it and now it's dangerous! Don't touch it!", true),
                12 => new Trophy(12, 1, TrophyRarity.Legendary, "013-qrcode", "Paywo added reward codes one day because he did not knew what to do. Now you can profit of that boredom :D", true),
                13 => new Trophy(13, 1, TrophyRarity.Rare, "014-theball", "Frank was surprised about Paywo's trophy, just like when he found out his favorite ball isn't round. Sad ball", true),
                14 => new Trophy(14, 1, TrophyRarity.Common, "015-thepatch", "Idle Bar patch notes be like", true),

                // Season 3/  TrophyRarity.Common,1.2 6 new / 21 total / 5 available / 18 total
                15 => new Trophy(15, 2, TrophyRarity.Common, "016-sliderup", "Slider at max. makes energy happy :)", true),
                16 => new Trophy(16, 2, TrophyRarity.Common, "017-sliderdown", "Being AFK for hours makes energy sad :(", true),
                17 => new Trophy(17, 2, TrophyRarity.Common, "018-epicicon", "I created this masterpiece but Playwo said nah let's steal", true),
                18 => new Trophy(18, 2, TrophyRarity.Legendary, "019-rarities", "There are different rarities. Grey border = common, green = rare, blue = legendary. Doesn't change how often you get them though.", true),
                19 => new Trophy(19, 2, TrophyRarity.Rare, "020-somanyah", "SO MANY REWARD ROAD SEASONS AHHH!", true),
                20 => new Trophy(20, 2, TrophyRarity.Common, "021-unoob", "You don't have all trophies yet, so you're a noob :^)", true),

                // Season 4/  TrophyRarity.Common,1.3 7 new / 28 total / 6 available / 24 total
                21 => new Trophy(21, 3, TrophyRarity.Common, "022-loading", "Description is loading...", true),
                22 => new Trophy(22, 3, TrophyRarity.Rare, "023-protected", "May the holy shield protect us!", true),
                23 => new Trophy(23, 3, TrophyRarity.Common, "024-egg", "Have you found an easter egg yet?", true),
                24 => new Trophy(24, 3, TrophyRarity.Common, "025-eggs", "There are several easter eggs.", true),
                25 => new Trophy(25, 3, TrophyRarity.Common, "026-ustar", "Thanks for playing the game, you're truly a star!", true),
                26 => new Trophy(26, 3, TrophyRarity.Common, "027-90", "Is this a right angle? Please help me I suck at math", true),
                27 => new Trophy(27, 3, TrophyRarity.Common, "028-ban", "In 1.3.2 a few active players have been banned for just playing the game. Everyone loves good Anticheat :P", true),

                // Season 5/  TrophyRarity.Common,1.4 6 new / 34 total / 3+1 available / 28 total
                28 => new Trophy(28, 4, TrophyRarity.Legendary, "029-unpixel1", "This is the new energy icon after 1.4's project UNPIXEL! Reworked images yay!", true),
                29 => new Trophy(29, 4, TrophyRarity.Common, "030-unpixel2", "My favorite ball is back and looking better than ever thanks to the image improvements :D", true),
                30 => new Trophy(30, 4, TrophyRarity.Common, "031-unpixel3", "Bigger images! Nobody likes pixel art (except those who like it)", true),
                31 => new Trophy(31, 4, TrophyRarity.Rare, "032-barsnake", "What if the bars are actually snakes? Blue bar snakes? Better don't touch it.", true),
                32 => new Trophy(32, 4, TrophyRarity.Legendary, "033-3d", "It's the year 2022 and update 10.0 introduces the worst 3D graphics of all time!", true),
                33 => new Trophy(33, 4, TrophyRarity.Legendary, "034-exclusive-betatesters", "Exclusive trophy! Thanks for participating in the 1.4 beta!", false),

                // Season 6/  TrophyRarity.Common,1.5 13 new / 47 total / 8+1 available / 37 total
                34 => new Trophy(34, 5, TrophyRarity.Rare, "035-its-snow", "I love snow.", true),
                35 => new Trophy(35, 5, TrophyRarity.Legendary, "036-updatewizard", "I am the update wizard! The new update adds...", true),
                36 => new Trophy(36, 5, TrophyRarity.Common, "037-exclusive", "Yes, there's a beta tester exclusive trophy.", true),
                37 => new Trophy(37, 5, TrophyRarity.Rare, "038-newicon", "The new icon in high quality!!!111", true),
                38 => new Trophy(38, 5, TrophyRarity.Rare, "039-season6", "Reward Road Season 6 :D", true),
                39 => new Trophy(39, 5, TrophyRarity.Common, "040-fancyenergy", "I'm just messing around a bit.", true),
                40 => new Trophy(40, 5, TrophyRarity.Common, "041-fancyenergy2", "6 fancy energy trophies, let's go!", true),
                41 => new Trophy(41, 5, TrophyRarity.Common, "042-fancyenergy3", "Energy powered cars, huh", true),
                42 => new Trophy(42, 5, TrophyRarity.Common, "043-fancyenergy4", "My favorite", true),
                43 => new Trophy(43, 5, TrophyRarity.Common, "044-fancyenergy5", "BIG BRAIN", true),
                44 => new Trophy(44, 5, TrophyRarity.Common, "045-fancyenergy6", "spending 100B energy be like:", true),
                45 => new Trophy(45, 5, TrophyRarity.Legendary, "046-lamp", "Once upon a time a kid tried to create a barrel...  it's supposed to be a lamp", false),
                46 => new Trophy(46, 5, TrophyRarity.Rare, "047-tree", "We plant 1 tree for every time we add a skill tree to the game (so... 1 tree)", true),

                // Season 7/  TrophyRarity.Common,1.6 3 new / 50 total / 8 available / 45+1 total
                47 => new Trophy(47, 6, TrophyRarity.Rare, "048-season7", "Reward Road Season 7: Age of Automation", true),
                48 => new Trophy(48, 6, TrophyRarity.Rare, "049-newreseticon", "I like the new reset icon so much I even have a bodypillow of it", true),
                49 => new Trophy(49, 6, TrophyRarity.Legendary, "050-guy", "They thought I'd never actually add this dude, but I did.", true),

                // Season 8/  TrophyRarity.Common,1.6.9 4 new / 54 total / 8 available / 54 total
                50 => new Trophy(50, 6, TrophyRarity.Rare, "051-glitch", "Glitch Energy??? How many types will we discover?", true),
                51 => new Trophy(51, 6, TrophyRarity.Rare, "052-season8", "Reward Road Season 8: Final Bar", true),
                52 => new Trophy(52, 6, TrophyRarity.Common, "053-barsnake2", "The bar snake has evolved!!!", true),
                53 => new Trophy(53, 6, TrophyRarity.Legendary, "054-goodbye", "After 2.5 years, the community has decided that it is time for Idle Bar to end. It was a great project, I hope everyone had a fun time, thanks for being a great community and see you in the next game!", true),



                //Remember to increase the number in the function below when adding more!!!!
                _ => null,
            };

        private readonly static int TrophyCount = 54;

        public static Trophy[] GetAllTrophies()
            => Enumerable.Range(0, TrophyCount)
                .Select(x => GetById(x))
                .ToArray();
    }
}