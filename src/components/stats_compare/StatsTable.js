import React from "react";
import getDesiredStats from "../../utils/getDesiredStats";

const statCategoriesToShow = [
	"games_played",
	"fgm",
	"fga",
	"fg3m",
	"fg3a",
	"ftm",
];

export default function StatsTable({ playerStats }) {
	function loadBody() {
		const rows = [];

		const desiredStats = getDesiredStats(statCategoriesToShow, playerStats);

		for (const [season, seasonStat] of Object.entries(
			desiredStats.seasonStats
		)) {
			rows.push([season, ...Object.values(seasonStat)]);
		}

		return rows.map((row) => {
			return (
				<tr key={new Date() * Math.random() + new Date()}>
					{row.map((val) => {
						return (
							<td key={new Date() * Math.random() + new Date()}>
								{val}
							</td>
						);
					})}
				</tr>
			);
		});
	}

	return (
		<table className="stats-table">
			<thead>
				<tr>
					<th>Season</th>
					{statCategoriesToShow.map((stat) => {
						return (
							<th key={new Date() * Math.random() + new Date()}>
								{stat}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>{loadBody()}</tbody>
		</table>
	);
}
