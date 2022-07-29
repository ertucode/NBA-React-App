export default function getDesiredStats(statCategoriesToShow, stats) {
	if (Object.keys(stats).length === 0) return stats;

	Object.values(stats.seasonStats).forEach((season) => {
		Object.keys(season).forEach((statKey) => {
			if (!statCategoriesToShow.includes(statKey)) delete season[statKey];
		});
	});

	return stats;
}
