import axios from "axios";

export default async function getPlayersOfCount(searchParam, count) {
	count = Math.min(count, 20);

	const playersData = await axios.get(
		"https://www.balldontlie.io/api/v1/players",
		{
			params: { search: `${searchParam}` },
		}
	);

	return [...playersData.data.data.slice(0, count)];
}
