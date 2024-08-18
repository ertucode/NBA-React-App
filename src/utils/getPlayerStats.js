import axios from "axios";
import { getRequest } from "./fetchUtils";

export default async function getPlayerStats(name, id) {
  let playerStatsArray = [];
  let season = 2021;

  let playerStats = { name, seasonStats: {} };

  let seasonsSinceLastResponse = 0;
  let encounteredFirstSeason = false;

  while (season > 1978) {
    const playerStatsData = await getRequest("season_averages", {
      params: { player_ids: [id], season: season },
    });
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

  return playerStats;
}
