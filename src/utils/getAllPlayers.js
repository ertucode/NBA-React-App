import axios from "axios";

export default async function getAllPlayers(setPlayers, searchParam) {
	const newPlayers = [];
	let playersData;
	let totalPages = parseFloat("Infinity");
	let pageNumber = 1;

	while (pageNumber <= totalPages && pageNumber <= 50) {
		playersData = await axios.get(
			"https://www.balldontlie.io/api/v1/players",
			{
				params: { search: `${searchParam}`, page: `${pageNumber}` },
			}
		);

		newPlayers.push(...playersData.data.data);

		totalPages = playersData.data.meta.total_pages;
		pageNumber += 1;
	}
	setPlayers(newPlayers);
}
