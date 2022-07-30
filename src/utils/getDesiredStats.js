export default function getDesiredStats(statCategoriesToShow, seasonStats) {
	if (Object.keys(seasonStats).length === 0) return seasonStats;

	Object.values(seasonStats).forEach((season) => {
		Object.keys(season).forEach((statKey) => {
			if (!statCategoriesToShow.includes(statKey)) delete season[statKey];
		});
	});

	return seasonStats;
}
