import React from "react";
import getDesiredStats from "../../utils/getDesiredStats";
import getUniqueId from "../../utils/getUniqueId";

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
				<tr key={getUniqueId()}>
					{row.map((val) => {
						return <td key={getUniqueId()}>{val}</td>;
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
						return <th key={getUniqueId()}>{stat}</th>;
					})}
				</tr>
			</thead>
			<tbody>{loadBody()}</tbody>
		</table>
	);
}
