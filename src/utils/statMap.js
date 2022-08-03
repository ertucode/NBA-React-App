class BiMap {
	#obj;
	#reverseObj;

	constructor(obj) {
		this.#obj = obj;
		this.#reverseObj = Object.entries(obj).reduce(
			(accObj, [key, value]) => {
				accObj[value] = key;
				return accObj;
			},
			{}
		);
	}

	getValue(key) {
		return this.#obj[key] || null;
	}

	getKey(key) {
		return this.#reverseObj[key] || null;
	}
}

export const STAT_API_TO_ACTUAL_NAME_MAP = new BiMap({
	ast: "AST",
	blk: "BLK",
	dreb: "DRB",
	fg3_pct: "3P%",
	fg3a: "3PA",
	fg3m: "3P",
	fg_pct: "FG%",
	fga: "FGA",
	fgm: "FG",
	ft_pct: "FT%",
	fta: "FTA",
	ftm: "FT",
	games_played: "G",
	min: "MP",
	oreb: "ORB",
	pf: "PF",
	pts: "PTS",
	reb: "REB",
	stl: "STL",
	turnover: "TO",
});

export const PRIORITY_ORDER = [
	"G",
	"MP",
	"FG",
	"FGA",
	"FG%",
	"3P",
	"3PA",
	"3P%",
	"FT",
	"FTA",
	"FT%",
	"ORB",
	"DRB",
	"REB",
	"AST",
	"STL",
	"BLK",
	"TO",
	"PF",
	"PTS",
];

export const DESCRIPTION_MAP = {
	AST: "Assists Per Game",
	BLK: "Blocks Per Game",
	DRB: "Defensive Rebounds Per Game",
	"3P%": "3-Point Field Goal Percentage",
	"3PA": "3-Point Field Goal Attempts Per Game",
	"3P": "3-Point Field Goal Made Per Game",
	"FG%": "Field Goal Percentage",
	FGA: "Field Goal Attempts Per Game",
	FG: "Field Goals Made Per Game",
	"FT%": "Free Throw percentage",
	FTA: "Free Throw Attempts Per Game",
	FT: "Free Throw Made Per Game",
	G: "Games Played",
	MP: "Minutes Played Per Game",
	ORB: "Offensive Rebounds Per Game",
	PF: "Personal Fouls Per Game",
	PTS: "Points Per Game",
	REB: "Total Rebounds Per Game",
	STL: "Steals Per Game",
	TO: "Turnovers Per Game",
};
