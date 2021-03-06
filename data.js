var STATIC_CANDIDATES = [
  [
    "hello",
    true
  ],
  [
    {
      "foo": "bar"
    },
    true
  ],
  [
    "{'json': \"blob\"}",
    false
  ],
  [
    [
      "Ford",
      "BMW",
      "Fiat"
    ],
    true
  ],
  [
    "{a}",
    false
  ],
  [
    "{\"hello\": world\"}",
    false
  ],
  [
    {
      "apples": "3",
      "fish": 15,
      "kittens": "nineteen"
    },
    true
  ],
  [
  	"{\"fig_puddings\"; 6", false
  ]
]

var WORD_LIST = [
	"rusty",
	"sapir",
	"contd",
	"broun",
	"graze",
	"hasty",
	"burnt",
	"mohwa",
	"enrol",
	"madre",
	"midas",
	"lulli",
	"artal",
	"moron",
	"getup",
	"maple",
	"hollo",
	"jinks",
	"talos",
	"manus",
	"expos",
	"sawer",
	"alvin",
	"phebe",
	"beryl",
	"phyle",
	"thank",
	"hupeh",
	"ladin",
	"tiran",
	"anime",
	"sucre",
	"pele",
	"gitim",
	"janis",
	"arene",
	"mauby",
	"gwawl",
	"apron",
	"magna",
	"belah",
	"delhi",
	"kebob",
	"sidur",
	"sepia",
	"honan",
	"overt",
	"runed",
	"lefty",
	"error",
	"horse",
	"latke",
	"gowon",
	"doxie",
	"verny",
	"pomey",
	"jabal",
	"swirl",
	"acrux",
	"morse",
	"spode",
	"tawpy",
	"wisla",
	"ludie",
	"logia",
	"toque",
	"hogan",
	"avery",
	"blaze",
	"craps",
	"dyula",
	"spier",
	"savor",
	"pivot",
	"noise",
	"gigot",
	"loden",
	"muddy",
	"addax",
	"domic",
	"lobar",
	"gruis",
	"cargo",
	"plaid",
	"pasch",
	"ombre",
	"afire",
	"della",
	"prone",
	"dumpy",
	"bethe",
	"lowse",
	"redry",
	"areca",
	"hurst",
	"sneak",
	"avian",
	"oruro",
	"herne",
	"lowry",
	"duct",
	"bait",
	"eris",
	"danu",
	"sara",
	"whim",
	"geck",
	"mump",
	"macc",
	"love",
	"typo",
	"dmus",
	"vang",
	"harl",
	"lofn",
	"back",
	"sale",
	"gave",
	"bomb",
	"conk",
	"lake",
	"phiz",
	"inez",
	"spiv",
	"hoke",
	"jimp",
	"holm",
	"lois",
	"beth",
	"prut",
	"joey",
	"page",
	"tues",
	"joab",
	"etch",
	"styr",
	"rabi",
	"ogpu",
	"lend",
	"mech",
	"mari",
	"vice",
	"plat",
	"hest",
	"jibe",
	"mews",
	"idly",
	"rats",
	"erna",
	"hate",
	"miso",
	"spar",
	"boud",
	"reus",
	"pech",
	"grit",
	"lake",
	"reft",
	"erma",
	"vlos",
	"dart",
	"agon",
	"mood",
	"lawn",
	"enow",
	"belg",
	"pons",
	"jack",
	"oxon",
	"loos",
	"cake",
	"yaws",
	"whir",
	"quar",
	"wran",
	"paik",
	"imre",
	"hade",
	"path",
	"vote",
	"vita",
	"teat",
	"loeb",
	"goat",
	"ruck",
	"brig",
	"glop",
	"sept",
	"skeg",
	"axil",
	"byng",
	"talk",
	"slim",
	"aura",
	"iter",
	"fisc",
	"efah",
	"rump",
	"ripe",
	"rote",
];
