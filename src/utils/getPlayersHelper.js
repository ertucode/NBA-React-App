import axios from "axios";

export default async function getPlayersHelper(
	setPlayers,
	searchParam,
	pageNumber,
	setTotalPageNumber
) {
	const newPlayers = [];

	const playersData = await axios.get(
		"https://www.balldontlie.io/api/v1/players",
		{
			params: { search: `${searchParam}`, page: `${pageNumber}` },
		}
	);

	const totalPages = playersData.data.meta.total_pages;

	newPlayers.push(...playersData.data.data);

	newPlayers.sort();
	setPlayers(newPlayers);
	setTotalPageNumber(totalPages);
}
