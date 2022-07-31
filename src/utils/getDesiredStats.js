export default function getDesiredStats(statCategoriesToShow, seasonStats) {
	if (Object.keys(seasonStats).length === 0) return seasonStats;

	const returnStats = { ...seasonStats };

	Object.keys(seasonStats).forEach((season) => {
		returnStats[season] = {
			...Object.fromEntries(
				Object.entries(seasonStats[season]).filter(([key]) =>
					statCategoriesToShow.includes(key)
				)
			),
		};
	});

	return returnStats;
}
