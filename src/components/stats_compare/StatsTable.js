import React, { useEffect, useState } from "react";
import getDesiredStats from "../../utils/getDesiredStats";
import getUniqueId from "../../utils/getUniqueId";
import TryAgain from "./TryAgain";

const statCategoriesToShow = [
	"games_played",
	"fgm",
	"fga",
	"fg3m",
	"fg3a",
	"ftm",
];

export default function StatsTable({ desiredPlayer }) {
	const [gettingStats, setGettingStats] = useState(true);
	const [gettingStatsFailed, setGettingStatsFailed] = useState(false);

	function handleGettingStatsFailed() {
		return (
			<tr>
				<th>
					Getting stats failed...{" "}
					<TryAgain
						handleClick={() => {
							console.log("trying again");
							setGettingStatsFailed(false);
							setGettingStats(true);
							desiredPlayer.getStats(
								setGettingStats,
								setGettingStatsFailed
							);
						}}
					/>
				</th>
			</tr>
		);
	}

	useEffect(() => {
		if (!desiredPlayer.gotStats)
			desiredPlayer.getStats(setGettingStats, setGettingStatsFailed);
		else setGettingStats(false);
	}, [desiredPlayer]);

	function loadBody() {
		const rows = [];

		const desiredStats = getDesiredStats(
			statCategoriesToShow,
			desiredPlayer.seasonStats
		);

		for (const [season, seasonStat] of Object.entries(desiredStats)) {
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
			<tbody>
				{gettingStats
					? handleLoading()
					: gettingStatsFailed
					? handleGettingStatsFailed()
					: loadBody()}
			</tbody>
		</table>
	);
}

function handleLoading() {
	return (
		<tr>
			<th>Loading</th>
		</tr>
	);
}
