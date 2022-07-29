import axios from "axios";

export default async function getPlayerStats(name, id, setStats) {
	let playerStatsArray = [];
	let season = 2021;

	let playerStats = { name, seasonStats: {} };

	let seasonsSinceLastResponse = 0;
	let encounteredFirstSeason = false;

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
			playerStats.seasonStats[season] = playerStatsArray[0];
		} else {
			seasonsSinceLastResponse += 1;
		}

		if (seasonsSinceLastResponse > 5 && encounteredFirstSeason) {
			break;
		}

		season -= 1;
	}

	console.log(playerStats);

	setStats((prevStats) => {
		const newStats = [...prevStats];
		newStats.push(playerStats);
		return newStats;
	});
}
