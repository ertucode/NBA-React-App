import axios from "axios";

export default class Player {
	constructor(playerData) {
		this.id = playerData.id;
		this.fullName = `${playerData.first_name} ${playerData.last_name}`;
		this.fetchedStats = {};
	}

	get gotStats() {
		return this.seasonStats == null ? false : true;
	}

	async getStats(setGettingStats, setGettingStatsFailed) {
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
				setGettingStatsFailed(true);
				this.gettingStatsFailed = true;
				break;
			}
		}

		if (!this.gettingStatsFailed) this.seasonStats = this.fetchedStats;

		setGettingStats(false);
	}
}
