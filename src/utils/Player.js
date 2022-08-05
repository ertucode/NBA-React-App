import axios from "axios";
import Table from "./Table";
// import { PRIORITY_ORDER } from "./statMap";

const LOCAL_STORAGE_PREFIX = "NBA_PLAYER-";

export default class Player {
	constructor(playerData) {
		this.id = playerData.id;
		this.fullName = `${playerData.first_name} ${playerData.last_name}`;
		this.position = playerData.position;
		this.team = playerData.team.full_name;
		this.fetchedStats = {};
	}

	get gotStats() {
		return this.seasonStats == null ? false : true;
	}

	async getStats(setGettingStats, setGettingStatsFailed) {
		const storageValue = localStorage.getItem(
			LOCAL_STORAGE_PREFIX + this.id
		);

		if (storageValue != null) this.setSeasonStats(JSON.parse(storageValue));
		else {
			let playerStatsArray = [];

			const previouslyFetchedSeasons = Object.keys(this.fetchedStats);

			let season =
				previouslyFetchedSeasons.length === 0
					? 2021
					: parseInt(Math.min(...previouslyFetchedSeasons));

			this.gettingStatsFailed = false;

			let seasonsSinceLastResponse = 0;
			let encounteredFirstSeason = false;

			while (season > 1978) {
				try {
					const playerStatsData = await axios.get(
						"https://www.balldontlie.io/api/v1/season_averages",
						{
							params: { player_ids: [this.id], season: season },
						}
					);
					playerStatsArray = playerStatsData.data.data;

					if (playerStatsArray.length !== 0) {
						encounteredFirstSeason = true;
						seasonsSinceLastResponse = 0;
						this.fetchedStats[season] = playerStatsArray[0];
					} else {
						seasonsSinceLastResponse += 1;
					}

					if (seasonsSinceLastResponse > 5 && encounteredFirstSeason)
						break;

					season -= 1;
				} catch (err) {
					CB(setGettingStatsFailed, true);
					this.gettingStatsFailed = true;
					break;
				}
			}

			if (!this.gettingStatsFailed) {
				this.setSeasonStats(this.fetchedStats);

				localStorage.setItem(
					LOCAL_STORAGE_PREFIX + this.id,
					JSON.stringify(this.fetchedStats)
				);
			}
		}

		CB(setGettingStats, false);
	}

	setSeasonStats(data) {
		this.seasonStats = new Table(data);
		this.minSeason = this.seasonStats.rows[0][0];
		this.maxSeason = this.seasonStats.rows.at(-1)[0];
	}

	getSeasonAverages(stats, min = this.minSeason, max = this.maxSeason) {
		// return {FG: 25}
		if (!this.gotStats) return {};

		const averages = {};
		const minIndex = min - this.minSeason;
		const maxIndex = max - this.minSeason;

		stats.forEach((stat) => {
			const statColumn = this.seasonStats.getColumn(
				stat,
				minIndex,
				maxIndex + 1
			);

			if (stat === "MP") {
				const averageTimeSec = getAverageFromArray(
					statColumn.map((time) => {
						const [min, sec] = time.split(":");
						return parseInt(min) * 60 + parseInt(sec);
					})
				);
				averages[stat] = averageTimeSec / 60;
			} else {
				averages[stat] = getAverageFromArray(statColumn);
			}
		});

		return averages;
	}
}

function CB(cb, ...args) {
	if (cb != null) cb(...args);
}

function getAverageFromArray(arr) {
	return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
}
