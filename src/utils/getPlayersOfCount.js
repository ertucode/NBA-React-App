import axios from "axios";

export default async function getPlayersOfCount(
	setPlayers,
	searchParam,
	count
) {
	count = Math.min(count, 20);

	const newPlayers = [];

	const playersData = await axios.get(
		"https://www.balldontlie.io/api/v1/players",
		{
			params: { search: `${searchParam}` },
		}
	);

	newPlayers.push(...playersData.data.data.slice(0, count));

	setPlayers(newPlayers);
}
