// The problem is that it doesn't work - some clever guy
// You're the lowest scum in history

// Main Update Reminder:
// Change cat and do new Reward Road season!

// R.I.P. Idle Bar 2020-2023

/* Structure:
 * SaveGame class
 * var definitions
 * random functions
 * Tick functions
 * Handle functions
 * Save functions
 * Calculate functions
 * Get functions
 * Game functions
 * UI functions
 * some more random functions
 * */

class QuestUpdate { //Saving Quest Progress
    constructor(questId, progress) {
        this.questId = questId;
        this.progress = progress;
    }
}
class RewardInfo { //Saving Used Rewards
    constructor(rewardId, source) {
        this.rewardId = rewardId;
        this.source = source;
    }
}
class Collectable { //Trophy
    constructor(id, path, description) {
        this.id = id;
        this.path = path;
        this.description = description;
    }
}
class Reward { //Just for reference
    constructor(id, type, value, index) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.index = index;
    }
}

const RewardSource = {
    Code: 1,
    Quest: 2,
    Season: 4,
}
const UpgradeType = {
    Level: 1,
    Energy: 2,
    Power: 3,
    Autobuy: 4,
}

const RewardType = {
    Level: 1,
    Energy: 2,
    Power: 4,
    LevelUpgrade: 8,
    EnergyUpgrade: 16,
    PowerUpgrade: 32,
    Trophy: 64,
    RG: 128,
}
const QuestType = {
    TotalEnergy: 1,
    TotalTiers: 2,
    TotalPower: 3,
    RewardRoadProgress: 4,
    RGTime: 5,
    FunButtonClicks: 6,
    UpgradeLevels: 7,
}

var energymultislider;

class SaveGame {
    constructor() {
    }
    loadFromSaveGame(saveGame) {
        this.id = saveGame.id;

        this.level = saveGame.level;
        this.tier = saveGame.tier;
        this.energy = saveGame.energy;
        this.power = saveGame.power;
        this.rgTokens = saveGame.rgTokens; //ADD LOADING

        this.multi = saveGame.multi;

        this.levelUpgrades = saveGame.levelUpgrades;
        this.energyUpgrades = saveGame.energyUpgrades;
        this.powerUpgrades = saveGame.powerUpgrades;
        this.autobuyUpgrades = saveGame.autobuyUpgrades;

        this.maximumLevel = saveGame.maximumLevel;
        this.maximumTier = saveGame.maximumTier;
        this.totalTiers = saveGame.totalTiers;
        this.totalEnergy = saveGame.totalEnergy;
        this.totalClicks = saveGame.totalClicks;
        this.funButtonClicks = saveGame.funButtonClicks;
        this.totalPower = saveGame.totalPower;
        this.totalClickTime = saveGame.totalClickTime;
        this.totalQuestsDone = saveGame.totalQuestsDone;
        this.totalRGCost = saveGame.totalRGCost;
        this.maxRgBoostLevel = saveGame.maxRgBoostLevel;

        this.currentSeason = saveGame.currentSeason;
        this.rewardRoadProgress = saveGame.rewardRoadProgress;
        this.rewardRoadLevel = saveGame.rewardRoadLevel;
        this.rewardRoadClaimed = saveGame.rewardRoadClaimed;

        this.collectables = saveGame.collectables;
    }
    new(saveGame) {
        this.id = 0;

        this.level = 0;
        this.tier = 0;
        this.energy = 0;
        this.power = 0;
        this.rgTokens = 0;

        this.multi = 1;

        this.levelUpgrades = [0, 0, 0, 0, 0];
        this.energyUpgrades = [0, 0, 0, 0, 0];
        this.powerUpgrades = [0, 0, 0, 0, 0];
        this.autobuyUpgrades = [0, 0, 0, 0, 0];

        this.maximumLevel = 0;
        this.maximumTier = 0;
        this.totalTiers = 0;
        this.totalEnergy = 0;
        this.totalClicks = 0;
        this.funButtonClicks = 0;
        this.totalPower = 0;
        this.totalClickTime = 0;
        this.totalQuestsDone = 0;
        this.totalRGCost = 0;
        this.maxRgBoostLevel = 0;

        this.currentSeason = 0;
        this.rewardRoadProgress = 0;
        this.rewardRoadLevel = 0;
        this.rewardRoadClaimed = 0;

        this.collectables = [];
    }

    getmulti(i) {
        return multi_add[i] * this.levelUpgrades[i] + 1;
    }

    reset(newmulti) {
        this.multi = newmulti;
        Save_AddRewardRoadProgress(Math.round((5 * Math.log(1.5 * this.tier)) ** 2 / 25));
        this.tier = 0;
        this.level = 0;
        this.levelUpgrades = [0, 0, 0, 0, 0];
        nextMilestoneBarGoal = milestoneBarGoals[0];
        UI_FullUpdate();
    }
     
    getenergypersec() {
        return (this.energyUpgrades[0] + 1) * ((this.powerUpgrades[3] / 10) + 1) * 8 * energymultislider.value / 100;
    }
    getmaxenergypersec() {
        if (energymultislider != undefined) return (this.energyUpgrades[0] + 1) * ((this.powerUpgrades[3] / 10) + 1) * 8 * enghack * energymultislider.max / 100;
        else return 1;
    }
}

var sg = new SaveGame();
sg.new();

//#region Constants
var fps = 30; // Final - Don't change
var currentUpdate = "Version 1.6.9";
// Structure:
// Version [VERSION] ([1.x] MONTH.DATE.YEAR - [1.x.x] MONTH.DATE.YEAR) 
 
var cursorX = 0;
var cursorY = 0;

var trophies = []; //Registered by the Webassembly code

//Number Notations
var notations = ["Normal", "Abstract", "Long Abstract", "Scientific", "Keyboard", "Chemical", "Short Chemical", "Flags", "Geometry", "Greek", "Blind", "Full"];
var notationMain = ["", "K", "M", "B", "T", "q", "Q", "s", "S", "O", "N", "D", "UD", "DD", "TD", "qD", "QD", "sD", "SD", "OD", "ND", "V", "UV", "DV", "TV", "qV", "QV", "sV", "SV", "OV", "NV"];
var notationAbstract = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var notationLongAbstract = ["", "a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G", "h", "H", "i", "I", "j", "J", "k", "K", "l", "L", "m", "M", "n", "N", "o", "O", "p", "P", "q", "Q", "r", "R", "s", "S", "t", "T", "u", "U", "v", "V", "w", "W", "x", "X", "y", "Y", "z", "Z"];
var notationKeyboard = ["", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
var notationChemical = ["Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", "Sodium", "Magnesium", "Aluminium", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium",
    "Bromine", "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon",
"Cesium", "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium", "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium", "Lutetium", "Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon"];
var notationShortChemical = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr",
    "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pg", "Ad", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe",
"Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"];
var notationFlags = ["🇦🇺", "🇧🇷", "🇨🇳", "🇩🇪", "🇪🇪", "🇫🇮", "🇬🇧", "🇭🇺", "🇮🇹", "🇯🇵", "🇰🇿", "🇱🇺", "🇲🇫", "🇳🇴", "🇴🇲", "🇵🇱", "🇶🇦", "🇷🇪", "🇸🇪", "🇹🇷", "🇺🇸", "🇻🇪", "🇼🇫", "🇾🇪", "🇿🇦"];
var notationGeometry = ["Triangle", "Square", "Pentagon", "Hexagon", "Heptagon", "Octagon", "Nonagon", "Decagon", "Undecagon", "Dodecagon"];
var notationGreek = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"];

//UI
var milestoneBarGoals = [10, 100, 500, 2500, //Main upgrades
    10000, 12000, 14000, 16000, 18000, 20000, //Energy upgrades
    30000, 40000, 42500, 45000, 47500, 50000, //Power upgrades
    100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];

var milestoneNames = ["Balanced multi", "Boost multi", "Weak multi", "Powerful multi",
    "Energy", "Energy multi", "Stronger reset", "Lowlevel Triplespeed", "Level Push", "Reversed Generator",
    "Reward Road", "Power", "Longer Click", "Longer Slider", "Slower Slider", "More Power & Quests",
    "100.000", "200.000", "300.000", "400.000", "500.000", "600.000", "700.000", "800.000", "900.000", "1 MILLION"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function round(num, precision) {
    var multi = Math.pow(10, precision);
    return Math.round((num + Number.EPSILON) * multi) / multi;
}

//Upgrades
var RGboost = 1;
var baseprice = [2, 4, 10, 40, 50];
var price_add = [2, 4, 10, 4, 25];
var energy_price = [100, 1000, 5000, 10000, 1000000];
var power_price = [10, 20, 100, 100, 100];
var autobuy_price = [1000, 3000, 8000, 8000, 15000];
var autobuy_max = [25, 35, 35, 40, 20];
var upgrade_amount = 1;
// ^put everything to 9999999 for omg imsocool hax

var multi_add; //Set by the SetConfig Method!
var enmulti_add; //^ Same as this
var enup_explf; //Another one of these! uwu
var pomulti_add; //This one too? Or nah? PLS tell me...
var poup_explf;
var aumulti_sub;
var auup_explf;

var unlock = [0, 10, 100, 500, 2500];

var up_names = ["Cheap", "Balanced", "Boost", "Weak", "Powerful"];
var enup_names = ["More Energy", "Energy Multiplier", "Stronger Reset", "Lowlevel Triplespeed", "Level Push"];
var poup_names = ["Stronger Click", "Longer Click", "Longer Slider", "More Energy 2", "More Power"];
var auup_names = ["Cheap", "Balanced", "Boost", "Weak", "Powerful"];
var enup_expls = ["Energy is generated automatically - Every level will increase the production",
    "Works like a sixth multiplier",
    "Increases the reset multi",
    "Levels below 100+(Level x 10) will be 3x easier, levels below (Level x 2)-200 3x faster",
    "Every level reduces the progress required by the equivalent of one level"]
var poup_expls = ["Increases the boost from clicks",
    "Increases the click boost duration",
    "Slider stays longer at max.",
    "Increases energy production",
    "Earn more power"];
var auup_expls = ["Auto-buy cheap multi",
    "Auto-buy balanced multi",
    "Auto-buy boost multi",
    "Auto-buy weak multi",
    "Auto-buy powerful multi"];

var queststype = ["", "Earn Energy", "Earn Levels", "Earn Power", "Get RRP", "Activate RG (seconds)", "Click fun buttons", "Buy upgrades"];
var queststypeR = { 1: "Levels", 2: "Energy", 4: "Power", 8: "Level Upgrade(s)", 16: "Energy Upgrade(s)", 32: "Power Upgrade(s)", 64: "Trophy", 128: "RG token(s)" };
var questsdifficulties = ["Easy", "Medium", "Hard", "Insane"];

//Click Boost
var baseClickBoost = 3.0;
var baseClickBoostTime = 4000; //Milliseconds
var clickBoost = baseClickBoost;
var clickBoostTime = baseClickBoostTime;
var clickRemainingBoostTime = 0; //Also ms
var progressToPower = 0;

//Energy Multi Slider
var sliderGraceTime = 300000; //5 Minutes, Milliseconds
var sliderGraceTimePerUnit = 2500; //MS
var sliderRemainingGraceTime = 0;
//#endregion

var nextMilestoneBarGoal = 10;

//#region Variables
//Gamestate
var account;
var accountChanged = false;

var newsArticles = [];

//Quests / Rewards
var openQuests = [];
var usedRewards = [];
var claimedQuests = [];

var collectingReward = null; //Current Reward while collect overlay is visible
var collectingRewardId = null;
var collectingRewardSource = null;
var collectingQuestIndex = null;

//Progress

var progress = 0;
var progress_needed;
var progress_per_sec;
var ppshack = 1; //1
var enghack = 1; //1

// UI
var notation = 0
var i = 0;
var selectnews = 0;

// RG
var RGtime = 0;
var enpowselect = 0;
var RGpower = 0;

// RR

var currentSeason; //All three set by SetConfig()
var currentSeasonIndex;
var questSlots;

var rewardRoadDisplay1 = [];
var rewardRoadRequiredProgress = 1000;

var autoSaveFails = 0;
var mousemoved = 60;

var autoBuyActive = [false, false, false, false, false];
var autoBuyTime = [999, 999, 999, 999, 999];

//Easter Eggs
//Cats are Cute
// ^Did I write that????
var popup = " ";
var cat = "Sad Cat";
var egg = 2;
var badwords = ["fuck", "idiot", "shit", "bitch", "ass", "nigg", "fag", "nibb", "dumb", "hitler", "nazi", "trump", "niglet", "scrotum", "penis", "cock", "hentai", "futa", "porn", "sex", "nude", "naked", "NSFW", "tit", "boob", "breast", "dick", "anus", "CBT", "xxx", "retard", "nfcm", "nmcf", "ilf"
    , "ahegao", "cunt", "gay", "lesbian", "genital", "dick", "prick", "DDOS", "racis", "hack", "swastika", "KZ", "hentia", "pussy", "kys", "tiktok", "nestle"];


//#endregion

let root = document.documentElement;
var intervals = [];

// Expand notations
for (j = 0; j < 6; j++) {
    for (i = 0; i < 26; i++) {
        notationMain.push(String.fromCharCode(97 + j) + String.fromCharCode(97 + i));
        notationAbstract.push(String.fromCharCode(97 + j) + String.fromCharCode(97 + i));
        notationLongAbstract.push(String.fromCharCode(97 + j) + String.fromCharCode(97 + i));
        notationLongAbstract.push(String.fromCharCode(97 + j) + String.fromCharCode(97 + i).toUpperCase());
    }
}
for (i = 0; i < 26; i++) {
    notationKeyboard.push(notationKeyboard[i].toUpperCase());
}

geometryAppend = ["tris", "tetra", "penta", "hexa", "hepta", "octa", "ennea"];
for (i = 0; i < geometryAppend.length; i++) {
    notationGeometry.push(geometryAppend[i] + "kaidecagon");
}
notationGeometry.push("icosagon");
geometryAppend = ["hena", "di", "tri", "penta", "hexa", "hepta", "octa", "ennea"];
for (i = 0; i < geometryAppend.length; i++) {
    notationGeometry.push("icosi-" + geometryAppend[i] + "-gon");
}

function Ban() {
    UI_UpdateLeaderboardExcluder();
    sg.banned = true;
}

function cheatcheck() {
    /*
    if (sg.rewardRoadClaimed > sg.rewardRoadLevel + 1 || sg.rewardRoadLevel > 51 || sg.level > 2500 || sg.ppshack > 3 || sg.maximumLevel > 2500 || sg.enhack > 2 || (sg.energy > sg.totalEnergy * 2 && sg.totalEnergy > 10000000)) {
        Ban();
    }
    */
}

function UseRGToken() {
    if (sg.rgTokens > 0) {
        sg.rgTokens -= 1;
        if (RGboost < sg.maxRgBoostLevel) {
            RGtime = 0;
        }
        RGtime += 180;
        RGboost = Calculate_RGBoost(sg.maxRgBoostLevel);
        UI_UpdateRGButton();
    }
}

function ActivateEnpow() {
    nice();
    var rgCost = Calculate_RGCost(enpowselect);
    var rgBoost = Calculate_RGBoost(enpowselect);

    if (sg.energy < rgCost || sg.maximumTier < 20000 || RGtime > 120) {
        return;
    }
    if (RGboost != 1 && rgBoost != RGboost) { 
        return;
    }

    RGboost = rgBoost;
    sg.energy -= rgCost;
    sg.totalRGCost += rgCost;
    RGtime += 60;

    Save_AddRewardRoadProgress(15);
    UI_UpdateRGButton();   
    if (enpowselect > sg.maxRgBoostLevel) {
        sg.maxRgBoostLevel = enpowselect;
    }  
}

function PlusRG(amount) {
    if (enpowselect + amount > 200) {
        enpowselect = 200;
    } else {
        enpowselect += amount;
    }
    UI_UpdateRGButton();
}

function MinusRG(amount) {
    if (enpowselect - amount < 0) {
        enpowselect = 0;
    } else {
        enpowselect -= amount;
    }
    UI_UpdateRGButton();
}

//#region Helpers
function ChangeNotation() {
    notation += 1;
    if (notation > notations.length - 1) {
        notation = 0;
    }
    UI_FullUpdate();
}

function ChangeNotationBack() {
    notation -= 1;
    if (notation < 0) {
        notation = notations.length - 1;
    }
    UI_FullUpdate();
}

function SetNotation(set) {
    notation = set;
    UI_UpdateNotation();
}

function shortnum(n) { //short number
    if (n <= 1) {
        return n.toFixed(2);
    }

    switch (notation) {
        case 0: // Normal notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + notationMain[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 1: // Abstract notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + notationAbstract[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 2: // Long Abstract notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + notationLongAbstract[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 3: // Scientific notation
            if (parseInt(n.toFixed().toString().length - 1) % 3 == 0 && parseInt(n.toFixed().toString().length) > 3) {
                var cacheNumber = "" + (n / (Math.pow(10, Math.floor(Math.log(n) / Math.log(10))))) + "0001";
                cacheNumber = cacheNumber.charAt(0) + "." + cacheNumber.charAt(2) + cacheNumber.charAt(3);
                return cacheNumber + "e" + parseInt(n.toFixed().toString().length - 1);
            }
            else if (parseInt(n.toString().length) > 3) {
                return ((n / (Math.pow(10, Math.floor(Math.log(n) / Math.log(10))))).toFixed(2)) + "e" + parseInt(n.toFixed().toString().length - 1);
            }
            else {
                return n;
            }
            break;
        case 4: // Keyboard notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + notationKeyboard[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 5: // Chemical notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + " " + notationChemical[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 6: // Short Chemical notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + notationShortChemical[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 7: // Flag notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + notationFlags[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 8: // Geometry notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + " " + notationGeometry[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 9: // Greek notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + " " + notationGreek[Math.floor(Math.log(n) / Math.log(1000))];
            break;
        case 10: // Blind notation
            return (n / (Math.pow(1000, Math.floor(Math.log(n) / Math.log(1000))))).toFixed(2) + "  ";
            break;
        case 11: // Full notation
            return n.toFixed(2);
        default:
            return n.toFixed(1);
    }
}
//#endregion

//#region GameTicks
function Tick_Game() {
    // Handle Click Boost
    Tick_ProgressButton();
    Tick_RG();
    Tick_AutoBuy();

    mousemoved -= 1 / fps;

    // PPS and Bars
    progress_needed = 9 + Math.pow(1.05, ((sg.level - sg.energyUpgrades[4]) * 2));
    // 10 base. Add pow on level and fifth Energy upgrade

    if (progress_per_sec >= progress_needed * 5) {
        p_bar.value = 100;
    }
    else {
        p_bar.value = (progress / progress_needed) * 100;
    }

    // Handle Energy
    if (sg.maximumTier >= 10000) {
        energycontrolbox.style.display = "flex";
        // Ever tried putting pineapple on a butter bread? It's not too terrible.
        Save_AddEnergy(sg.getenergypersec() / fps);
        UI_UpdateEnergy();
        Tick_EnergySlider();
    }
    else {
        energycontrolbox.style.display = "none";
        for (i = 0; i < energy_price.length; i++) {
            enupg_texts[i].innerHTML = "Unlocked at tier " + (10000 + (2000 * i)) + "!";
        }
    }

    // RESET BUTTON
    btn_reset.innerHTML = "RESET<br/>New Multiplier: x" + shortnum(Game_GetResetMulti()) + "<br />Current Multiplier: x" + shortnum(sg.multi);

    // Set the PPS and update it
    progress_per_sec = Game_GetMulti() * RGboost;
    if (clickRemainingBoostTime > 0) {
        progress_per_sec *= clickBoost;
    }
    text_p.innerHTML = "Progress: " + shortnum(progress) + "/" + shortnum(progress_needed) + "  |  /sec: " + shortnum(progress_per_sec);
    progress += progress_per_sec / fps;

    let llts_bonus = 1;
    if (sg.energyUpgrades[3] > 100 && sg.level < ((sg.energyUpgrades[3] - 100) * 2)) llts_bonus = 3;

    // FASTER SPEED PROGRESSION
    if (progress_per_sec >= progress_needed * 100) {
        progress = progress_needed * 10;
        p_bar.value = 100;
        Save_AddLevels(10 * llts_bonus);
    }
    else if (progress_per_sec >= progress_needed * 10) {
        progress = progress_needed * 3;
        p_bar.value = 100;
        Save_AddLevels(3 * llts_bonus);
    }
    else if (progress >= progress_needed) {
        progress = 0;
        Save_AddLevels(1 * llts_bonus);
    }

    UI_FrameUpdate();
}

function Tick_ProgressButton() {
    if (clickRemainingBoostTime <= 0) return;
    progressToPower += 1000 / fps;
    sg.totalClickTime += 1000 / fps;

    StatsUI_UpdateTotalClickTime();

    if (progressToPower > 500) {
        Save_AddPower(Get_PowerProduction());
        progressToPower = 0;
        Save_AddRewardRoadProgress(1);
    }
    clickRemainingBoostTime -= Math.min(1000 / fps, clickRemainingBoostTime);
}
function Tick_EnergySlider() {
    if (sg.maximumTier < 10000) return;
    if (sliderRemainingGraceTime <= 0) {
        sliderRemainingGraceTime = sliderGraceTimePerUnit;
        if (energymultislider.value > energymultislider.min) {
            energymultislider.value -= 1;
        }
    } else {
        sliderGraceTime = 300000 + (sg.powerUpgrades[2] * 10000);
        sliderGraceTimePerUnit = 2500;
        sliderRemainingGraceTime -= 1000 / fps;
    }
}
function Tick_RG() {
    if (sg.maximumTier < 20000) {
        rg_box.style.display = "none";
        return;
    }

    if (RGtime > 0) {
        rgbar.value = RGtime;
        RGtime -= 1 / fps;
        Save_ProcessQuestUpdate(QuestType.RGTime, 1 / fps);
        if (sg.maximumTier >= 40000) {
            RGpower += 1;
            if (RGpower == fps) {
                Save_AddPower(Game_GetRGPower());
                RGpower = 0;
            }
        }
    }
    else {
        rgbar.value = 0;
        RGboost = 1;
        RGtime = 0;
    }
    rgtimeleftp.innerHTML = "Time left: " + RGtime.toFixed(1) + "/180";
    rg_box.style.display = "block";
}

function Tick_AutoBuy() { 
    
    if (sg.maximumTier < 200000) { // Instantly return if you do not have auto buyers, like, at all
        return;
    }

    if (autoBuyTime[0] == 999) { // It is set to 999 when starting up the game. Set them all according to upgrade levels.
        for (i = 0; i < 5; i++) {
            autoBuyTime[i] = Game_GetAuUpgEffect(i);
        }
    }
    else { // This executes every tick once the initial setup is done
        for (i = 0; i < 5; i++) { // Check all 5 auto buyers
            if (autoBuyTime[i] < 1 && autoBuyActive[i] == true && sg.level > Get_CurrentUpgradeCost(UpgradeType.Level, i)) { // If time is over, buyer is active and you can afford it
                autoBuyTime[i] = Game_GetAuUpgEffect(i);
                Save_RemoveLevels(Get_CurrentUpgradeCost(UpgradeType.Level, i));
                Save_AddUpgrade(UpgradeType.Level, i, 1);
                Save_AddRewardRoadProgress(5);
                Save_ProcessQuestUpdate(QuestType.UpgradeLevels, 1);
                UpgradesUI_UpdateLevelUpgrades();
            }
            else { // else, time goes down, but only if you have unlocked it
                if (sg.maximumTier > 200000+50000*i) {
                    autoBuyTime[i] -= 1 / fps;
                }
            }
        }
    }

    UI_UpdateAutobuy();
}
//#endregion

//#region Event-Handlers
//#region Buttons
function Handle_UpgradeButton(type, index) {
    if (!Game_TryAddUpgrade(type, index)) {
        return;
    }

    switch (type) {
        case UpgradeType.Level:
            UI_UpdateLevel();
            UpgradesUI_UpdateLevelUpgrades();
            break;
        case UpgradeType.Energy:
            UI_UpdateEnergy();
            UpgradesUI_UpdateEnergyUpgrades();
            break;
        case UpgradeType.Power:
            UI_UpdatePower();
            UI_UpdateLevel();
            UpgradesUI_UpdatePowerUpgrades();
            break;
        case UpgradeType.Autobuy:
            UI_UpdatePower();
            UpgradesUI_UpdateAutobuyUpgrades();
    }

    StatsUI_UpdateTotalUpgrades();
}

function Handle_CollectRewardButton() {
    if (collectingReward == null) {
        alert("There is no reward currently being collected! Report this!");
        return;
    }

    Save_RedeemReward(collectingReward, collectingRewardId, collectingRewardSource);

    switch (collectingRewardSource) {
        case RewardSource.Code:
            break;
        case RewardSource.Quest:
            var quest = openQuests[collectingQuestIndex];
            openQuests[collectingQuestIndex] = null;
            claimedQuests.push(quest);
            sg.totalQuestsDone++;
            StatsUI_UpdateTotalQuestsDone();
            UI_UpdateQuestModal();
            break;
        case RewardSource.Season:
            sg.rewardRoadClaimed++;
            UI_UpdateRewardRoad();
            break;
    }

    collectingReward = null;
    collectingRewardId = null;
    collectingRewardSource = null;
    collectingQuestIndex = null;

    //UI_HideRewardCollectionOverlay();
}

function EasterEggs(check) {
    if (check == "0.6.9" || check == "69" || check == "069") {
        egg = 69;
        nice()
        return;
    } // Egg 1
    if (check == "cat") {
        alert(cat);
        return;
    } // Egg 2
    if (check == sg.name && check != null) {
        alert(sg.name + " is not just dumb. \n They tried to redeem their own name \n If this would work, they'd give their progress to me and delete their account. \n" +
            sg.name + " is very dumb. Makes sense, right?");
        return;
    }
    // Egg 3
    if (check == "eggs") {
        alert("6 Eggs");
        return;
    } // Egg 5 (4 is QR)
    if (check == "p0w3r" || check == "power") {
        sg.power += Get_PowerProduction();
        UI_UpdatePower();
        alert("UNLIMITED POWER!!!! (+1 Power)");
        return;
    } // Egg 6
    if (check == "xd") {
        egg = 452;
        nice();
        return;
    }
}

function nice() {
    if (egg == 69) {
        alert("Nice");
    }
    if (egg == 452) {
        alert(":^)");
    }
}

function Handle_NotationsMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function Handle_NotationMenuKeyUp() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("button");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

async function Handle_UseCurrentTab() {
    //await WebAssembly_UpdateTabCode();
}

function Handle_ClaimRewardRoad() {
    /*
    if (sg.rewardRoadLevel <= sg.rewardRoadClaimed && sg.rewardRoadClaimed != 50) return;
    var reward = currentSeason.rewards[sg.rewardRoadClaimed];


    if (sg.rewardRoadClaimed == 50) {
        var howmuchdoiget = Calculate_RewardRoadEnergy();
        Save_AddEnergy(howmuchdoiget);

        sg.rewardRoadProgress = 0;
    }
    else if (!Game_CollectReward(reward, reward.id, RewardSource.Season)) {
        return;
    }
    */
}

function Handle_FunButton() {

    UI_RandomizeTheme();
    UI_RandomizeFunButton();

    progress += progress_per_sec * 8;
    progress += progress_needed / 20;
    Save_AddRewardRoadProgress(25);

    sg.funButtonClicks++;

    Save_ProcessQuestUpdate(QuestType.FunButtonClicks, 1);
    StatsUI_UpdateFunButtonClicks();

    nice()
}

function Handle_ProgressButton() {
    /*
    if (mousemoved < 1) {
        boostbuttons[0].style.backgroundColor = "white";
        boostbuttons[1].style.backgroundColor = "white";
        return;
    }

    boostbuttons[0].style.backgroundColor = "#5ca6e6";
    boostbuttons[1].style.backgroundColor = "#5ca6e6"; */

    clickBoostTime = (100 * sg.powerUpgrades[1]) + baseClickBoostTime
    clickRemainingBoostTime = clickBoostTime;
    clickBoost = baseClickBoost + (sg.powerUpgrades[0] / 10)

    UI_UpdateProgressButtons();
    Handle_MilestoneBar();

    nice()
}
function Handle_MultibuyButton() {
    nice()
    if (upgrade_amount == 1) {
        upgrade_amount = 5;
        multibuybutton.innerHTML = "Buy x5";
    }
    else if (upgrade_amount == 5) {
        upgrade_amount = 10;
        multibuybutton.innerHTML = "Buy x10";
    }
    else if (upgrade_amount == 10) {
        upgrade_amount = 1000;
        multibuybutton.innerHTML = "Buy Max";
    }
    else if (upgrade_amount > 10) {
        upgrade_amount = 1;
        multibuybutton.innerHTML = "Buy x1";
    }

}
function Handle_MilestoneBar() {
    var goal = 0;
    if (sg.maximumTier > 999999) {
        nextMilestone.innerHTML = "All goals completed!";
        p_bar2.value = 100;
    }
    else {
        if (sg.maximumTier > nextMilestoneBarGoal) {
            for (i = 0; i < milestoneBarGoals.length; i++) {
                if (sg.maximumTier > milestoneBarGoals[i]) {
                    nextMilestoneBarGoal = milestoneBarGoals[i + 1];
                    nextMilestone.innerHTML = "Next Goal: " + milestoneNames[i + 1] + " (" + i + "/" + milestoneBarGoals.length + ")";
                    goal = i;
                }
            }
            stats_milestones.innerHTML = goal + "/" + milestoneBarGoals.length;
        }
        p_bar2.value = (sg.maximumTier / nextMilestoneBarGoal) * 100;
    }
    
}

function Handle_CopyIdButton() {
    var idinput = document.getElementById("idInput");
    idinput.focus();
    idinput.select();
    idinput.setSelectionRange(0, 2000);
    document.execCommand("copy");
}

function Handle_ResetColorButton() {
    var body = document.getElementById("body");
    body.style.backgroundColor = "#6f1d1b";
    body.style.color = "#ffe6a7";
}

async function Handle_RewardCodeButton() {
    /*
    var rewardCode = prompt("Please enter a valid code!");

    if (rewardCode == null || rewardCode == "") {
        return;
    }

    EasterEggs(rewardCode);
    var reward = await WebAssembly_LoadReward(rewardCode);

    if (reward == null) {
        return;
    }
    if (usedRewards.some((r) => r.rewardId == reward.id && r.source == RewardSource.Code)) {
        alert("You have already used that reward!");
        return;
    }

    if (!Game_CollectReward(reward, reward.id, RewardSource.Code)) {
        return;
    }
    */
}

async function Handle_LoadButton(isCache=false) {
    //console.log(localStorage.getItem("IDLEBARLITE"))
    var saveCode = isCache ? localStorage.getItem("IDLEBARLITE") : prompt("Please enter your Local Code");
    // var saveCode = prompt("Please enter your SaveCode\nYou get a SaveCode by saving your game!", "SaveCode");

    try {
        saveCode = atob(saveCode);
        saveCode = JSON.parse(saveCode);
        
        //console.log(saveCode)
        sg.loadFromSaveGame(saveCode);

        UI_FullUpdate();
    }
    catch {
        alert("False!");
    }

    /*
    if (saveCode == null || saveCode == "") {
        return;
    }
    EasterEggs(saveCode);
    await WebAssembly_LoadGame(saveCode);
    */
}

async function Handle_UpdateButton(auto = false) {
    // Save Local Code
    var code = sg;
    code = JSON.stringify(sg);
    code = btoa(code);
    if (!auto) navigator.clipboard.writeText(code);

    // cache
    localStorage.setItem("IDLEBARLITE", code);

    // field (for chrome mobile)
    putcodehere.value = code;

    if (!auto) alert("Your local code has been copied to your clipboard and saved in cache!")

    /*
    var success = await WebAssembly_UpdateGame(true);

    if (success) { //The base method already alerts the error
        UI_ShowSavedModal();
    }
    
    if (accountChanged) {
        await WebAssembly_UpdateAccount(true);
    }*/
}

setInterval("Handle_UpdateButton(true)", 5000);

//#endregion
async function Handle_AutoSave() {
    /*
    if (account.id == null) return;

    if (accountChanged) {
        var success = await WebAssembly_UpdateAccount(true);
        if (!success) {
            alert("There was an error saving your account changes!");
        }
    }

    if (!account.useAutoSave) return;

    var success = await WebAssembly_UpdateGame(false);

    if (success) {
        autoSaveFails = 0;
        return;
    }

    autoSaveFails++;
    if (autoSaveFails > 10) {
        alert("Autosave failed to save 10 times and will disable now! \n Try to save manually to see the problem...");
        autosave_checkbox.checked = false;
        autoSaveFails = 0;
    }
    */
}

//#region Account Changes
function Handle_AutoSaveChange() {
    account.useAutoSave = autosave_checkbox.checked != undefined ? autosave_checkbox.checked : true;
    accountChanged = true;
}

function Handle_NameChange() {
    var isitlegit = nameinput.value.toUpperCase();
    for (i = 0; i < badwords.length; i++) {
        var badword = badwords[i].toUpperCase();
        if (isitlegit.includes(badword)) {
            alert("Bad word detected!");
            UI_UpdateNameInput();
            return;
        }
    }

    account.name = nameinput.value;
    accountChanged = true;
}

function Handle_LeaderboardExcluderChange() {
    account.excludeFromLeaderboard = leaderboxexcluder.checked;
    accountChanged = true;
}

function Handle_ClaimQuestButton(index) {
    if (openQuests[index] == null) {
        alert("This quest has already been collected!");
        return;
    }

    Game_CollectQuest(index);
}

function Handle_NewsForwards() {
    selectnews++;
    if (selectnews > 4) {
        selectnews = 0;
    }
    UI_UpdateNews();
}
function Handle_NewsBackwards() {
    selectnews--;
    if (selectnews < 0) {
        selectnews = 4;
    }
    UI_UpdateNews();
}

function Handle_StatusAutobuy(i) {
    if (autoBuyActive[i] == true) {
        autoBuyActive[i] = false;
    }
    else {
        autoBuyActive[i] = true;
    }
}

//endregion
//#endregion

//#region Save-Updates
function Save_ProcessQuestUpdate(type, amount) { //Called for everything that could count for quest progress
    for (i = 0; i < openQuests.length; i++) {
        var openQuest = openQuests[i];

        if (openQuest == null) {
            continue;
        }
        if (openQuest.quest.type != type) {
            continue;
        }

        switch (type) { //Check Documentation.md for more info
            case QuestType.TotalEnergy:
                openQuest.progress += amount / sg.getmaxenergypersec();
                break;
            case QuestType.TotalPower:
                openQuest.progress += amount / Get_PowerProduction();
                break;
            default:
                openQuest.progress += amount;
                break;
        }
    }
}
function Save_RedeemReward(reward, rewardId, source) { //Check Documentation.md for more info
    var absoluteValue = Calculate_AbsoluteRewardValue(reward);
    switch (reward.type) {
        case 1:
            Save_AddLevels(absoluteValue);
            UI_UpdateLevel();
            break;
        case 2:
            Save_AddEnergy(absoluteValue);
            UI_UpdateEnergy();
            break;
        case 4:
            Save_AddPower(absoluteValue);
            UI_UpdatePower();
            break;
        case 8:
            Save_AddUpgrade(UpgradeType.Level, reward.index, absoluteValue);
            UpgradesUI_UpdateLevelUpgrades();
            break;
        case 16:
            Save_AddUpgrade(UpgradeType.Energy, reward.index, absoluteValue);
            UpgradesUI_UpdateEnergyUpgrades();
            break;
        case 32:
            Save_AddUpgrade(UpgradeType.Power, reward.index, absoluteValue);
            UpgradesUI_UpdatePowerUpgrades();
            break;
        case 64: //Trophy
            if (reward.index != null) {
                var trophy = trophies.find(trophy => trophy.id == reward.index);

                if (trophy == null) {
                    alert("Invalid Trophy Id");
                    break;
                }

                sg.collectables.push(trophy.id);
                UI_UpdateCollection();
                break;
            }

            var missingTrophies = trophies.filter(trophy => trophy.obtainable && !sg.collectables.includes(trophy.id));

            if (missingTrophies.length == 0) {
                alert("You already have all trophies!");
                break;
            }

            var trophyIndex = getRandomInt(missingTrophies.length);
            sg.collectables.push(missingTrophies[trophyIndex].id);
            UI_UpdateCollection();
            break;
        case 128: //RG Token
            sg.rgTokens += absoluteValue;
            UI_UpdateRGButton();
            break;
        default:
            alert("Something went wrong!");
            break;
    }

    switch (source) {
        case RewardSource.Code:
            usedRewards.push(new RewardInfo(rewardId, source));
            break;
        case RewardSource.Quest:
            usedRewards.push(new RewardInfo(rewardId, source));
            break;
        case RewardSource.Season:
            break;
    }
}

function Save_RemoveLevels(amount) {
    sg.level -= amount;
}

function Save_RemoveEnergy(amount) {
    sg.energy -= amount;
}
function Save_RemovePower(amount) {
    sg.power -= Math.floor(amount);
}

function Save_AddLevels(amount) {
    sg.level += amount;
    sg.tier += amount;
    sg.totalTiers += amount;

    Save_UpdateHighestLevel();
    Save_UpdateHighestTier();

    Handle_MilestoneBar();
    StatsUI_UpdateTotalTiers();
    Save_ProcessQuestUpdate(QuestType.TotalTiers, amount);
}

function Save_UpdateHighestLevel() {
    StatsUI_UpdateHighestLevel();
    if (sg.level <= sg.maximumLevel) {
        return;
    }
    sg.maximumLevel = sg.level;
    Save_AddRewardRoadProgress(25);
}
function Save_UpdateHighestTier() {
    if (sg.tier <= sg.maximumTier) {
        return;
    }
    sg.maximumTier = sg.tier;
    StatsUI_UpdateHighestTier();
}

function Save_AddEnergy(amount) {
    sg.energy += amount;
    sg.totalEnergy += amount;

    if(isinit) StatsUI_UpdateTotalEnergy();
    Save_ProcessQuestUpdate(QuestType.TotalEnergy, amount);
}
async function Save_MigrateSave() {
    if (sg.tier > sg.totalTiers) {
        sg.totalTiers = sg.tier;
    }
    if (sg.level > sg.maximumLevel) {
        sg.maximumLevel = sg.level;
    }
    if (sg.energyUpgrades[3] == null) {
        sg.energyUpgrades[3] = 0;
    }
    if (sg.energyUpgrades[4] == null) {
        sg.energyUpgrades[4] = 0;
    }
    if (sg.powerUpgrades == null) {
        sg.powerUpgrades = [0, 0, 0, 0, 0];
    }
    if (sg.autobuyUpgrades == null) {
        sg.autobuyUpgrades = [0, 0, 0, 0, 0];
    }
    if (sg.totalEnergy == null) {
        sg.totalEnergy = sg.energy;
    }

    if (sg.tier > sg.maximumTier) {
        sg.maximumTier = sg.tier;
    }

    if (sg.collectables == null) {
        sg.collectables = [];
    }
    if (sg.rewardRoadLevel == null) {
        sg.rewardRoadLevel = 1;
        sg.rewardRoadClaimed = 1;
    }
    if (sg.rewardRoadClaimed == null) {
        sg.rewardRoadClaimed = 1;
    }
    if (sg.rewardRoadProgress == null) {
        sg.rewardRoadProgress = 0;
    }
    if (currentSeasonIndex > sg.currentSeason) {
        await Save_NewSeason();
    }
}

function Save_AddUpgrade(type, i, amount) {
    nice()
    switch (type) {
        case UpgradeType.Level:
            if (sg.tier >= unlock[i]) sg.levelUpgrades[i] += amount;
            break;
        case UpgradeType.Energy:
            if (sg.tier >= 10000 + 2000 * i) sg.energyUpgrades[i] += amount;
            break;
        case UpgradeType.Power:
            if (sg.tier >= 40000 + 2500 * i) sg.powerUpgrades[i] += amount;
            break;
        case UpgradeType.Autobuy:
            if (sg.tier >= 200000 + 50000 * i) sg.autobuyUpgrades[i] += amount;
            break;
    }
}

function Save_AddRewardRoadProgress(amount) {
    if (sg.maximumTier < 30000) return;
    sg.rewardRoadProgress += amount;
    Save_ProcessQuestUpdate(QuestType.RewardRoadProgress, amount);
    UI_UpdateRewardRoad();
    if (sg.maximumTier >= 40000) {
        Save_AddPower(Get_PowerProduction());
    }
}
function Save_AddPower(amount) {
    if (sg.maximumTier < 40000) {
        return;
    }

    var gimmedat = Math.round(amount);
    sg.power += gimmedat;
    sg.totalPower += gimmedat;
    Save_ProcessQuestUpdate(QuestType.TotalPower, gimmedat);
}

async function Save_NewSeason() {
    /*
    amountClaimed = sg.rewardRoadLevel - sg.rewardRoadClaimed;
    if (sg.rewardRoadLevel > sg.rewardRoadClaimed) {
        var lastseason = await WebAssembly_GetSeason(sg.currentSeason);

        for (var i = sg.rewardRoadClaimed; i < sg.rewardRoadLevel; i++) {
            var reward = lastseason.rewards[i];
            Save_RedeemReward(reward, reward.id, RewardSource.Season);
        }
    }

    // Add leftover energy
    var howmuchdoiget = Calculate_RewardRoadEnergy();
    Save_AddEnergy(howmuchdoiget);

    //... THEN remove the progress!
    sg.currentSeason = currentSeasonIndex;
    sg.rewardRoadProgress = 0;
    sg.rewardRoadLevel = 0;
    sg.rewardRoadClaimed = 0;
    
    
    alert(`The last reward road season ended! ${amountClaimed} rewards have been claimed. Have fun with the new one :D`);
    alert(`You also got ` + shortnum(howmuchdoiget) + ` energy from your leftover RRP!`);
    */
}
//#endregion

//#region Formulas
function Calculate_RewardRoadEnergy() {
    return (sg.rewardRoadProgress / 10) * sg.getmaxenergypersec();
}

function Calculate_AbsoluteRewardValue(reward) {
    switch (reward.type) {
        case 1:
            return reward.value;
        case 2:
            return sg.getmaxenergypersec() * reward.value;
        case 4:
            return Get_PowerProduction() * reward.value;
        case 8:
            return reward.value;
        case 16:
            return reward.value;
        case 32:
            return reward.value;
        case 64: //Trophy
            return 1;
        case 128: //RG Token
            return reward.value;
        default:
            return 0;
    }
}
function Calculate_AbsoluteQuestValue(questType, value) {
    switch (questType) {
        case QuestType.TotalEnergy:
            return sg.getmaxenergypersec() * value;
        case QuestType.TotalTiers:
            return value;
        case QuestType.TotalPower:
            return Get_PowerProduction() * value;
        case QuestType.RewardRoadProgress:
            return value;
        case QuestType.RGTime:
            return value;
        case QuestType.FunButtonClicks:
            return value;
        case QuestType.UpgradeLevels:
            return value;
        default:
            return 0;
    }
}

function Calculate_RGCost(level) {
    var power = parseInt(level / 9);
    var multi = (level % 9) + 1;

    return multi * Math.pow(10, power + 3);
}
function Calculate_RGBoost(level) {
    return round(Math.sqrt(Calculate_RGCost(level)) / 75, 2) + 0.65;
}
function Calculate_LevelUpgradeCost(index, level) {
    return Math.round(price_add[index] * level + baseprice[index]);
}
function Calculate_EnergyUpgradeCost(index, level) {
    if (index == 0) {
        var price = 0.7 * Math.pow(level, 1.9);
        price += 1100 * level * Math.sin(level / 250);
        price += 800 * level * Math.sin(level / 75);
        price += 1500 * level;

        return Math.floor(price);
    }
    if (index == 4) {
        return 1000 * Math.pow(level, 2.5) + 500000 * level;
    }
    return energy_price[index] * level * (2 + index) + energy_price[index];
}
function Calculate_PowerUpgradeCost(index, level) {
    if (level == 0) {
        return power_price[index];
    }
    if (index == 4) {
        return Math.round(Math.pow(1.2, (15 + level)) + power_price[index] * (level + 5));
    }
    return Math.round(Math.pow(1.023 + ((1 + index) / 22), (5 + level)) + power_price[index]);
}
function Calculate_PowerUpgradeLevelCost(index, level) {
    return 100 + ( (1 + level) * (1 + index) );
}

function Calculate_AutobuyUpgradeCost(index, level) {
    return autobuy_price[index] * Math.pow(1.1, level);
}
//#endregion

//#region GetValue
function Get_PowerProduction() {
    return sg.powerUpgrades[4] + 1;
}

function Get_TotalUpgrades() {
    var totalLevels = 0;
    for (i = 0; i < 5; i++) {
        totalLevels += sg.levelUpgrades[i]
        totalLevels += sg.energyUpgrades[i]
        totalLevels += sg.powerUpgrades[i]
        totalLevels += sg.autobuyUpgrades[i]
    }
    return totalLevels;
}

function Get_CurrentUpgradeCost(type, index) {
    switch (type) {
        case UpgradeType.Level:
            return Calculate_LevelUpgradeCost(index, sg.levelUpgrades[index]);
        case UpgradeType.Energy:
            return Calculate_EnergyUpgradeCost(index, sg.energyUpgrades[index]);
        case UpgradeType.Power:
            return Calculate_PowerUpgradeCost(index, sg.powerUpgrades[index]);
        case UpgradeType.Autobuy:
            return Calculate_AutobuyUpgradeCost(index, sg.autobuyUpgrades[index]);
    }
}
function Get_CurrentPowerUpgradeLevelCost(index) {
    return Calculate_PowerUpgradeLevelCost(index, sg.powerUpgrades[index]);
}
//#endregion

//#region Game-Updates
function Game_TryAddUpgrade(type, index) {

    var upgrade_amount2 = upgrade_amount;
    if (upgrade_amount == 1000) {
        switch (type) {
            case UpgradeType.Level:
                upgrade_amount2 = Math.round(sg.level / Get_CurrentUpgradeCost(type, index));
                break;
            case UpgradeType.Energy:
                upgrade_amount2 = Math.round(sg.energy / Get_CurrentUpgradeCost(type, index));
                break;
            case UpgradeType.Power:
                upgrade_amount2 = Math.round(sg.power / Get_CurrentUpgradeCost(type, index));
                break;
            case UpgradeType.Autobuy:
                upgrade_amount2 = Math.round(sg.power / Get_CurrentUpgradeCost(type, index));
                break;
        }
    }
    if (upgrade_amount2 > 10000) {
        upgrade_amount2 = 10000;
    }
    
    for (k = 0; k < upgrade_amount2; k++) {
        var cost = Get_CurrentUpgradeCost(type, index);
        switch (type) {
            case UpgradeType.Level:
                if (sg.level < cost || sg.tier < unlock[index]) {
                    UpgradesUI_UpdateLevelUpgrades();
                    return false;
                }

                Save_RemoveLevels(cost);

                Save_AddUpgrade(type, index, 1);
                Save_AddRewardRoadProgress(5);
                Save_ProcessQuestUpdate(QuestType.UpgradeLevels, 1);

                continue;
            case UpgradeType.Energy:
                if (sg.energy < cost || sg.tier < 10000 + 2000 * index) {
                    UpgradesUI_UpdateEnergyUpgrades();
                    return false;
                }

                Save_RemoveEnergy(cost);
                Save_AddUpgrade(type, index, 1);
                Save_AddRewardRoadProgress(5);
                Save_ProcessQuestUpdate(QuestType.UpgradeLevels, 1);

                continue;
            case UpgradeType.Power:
                if (sg.power < cost || sg.tier < 40000 + 2500 * index) {
                    UpgradesUI_UpdatePowerUpgrades();
                    return false;
                }
                var secondaryCost = Get_CurrentPowerUpgradeLevelCost(index);
                if (sg.level < secondaryCost) {
                    UpgradesUI_UpdatePowerUpgrades();
                    return false;
                }
                Save_RemovePower(cost);
                Save_RemoveLevels(secondaryCost);

                Save_AddUpgrade(type, index, 1);
                Save_AddRewardRoadProgress(5);
                Save_ProcessQuestUpdate(QuestType.UpgradeLevels, 1);
                
                continue;
            case UpgradeType.Autobuy: 
                if (sg.power < cost || sg.autobuyUpgrades[index] < autobuy_max || sg.maximumTier < (200000 + 50000*index) || sg.autobuyUpgrades[index] >= autobuy_max[index]) {
                    UpgradesUI_UpdateAutobuyUpgrades();
                    return false;
                }
                Save_RemovePower(cost);

                Save_AddUpgrade(type, index, 1);
                Save_AddRewardRoadProgress(5);
                Save_ProcessQuestUpdate(QuestType.UpgradeLevels, 1);
                continue;
        }

        
        
    }
    UpgradesUI_UpdateAll();
    return true;
}

function Game_HardReset() {
    RGboost = 1;
    RGtime = 0;
    progress = 0;
}
function Game_ResetEnergyMultiSliderGraceTime() {
    sliderRemainingGraceTime = sliderGraceTime;
}
function Game_GetEngUpgEffect(up) {
    switch (up) {
        case 0:
            return shortnum(parseInt(enup_explf[0] * sg.energyUpgrades[0])).toString() + "%";
        case 1:
            return ("x" + enup_explf[1] * sg.energyUpgrades[1] + ".00");
        case 2:
            return (enup_explf[2] * sg.energyUpgrades[2]).toFixed(3);
        case 3:
            return parseInt((enup_explf[3] * sg.energyUpgrades[3]) + 100).toString();
        case 4:
            return (enup_explf[4] * sg.energyUpgrades[4]);
        default:
            return 0;
    }
}

function Game_GetPowUpgEffect(up) {
    switch (up) {
        case 0:
            return (baseClickBoost + poup_explf[0] * sg.powerUpgrades[0]).toFixed(2);
        case 1:
            return ((baseClickBoostTime / 1000) + (parseFloat(poup_explf[1] * sg.powerUpgrades[1]))).toFixed(2) + " sec";
        case 2:
            return (300 + (parseFloat(poup_explf[2] * sg.powerUpgrades[2]))).toFixed(2) + " sec";
        case 3:
            return "x" + (1 + (sg.powerUpgrades[3] / 10));
        case 4:
            return "x" + (poup_explf[4] * sg.powerUpgrades[4]);
        default:
            return 0;
    }
}

function Game_GetAuUpgEffect(up) {
    return auup_explf[up] - aumulti_sub[up] * sg.autobuyUpgrades[up];
}

function Game_GetResetMulti() {
    return ((0.02 + (sg.energyUpgrades[2] / 200)) * ((sg.tier / 10) + sg.level * (sg.totalTiers / 20000) + 1));
}

function Game_GetMulti() {
    x = 1;
    for (i = 0; i < baseprice.length; i++) {
        x *= sg.getmulti(i);
    }
    x *= sg.multi;
    x *= sg.energyUpgrades[1] + 1;
    if (sg.energyUpgrades[3] > 0) {
        if (sg.level < (sg.energyUpgrades[3] * 10) + 100) {
            x *= 3
        }
    }
    x *= Math.max(1, (Math.pow(1.05, sg.collectables.length)));
    return x;
}

function Game_GetRGPower() {
    var x = 1;
    x = (0.1 * sg.powerUpgrades[4]) * ((enpowselect / 5) + 1);
    return Math.round(x);
}

async function Game_CollectQuest(index) {
    var quest = openQuests[index];

    nice();
    Save_AddRewardRoadProgress(25);

    if (collectingQuestIndex == null) collectingQuestIndex = index;
    if (!Game_CollectReward(quest.reward, quest.id, RewardSource.Quest)) {
        return;
    }
}

function Game_CollectReward(reward, rewardId, rewardSource) {
    if (collectingReward != null) {
        return false;
    }

    //UI_SetRewardCollectionOverlayType(reward);
    //UI_ShowRewardCollectionOverlay();

    collectingReward = reward;
    collectingRewardId = rewardId;
    collectingRewardSource = rewardSource;
    return true;
}

//#endregion


//#region UI-Updates
function UI_FullUpdate() {
    // You can use this as a... Inhaltsverzeichnis
    UI_UpdateRGButton();
    UI_UpdateEnergy();
    UI_UpdateNotation();
    UpgradesUI_UpdateLevelUpgrades();
    UpgradesUI_UpdateEnergyUpgrades();
    UpgradesUI_UpdatePowerUpgrades();
    UpgradesUI_UpdateAutobuyUpgrades();
    UI_UpdateLevel();
    UI_UpdateTier();
    UI_UpdateNameInput();
    UI_UpdateLeaderboardExcluder();
    UI_UpdateCollection();
    UI_UpdateRewardRoad();
    UI_UpdatePower();
    UI_UpdateAutobuy();
    UI_Update_RewardRoadDisplay();
    UI_UpdateHelp();
    Handle_MilestoneBar();
    UI_UpdateAutoSaveSlider();
    UI_UpdateQuestModal();
    UI_UpdateNews();

    StatsUI_UpdateAll();
    UpgradesUI_UpdateAll();
}
var framesSinceFullRender = 0;
function UI_FrameUpdate() {
    UI_UpdateLevel();
    UI_UpdateTier();
    UI_UpdatePower();
    UI_UpdateProgressButtons();
    UI_UpdateQuestButton();

    framesSinceFullRender++;
    /*
    if (framesSinceFullRender == fps) {
        if (questmodal.style.display == "block") {
            UI_UpdateQuestModal();
        }
        framesSinceFullRender = 0;
    }
    */
}

function UI_UpdateRGButton() {
    if (sg.maximumTier >= 40000) {
        enpows.innerHTML = "Click to activate the Reversed Generator <br />Costs:" + shortnum(Calculate_RGCost(enpowselect)) + " Energy <br /> Effect: x" + Calculate_RGBoost(enpowselect).toFixed(2) + " Progress <br /> " + Game_GetRGPower() + " Power / second <br /> Length: +60 seconds";
    }
    else {
        enpows.innerHTML = "Click to activate the Reversed Generator <br />Costs:" + shortnum(Calculate_RGCost(enpowselect)) + " Energy <br /> Effect: x" + Calculate_RGBoost(enpowselect).toFixed(2) + " Progress <br /> Length: +60 seconds";
    }
    rgtoken.innerHTML = "RG Tokens: " + sg.rgTokens + "<br />Boost: " + shortnum(Calculate_RGBoost(sg.maxRgBoostLevel));
}

function UI_UpdateQuestButton() {
    /*
    if (sg.maximumTier >= 50000) {
        quest_box.style.display = "block";
    }
    else {
        quest_box.style.display = "none";
    }
    */
}

function UI_UpdateQuestModal() {
    /*
    for (i = 0; i < questSlots; i++) {
        var openQuest = openQuests[i];

        if (openQuest == null) {
            questHeads[i].innerHTML = "You already collected this quest!";
            questProgresses[i].innerHTML = "Save the game to get a new one";
            questRewards[i].innerHTML = "";
            questClaimButtons[i].style.display = "none";
            continue;
        }

        questHeads[i].innerHTML = queststype[openQuest.quest.type] + "   (" + questsdifficulties[openQuest.quest.difficulty] + ")";

        var currentProgress = Calculate_AbsoluteQuestValue(openQuest.quest.type, openQuest.progress);
        var maxProgress = Calculate_AbsoluteQuestValue(openQuest.quest.type, openQuest.quest.value);

        questProgresses[i].innerHTML = "Progress: " + shortnum(currentProgress) + " / " + shortnum(maxProgress);

        var rewardText = "Reward: " + shortnum(Calculate_AbsoluteRewardValue(openQuest.reward)) + " " + queststypeR[openQuest.reward.type];

        if (openQuest.reward.type == 8) {
            rewardText += " (";
            rewardText += up_names[openQuest.reward.index];
            rewardText += ")";
        }
        if (openQuest.reward.type == 16) {
            rewardText += " (";
            rewardText += enup_names[openQuest.reward.index];
            rewardText += ")";
        }

        questRewards[i].innerHTML = rewardText;

        if (openQuest.progress >= openQuest.quest.value) {
            questClaimButtons[i].style.display = "block";
        }
        else {
            questClaimButtons[i].style.display = "none";
        }
    }
    */
}

function UI_UpdateEnergy() {
    if (sg.maximumTier >= 10000) {
        tabenergyh.innerHTML = "Energy: " + shortnum(sg.energy) + "\n /s: " + shortnum(sg.getenergypersec());

        text_energy.innerHTML = `Energy ${shortnum(sg.energy)}`;
        text_energypersec.innerHTML = `${shortnum(sg.getenergypersec())} /s`
    } else {
        tabenergyh.innerHTML = "Unlocked at tier 10 000!";
    }
}

function UI_UpdateNotation() {
    whatnot.innerHTML = notations[notation];
    prevnot.innerHTML = "" + shortnum(10) + ", " + shortnum(100) + ", " + shortnum(1000) + ", " +
        shortnum(10000) + ", " + shortnum(100000) + ", " + shortnum(1000000) + " etc."
}

function UI_UpdateProgressButtons() {
    //progressbuttonbar1.style.width = 100 * (clickRemainingBoostTime / clickBoostTime) + "%";
    //progressbuttonbar2.style.width = 100 * (clickRemainingBoostTime / clickBoostTime) + "%";
}

function UI_UpdateLevel() {
    text_lvl.innerHTML = "Level " + sg.level.toFixed(0);
    tabtext_lvl.innerHTML = "Level " + sg.level.toFixed(0);
}

function UI_UpdateTier() {
    tier_lvl.innerHTML = "Tier " + sg.tier.toFixed(0);
    tabtiers.innerHTML = "Tier " + sg.tier.toFixed(0);
}

function UI_UpdateNameInput() {
    //nameinput.value = "eoe";
}

function UI_UpdateAutoSaveSlider() {
    //autosave_checkbox.checked = account.useAutoSave;
}

function UI_UpdateLeaderboardExcluder() {
    //leaderboxexcluder.checked = account.excludeFromLeaderboard;
}

function UI_Update_RewardRoadDisplay() {
    /*
    var cdisplay = "";
    for (i = 0; i < currentSeason.rewards.length; i++) {
        var reward = currentSeason.rewards[i];
        switch (reward.type) {
            case 1:
                rewardRoadDisplay1.push(`Levels & Tiers (${reward.value}x)`);
                break;
            case 2:
                rewardRoadDisplay1.push(`Energy (${reward.value}s)`);
                break;
            case 4:
                rewardRoadDisplay1.push(`Power (${reward.value}x)`);
                break;
            case 8:
                rewardRoadDisplay1.push(`Free Level Upgrades (${reward.value}x)`);
                break;
            case 16:
                rewardRoadDisplay1.push(`Free Energy Upgrades (${reward.value}x)`);
                break;
            case 32:
                rewardRoadDisplay1.push(`Free Power Upgrades (${reward.value}x)`);
                break;
            case 64:
                rewardRoadDisplay1.push(`Trophy (${reward.value}x)`);
                break;
            case 128:
                rewardRoadDisplay1.push(`Free RG tokens (${reward.value})`);
                break;
        }
    }
    rewardRoadDisplay1.push("Nothing");
    for (i = 0; i < currentSeason.rewards.length; i++) {
        if (i != 0) {
            cdisplay += "<br />";
        }
        cdisplay += "Lvl " + (i + 1) + ": " + rewardRoadDisplay1[i];
    }

    rewardroadchtml.innerHTML = cdisplay;
    */
}

function UI_UpdateCollection() {
    /*
    trophy_bar.value = (sg.collectables.length / trophies.length) * 100;

    collectionhtml.innerHTML = "";
    sg.collectables.forEach(function (trophyId) {
        var trophy = trophies[trophyId];
        collectionhtml.innerHTML += '<img class="collectionimg" src="tros/' + trophy.imageSrc + '.png" title="' + trophy.description + '">';
    });
    */
}

function UI_UpdateRewardRoad() {
    /*
    if (sg.maximumTier >= 30000) {
        rr_box.style.display = "block";
        rrp_bar.value = (sg.rewardRoadProgress / (200 + (sg.rewardRoadLevel * 50)) ) * 100;
        rewardRoadRequiredProgress = 200 + (sg.rewardRoadLevel * 50);
        if (sg.rewardRoadProgress > rewardRoadRequiredProgress && sg.rewardRoadLevel < currentSeason.rewards.length) {
            sg.rewardRoadProgress = 0;
            sg.rewardRoadLevel += 1;
        }
        if (sg.rewardRoadClaimed < currentSeason.rewards.length) {
            rewardroadhtml.innerHTML = "Progress: " + sg.rewardRoadProgress + "/" + rewardRoadRequiredProgress + "<br /> Current Level: " + sg.rewardRoadLevel + "/" + (currentSeason.rewards.length) + "<br /> Claimed: " + sg.rewardRoadClaimed + "/" + (currentSeason.rewards.length) + "<br /> Next reward: " + rewardRoadDisplay1[sg.rewardRoadClaimed];
        }
        else {
            rewardroadhtml.innerHTML = "Progress: " + sg.rewardRoadProgress + "<br /> You've completed this season! <br /> You will get energy when the next season starts: " + shortnum(Calculate_RewardRoadEnergy());
        }
    }
    else {
        sg.rewardRoadProgress = 0;
        rr_box.style.display = "none";
        rewardroadhtml.innerHTML = "Unlocked at tier 30,000!";
    }
    */
}

function UI_UpdatePower() {
    text_power.innerHTML = "Power: " + shortnum(sg.power);
    tabpower.innerHTML = "Power: " + shortnum(sg.power);
    powertext.innerHTML = "You get " + Get_PowerProduction() + " power every 0.5 seconds of clicking and every time you progress in the Reward Road and " + Game_GetRGPower() + " every 1 second of having the Reversed Generator active at the currently selected costs.";

    if (sg.maximumTier >= 40000) {
        powercontrolbox.style.display = "flex";
    }
    else {
        powercontrolbox.style.display = "none";
    }
}

function UI_UpdateAutobuy_Text(i) {
    var status = "Enabled";
    if (autoBuyActive[i] == false) status = "Disabled";
    return 'Time to next purchase: ' + Math.max(0, autoBuyTime[i].toFixed(1)) + '/' + Game_GetAuUpgEffect(i) + '<br> Status:' + status;
}

function UI_UpdateAutobuy() {
    if (sg.maximumTier >= 200000) {
        autocontrolbox.style.display = "flex";

        autobuy1.innerHTML = 'Cheap Multi Auto buyer <br>' + UI_UpdateAutobuy_Text(0);
        autobuy2.innerHTML = 'Balanced Multi Auto buyer <br>' + UI_UpdateAutobuy_Text(1);
        autobuy3.innerHTML = 'Boost Multi Auto buyer <br>' + UI_UpdateAutobuy_Text(2);
        autobuy4.innerHTML = 'Weak Multi Auto buyer <br>' + UI_UpdateAutobuy_Text(3);
        autobuy5.innerHTML = 'Powerful Multi Auto buyer <br>' + UI_UpdateAutobuy_Text(4);
    }
    else {
        autocontrolbox.style.display = "none";
    }
}

function UI_UpdateHelp() {
    if (sg.maximumTier >= 10000) {
        help_energy.innerHTML = "Energy is unlocked at 10k tiers. Energy is earned automatically and can be spent on 5 upgrades with different effects." +
        "The energy slider affects the energy production. Try to always keep it on the right side. It exists to prevent AFK energy farming being too strong.";
    }
    else {
        help_energy.innerHTML = "";
    }
    if (sg.maximumTier >= 40000) {
        help_power.innerHTML = "Power is unlocked at 40k tiers. Power is earned from several things and can be spent on 5 upgrades that also cost some levels.";
    }
    else {
        help_power.innerHTML = "";
    }
}

function UI_UpdateNews() {
    //thenews.innerHTML = "<h3>" + newsArticles[selectnews].title + "</h3> <br />" + newsArticles[selectnews].description;
}
// --------------------------

function UI_RandomizeFunButton() {
    var funButton = document.getElementById("funbutton");
    if (funButton == null) return false;

    var randomBgColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    var posx = (Math.random() * (document.body.clientWidth - 6)).toFixed() + "px";
    var posy = (Math.random() * (document.body.clientHeight - 6)).toFixed() + "px";
    var sizex = (Math.random() * 25) + 5;
    var sizey = (Math.random() * 25) + 5;

    funButton.style.backgroundColor = randomBgColor;
    funButton.style.left = posx;
    funButton.style.top = posy;
    funButton.style.width = sizex;
    funButton.style.height = sizey;
}

function UI_RandomizeTheme() {
    var body = document.getElementById("body");
    var randomTextColor = Math.floor(Math.random() * 16777215).toString(16);
    var randomBgColor = Math.floor(Math.random() * 16777215).toString(16);
    body.style.color = "#" + randomTextColor;
    body.style.backgroundColor = "#" + randomBgColor;
}
//#region Modals
/*
function UI_ShowSavedModal() {
    var modal = document.getElementById("gameSavedModal");
    var idinput = document.getElementById("idInput");
    idinput.value = account.id;
    modal.style.display = "block";
}

function UI_HideSavedModal() {
    var modal = document.getElementById("gameSavedModal");
    modal.style.display = "none";
}

function UI_ShowResetModal() {
    var modal = document.getElementById("ResetconfModal");

    if (sg.tier < sg.maximumTier / 20) { //5% of max tier
        resetconfirmationbtn.style.display = "none";
        resetconfirmationerror.innerHTML = "You need at least 5% of your maximum tiers to reset!";
    }

    modal.style.display = "block";
}

function UI_HideResetModal() {
    var modal = document.getElementById("ResetconfModal");
    modal.style.display = "none";

    resetconfirmationbtn.style.display = "block";
    resetconfirmationerror.innerHTML = "";
}

function UI_ShowRewardRoadModal() {
    UI_UpdateRewardRoad();
    var modal = document.getElementById("RewardRoadModal");
    modal.style.display = "block";
}

function UI_HideRewardRoadModal() {
    var modal = document.getElementById("RewardRoadModal");
    modal.style.display = "none";
}

function UI_ShowQuestModal() {
    UI_UpdateQuestModal();
    questmodal.style.display = "block";
}

function UI_HideQuestModal() {
    questmodal.style.display = "none";
}

function UI_ShowNotificationBox() {
    var modal = document.getElementById("Notification");
    modal.style.display = "block";
}

function UI_HideNotificationBox() {
    var modal = document.getElementById("Notification");
    modal.style.display = "none";
}

function Show_Notification(TEXT = "1") {
    popup.innerHTML = TEXT;
    UI_ShowNotificationBox();
}

function UI_ShowRewardCollectionOverlay() {
    collect_overlay.style.display = "flex";
}
function UI_HideRewardCollectionOverlay() {
    collect_overlay.style.display = "none";
}
function UI_SetRewardCollectionOverlayType(reward) {
    var rewardText = Calculate_AbsoluteRewardValue(reward) + " " + queststypeR[reward.type];

    switch (reward.type) {
        case RewardType.Level:
            collect_image.src = "up/up_levelup.png";
            break;
        case RewardType.Energy:
            collect_image.src = "up/up_energy.png";
            break;
        case RewardType.Power:
            collect_image.src = "up/up_power.png";
            break;
        case RewardType.LevelUpgrade:
            collect_image.src = "up/up_upglevel.png";
            rewardText += " (";
            rewardText += up_names[reward.index];
            rewardText += ")";
            break;
        case RewardType.EnergyUpgrade:
            collect_image.src = "up/up_upgenergy.png";
            rewardText += " (";
            rewardText += enup_names[reward.index];
            rewardText += ")";
            break;
        case RewardType.PowerUpgrade:
            collect_image.src = "up/up_upgpower.png";
            break;
        case RewardType.Trophy:
            collect_image.src = "tros/001-legacyicon.png";
            break;
        case RewardType.RG:
            collect_image.src = "up/up_token_rg.png";
            break;
    }

    collect_text.innerHTML = rewardText;
}
*/
function UI_Toggle_EnergyUpgrades() {
    var toggle = document.getElementById("enupgbox");
    if (sg.maximumTier > 9999) {
        toggle.style.display = "block";
    }
    else {
        toggle.style.display = "none";
    }

}

function UI_Toggle_PowerUpgrades() {
    var toggle = document.getElementById("pwupgbox");
    if (sg.maximumTier > 39999) {
        toggle.style.display = "block";
    }
    else {
        toggle.style.display = "none";
    }

    var toggle = document.getElementById("auupgbox");
    if (sg.maximumTier > 199999) {
        toggle.style.display = "block";
    }
    else {
        toggle.style.display = "none";
    }
}

//#endregion
//#endregion

//#region WebAssembly Hooks
//#region SaveGames
async function WebAssembly_UpdateGame(showAlertOnError) {
    var success = false;

    var questUpdates = [];
    for (i = 0; i < openQuests.length; i++) {
        var quest = openQuests[i];
        if (quest == null) continue;
        var update = new QuestUpdate(quest.id, quest.progress)
        questUpdates.push(update);
    }
    for (i = 0; i < claimedQuests.length; i++) {
        var quest = claimedQuests[i];
        var update = new QuestUpdate(quest.id, quest.progress)
        questUpdates.push(update);
    }

    await DotNet.invokeMethodAsync('Idlebar', 'UpdateGameAsync', sg, usedRewards, questUpdates)
        .then(result => {
            success = result.isSuccessful;
            if (!success) {
                if (showAlertOnError) {
                    alert(result.reason);
                }
                return;
            }

            for (i = 0; i < result.value.quests.length; i++) {
                ind = openQuests.indexOf(null);
                openQuests[ind] = result.value.quests[i];
            }
        });

    if (success) {
        usedRewards = [];
        claimedQuests = [];
    }

    return success;
}

async function WebAssembly_UpdateAccount(showAlertOnError) {
    var success = false;
    accountChanged = false;
    await DotNet.invokeMethodAsync('Idlebar', 'UpdateAccountAsync', account)
        .then(result => {
            success = result.isSuccessful;
            if (!success) {
                if (showAlertOnError) {
                    alert(result.reason);
                }
                return;
            }
        });
    return success;
}

async function WebAssembly_LoadGame(gameId) {
    await DotNet.invokeMethodAsync('Idlebar', 'LoadGameAsync', gameId);
}

async function WebAssembly_UpdateTabCode() {
    await DotNet.invokeMethodAsync('Idlebar', 'UpdateTabCodeAsync', sg.id);
}

async function WebAssembly_GetSeason(index) {
    var season;
    await DotNet.invokeMethodAsync('Idlebar', 'GetSeason', index)
        .then(result => {
            season = result;
        });
    return season;
}
//#endregion
//#region Rewards
async function WebAssembly_LoadReward(rewardCode) {
    var reward = null;
    await DotNet.invokeMethodAsync('Idlebar', 'LoadRewardAsync', sg.id, rewardCode)
        .then(result => {
            var success = result.isSuccessful;

            if (!success) {
                alert(result.reason);
                return null;
            }

            reward = result.value;
        });
    return reward;
}
//#endregion
//#endregion

function reset() { //prestige
    //UI_HideResetModal();
    if (/*(sg.multi * 2 < calculate("RESET")) || ((sg.multi > 49) && (*/Game_GetResetMulti() > sg.multi) {
        var newmulti = Game_GetResetMulti();
        sg.reset(newmulti);
    }
    else if (Game_GetResetMulti() < sg.multi) {
        sg.reset(sg.multi);
    }
    Game_HardReset();
    UI_FullUpdate();
}

function findcursor() {
    mousemoved = 60;
    /*
    cursorX = e.clientX;
    cursorY = e.clientY;
    console.log("." + cursorX + " / " + cursorY + ".");
    */
}

//#region WebAssemblyAccess

StartupGameAsync();
function StartupGameAsync() {
        SetConfig();
        //RegisterTrophies();
        //SetSaveGame(saveData);
        Initialize();
        RegisterEvents();
        StartGame();
}

function RegisterTrophies(trophs) {
    trophies = trophs;
}

//Called by the WebAssembly Code once at startup
//Set Variables Values that are shared with the server
function SetConfig() {
    var levelUpgradeMultis = [
        0.1,
        0.3,
        1.0,
        0.2,
        3.0,
];
    var energyUpgradeMulti = 1.0;
    var seasonIndex = 7;
    var season = 7;
    var questslots = 5;

    multi_add = levelUpgradeMultis;

    newsArticles = "";

    currentSeason = season;
    currentSeasonIndex = seasonIndex;
    questSlots = questslots;

    enmulti_add = ["100%", `${(energyUpgradeMulti * 100).toFixed(0)}%`, "0.005", "10", "1"];
    pomulti_add = ["1", "1", "1", "1", "1"];
    aumulti_sub = ["2", "3", "4", "5", "6"];
    enup_explf = [100, energyUpgradeMulti, 0.005, 10, 1]; //Maybe get all of these loaded instead of setting a few here?
    poup_explf = [0.1, 0.1, 10, 0.1, 1];
    auup_explf = [60, 120, 180, 240, 300];
}
//Set the SaveGame (Can be called multiple times during execution!)
async function SetSaveGame(saveData) {
    /*
    account = saveData.account;

    sg = new SaveGame();
    sg.loadFromSaveGame(saveData.saveState);

    openQuests = saveData.quests;

    Game_HardReset();
    await Save_MigrateSave();
    */
}

var isinit = false;

//Initialize UI, Register Events (Not Game running ones)
function Initialize() {
    StatsUI_Initialize();
    UpgradesUI_Initialize();

    //Prevent Enter Keydown Event on Button or Span elements
    window.addEventListener('keydown', function (e) {
        if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
            if (e.target.nodeName == 'BUTTON' || e.target.nodeName == 'SPAN') {
                e.preventDefault();
                return false;
            }
        }
    }, true);

    // Mouse Tracking
    window.onmousemove = findcursor;

    // Alts for the Upgrades tab
    tabtext_lvl = document.getElementById("tabtext_level");
    tabenergyh = document.getElementById("tabvenergy");
    tabpower = document.getElementById("tabtext_power");
    tabtiers = document.getElementById("tabtext_tier");

    //Settings
    autosavesettings = document.getElementById("autosavesettings");
    rewardcodesettings = document.getElementById("rewardcodesettings");
    leaderboardsettings = document.getElementById("leaderboardsettings");

    autosave_checkbox = document.getElementById("autosavecheckbox");
    if (autosave_checkbox != undefined) autosave_checkbox.addEventListener("change", Handle_AutoSaveChange);

    leaderboard_checkbox = document.getElementById("includeinleaderboardcheckbox");

    //nameinput = document.getElementById("nameinput");
    leaderboxexcluder = document.getElementById("leaderboxexcluder");
    if ( leaderboxexcluder != undefined) leaderboxexcluder.addEventListener("change", Handle_LeaderboardExcluderChange);

    //colorresetbtn = document.getElementById("colorresetbtn");
    //tabactivatorbtn = document.getElementById("tabactivatorbtn");
    uiupdatebtn = document.getElementById("uiupdatebtn");

    // Bars
    p_bar = document.getElementById("pbar");
    p_bar2 = document.getElementById("pbar2");
    trophy_bar = document.getElementById("tbar");
    rrp_bar = document.getElementById("rrpbar");
    nextMilestone = document.getElementById("nextMilestoneBarGoal");
    nextMilestone.innerHTML = "Next Goal: " + milestoneNames[0];
    p_bar.max = 100;
    p_bar2.max = 100;
    p_bar2.value = 1;

    // Reversed Generator
    rg_bar = document.getElementById("rgbar");
    rg_box = document.getElementById("rgbox");
    rgtimeleftp = document.getElementById("rgtimeleftp");
    enpows = document.getElementById("enpowdisplay");
    rgtoken = document.getElementById("rgtokendisplay");
    rgbutton = document.getElementById("usergbutton");

    rg_plus1 = document.getElementById("rgplus1");
    rg_plus9 = document.getElementById("rgplus9");
    rg_minus1 = document.getElementById("rgminus1");
    rg_minus9 = document.getElementById("rgminus9");
    putcodehere = document.getElementById("putcodehere");

    // General vars such as tiers
    text_p = document.getElementById("text_progress");
    text_lvl = document.getElementById("text_level");
    tier_lvl = document.getElementById("tier_level");
    text_energy = document.getElementById("text_energy");
    text_power = document.getElementById("text_power");
    text_energypersec = document.getElementById("text_energypersec");
    updateid = document.getElementById("gameversionid");
    tabupdateid = document.getElementById("tabgameversionid");

    text_autobuy1 = document.getElementById("autobuy1");
    text_autobuy2 = document.getElementById("autobuy2");
    text_autobuy3 = document.getElementById("autobuy3");
    text_autobuy4 = document.getElementById("autobuy4");
    text_autobuy5 = document.getElementById("autobuy5");

    // Buttons
    btn_reset = document.getElementById("btn_reset");
    btn_img_reset = document.getElementById("btn_img_reset");
    div_upgs = document.getElementById("upgs");
    updatebut = document.getElementById("updatebut");
    loadbut = document.getElementById("loadbut");
    boostbuttons = document.getElementsByClassName("boostButton")
    multibuybutton = document.getElementById("multibutton");
    multibuybutton.innerHTML = "Buy x1";
    btn_openrr = document.getElementById("btn_openrr");
    btn_openqu = document.getElementById("btn_openqu");
    resetclose = document.getElementById("closereset");

    button_autobuy1 = document.getElementById("autobuyb1");
    button_autobuy2 = document.getElementById("autobuyb2");
    button_autobuy3 = document.getElementById("autobuyb3");
    button_autobuy4 = document.getElementById("autobuyb4");
    button_autobuy5 = document.getElementById("autobuyb5");

    // Notations and Codes
    notationsh = document.getElementById("notationchange");
    redeemcode = document.getElementById("codebutton");

    // Reward Road
    rewardroadhtml = document.getElementById("rewardroad");
    rewardroadbhtml = document.getElementById("rewardroadb");
    rewardroadchtml = document.getElementById("rewardroadc");
    collectionhtml = document.getElementById("collection");
    rr_box = document.getElementById("rrbox");
    if (rewardroadbhtml != undefined) rewardroadbhtml.innerHTML = "Claim reward!";
    if (rewardroadbhtml != undefined) rewardroadbhtml.addEventListener("click", Handle_ClaimRewardRoad.bind(this));
    if (rewardroadchtml != undefined) rewardroadchtml.innerHTML = "RR";
    if (collectionhtml != undefined) collectionhtml.innerHTML = "RR";

    //Reward Collection
    rewardcontainer = document.getElementById("rewardcontainer");
    rewarditemdisplay = document.getElementById("rewarditem");

    // Energy Control
    energymultislider = document.getElementById("enmultislider");
    if (energymultislider != undefined) energymultislider.addEventListener("change", Game_ResetEnergyMultiSliderGraceTime.bind(this));

    // Hidable game features like boxes and tabs
    energycontrolbox = document.getElementById("enctrlbox");
    powercontrolbox = document.getElementById("poctrlbox");
    autocontrolbox = document.getElementById("auctrlbox");

    // Collection Animation
    collect_overlay = document.getElementById("rewardcontainer");
    collect_image = document.getElementById("collectimage");
    collect_text = document.getElementById("collecttext");

    // Notation changer
    whatnot = document.getElementById("whatnothtml");
    whatnot.innerHTML = notations[notation];
    prevnot = document.getElementById("prevnothtml");
    prevnot.innerHTML = "Preview";


    //ProgressBoostButtons
    progressbutton1 = document.getElementById("progressButton1");
    //progressbuttonbar1 = document.getElementById("progressButtonBar1");
    //progressbutton2 = document.getElementById("progressButton2");
    //progressbuttonbar2 = document.getElementById("progressButtonBar2");

    // Modal
    resetconfirmationbtn = document.getElementById("resetconfirmbtn");
    resetconfirmationerror = document.getElementById("resetconfirmationerror");
    popup = document.getElementById("notify");

    // More Modal lol
    questmodal = document.getElementById("QuestModal");

    // Notation
    ntback = document.getElementById("ntback");
    ntforward = document.getElementById("ntforward");
    ntmenu = document.getElementById("ntmenu");
    ntddinput = document.getElementById("myInput");
    ntddbuttons = [];

    for (i = 0; i < 12; i++) {
        ntddbuttons[i] = document.getElementById("ntdd" + i);
    }
    
    // Help
    helpEnergy = document.getElementById("help_energy");
    helpPower = document.getElementById("help_power");

    // News
    //thenews = document.getElementById("news_news");
    //newsforwardbtn = document.getElementById("newsforwardbtn");
    //newsbackwardbtn = document.getElementById("newsbackwardbtn");

    // Game version
    updateid.innerHTML = currentUpdate;
    tabupdateid.innerHTML = currentUpdate;

    questHeads = [];
    questProgresses = [];
    questRewards = [];
    questClaimButtons = [];
    // Quests
    for (i = 0; i < questSlots; i++) {
        questHeads.push(document.getElementById("questHead" + i));
        questProgresses.push(document.getElementById("questProgress" + i));
        questRewards.push(document.getElementById("questReward" + i));
        questClaimButtons.push(document.getElementById("questClaimBtn" + i));
    }
    quest_box = document.getElementById("questsbox");

    claim1 = document.getElementById("questClaimBtn0");
    claim2 = document.getElementById("questClaimBtn1");
    claim3 = document.getElementById("questClaimBtn2");
    claim4 = document.getElementById("questClaimBtn3");
    claim5 = document.getElementById("questClaimBtn4");

    claimthequest = document.getElementById("questclaimy");
    questsclose = document.getElementById("closequests");

    copyIdButton = document.getElementById("copyIdBtn");
    closesave = document.getElementById("closesaved");

    funfun = document.getElementById("funbutton");
    powertext = document.getElementById("power_text");


    // load from cache
    if (localStorage.getItem("IDLEBARLITE") != undefined) Handle_LoadButton(true);

    isinit = true;
}
function RegisterEvents() {

    multibuybutton.addEventListener("click", Handle_MultibuyButton);
    loadbut.addEventListener("click", Handle_LoadButton);
    updatebut.addEventListener("click", Handle_UpdateButton);

    //redeemcode.addEventListener("click", Handle_RewardCodeButton);
    //nameinput.addEventListener("change", Handle_NameChange);
    //colorresetbtn.addEventListener("click", Handle_ResetColorButton);
    uiupdatebtn.addEventListener("click", UI_FullUpdate);
    //tabactivatorbtn.addEventListener("click", Handle_UseCurrentTab);

    ntback.addEventListener("click", ChangeNotationBack);
    ntforward.addEventListener("click", ChangeNotation);
    ntmenu.addEventListener("click", Handle_NotationsMenu);
    ntddinput.addEventListener("keyup", Handle_NotationMenuKeyUp);

    //btn_openrr.addEventListener("click", UI_ShowRewardRoadModal);
    //btn_openqu.addEventListener("click", UI_ShowQuestModal);
    //btn_reset.addEventListener("click", UI_ShowResetModal);
    //btn_img_reset.addEventListener("click", UI_ShowResetModal);

    ntddbuttons[0].addEventListener("click", e => SetNotation(0));
    ntddbuttons[1].addEventListener("click", e => SetNotation(1));
    ntddbuttons[2].addEventListener("click", e => SetNotation(2));
    ntddbuttons[3].addEventListener("click", e => SetNotation(3));
    ntddbuttons[4].addEventListener("click", e => SetNotation(4));
    ntddbuttons[5].addEventListener("click", e => SetNotation(5));
    ntddbuttons[6].addEventListener("click", e => SetNotation(6));
    ntddbuttons[7].addEventListener("click", e => SetNotation(7));
    ntddbuttons[8].addEventListener("click", e => SetNotation(8));
    ntddbuttons[9].addEventListener("click", e => SetNotation(9));
    ntddbuttons[10].addEventListener("click", e => SetNotation(10));
    ntddbuttons[11].addEventListener("click", e => SetNotation(11));

    lvlupgs[0].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Level, 0));
    lvlupgs[1].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Level, 1));
    lvlupgs[2].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Level, 2));
    lvlupgs[3].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Level, 3));
    lvlupgs[4].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Level, 4));

    enupgs[0].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Energy, 0));
    enupgs[1].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Energy, 1));
    enupgs[2].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Energy, 2));
    enupgs[3].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Energy, 3));
    enupgs[4].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Energy, 4));

    poupgs[0].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Power, 0));
    poupgs[1].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Power, 1));
    poupgs[2].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Power, 2));
    poupgs[3].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Power, 3));
    poupgs[4].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Power, 4));

    auupgs[0].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Autobuy, 0));
    auupgs[1].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Autobuy, 1));
    auupgs[2].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Autobuy, 2));
    auupgs[3].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Autobuy, 3));
    auupgs[4].addEventListener("click", e => Handle_UpgradeButton(UpgradeType.Autobuy, 4));

    //newsforwardbtn.addEventListener("click", Handle_NewsForwards);
    //newsbackwardbtn.addEventListener("click", Handle_NewsBackwards);

    progressbutton1.addEventListener("click", e => Handle_ProgressButton());
    //progressbutton2.addEventListener("click", e => Handle_ProgressButton());
    //resetclose.addEventListener("click", e => UI_HideResetModal());
    //resetconfirmationbtn.addEventListener("click", e => reset());
    /*
    claim1.addEventListener("click", e => Handle_ClaimQuestButton(0));
    claim2.addEventListener("click", e => Handle_ClaimQuestButton(1));
    claim3.addEventListener("click", e => Handle_ClaimQuestButton(2));
    claim4.addEventListener("click", e => Handle_ClaimQuestButton(3));
    claim5.addEventListener("click", e => Handle_ClaimQuestButton(4));

    claimthequest.addEventListener("click", e => Handle_CollectRewardButton());
    */
    rg_plus1.addEventListener("click", e => PlusRG(1));
    rg_plus9.addEventListener("click", e => PlusRG(9));
    rg_minus1.addEventListener("click", e => MinusRG(1));
    rg_minus9.addEventListener("click", e => MinusRG(9));
    enpows.addEventListener("click", e => ActivateEnpow());

    usergbutton.addEventListener("click", e => UseRGToken());

    //questsclose.addEventListener("click", e => UI_HideQuestModal());

    //copyIdButton.addEventListener("click", e => Handle_CopyIdButton());

    //closesave.addEventListener("click", e => UI_HideSavedModal());

    //funfun.addEventListener("click", e => Handle_FunButton());

    // Auto buyers
    button_autobuy1.addEventListener("click", e => Handle_StatusAutobuy(0));
    button_autobuy2.addEventListener("click", e => Handle_StatusAutobuy(1));
    button_autobuy3.addEventListener("click", e => Handle_StatusAutobuy(2));
    button_autobuy4.addEventListener("click", e => Handle_StatusAutobuy(3));
    button_autobuy5.addEventListener("click", e => Handle_StatusAutobuy(4));
}
function StartGame() {
    // Intervals
    UI_FullUpdate();
    intervals.push(setInterval(Tick_Game, 1000 / fps));
    intervals.push(setInterval(cheatcheck, 1000));
    intervals.push(setInterval(Handle_AutoSave, 10000));
    intervals.push(setInterval(UI_RandomizeFunButton, 5000));
}
function PauseGame() {
    // Remove all started Intervals
    intervals.forEach(interval => clearInterval(interval));
}
//#endregion


//#region UpgradeUI
function UpgradesUI_UpdateLevelUpgrades() {
    for (i = 0; i < 5; i++) { //update upg buttons
        if (sg.tier >= unlock[i]) {
            lvlupg_texts[i].innerHTML = ' <u>' + up_names[i] + ' Multiplier (Level ' + sg.levelUpgrades[i] + ')</u></div><br/>Current Multiplier: x' + shortnum(sg.getmulti(i)) + '   |   Every level will increase it by x' + multi_add[i] + '   |   Cost: ' + Get_CurrentUpgradeCost(UpgradeType.Level, i) + ' Levels <div>';
        }
        else {
            lvlupg_texts[i].innerHTML = 'Requires tier ' + unlock[i] + '! </p>'
        }
    }
}

function UpgradesUI_UpdateEnergyUpgrades() {
    for (i = 0; i < 5; i++) { //update upg buttons
        if (sg.maximumTier >= 10000 + (2000 * i)) {
            enupg_texts[i].innerHTML = ' <u>' + enup_names[i] + ' (Level: ' + sg.energyUpgrades[i] + ') </u><br/></div>' + enup_expls[i] + '<br/>Current: ' + Game_GetEngUpgEffect(i) + '  |   Every level will increase it by +' + enmulti_add[i] + '  |  Cost: ' + shortnum(Get_CurrentUpgradeCost(UpgradeType.Energy, i)) + ' Energy';
        }
        else {
            enupg_texts[i].innerHTML = "Unlocked at tier " + (10000 + (2000 * i)) + "!";
        }
    }
}

function UpgradesUI_UpdatePowerUpgrades() {
    for (i = 0; i < 5; i++) { //update upg buttons
        if (sg.maximumTier >= 40000 + (2500 * i)) {
            poupg_texts[i].innerHTML = ' <u>' + poup_names[i] + ' (Level: ' + sg.powerUpgrades[i] + ') </u><br/></div>' + poup_expls[i] + '<br/>Current: ' + Game_GetPowUpgEffect(i) + '  |   Every level will increase it by +' + poup_explf[i].toFixed(1) + '  <br />  Cost: ' + shortnum(Get_CurrentUpgradeCost(UpgradeType.Power, i)) + ' Power  & ' + Get_CurrentPowerUpgradeLevelCost(i) + ' Levels';
        }
        else {
            poupg_texts[i].innerHTML = "Unlocked at tier " + (40000 + (2500 * i)) + "!";
        }
    }
}

function UpgradesUI_UpdateAutobuyUpgrades() {
    for (i = 0; i < 5; i++) {
        if (sg.maximumTier >= 200000 + (50000 * i)) {
            auupg_texts[i].innerHTML = ' <u>' + auup_names[i] + ' (Level: ' + sg.autobuyUpgrades[i] + '/' + autobuy_max[i] + ') </u><br/></div>' + auup_expls[i] + '<br/>Current: ' + Game_GetAuUpgEffect(i) + 's  |   Every level will decrease it by +' + aumulti_sub[i] + 's  <br />  Cost: ' + shortnum(Get_CurrentUpgradeCost(UpgradeType.Autobuy, i)) + ' Power';
        }
        else {
            auupg_texts[i].innerHTML = "Unlocked at tier " + (200000 + (50000 * i)) + "!";
        }
    }
}

function UpgradesUI_UpdateAll() {
    UpgradesUI_UpdateLevelUpgrades();
    UpgradesUI_UpdateEnergyUpgrades();
    UpgradesUI_UpdatePowerUpgrades();
    UpgradesUI_UpdateAutobuyUpgrades();

    UI_Toggle_EnergyUpgrades();
    UI_Toggle_PowerUpgrades();
}

var lvlupgs = [];
var enupgs = [];
var poupgs = [];
var auupgs = [];

function UpgradesUI_Initialize() {
    lvlupgs = [];
    lvlupg_texts = [];
    enupgs = [];
    enupg_texts = [];
    poupgs = [];
    poupg_texts = [];
    auupgs = [];
    auupg_texts = [];


    for (i = 0; i < 5; i++) {
        lvlupgs[i] = document.getElementById("lvlupg_b_" + i);
        lvlupg_texts[i] = document.getElementById("lvlupg_p_" + i);
        enupgs[i] = document.getElementById("enupg_b_" + i);
        enupg_texts[i] = document.getElementById("enupg_p_" + i);
        poupgs[i] = document.getElementById("poupg_b_" + i);
        poupg_texts[i] = document.getElementById("poupg_p_" + i);
        auupgs[i] = document.getElementById("auupg_b_" + i);
        auupg_texts[i] = document.getElementById("auupg_p_" + i);
    }
}
//#endregion

//#region StatsUI
function StatsUI_UpdateTotalTiers() {
    stats_totalTiers.innerHTML = shortnum(sg.totalTiers);
}
function StatsUI_UpdateTotalEnergy() {
    stats_totalEnergy.innerHTML = shortnum(sg.totalEnergy);
}
function StatsUI_UpdateFunButtonClicks() {
    stats_funButtonClicks.innerHTML = sg.funButtonClicks;
}
function StatsUI_UpdateTotalUpgrades() {
    stats_totalUpgrades.innerHTML = Get_TotalUpgrades();
}
function StatsUI_UpdateTotalPower() {
    stats_totalPower.innerHTML = shortnum(sg.totalPower);
}
function StatsUI_UpdateTotalClickTime() {
    stats_totalClickTime.innerHTML = shortnum(sg.totalClickTime);
}
function StatsUI_UpdateTotalQuestsDone() {
    stats_totalQuestsDone.innerHTML = sg.totalQuestsDone;
}
function StatsUI_UpdateHighestLevel() {
    stats_highestLevel.innerHTML = sg.maximumLevel;
}
function StatsUI_UpdateHighestTier() {
    stats_highestTier.innerHTML = shortnum(sg.maximumTier);
}
function StatsUI_UpdateTrophies() {
    //stats_trophies.innerHTML = sg.collectables.length + "/" + trophies.length;
}
function StatsUI_UpdateMilestones() {
    //ToDo
}

function StatsUI_UpdateAll() {
    if (isinit) {
        StatsUI_UpdateTotalTiers();
        StatsUI_UpdateTotalEnergy();
        StatsUI_UpdateFunButtonClicks();
        StatsUI_UpdateTotalUpgrades();
        StatsUI_UpdateTotalUpgrades();
        StatsUI_UpdateTotalPower();
        StatsUI_UpdateTotalClickTime();
        StatsUI_UpdateTotalQuestsDone();
        StatsUI_UpdateHighestLevel();
        StatsUI_UpdateHighestTier();
        StatsUI_UpdateTrophies();
        StatsUI_UpdateMilestones();
    }
}

function StatsUI_Initialize() {
    stats_totalTiers = document.getElementById("stattotaltiers");
    stats_totalEnergy = document.getElementById("stattotalenergy");
    stats_funButtonClicks = document.getElementById("statfunbuttonclicks");
    stats_totalUpgrades = document.getElementById("stattotallevels");
    stats_totalPower = document.getElementById("stattotalpower");
    stats_totalClickTime = document.getElementById("stattotalclicktime");
    stats_totalQuestsDone = document.getElementById("stattotalquestsdone");
    stats_highestLevel = document.getElementById("stathighestlevel");
    stats_highestTier = document.getElementById("stathighesttier");
    stats_trophies = document.getElementById("stattotaltrophies");
    stats_milestones = document.getElementById("statmilestones");
}
//#endregion
