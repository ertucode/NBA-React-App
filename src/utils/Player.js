class Player {
	constructor(id, fullName) {
		this.id = id;
		this.fullName = fullName;
	}

	get gotStats() {
		return this.seasonStats == null ? false : true;
	}

	async getPlayerStats() {
		let playerStatsArray = [];
		let season = 2021;

		let seasonsSinceLastResponse = 0;
		let encounteredFirstSeason = false;

		this.seasonStats = {};

		while (season > 1978) {
			const playerStatsData = await axios.get(
				"https://www.balldontlie.io/api/v1/season_averages",
				{
					params: { player_ids: [id], season: season },
				}
			);
			playerStatsArray = playerStatsData.data.data;

			if (playerStatsArray.length !== 0) {
				encounteredFirstSeason = true;
				seasonsSinceLastResponse = 0;
				this.seasonStats[season] = playerStatsArray[0];
			} else {
				seasonsSinceLastResponse += 1;
			}

			if (seasonsSinceLastResponse > 5 && encounteredFirstSeason) break;

			season -= 1;
		}

		console.log(this.seasonStats);
	}
}
